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
import { FaArrowRight } from "react-icons/fa";
import { useTheme } from "../../contexts/ThemeContext";

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
    desc: "Creating user‑friendly and visually appealing interfaces.",
    path: "/work/ux-ui"
  },
  {
    title: "Website Development",
    desc: "Mocking up and developing websites for our clients.",
    path: "/work/web-dev"
  },
  {
    title: "3D / Graphics Design",
    desc: "Creating visually stunning and engaging graphics.",
    path: "/work/graphics"
  },
];

/* full‑width section (phones / other pages) */
const Services: React.FC = () => {
  // Get theme from context
  const { theme } = useTheme();
  
  return (
    <ServicesContainer id="services">
      <ServicesWrapper>
        {items.map(({ title, desc, path }, i) => (
          <Link key={title} to={path} style={{ textDecoration: 'none' }}>
            <Card bg={serviceBackgrounds[i]}>
              <TextOverlay>
                <ServicesH2>{title}</ServicesH2>
                <ServicesP>{desc}</ServicesP>
                <LearnMoreButton>
                  Learn More <FaArrowRight />
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
  // Get theme from context
  const { theme } = useTheme();
  
  return (
    <>
      {items.map(({ title, desc, path }, i) => (
        <Slide key={title}>
          <Link to={path} style={{ textDecoration: 'none', width: '100%', height: '100%' }}>
            <Card bg={serviceBackgrounds[i]}>
              <TextOverlay>
                <ServicesH2>{title}</ServicesH2>
                <ServicesP>{desc}</ServicesP>
                <LearnMoreButton>
                  Learn More <FaArrowRight />
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
