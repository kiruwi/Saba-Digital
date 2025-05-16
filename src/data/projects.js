// src/data/projects.js
import uxImage1 from "../assets/projects/ux-ui/u-r.jpg";
import uxImage from "../assets/projects/ux-ui/app1.jpg";
import webImage from "../assets/projects/web-dev/app1.jpg";
import graphicsImage from "../assets/projects/graphics/app1.jpg";

// UX/UI Projects
export const uxProjects = [
  {
    id: "ux-app-1",
    title: "Ufanisi Resort",
    shortDescription:
      "User-focused interface for food delivery app.",
    fullDescription:
      "Food is essential to our well-being. And for some of us, eating is more than just a way to stave off hunger. It's a hobby. As a self-proclaimed foodie, I'm naturally drawn to topics that are food-related. So when it came to choosing my first project for the Google UX Design Certificate, I had to jump on this one.",
    fullDescription2:
      "This is the second paragraph where you can add more details about your project. You can describe the research process, design decisions, and outcomes of your UX/UI work on the Ufanisi Resort project.",
    image: uxImage1,
    tags: ["UI Design", "User Research", "Prototyping"],
    category: "ux-ui",
    features: [
      "Personalized health dashboard",
      "Intuitive data visualization",
      "Cross-platform experience",
      "Accessibility-focused design",
    ],
    tools: ["Figma", "Adobe XD", "User Testing"],
    year: "2024",
  },
  {
    id: "ux-app-2",
    title: "Financial Wellness Platform",
    shortDescription:
      "Simplified personal finance management with goal-based planning.",
    fullDescription:
      "The Financial Wellness Platform was created to simplify personal finance management and reduce user anxiety around money matters. The interface uses a goal-based approach, helping users visualize their progress toward financial milestones. We incorporated behavioral economics principles to encourage positive financial habits through subtle UI elements and rewards systems. A comprehensive user journey map was developed to ensure all touchpoints were intuitive and stress-free.",  
      fullDescription2:
      "The Financial Wellness Platform was created to simplify personal finance management and reduce user anxiety around money matters. The interface uses a goal-based approach, helping users visualize their progress toward financial milestones. We incorporated behavioral economics principles to encourage positive financial habits through subtle UI elements and rewards systems. A comprehensive user journey map was developed to ensure all touchpoints were intuitive and stress-free.",
    image: uxImage,
    tags: ["Mobile Design", "User Flow", "UX Research"],
    category: "ux-ui",
    features: [
      "Goal visualization",
      "Behavioral incentives",
      "Simplified financial insights",
      "Progress tracking",
    ],
    tools: ["Sketch", "InVision", "UsabilityHub"],
    year: "2023",
  },
  {
    id: "ux-app-3",
    title: "Smart Home Control Interface",
    shortDescription:
      "Unified control system for connected home devices with voice integration.",
    fullDescription:
      "This smart home control interface unifies management of all connected devices through a single, intuitive dashboard. The design prioritizes quick access to common functions while providing detailed controls when needed. Voice integration was a key feature, requiring careful UX planning to ensure natural language commands felt intuitive. Dark mode was implemented as the primary theme to reduce eye strain during evening use, when the app sees highest engagement.",
    image: uxImage,
    tags: ["IoT Interface", "Voice UX", "Dashboard Design"],
    category: "ux-ui",
    features: [
      "Unified device control",
      "Voice command optimization",
      "Automated routines",
      "Responsive layouts",
    ],
    tools: ["Adobe XD", "Protopie", "Optimal Workshop"],
    year: "2024",
  },
];

// Web Development Projects
export const webProjects = [
  {
    id: "makvo",
    title: "Makvo LLC",
    shortDescription:
      "Corporate website for Makvo with responsive design and modern UI elements.",
    fullDescription:
      "This was my first web development project, created for Makvo company. The website was built with a focus on responsive design principles and modern UI components. I implemented a clean, professional layout that effectively showcases the company's services and portfolio. The site features cross-browser compatibility, optimized performance, and SEO-friendly structure to improve search engine visibility.",
    image: webImage,
    tags: ["jQuery", "Bootstrap", "Apache"],
    category: "web-dev",
    features: [
      "Responsive layout",
      "Cross-browser compatibility",
      "SEO optimization",
      "Modern UI components",
      "Performance-optimized assets",
    ],
    tools: [
      "jQuery",
      "Bootstrap",
      "Font Awesome",
      "Google Hosted Libraries",
      "Apache HTTP Server",
    ],
    year: "2023",
  },
];

// Graphics Design Projects
export const graphicsProjects = [
  {
    id: "graphics-1",
    title: "Brand Identity System",
    shortDescription:
      "Complete visual identity including logo, typography, and application guidelines.",
    fullDescription:
      "This comprehensive brand identity system was designed for a sustainable technology company, embodying their values of innovation and environmental responsibility. The project included logo design, typography selection, color palette development, and creation of application guidelines for both digital and print media. The identity system was designed to be adaptable across various touchpoints while maintaining visual consistency.",
    image: graphicsImage,
    tags: ["Branding", "Logo Design", "Typography"],
    category: "graphics",
    features: [
      "Adaptable logo system",
      "Custom typography",
      "Comprehensive guidelines",
      "Digital and print applications",
    ],
    tools: ["Adobe Illustrator", "InDesign", "Photoshop"],
    year: "2023",
  },
  {
    id: "graphics-2",
    title: "3D Product Visualization",
    shortDescription:
      "Photorealistic 3D renderings of consumer electronics for marketing materials.",
    fullDescription:
      "This project involved creating photorealistic 3D renderings of a new consumer electronics product line for marketing materials. The work included detailed modeling of the products, texture creation, lighting setup, and composition. Special attention was paid to material properties to achieve realistic results. The renderings were used across digital marketing campaigns, packaging design, and retail displays.",
    image: graphicsImage,
    tags: ["3D Rendering", "Product Visualization", "Lighting"],
    category: "graphics",
    features: [
      "Photorealistic materials",
      "Studio lighting simulation",
      "Multiple product configurations",
      "Environment creation",
    ],
    tools: ["Blender", "Cinema 4D", "Substance Painter"],
    year: "2024",
  },
  {
    id: "graphics-3",
    title: "Motion Graphics Package",
    shortDescription:
      "Animated visual elements for digital marketing campaign across multiple platforms.",
    fullDescription:
      "This motion graphics package was created for a multi-platform digital marketing campaign. The project included animated logos, social media assets, video transitions, and interactive web elements. A consistent visual language was maintained across all animations while optimizing each for its specific platform requirements. The animation style combined geometric elements with organic motion to reflect the brand's personality.",
    image: graphicsImage,
    tags: ["Motion Design", "Animation", "Social Media"],
    category: "graphics",
    features: [
      "Cross-platform optimization",
      "Interactive elements",
      "Consistent visual language",
      "Animated logo variations",
    ],
    tools: ["After Effects", "Premiere Pro", "Lottie"],
    year: "2023",
  },
];
