import React from "react";
import Icon1 from "../../images/dsgncircles.svg";
import Icon2 from "../../images/logodesign.svg";
import Icon3 from "../../images/onlineart.svg";

import {
  ServicesContainer,
  ServicesH1,
  ServicesWrapper,
  ServicesCard,
  ServicesIcon,
  ServicesH2,
  ServicesP,
} from "./ServicesElements";

const Services = () => {
  return (
    <ServicesContainer id="services">
      <ServicesH1>Our Services</ServicesH1>
      <ServicesWrapper>
        <ServicesCard>
          <ServicesIcon src={Icon1} />
          <ServicesH2>Branding</ServicesH2>
          <ServicesP>We help create ads to help boost your business.</ServicesP>
        </ServicesCard>
        <ServicesCard>
          <ServicesIcon src={Icon2} />
          <ServicesH2>Website Development</ServicesH2>
          <ServicesP>
            We did their business launch and website development
          </ServicesP>
        </ServicesCard>
        <ServicesCard>
          <ServicesIcon src={Icon3} />
          <ServicesH2>3D Graphics Design</ServicesH2>
          <ServicesP>
            We,ve been their main design consultants for two years
          </ServicesP>
        </ServicesCard>
      </ServicesWrapper>
    </ServicesContainer>
  );
};

export default Services;
