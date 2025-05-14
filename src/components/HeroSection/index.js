// src/components/HeroSection/index.js
import React, { useState, useEffect, useRef } from "react";
import meImage from "../../images/me.png";
import { Button } from "../ButtonElements";

/* Services */
import { ServicesRail } from "../Services"; // Slide is the full‑height wrapper
import { Slide } from "../Services/ServicesElements";
/* styled parts */
import {
  HeroContainer,
  HeroBg,
  HeroText,
  TitleBackground,
  HeroTitleTop,
  HeroTitleBottom,
  HeroRight,
  Rail,
  MobileImg,
  DesktopImg,
  BtnWrap,
  ArrowFwd,
  ArrowRt,
  ScrollIndicatorWrapper,
  ScrollText,
  ScrollArrow,
} from "./HeroElements";

const HeroSection = () => {
  const [hover, setHover] = useState(false);
  const [scrollIndicatorVisible, setScrollIndicatorVisible] = useState(true);
  const railRef = useRef(null);
  const hasScrolled = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (railRef.current) {
        // Check if we're at the top of the rail
        const atTop = railRef.current.scrollTop < 50;
        
        // If we haven't scrolled yet or we're back at the top
        if (!hasScrolled.current || atTop) {
          setScrollIndicatorVisible(true);
        } else {
          setScrollIndicatorVisible(false);
        }
        
        // Mark that we've scrolled
        if (railRef.current.scrollTop > 50 && !hasScrolled.current) {
          hasScrolled.current = true;
        }
      }
    };

    const railElement = railRef.current;
    if (railElement) {
      railElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (railElement) {
        railElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <HeroContainer id="home">
      <HeroBg />

      {/* left column */}
      <HeroText>
        <TitleBackground>
          <HeroTitleTop>
            Currently a product designer at Saba Digital.
          </HeroTitleTop>
          <HeroTitleBottom>
            Living in Nairobi, designing features for Saba Digital that empower
            sellers.
          </HeroTitleBottom>
        </TitleBackground>

        <BtnWrap>
          <Button
            to="services"
            primary="true"
            dark="true"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            View Services {hover ? <ArrowFwd /> : <ArrowRt />}
          </Button>
        </BtnWrap>
      </HeroText>

      {/* right rail */}
      <HeroRight>
        <Rail ref={railRef}>
          {/* first slide = profile image */}
          <Slide>
            <DesktopImg src={meImage} alt="Ian Cheruiyot" />
            <ScrollIndicatorWrapper visible={scrollIndicatorVisible}>
              <ScrollText>Scroll Down</ScrollText>
              <ScrollArrow />
            </ScrollIndicatorWrapper>
          </Slide>

          {/* next slides = service cards */}
          <ServicesRail />
        </Rail>
      </HeroRight>

      {/* mobile photo */}
      <MobileImg src={meImage} alt="Ian Cheruiyot" />
    </HeroContainer>
  );
};

export default HeroSection;
