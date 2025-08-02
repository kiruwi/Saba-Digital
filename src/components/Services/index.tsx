// src/components/Services/index.tsx
import React from "react";
import {
  ServicesContainer,
  ServicesWrapper,
  ServicesCardHover as Card,
  TextOverlay,
  ServicesH2,
  ServicesP,
  Slide,
  serviceBackgrounds,
  LearnMoreButton
} from "./ServicesElements";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";

// Define the services data structure
interface ServiceItem {
  title: string;
  desc: string;
  path: string;
}

/* card data */
const items: ServiceItem[] = [
  {
    title: "Product Design",
    desc: "Creating user-friendly and visually appealing interfaces.",
    path: "/work/ux-ui"
  },
  {
    title: "Website Development",
    desc: "Mocking up and developing websites for our clients.",
    path: "/work/web-dev"
  },
  {
    title: "Branding",
    desc: "Creating visually stunning and engaging brand identities.",
    path: "/work/graphics"
  },
  {
    title: "Ad Design",
    desc: "Crafting compelling and effective advertising materials.",
    path: "/work/ad-design"
  },
  {
    title: "Motion Graphics",
    desc: "Creating dynamic and engaging animated visual content.",
    path: "/work/motion"
  }
];

/* full‑width section (phones / other pages) */
const Services: React.FC = () => {
  // Theme context available but not needed in this component
  
  // hide entire section on mobile (hero overlay shows cards)
  if (typeof window !== 'undefined' && window.innerWidth <= 1000) {
    return null;
  }
  

  return (
    <ServicesContainer id="services">
      <ServicesWrapper>
        {items.map(({ title, desc, path }, i) => (
          <Link key={title} to={path} style={{ textDecoration: 'none', width: '100%' }}>
            <Card bg={serviceBackgrounds[i]} role="button" tabIndex={0}>
              <TextOverlay>
                <ServicesH2>{title}</ServicesH2>
                <ServicesP>{desc}</ServicesP>
                <LearnMoreButton aria-label={`Learn more about ${title}`} role="button">
                  Learn More <FiArrowUpRight aria-hidden="true" />
                </LearnMoreButton>
              </TextOverlay>
            </Card>
          </Link>
        ))}
      </ServicesWrapper>
    </ServicesContainer>
  );
};

/* individual service slides for the hero rail */
export const ServicesRail: React.FC = () => {
  // Theme context available but not needed in this component
  
  return (
    <>
      {items.map(({ title, desc, path }, i) => (
        <Slide key={title}>
          <Link to={path} style={{ textDecoration: 'none', width: '100%', height: '100%' }}>
            <Card bg={serviceBackgrounds[i]}>
              <TextOverlay>
                <ServicesH2>{title}</ServicesH2>
                <ServicesP>{desc}</ServicesP>
                <LearnMoreButton aria-label={`Learn more about ${title}`} role="button">
                  Learn More <FiArrowUpRight aria-hidden="true" />
                </LearnMoreButton>
              </TextOverlay>
            </Card>
          </Link>
        </Slide>
      ))}
    </>
  );
};

export default Services;
