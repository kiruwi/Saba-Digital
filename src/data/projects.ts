// src/data/projects.ts
import uxImage1 from "../assets/projects/ux-ui/u-r.jpg";
import webImage from "../assets/projects/web-dev/app1.jpg";

// Define types for the project data structure
export interface DescriptionSection {
  heading: string;
  content: string;
}

export interface ProjectType {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  fullDescription2?: string;
  fullDescription3?: DescriptionSection[];
  image: string;
  additionalImages?: string[];
  tags: string[];
  category: 'uxui' | 'webdev' | 'graphics';
  features?: string[];
  tools?: string[];
  year?: string;
  gallery?: Array<{
    src: string;
    alt: string;
  }>;
}

// UX/UI Projects
export const uxProjects: ProjectType[] = [
  {
    id: "ufanisi-resort",
    title: "Ufanisi Resort",
    shortDescription:
      "User-focused interface for food delivery app.",
    fullDescription:
      "🍽️\n\n\n\nI can't lie, food delivery app projects excite me because food matters for your well-being. For many, eating isn't just fuel, it's a passion. As a self confessed foodie, I dive into anything food related. So for my first Google UX Design Certificate project, I had to pick this one",
    fullDescription2:
      "Join me on this creative journey as I share how I breathed new life into Ufanisi Resort's food delivery app, taking you from my initial terrible UI Designs, to the final polished interface!",
    fullDescription3: [
      { heading: "The Challenge", content: "Let's be real, we're all rushing around these days! I've watched friends struggle to find time to cook at home, me included, and some can't even squeeze in a visit to a restaurant. We wanted to solve this everyday problem: how can busy people get delicious food without disrupting their packed schedules in the town of Kisii?" },
      { heading: "The Goal", content: "I set out to create something I'd actually love for the people of Kisii to use, a super intuitive app, that makes ordering food from Ufanisi Resort as easy and enjoyable as possible. No more hungry moments when you're stuck working late!" },
      { heading: "My Role", content: "I wore the UX Designer hat throughout this project, pouring my creativity into every aspect from the first rough sketches to the final polished product. It was a hands-on labor of love from start to finish!" },
      { heading: "Previous Design Issues", content: "As seen above, my previous design suffered from several fundamental UX problems that negatively impacted user experience. Typography was inconsistent throughout the interface, with mixed font that had no clear purpose or hierarchy. I had used multiple font types and weights seemingly at random, creating visual confusion. Spacing was poorly implemented, with elements either crammed together or floating in excessive whitespace. Almost everything was rigidly centered on the page, ignoring natural reading patterns and creating an unbalanced layout. Most importantly, many design elements weren't user-friendly, buttons were difficult to identify, interactive elements lacked proper affordances, and the navigation was unintuitive, forcing users to hunt for basic functions. This second project served as a refresher and opportunity to implement proper UX principles." }
    ],
    image: uxImage1,
    tags: ["UI Design", "User Research", "Prototyping"],
    category: "uxui",
    features: [
      "Streamlined 3-tap ordering process",
      "Multi-language support (English & Swahili)",
      "Voice search capabilities",
      "Saved preferences & quick reordering",
      "Payment flexibility (mobile money & cash)",
      "High-contrast accessibility design",
      "Smart upsell recommendations",
    ],
    tools: ["Figma", "Adobe XD", "User Testing"],
    year: "2024",
  },
];

// Web Development Projects
export const webProjects: ProjectType[] = [
  {
    id: "makvo-llc",
    title: "Makvo LLC",
    shortDescription:
      "Corporate website for Makvo with responsive design and modern UI elements.",
    fullDescription:
      "This was my first web development project, created for Makvo company. The website was built with a focus on responsive design principles and modern UI components. I implemented a clean, professional layout that effectively showcases the company's services and portfolio. The site features cross-browser compatibility, optimized performance, and SEO-friendly structure to improve search engine visibility.",
    image: webImage,
    additionalImages: [
      "/assets/projects/web-dev/app1.jpg",
      "/assets/projects/web-dev/app1.jpg",
      "/assets/projects/web-dev/app1.jpg"
    ],
    tags: ["jQuery", "Bootstrap", "Apache"],
    category: "webdev",
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
export const graphicsProjects: ProjectType[] = [
  {
    id: "gsc-hauling",
    title: "GSC Hauling",
    shortDescription: "In-house graphic design for a professional hauling service company.",
    fullDescription: "I joined GSC Hauling, a Seattle-based hauling service company, as their in-house graphic designer to develop and implement a complete brand identity system. The company specializes in helping people transport items of all sizes across the greater Seattle area, and needed visual assets that would convey reliability, strength, and professionalism in the competitive hauling market.",
    fullDescription2: "As part of the GSC team, I created a comprehensive visual identity system including logo design, branded vehicle graphics, advertising materials, and visual representations of their hauling services for customer communications.",
    fullDescription3: [
      { heading: "Brand Development", content: "Working closely with the company leadership, I developed a bold, distinctive logo that incorporates visual elements suggesting movement and transportation while maintaining a professional appearance. The color palette features different shades of green that convey trust and energy, essential qualities for a hauling service." },
      { heading: "Visual Identity", content: "I established brand guidelines to ensure the GSC visual identity would be instantly recognizable across all touchpoints. As the company's graphic designer, I created a system of complementary graphic elements that could be applied consistently across different media while maintaining brand recognition." },
      { heading: "Advertising Materials", content: "I managed the design and production of all print and digital advertising materials featuring the new branding. This included vehicle wraps, business cards, flyers, social media graphics, and billboard designs that created a cohesive visual presence across all customer touchpoints." },
      { heading: "Impact", content: "Since implementing the new branding and visual system, GSC Hauling has experienced a significant increase in brand recognition and customer engagement. The company has expanded its fleet and service area, with the new visual identity playing a key role in their growth strategy." }
    ],
    image: "/assets/projects/3d-graphics/gsc-images/gsc-water.jpg",
    additionalImages: [
      "/assets/projects/3d-graphics/gsc-images/gsc-logo.jpg",
      "/assets/projects/3d-graphics/gsc-images/gsc-AD.png",
      "/assets/projects/3d-graphics/gsc-images/gsc-water.jpg",
      "/assets/projects/3d-graphics/gsc-images/john-front.jpg",
      "/assets/projects/3d-graphics/gsc-images/john-gsc.jpg"
    ],
    tags: ["Brand Identity", "Logo Design", "Advertising Design"],
    category: "graphics",
    features: [
      "Complete logo and visual identity system",
      "Brand style guide",
      "Print and digital marketing materials",
      "Vehicle wraps and fleet branding",
      "Website integration",
    ],
    tools: ["Adobe Illustrator", "Adobe Photoshop", "Adobe InDesign"],
    year: "2023",
  },
  {
    id: "osim-lai-brand",
    title: "Osim Lai Brand Identity",
    shortDescription: "Complete brand identity design for a lifestyle company.",
    fullDescription: "I developed a comprehensive brand identity for Osim Lai, a lifestyle company focused on wellness and modern living. The project involved creating a distinctive visual identity that would stand out in the competitive wellness market while conveying sophistication and approachability.",
    fullDescription2: "The brand identity system I created encompasses logo design, color palette development, typography selection, and brand guidelines that ensure consistent application across all touchpoints.",
    fullDescription3: [
      { heading: "Brand Strategy", content: "I began by researching the wellness and lifestyle market to understand current trends and identify opportunities for differentiation. Through stakeholder interviews and competitive analysis, I developed a brand positioning strategy that emphasized authenticity, wellness, and modern sophistication." },
      { heading: "Visual Identity", content: "The logo design features clean, minimalist typography with subtle organic elements that reflect the brand's wellness focus. I selected a sophisticated color palette combining earthy tones with modern accents to create a balanced, contemporary feel that appeals to the target demographic." },
      { heading: "Brand Guidelines", content: "I created comprehensive brand guidelines documenting proper logo usage, color specifications, typography rules, and application examples. These guidelines ensure consistent brand presentation across all media and provide clear direction for future brand extensions." },
      { heading: "Applications", content: "The brand identity was applied across various touchpoints including business cards, letterhead, packaging design, social media templates, and website elements. Each application maintains brand consistency while being optimized for its specific use case." }
    ],
    image: "/assets/projects/3d-graphics/osim-lai-images/osim1.jpg",
    additionalImages: [
      "/assets/projects/3d-graphics/osim-lai-images/osim1.jpg",
      "/assets/projects/3d-graphics/osim-lai-images/osim2.jpg",
      "/assets/projects/3d-graphics/osim-lai-images/osim3.jpg",
      "/assets/projects/3d-graphics/osim-lai-images/osim4.jpg",
      "/assets/projects/3d-graphics/osim-lai-images/osim5.jpg"
    ],
    tags: ["Brand Identity", "Logo Design", "Style Guide"],
    category: "graphics",
    features: [
      "Complete brand identity system",
      "Logo design and variations",
      "Color palette and typography",
      "Brand guidelines document",
      "Marketing collateral templates",
    ],
    tools: ["Adobe Illustrator", "Adobe Photoshop", "Adobe InDesign"],
    year: "2024",
  },
  {
    id: "synnefa-rebrand",
    title: "Synnefa Rebrand & 3D",
    shortDescription: "Complete rebrand and 3D product visualization for technology startup.",
    fullDescription: "I led the complete rebranding of Synnefa, a technology startup focused on innovative IoT solutions. The project involved developing a new visual identity that would position the company as a forward-thinking technology leader while maintaining approachability for their diverse client base.",
    fullDescription2: "In addition to the brand identity work, I created detailed 3D product visualizations for their flagship FarmShield™ device, providing realistic renderings that showcase the product's design and functionality for marketing and investor presentations.",
    fullDescription3: [
      { heading: "Rebranding Challenge", content: "Synnefa needed a complete visual overhaul to reflect their evolution from a startup to an established technology company. The existing brand identity was outdated and didn't effectively communicate their expertise in IoT solutions and agricultural technology." },
      { heading: "Brand Development", content: "I developed a modern, tech-forward brand identity that combines clean typography with dynamic visual elements. The new logo incorporates subtle references to connectivity and growth, reflecting both the company's technology focus and their agricultural applications." },
      { heading: "3D Product Visualization", content: "For the FarmShield™ device, I created highly detailed 3D models and renderings that showcase the product from multiple angles. These visualizations were used in marketing materials, investor presentations, and on the company website to help potential clients understand the product's design and functionality." },
      { heading: "Implementation", content: "The new brand identity was implemented across all company touchpoints including website, marketing materials, product packaging, and trade show displays. The cohesive visual system has helped Synnefa establish a strong market presence and attract new clients and investors." }
    ],
    image: "/assets/projects/3d-graphics/synnefa-images/banner.jpg",
    additionalImages: [],
    gallery: [
      {
        src: '/assets/projects/3d-graphics/synnefa-images/synnefa1.jpg',
        alt: 'Initial brand exploration and concept development'
      },
      {
        src: '/assets/projects/3d-graphics/synnefa-images/synnefa2.jpg',
        alt: 'Logo variations and typography studies'
      },
      {
        src: '/assets/projects/3d-graphics/synnefa-images/synnefa3.jpg',
        alt: 'Color palette development and brand applications'
      },
      {
        src: '/assets/projects/3d-graphics/synnefa-images/synnefa4.jpg',
        alt: 'Final brand identity system and guidelines'
      },
      {
        src: '/assets/projects/3d-graphics/synnefa-images/service3-bg.jpg',
        alt: '3D Product Visualization for FarmShield™ Device'
      }
    ],
    tags: ["Rebranding", "3D Modeling", "Product Visualization"],
    category: "graphics",
    features: [
      "Complete brand identity overhaul",
      "Animated logo and brand elements",
      "3D product modeling and rendering",
      "Marketing material design",
      "Website design integration",
    ],
    tools: ["Adobe Illustrator", "Adobe Photoshop", "Blender", "Adobe After Effects"],
    year: "2024",
  },
];

// All projects combined for search functionality
export const allProjects: ProjectType[] = [
  ...uxProjects,
  ...webProjects,
  ...graphicsProjects,
];

// Export individual project arrays for type safety
export { uxProjects as uxUIProjects };
export { webProjects as webDevProjects };
