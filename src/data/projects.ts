// src/data/projects.ts - Updated Ufanisi Resort content
import uxImage1 from "../assets/projects/ux-ui/u-r.jpg";
import webImage from "../assets/projects/web-dev/app1.jpg";
import mutaiImage from "../images/service2-bg.jpg";

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
      "User-focused interface for food delivery app in Kisii, Kenya.",
    fullDescription:
      "Ufanisi Resort Food Delivery App",
    fullDescription2:
      "This case study documents my complete design process, from initial research and identifying pain points to creating wireframes, prototypes, and the final polished interface.",
    fullDescription3: [
      { heading: "Project Overview", content: "As a self-proclaimed foodie, I'm naturally drawn to food-related topics. For my first Google UX Design Certificate project, I chose to redesign the Ufanisi Resort food delivery app, transforming it from a problematic interface to an intuitive, user-friendly experience for busy residents of Kisii, Kenya." },
      { heading: "The Challenge", content: "In today's fast-paced world, many people struggle to find time to cook or visit restaurants. I set out to solve this everyday problem: how can busy people in Kisii get delicious food from Ufanisi Resort without disrupting their packed schedules?" },
      { heading: "My Design Process", content: "1. User Research - Conducted interviews and surveys to understand user needs and pain points\n2. Competitive Analysis - Studied existing food delivery apps to identify best practices and opportunities\n3. Information Architecture - Created logical flow and navigation structure\n4. Wireframing - Developed low-fidelity designs to test core functionality\n5. Prototyping - Built interactive prototypes for user testing\n6. Usability Testing - Gathered feedback from real users to refine the design\n7. Visual Design - Applied brand identity and visual elements to create the final UI" },
      { heading: "My Role", content: "As the lead UX Designer on this project, I was responsible for the entire design process from research to final UI. I conducted user interviews, created wireframes and prototypes, ran usability tests, and developed the visual design system that aligned with Ufanisi Resort's brand identity." },
      { heading: "Previous Design Issues", content: "As seen above, my previous design suffered from several fundamental UX problems that negatively impacted user experience. Typography was inconsistent throughout the interface, with mixed font that had no clear purpose or hierarchy. I had used multiple font types and weights seemingly at random, creating visual confusion. Spacing was poorly implemented, with elements either crammed together or floating in excessive whitespace. Almost everything was rigidly centered on the page, ignoring natural reading patterns and creating an unbalanced layout. Most importantly, many design elements weren't user-friendly, buttons were difficult to identify, interactive elements lacked proper affordances, and the navigation was unintuitive, forcing users to hunt for basic functions. This second project served as a refresher and opportunity to implement proper UX principles." }
    ],
    image: uxImage1,
    tags: ["UI Design", "User Research", "Prototyping", "Usability Testing"],
    category: "uxui",
    features: [
      "Streamlined 3-tap ordering process",
      "Multi-language support (English & Swahili)",
      "Voice search capabilities",
      "Saved preferences & quick reordering",
      "Payment flexibility (mobile money & cash)",
      "High-contrast accessibility design",
      "Smart upsell recommendations",
      "Real-time order tracking"
    ],
    tools: ["Figma", "Adobe XD", "Maze", "Miro", "Google Forms"],
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
  {
    id: "mutai-enterprises",
    title: "Mutai Enterprises Limited",
    shortDescription: "Freight forwarding & logistics solutions website for a Kenyan transport company.",
    fullDescription: "Mutai Enterprises Limited entrusted me to design and develop a modern website that showcases their freight forwarding, bulk transport and logistics services across Kenya and Uganda. The site emphasises their trusted reputation built since 1970, provides clear CTAs for quote requests, and highlights key service corridors such as Nairobi – Mombasa – Kampala.",
    fullDescription2: "Built with Next.js and React, styled using Tailwind CSS, and deployed on Vercel’s edge network. The project uses Webpack for efficient bundling, implements Priority Hints, and integrates Google Analytics & Google Tag Manager for insights—all contributing to 90+ Lighthouse performance scores and strong SEO.",
    image: "/images/m2.png",
    additionalImages: [mutaiImage],
    tags: ["Next.js", "Tailwind CSS", "React", "Vercel"],
    category: "webdev",
    features: [
      "Responsive UI across devices",
      "Service-specific landing pages",
      "Embedded quote request forms",
      "SEO-optimised metadata & JSON-LD",
      "Performance-optimised images & lazy loading"
    ],
    tools: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Vercel",
      "Webpack",
      "Google Analytics",
      "Google Tag Manager"
    ],
    year: "2025",
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
    id: "osim-lai-branding",
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
    image: "/assets/projects/3d-graphics/osim-lai-images/logo-page2x-100.jpg",
    additionalImages: [
      "/assets/projects/3d-graphics/osim-lai-images/logo-page2x-100.jpg",
      "/assets/projects/3d-graphics/osim-lai-images/logo-design2x-100.jpg",
      "/assets/projects/3d-graphics/osim-lai-images/color-and-mockup.2x-100.jpg",
      "/assets/projects/3d-graphics/osim-lai-images/Font-type2x-100.jpg",
      "/assets/projects/3d-graphics/osim-lai-images/assets2x-100.jpg",
      "/assets/projects/3d-graphics/osim-lai-images/mockup2x-100.jpg"
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
    fullDescription: "",
    fullDescription2: "",
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
        src: '/assets/projects/3d-graphics/synnefa-images/mind-map.jpg',
        alt: 'Brief & Brand Concept Mind Map'
      },
      {
        src: '/assets/projects/3d-graphics/synnefa-images/mood-board.jpg',
        alt: 'Mood Board and Visual Direction'
      },
      {
        src: '/assets/projects/3d-graphics/synnefa-images/design-process.jpg',
        alt: 'Design Process and Development'
      },
      {
        src: '/assets/projects/3d-graphics/synnefa-images/logo-variations.jpg',
        alt: 'Logo Variations and Style Exploration'
      },
      {
        src: '/assets/projects/3d-graphics/synnefa-images/synnefa-logo.jpg',
        alt: 'Final Synnefa Logo Design'
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
