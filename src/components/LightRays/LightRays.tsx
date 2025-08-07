// LightRays.tsx
// Full‑feature OGL spotlight component, now typed for a TypeScript code‑base.

import { useRef, useEffect, useState } from 'react';
import { Renderer, Program, Triangle, Mesh } from 'ogl'; // OGL ships without typings, TS treats these as any.

type Vec2 = [number, number];
type Vec3 = [number, number, number];

interface LightRaysProps {
  /** “top-center” | “top-left” | “top-right” | “left” | “right” | “bottom-left” | “bottom-center” | “bottom-right” */
  raysOrigin?: string;
  raysColor?: string;          // HEX
  raysSpeed?: number;          // multiplier
  lightSpread?: number;        // 0‑1
  rayLength?: number;          // 0‑∞ in viewport widths
  pulsating?: boolean;
  fadeDistance?: number;       // 0‑∞ in viewport widths
  saturation?: number;         // 0‑1 (1 = original)
  followMouse?: boolean;
  mouseInfluence?: number;     // 0‑1
  noiseAmount?: number;        // 0‑1
  distortion?: number;         // 0‑1
  className?: string;
}

const DEFAULT_COLOR = '#ffffff';

/* helpers -------------------------------------------------------------- */
const hexToRgb = (hex: string): Vec3 => {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)!;
  return [
    parseInt(m[1], 16) / 255,
    parseInt(m[2], 16) / 255,
    parseInt(m[3], 16) / 255,
  ];
};

const getAnchorAndDir = (origin: string, w: number, h: number) => {
  const outside = 0.2;
  switch (origin) {
    case 'top-left':
      return { anchor: [0, -outside * h] as Vec2, dir: [0, 1] as Vec2 };
    case 'top-right':
      return { anchor: [w, -outside * h] as Vec2, dir: [0, 1] as Vec2 };
    case 'left':
      return { anchor: [-outside * w, 0.5 * h] as Vec2, dir: [1, 0] as Vec2 };
    case 'right':
      return { anchor: [(1 + outside) * w, 0.5 * h] as Vec2, dir: [-1, 0] as Vec2 };
    case 'bottom-left':
      return { anchor: [0, (1 + outside) * h] as Vec2, dir: [0, -1] as Vec2 };
    case 'bottom-center':
      return { anchor: [0.5 * w, (1 + outside) * h] as Vec2, dir: [0, -1] as Vec2 };
    case 'bottom-right':
      return { anchor: [w, (1 + outside) * h] as Vec2, dir: [0, -1] as Vec2 };
    default: // 'top-center'
      return { anchor: [0.5 * w, -outside * h] as Vec2, dir: [0, 1] as Vec2 };
  }
};

/* component ------------------------------------------------------------ */
const LightRays: React.FC<LightRaysProps> = ({
  raysOrigin = 'top-center',
  raysColor = DEFAULT_COLOR,
  raysSpeed = 1,
  lightSpread = 1,
  rayLength = 2,
  pulsating = false,
  fadeDistance = 1.0,
  saturation = 1.0,
  followMouse = true,
  mouseInfluence = 0.1,
  noiseAmount = 0.0,
  distortion = 0.0,
  className = '',
}) => {
  /* refs ---------------------------------------------------------------- */
  const containerRef = useRef<HTMLDivElement | null>(null);
  const uniformsRef = useRef<Record<string, any> | null>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const mouseRef = useRef<Vec2>([0.5, 0.5]);
  const smoothMouseRef = useRef<Vec2>([0.5, 0.5]);
  const animationIdRef = useRef<number | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  /* visibility observer ------------------------------------------------- */
  useEffect(() => {
    if (!containerRef.current) return;
    observerRef.current = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observerRef.current.observe(containerRef.current);
    return () => observerRef.current?.disconnect();
  }, []);

  /* main WebGL init / dispose ------------------------------------------- */
  useEffect(() => {
    if (!isVisible || !containerRef.current) return;

    /* dispose previous instance if any */
    cleanupRef.current?.();
    cleanupRef.current = null;

    /* async init lets layout settle */
    const init = async () => {
      await new Promise(r => setTimeout(r, 10)); // micro‑delay

      if (!containerRef.current) return;

      /* renderer */
      const renderer = new Renderer({ dpr: Math.min(window.devicePixelRatio, 2), alpha: true });
      rendererRef.current = renderer;
      const gl = renderer.gl;
      gl.canvas.style.width = '100%';
      gl.canvas.style.height = '100%';

      /* clear container */
      containerRef.current.innerHTML = '';
      containerRef.current.appendChild(gl.canvas);

      /* shaders */
      const vert = `
attribute vec2 position;
varying vec2 vUv;
void main(){vUv = position*0.5+0.5; gl_Position = vec4(position,0.,1.);}  `;

      const frag = `precision highp float;
uniform float iTime;
uniform vec2  iResolution;
uniform vec2  rayPos;
uniform vec2  rayDir;
uniform vec3  raysColor;
uniform float raysSpeed;
uniform float lightSpread;
uniform float rayLength;
uniform float pulsating;
uniform float fadeDistance;
uniform float saturation;
uniform vec2  mousePos;
uniform float mouseInfluence;
uniform float noiseAmount;
uniform float distortion;
varying vec2 vUv;

/* util noise */
float noise(vec2 st){return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);}

float rayStrength(vec2 source,vec2 dir,vec2 coord,float sA,float sB,float speed){
  vec2 d = coord-source;
  vec2 n = normalize(d);
  float cosA = dot(n,dir);
  float warped = cosA + distortion*sin(iTime*2.+length(d)*.01)*.2;
  float spread = pow(max(warped,0.),1./max(lightSpread,0.001));

  float dist = length(d);
  float maxD = iResolution.x*rayLength;
  float lenFall = clamp((maxD-dist)/maxD,0.,1.);
  float fadeFall = clamp((iResolution.x*fadeDistance-dist)/(iResolution.x*fadeDistance),0.5,1.);

  float base = clamp((.45+.15*sin(warped*sA+iTime*speed))+(.3+.2*cos(-warped*sB+iTime*speed)),0.,1.);
  return base*lenFall*fadeFall*spread*
         (pulsating>0.5?0.8+0.2*sin(iTime*speed*3.):1.);
}

void main(){
  vec2 coord = vec2(gl_FragCoord.x,iResolution.y-gl_FragCoord.y);

  /* mouse influence */
  vec2 dir = rayDir;
  if(mouseInfluence>0.){
    vec2 m = mousePos*iResolution.xy;
    dir = normalize(m-rayPos)*mouseInfluence + rayDir*(1.-mouseInfluence);
    dir = normalize(dir);
  }

  vec4 r1 = vec4(1.)*rayStrength(rayPos,dir,coord,36.2214,21.11349,1.5*raysSpeed);
  vec4 r2 = vec4(1.)*rayStrength(rayPos,dir,coord,22.3991,18.0234,1.1*raysSpeed);
  vec4 col = r1*0.5 + r2*0.4;

  if(noiseAmount>0.){
    float n = noise(coord*0.01+iTime*0.1);
    col.rgb *= (1.-noiseAmount)+noiseAmount*n;
  }

  float brightness = 1.-coord.y/iResolution.y;
  col.r *= 0.1+brightness*0.8;
  col.g *= 0.3+brightness*0.6;
  col.b *= 0.5+brightness*0.5;

  if(saturation!=1.){
    float g = dot(col.rgb,vec3(0.299,0.587,0.114));
    col.rgb = mix(vec3(g),col.rgb,saturation);
  }
  col.rgb *= raysColor;
  gl_FragColor = col;
}`.trim();

      /* uniforms */
      const uniforms = {
        iTime:         { value: 0 },
        iResolution:   { value: [1, 1] as Vec2 },
        rayPos:        { value: [0, 0] as Vec2 },
        rayDir:        { value: [0, 1] as Vec2 },
        raysColor:     { value: hexToRgb(raysColor) },
        raysSpeed:     { value: raysSpeed },
        lightSpread:   { value: lightSpread },
        rayLength:     { value: rayLength },
        pulsating:     { value: pulsating ? 1 : 0 },
        fadeDistance:  { value: fadeDistance },
        saturation:    { value: saturation },
        mousePos:      { value: [0.5, 0.5] as Vec2 },
        mouseInfluence:{ value: mouseInfluence },
        noiseAmount:   { value: noiseAmount },
        distortion:    { value: distortion },
      };
      uniformsRef.current = uniforms;

      /* mesh */
      const geometry = new Triangle(gl);
      const program  = new Program(gl, { vertex: vert, fragment: frag, uniforms });
      const mesh     = new Mesh(gl, { geometry, program });

      /* placement / resize */
      const updatePlacement = () => {
        if (!containerRef.current) return;
        renderer.dpr = Math.min(window.devicePixelRatio, 2);

        const { clientWidth: wCSS, clientHeight: hCSS } = containerRef.current;
        renderer.setSize(wCSS, hCSS);

        const dpr = renderer.dpr;
        const w = wCSS * dpr;
        const h = hCSS * dpr;
        uniforms.iResolution.value = [w, h];

        const { anchor, dir } = getAnchorAndDir(raysOrigin, w, h);
        uniforms.rayPos.value = anchor;
        uniforms.rayDir.value = dir;
      };

      /* render loop */
      const loop = (t: number) => {
        uniforms.iTime.value = t * 0.001;

        if (followMouse && mouseInfluence > 0) {
          const smooth = 0.92;
          smoothMouseRef.current[0] = smoothMouseRef.current[0] * smooth + mouseRef.current[0] * (1 - smooth);
          smoothMouseRef.current[1] = smoothMouseRef.current[1] * smooth + mouseRef.current[1] * (1 - smooth);
          uniforms.mousePos.value = [...smoothMouseRef.current] as Vec2;
        }

        renderer.render({ scene: mesh });
        animationIdRef.current = requestAnimationFrame(loop);
      };

      window.addEventListener('resize', updatePlacement);
      updatePlacement();
      animationIdRef.current = requestAnimationFrame(loop);

      /* cleanup */
      const containerEl = containerRef.current;
      const canvasEl = gl.canvas;
      cleanupRef.current = () => {
        if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
        window.removeEventListener('resize', updatePlacement);

        const ext = gl.getExtension('WEBGL_lose_context');
        ext?.loseContext();
        // Only remove if the canvas is still a child of the container
        if (containerEl && canvasEl && canvasEl.parentNode === containerEl) {
          containerEl.removeChild(canvasEl);
        }
        rendererRef.current = null;
        uniformsRef.current = null;
      };
    };

    init();
    /* dispose on unmount / visibility change */
    return () => cleanupRef.current?.();
  }, [
    isVisible,
    raysOrigin,
    raysColor,
    raysSpeed,
    lightSpread,
    rayLength,
    pulsating,
    fadeDistance,
    saturation,
    followMouse,
    mouseInfluence,
    noiseAmount,
    distortion,
  ]);

  /* runtime prop updates (no re‑init needed) ---------------------------- */
  useEffect(() => {
    if (!uniformsRef.current || !rendererRef.current || !containerRef.current) return;
    const u = uniformsRef.current;
    const r = rendererRef.current;

    u.raysColor.value   = hexToRgb(raysColor);
    u.raysSpeed.value   = raysSpeed;
    u.lightSpread.value = lightSpread;
    u.rayLength.value   = rayLength;
    u.pulsating.value   = pulsating ? 1 : 0;
    u.fadeDistance.value= fadeDistance;
    u.saturation.value  = saturation;
    u.mouseInfluence.value = mouseInfluence;
    u.noiseAmount.value = noiseAmount;
    u.distortion.value  = distortion;

    const { clientWidth: wCSS, clientHeight: hCSS } = containerRef.current;
    const dpr = r.dpr;
    const { anchor, dir } = getAnchorAndDir(raysOrigin, wCSS * dpr, hCSS * dpr);
    u.rayPos.value = anchor;
    u.rayDir.value = dir;
  }, [
    raysColor,
    raysSpeed,
    lightSpread,
    raysOrigin,
    rayLength,
    pulsating,
    fadeDistance,
    saturation,
    mouseInfluence,
    noiseAmount,
    distortion,
  ]);

  /* mouse tracking ------------------------------------------------------ */
  useEffect(() => {
    if (!followMouse) return;
    const onMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseRef.current = [(e.clientX - rect.left) / rect.width, (e.clientY - rect.top) / rect.height];
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [followMouse]);

  /* view ---------------------------------------------------------------- */
  return (
    <div
      ref={containerRef}
      className={`w-full h-full pointer-events-none relative overflow-hidden ${className}`.trim()}
    />
  );
};

export default LightRays;
