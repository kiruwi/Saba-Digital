// src/components/Services/index.js
import React from "react";

import {
  ServicesContainer,
  ServicesWrapper,
  ServicesCardHover as ServicesCard,
  TextOverlay,
  ServicesH2,
  ServicesP,
} from "./ServicesElements";

const Services = () => (
  <ServicesContainer id="services">
    <ServicesWrapper>
      {/* Card 1 */}
      <ServicesCard>
        <TextOverlay>
          <ServicesH2>Branding</ServicesH2>
          <ServicesP>We help create ads to help boost your business.</ServicesP>
        </TextOverlay>
      </ServicesCard>

      {/* Card 2 */}
      <ServicesCard>
        <TextOverlay>
          <ServicesH2>Website Development</ServicesH2>
          <ServicesP>We design and develop websites for our clients.</ServicesP>
        </TextOverlay>
      </ServicesCard>

      {/* Card 3 */}
      <ServicesCard>
        <TextOverlay>
          <ServicesH2>3D Graphics Design</ServicesH2>
          <ServicesP>We’ve been designing for 10 years.</ServicesP>
        </TextOverlay>
      </ServicesCard>
    </ServicesWrapper>
  </ServicesContainer>
);

export default Services;
