import React from "react";

import { FaInstagram, FaLinkedin, FaBehance, FaGithub } from "react-icons/fa";
import {
  FooterContainer,
  FooterWrap,
  FooterLinksContainer,
  FooterLinksWrapper,
  FooterLinkItems,
  FooterLinkTitle,
  FooterLink,
  SocialMedia,
  SocialMediaWrap,
  WebsiteRights,
  SocialIcons,
  SocialIconLink,
} from "./FooterElements";

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterWrap>
        <FooterLinksContainer>
          <FooterLinksWrapper>
            <FooterLinkItems>
              <FooterLinkTitle>Nairobi</FooterLinkTitle>
              <FooterLink to="/contact">Kilimani, Naivasha Rd</FooterLink>
              <FooterLink to="/contact">305</FooterLink>
            </FooterLinkItems>
            <FooterLinkItems>
              <FooterLinkTitle>Lets Talk</FooterLinkTitle>
              <FooterLink to="/contact">+254 704 456 165</FooterLink>
              <FooterLink to="/contact">iankcheruiyot@gmail.com</FooterLink>
            </FooterLinkItems>
            <FooterLinkItems>
              <FooterLinkTitle>Explore</FooterLinkTitle>
              <FooterLink to="/work">All Work</FooterLink>
              <FooterLink to="/work/graphics">Branding</FooterLink>
              <FooterLink to="/work/ux-ui">UX/UI Design</FooterLink>
              <FooterLink to="/work/web-dev">Web Development</FooterLink>
            </FooterLinkItems>
            <FooterLinkItems>
              <FooterLinkTitle>Legal</FooterLinkTitle>
              <FooterLink to="/privacy">Privacy Policy</FooterLink>
              <FooterLink to="/cookies">Cookie Policy</FooterLink>
            </FooterLinkItems>
          </FooterLinksWrapper>
        </FooterLinksContainer>

        <SocialMedia>
          <SocialMediaWrap>
            <WebsiteRights>
              Saba Digital © {new Date().getFullYear()} All rights reserved.
            </WebsiteRights>
            <SocialIcons>
              <SocialIconLink
                href="//www.instagram.com/sabadigitl/"
                target="_blank"
                aria-label="Instagram"
              >
                <FaInstagram />
              </SocialIconLink>
              <SocialIconLink
                href="//www.github.com/kiruwi/"
                target="_blank"
                aria-label="Github"
              >
                <FaGithub />
              </SocialIconLink>
              <SocialIconLink
                href="//www.linkedin.com/company/sabadgtl/about/?viewAsMember=true"
                target="_blank"
                aria-label="Linkedin"
              >
                <FaLinkedin />
              </SocialIconLink>
              <SocialIconLink
                href="//www.behance.net/iancheruiyot1"
                target="_blank"
                aria-label="Behance"
              >
                <FaBehance />
              </SocialIconLink>
            </SocialIcons>
          </SocialMediaWrap>
        </SocialMedia>
      </FooterWrap>
    </FooterContainer>
  );
};

export default Footer;
