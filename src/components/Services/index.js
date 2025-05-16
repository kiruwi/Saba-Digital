// src/components/Services/index.js
import React from "react";
import {
  ServicesContainer,
  ServicesWrapper,
  ServicesCardHover as Card,
  TextOverlay,
  ServicesH2,
  ServicesP,
  Slide,
  serviceBackgrounds,          // ← array of Bg1, Bg2, Bg3
} from "./ServicesElements";
import { Link } from "react-router-dom";


/* card data */
const items = [
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
const Services = () => (
  <ServicesContainer id="services">
    <ServicesWrapper>
      {items.map(({ title, desc, path }, i) => (
        <Link key={title} to={path} style={{ textDecoration: 'none' }}>
          <Card bg={serviceBackgrounds[i]}>
            <TextOverlay>
              <ServicesH2>{title}</ServicesH2>
              <ServicesP>{desc}</ServicesP>
            </TextOverlay>
          </Card>
        </Link>
      ))}
    </ServicesWrapper>
  </ServicesContainer>
);

export default Services;

/* slides for the hero rail (desktop) */
export const ServicesRail = () => (
  <>
    {items.map(({ title, desc, path }, i) => (
      <Slide key={title}>
        <Link to={path} style={{ textDecoration: 'none', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Card bg={serviceBackgrounds[i]}>
            <TextOverlay>
              <ServicesH2>{title}</ServicesH2>
              <ServicesP>{desc}</ServicesP>
            </TextOverlay>
          </Card>
        </Link>
      </Slide>
    ))}
  </>);