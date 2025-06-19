// src/data/projects.js
import uxImage1 from "../assets/projects/ux-ui/u-r.jpg";
import webImage from "../assets/projects/web-dev/app1.jpg";

// UX/UI Projects
export const uxProjects = [
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
export const webProjects = [
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

export const graphicsProjects = [
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
      "Vehicle wrap designs",
      "Print and digital advertising materials",
      "Social media graphics package",
      "Brand guidelines document",
      "Billboard and large format designs"
    ],
    tools: ["Adobe Illustrator", "Adobe Photoshop"],
    year: "2023",
  },
  {
    id: "synnefa-rebrand",
    title: "Synnefa Rebrand & Brand Identity",
    shortDescription: "Complete rebrand and brand identity development for an AgriTech innovator in Africa.",
    fullDescription: "I worked with Synnefa, a company that builds hardware and software tools for farmers in Africa, to revitalize their brand identity and create compelling 3D visualizations of their flagship FarmShield™ product. This comprehensive project involved both rebranding elements and detailed 3D modeling that would effectively communicate their agricultural technology solutions.",
    fullDescription2: "For the FarmShield™ product, the 'brain of the farm' that monitors conditions and automates farming processes, I created photorealistic 3D renderings that showcase its functionality and design. These visualizations help farmers understand how the technology integrates into their operations, visualizing the physical product before potential purchase.",
    fullDescription3: [
      { heading: "The Rebrand", content: "The rebranding aspect focused on creating a visual identity that conveyed Synnefa's mission of 'making complex farming feel simple.' I developed a modern, clean logo design that incorporates agricultural symbolism while maintaining a tech-forward appearance. The color palette was carefully selected to reflect growth, technology, and reliability, key values for their farmer audience." },
      { heading: "3D Product Visualization", content: "For the FarmShield™ device, I created detailed 3D models based on the engineering specifications, showing how the system connects with their proprietary FarmSpears sensors to monitor soil conditions, temperature, and humidity. The 3D renders demonstrate how the device serves as the central hub for farm automation, with visualizations of data flow and automated responses to changing farm conditions." },
      { heading: "Impact", content: "The new brand assets and 3D visualizations have been instrumental in Synnefa's marketing efforts, particularly for their expansion across Africa. The visual materials helped farmers understand complex technology in an accessible way, supporting Synnefa's mission to make agricultural technology more approachable to smallholder farmers." }
    ],
    image: "/assets/projects/3d-graphics/synnefa-images/banner.jpg",
    additionalImages: [
      "/assets/projects/3d-graphics/synnefa-images/mind-map.jpg",
      "/assets/projects/3d-graphics/synnefa-images/mood-board.jpg",
      "/assets/projects/3d-graphics/synnefa-images/design-process.jpg",
      "/assets/projects/3d-graphics/synnefa-images/logo-variations.jpg",
      "/assets/projects/3d-graphics/synnefa-images/synnefa-logo.jpg"
    ],
    tags: ["Brand Identity", "Corporate Identity", "Product Visualization"],
    category: "graphics",
    features: [
      "Complete logo redesign and brand guidelines",
      "Photorealistic 3D visualization of FarmShield™ device",
      "Animated data flow demonstrations",
      "Integration diagrams with farm systems",
      "Marketing collateral for agricultural exhibitions",
      "Web-optimized 3D assets"
    ],
    tools: ["Blender", "Adobe Illustrator", "Adobe Photoshop", "Cinema 4D"],
    year: "2023",
  },
  {
    id: "osim-lai-branding",
    title: "Osim Lai Brand Identity",
    shortDescription: "Complete logo design and brand identity for a hospitality brand on Lake Naivasha.",
    fullDescription: "Osim Lai, a hospitality brand located on Lake Naivasha, tasked me with the responsibility to create their logo and brand identity on June 18, 2022. This project encompassed developing a complete visual identity system including logo design, typography selection, color palette development, and marketing collateral.",
    fullDescription2: "I went with the idea that the logo for 'Osim Lai' should be simple and elegant. It needed to be easy to read, recognizable, and feature colors that would be warm and inviting. For their logo, I developed an all-uppercase design with clean and iconic typography combined with a distinctive symbol.",
    fullDescription3: [
      { heading: "Logo Development", content: "The design process began with extensive research into hospitality branding and the specific context of Lake Naivasha's natural environment. I explored multiple concepts that would reflect both elegance and the natural beauty of the location. The final logo utilizes carefully balanced typography with a minimal yet distinctive mark that provides instant brand recognition." },
      { heading: "Color Strategy", content: "The color palette was carefully selected to evoke the warm, inviting atmosphere of the hospitality brand while subtly referencing the natural tones found around Lake Naivasha. The primary colors establish a sophisticated foundation, while secondary accent colors provide versatility across different applications and marketing materials." },
      { heading: "Brand Applications", content: "Beyond the core logo and color system, I created a comprehensive set of brand applications including stationery, signage mockups, digital assets, and marketing materials. Each application was designed to maintain brand consistency while adapting to the specific requirements of different media and contexts." }
    ],
    image: "/assets/projects/3d-graphics/osim-lai-images/logo-page2x-100.jpg",
    additionalImages: [
      "/assets/projects/3d-graphics/osim-lai-images/logo-design2x-100.jpg",
      "/assets/projects/3d-graphics/osim-lai-images/Font-type2x-100.jpg",
      "/assets/projects/3d-graphics/osim-lai-images/color-and-mockup.2x-100.jpg",
      "/assets/projects/3d-graphics/osim-lai-images/assets2x-100.jpg",
      "/assets/projects/3d-graphics/osim-lai-images/mockup2x-100.jpg"
    ],
    tags: ["Logo Design", "Brand Identity", "Hospitality Branding"],
    category: "graphics",
    features: [
      "Custom logo design",
      "Complete typography system",
      "Comprehensive color palette",
      "Marketing collateral design",
      "Brand guidelines document",
      "Digital and print applications"
    ],
    tools: ["Adobe Illustrator", "Adobe Photoshop"],
    year: "2022",
  }
];
