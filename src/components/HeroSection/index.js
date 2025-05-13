import React, { useState } from "react";
import Video from "../../videos/video.mp4";
import meImage from "../../images/me.png";
import { Button } from "../ButtonElements";

import {
  HeroContainer,
  HeroBg,
  VideoBg,
  HeroContent,
  HeroWrapper,
  HeroText,
  TitleBackground,
  HeroTitleTop,
  HeroTitleBottom,
  HeroImage,
  HeroBtnWrapper,
  ArrowForward,
  ArrowRight,
} from "./HeroElements";

const HeroSection = () => {
  const [hover, setHover] = useState(false);
  const [titleHover, setTitleHover] = useState(false);

  return (
    <HeroContainer>
      <HeroBg>
        <VideoBg
          autoPlay
          loop
          muted
          playsInline
          src={Video}
          type="video/mp4"
        />
      </HeroBg>

      <HeroContent>
        <HeroWrapper>
          <HeroText>
            <TitleBackground
              onMouseEnter={() => setTitleHover(true)}
              onMouseLeave={() => setTitleHover(false)}
            >
              <HeroTitleTop>
                Currently a product designer at Square.
              </HeroTitleTop>
              <HeroTitleBottom>
                Living in Nairobi, designing features for Square Banking that empower sellers.
              </HeroTitleBottom>
            </TitleBackground>
          </HeroText>

          <HeroImage src={meImage} alt="Ian Cheruiyot" />
        </HeroWrapper>

        <HeroBtnWrapper visible={titleHover}>
          <Button
            to="services"
            primary="true"
            dark="true"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            View Services {hover ? <ArrowForward /> : <ArrowRight />}
          </Button>
        </HeroBtnWrapper>
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroSection;
