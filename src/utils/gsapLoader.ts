type GsapModule = typeof import('gsap');
type SplitTextModule = typeof import('gsap/SplitText');

let gsapModulePromise: Promise<GsapModule> | null = null;
let splitTextPromise: Promise<SplitTextModule['default']> | null = null;
let splitTextRegistered = false;

const getGsapModule = (): Promise<GsapModule> => {
  if (!gsapModulePromise) {
    gsapModulePromise = import('gsap');
  }

  return gsapModulePromise;
};

const getSplitText = async (): Promise<SplitTextModule['default']> => {
  if (!splitTextPromise) {
    splitTextPromise = import('gsap/SplitText').then((module) => module.default ?? (module as unknown as SplitTextModule['default']));
  }
  return splitTextPromise;
};

type LoadOptions = {
  withSplitText?: boolean;
};

export const loadGsap = async (options: LoadOptions = {}): Promise<{
  gsap: GsapModule['gsap'];
  SplitText?: SplitTextModule['default'];
}> => {
  const module = await getGsapModule();

  if (!options.withSplitText) {
    return { gsap: module.gsap };
  }

  const plugin = await getSplitText();

  if (!splitTextRegistered) {
    module.gsap.registerPlugin(plugin);
    splitTextRegistered = true;
  }

  return {
    gsap: module.gsap,
    SplitText: plugin
  };
};
