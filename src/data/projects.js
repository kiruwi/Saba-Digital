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
      "Food is essential to our well-being. And for some of us, eating is more than just a way to stave off hunger. It's a hobby. As a self-proclaimed foodie, I'm naturally drawn to topics that are food-related. So when it came to choosing my first project for the Google UX Design Certificate, I had to jump on this one.",
    fullDescription2:
      "This is the second paragraph where you can add more details about your project. You can describe the research process, design decisions, and outcomes of your UX/UI work on the Ufanisi Resort project.",
    image: uxImage1,
    tags: ["UI Design", "User Research", "Prototyping"],
    category: "uxui",
    features: [
      "Personalized health dashboard",
      "Intuitive data visualization",
      "Cross-platform experience",
      "Accessibility-focused design",
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
  // This placeholder ensures the graphics page loads correctly
  // You can add actual graphics projects here in the future
  // Make sure to use 'graphics' as the category
];
