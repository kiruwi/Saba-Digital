// src/components/ProcessSection/index.js
import React from 'react';
import { FaUsers, FaRocket, FaShoppingCart, FaLanguage, FaUniversalAccess, 
  FaMicrophone, FaHistory, FaCreditCard, FaStarHalfAlt, FaSignInAlt, FaPalette, FaVial } from 'react-icons/fa';
import {
  ProcessContainer,
  SectionTitle,
  ProcessStep,
  StepTitle,
  StepContent
  // eslint-disable-next-line no-unused-vars
  /* Commenting out unused imports rather than removing to preserve structure
  ImageGrid,
  ImageCard,
  ImageCaption,
  BeforeAfterContainer,
  BeforeAfterPanel,
  NextActions
  */
} from './ProcessElements';

// Placeholder for your actual images
// eslint-disable-next-line no-unused-vars
const placeholderImgUrl = 'https://via.placeholder.com/600x400/252525/2db670?text=Process+Image';

const ProcessSection = () => {
  return (
    <ProcessContainer>
      <SectionTitle>Ufanisi Restaurant UX/UI Design Process</SectionTitle>
      
      {/* Step 1: Start with real users */}
      <ProcessStep number="1">
        <StepTitle>
          <FaUsers />
          Start with real users
        </StepTitle>
        <StepContent>
          <p>
            Ran 6 short interviews with Nairobi diners and delivery riders to surface 
            pain points similar to those in the case study: speed, simplicity, language, accessibility.
          </p>
          <p>
            Turned findings into one clear persona and a quick journey map to keep the team focused.
          </p>
        </StepContent>
        {/* 
        <ImageGrid columns={2}>
          <ImageCard>
            <img src={placeholderImgUrl} alt="User interviews" />
            <ImageCaption>User interviews with Nairobi diners and delivery riders</ImageCaption>
          </ImageCard>
          <ImageCard>
            <img src={placeholderImgUrl} alt="Persona and journey map" />
            <ImageCaption>Clear persona and journey map from research findings</ImageCaption>
          </ImageCard>
        </ImageGrid>
        */}
      </ProcessStep>
      
      {/* Step 2: Lean UX loop */}
      <ProcessStep number="2">
        <StepTitle>
          <FaRocket />
          Lean UX loop
        </StepTitle>
        <StepContent>
          <p>
            Framed one hypothesis per sprint, prototyped fast in Figma, tested with at least 
            five users, then tweaked. The two-round study cycle kept design decisions grounded.
          </p>
        </StepContent>
        {/*
        <ImageGrid columns={3}>
          <ImageCard>
            <img src={placeholderImgUrl} alt="Hypothesis framing" />
            <ImageCaption>Sprint hypothesis</ImageCaption>
          </ImageCard>
          <ImageCard>
            <img src={placeholderImgUrl} alt="Figma prototyping" />
            <ImageCaption>Fast Figma prototyping</ImageCaption>
          </ImageCard>
          <ImageCard>
            <img src={placeholderImgUrl} alt="User testing" />
            <ImageCaption>Testing with users</ImageCaption>
          </ImageCard>
        </ImageGrid>
        */}
      </ProcessStep>
      
      {/* Step 3: Faster ordering flow */}
      <ProcessStep number="3">
        <StepTitle>
          <FaShoppingCart />
          Faster ordering flow
        </StepTitle>
        <StepContent>
          <p>
            Default home screen: top categories, search bar, "order again" tiles.
            Targeted three taps from launch to checkout; hungry users have limited attention.
          </p>
        </StepContent>
        {/*
        <BeforeAfterContainer>
          <BeforeAfterPanel label="BEFORE">
            <img src={placeholderImgUrl} alt="Before: Complex ordering flow" />
          </BeforeAfterPanel>
          <BeforeAfterPanel label="AFTER" labelBg="#2db670">
            <img src={placeholderImgUrl} alt="After: Streamlined ordering flow" />
          </BeforeAfterPanel>
        </BeforeAfterContainer>
        */}
      </ProcessStep>
      
      {/* Step 4: Language & icon support */}
      <ProcessStep number="4">
        <StepTitle>
          <FaLanguage />
          Language & icon support
        </StepTitle>
        <StepContent>
          <p>
            Added a Swahili toggle and used clear icons so text-heavy screens 
            don't block non-English speakers.
          </p>
        </StepContent>
        {/*
        <ImageGrid columns={2}>
          <ImageCard>
            <img src={placeholderImgUrl} alt="Language toggle" />
            <ImageCaption>Swahili language toggle implementation</ImageCaption>
          </ImageCard>
          <ImageCard>
            <img src={placeholderImgUrl} alt="Icon system" />
            <ImageCaption>Clear icon system to reduce language dependency</ImageCaption>
          </ImageCard>
        </ImageGrid>
        */}
      </ProcessStep>
      
      {/* Step 5: Accessibility by default */}
      <ProcessStep number="5">
        <StepTitle>
          <FaUniversalAccess />
          Accessibility by default
        </StepTitle>
        <StepContent>
          <p>
            High-contrast palette, 48 px minimum tap targets, alt text for images, 
            & voice-over labels, mirrors the case study's inclusive guidelines.
          </p>
        </StepContent>
        {/*
        <ImageGrid columns={2}>
          <ImageCard>
            <img src={placeholderImgUrl} alt="High-contrast palette" />
            <ImageCaption>High-contrast color palette</ImageCaption>
          </ImageCard>
          <ImageCard>
            <img src={placeholderImgUrl} alt="Accessibility features" />
            <ImageCaption>Accessible tap targets and voice-over labels</ImageCaption>
          </ImageCard>
        </ImageGrid>
        */}
      </ProcessStep>
      
      {/* Step 6: Speak-to-search */}
      <ProcessStep number="6">
        <StepTitle>
          <FaMicrophone />
          Speak-to-search
        </StepTitle>
        <StepContent>
          <p>
            Quick microphone search cuts typing on the go, matching the article's voice feature.
          </p>
        </StepContent>
        {/*
        <ImageGrid columns={1}>
          <ImageCard>
            <img src={placeholderImgUrl} alt="Voice search" />
            <ImageCaption>Voice search implementation for on-the-go ordering</ImageCaption>
          </ImageCard>
        </ImageGrid>
        */}
      </ProcessStep>
      
      {/* Step 7: Remember-me shortcut */}
      <ProcessStep number="7">
        <StepTitle>
          <FaHistory />
          Remember-me shortcut
        </StepTitle>
        <StepContent>
          <p>
            Keep returning customers in the flow with saved address, card, and "repeat last order" 
            button — a direct win noted in the second usability round.
          </p>
        </StepContent>
        {/*
        <ImageGrid columns={2}>
          <ImageCard>
            <img src={placeholderImgUrl} alt="Customer profiles" />
            <ImageCaption>Saved customer profiles</ImageCaption>
          </ImageCard>
          <ImageCard>
            <img src={placeholderImgUrl} alt="Repeat order" />
            <ImageCaption>"Repeat last order" functionality</ImageCaption>
          </ImageCard>
        </ImageGrid>
        */}
      </ProcessStep>
      
      {/* Step 8: Payment flexibility */}
      <ProcessStep number="8">
        <StepTitle>
          <FaCreditCard />
          Payment flexibility
        </StepTitle>
        <StepContent>
          <p>
            Showed mobile-money first, but left "pay on delivery/pick-up" for users 
            who prefer cash, echoing two interviewees' request.
          </p>
        </StepContent>
        {/*
        <ImageGrid columns={1}>
          <ImageCard>
            <img src={placeholderImgUrl} alt="Payment options" />
            <ImageCaption>Flexible payment options</ImageCaption>
          </ImageCard>
        </ImageGrid>
        */}
      </ProcessStep>
      
      {/* Step 9: Smart upsells */}
      <ProcessStep number="9">
        <StepTitle>
          <FaStarHalfAlt />
          Smart upsells
        </StepTitle>
        <StepContent>
          <p>
            On the dish details screen, surfaced sides or drinks often bought together 
            to lift average basket value without clutter.
          </p>
          <p>
            Ratings and short reviews directly under each item; no extra tap required.
          </p>
        </StepContent>
        {/*
        <ImageGrid columns={2}>
          <ImageCard>
            <img src={placeholderImgUrl} alt="Smart upsells" />
            <ImageCaption>Smart upsell suggestions</ImageCaption>
          </ImageCard>
          <ImageCard>
            <img src={placeholderImgUrl} alt="Social proof" />
            <ImageCaption>Integrated ratings and reviews</ImageCaption>
          </ImageCard>
        </ImageGrid>
        */}
      </ProcessStep>
      
      {/* Step 10: Onboarding that respects time */}
      <ProcessStep number="10">
        <StepTitle>
          <FaSignInAlt />
          Onboarding that respects time
        </StepTitle>
        <StepContent>
          <p>
            Skipped splash animations; used one permission screen and dropped users 
            straight into browsing, mirroring the "no-gimmick" flow.
          </p>
        </StepContent>
        {/*
        <BeforeAfterContainer>
          <BeforeAfterPanel label="BEFORE">
            <img src={placeholderImgUrl} alt="Before: Complex onboarding" />
          </BeforeAfterPanel>
          <BeforeAfterPanel label="AFTER" labelBg="#2db670">
            <img src={placeholderImgUrl} alt="After: Streamlined onboarding" />
          </BeforeAfterPanel>
        </BeforeAfterContainer>
        */}
      </ProcessStep>
      
      {/* Step 11: Hand-off discipline */}
      <ProcessStep number="11">
        <StepTitle>
          <FaPalette />
          Hand-off discipline
        </StepTitle>
        <StepContent>
          <p>
            Maintained a living style guide in Figma with tokens for colour, type, spacing; 
            devs can build faster, as highlighted in the study's final step.
          </p>
        </StepContent>
        {/*
        <ImageGrid columns={1}>
          <ImageCard>
            <img src={placeholderImgUrl} alt="Style guide" />
            <ImageCaption>Living style guide with design tokens</ImageCaption>
          </ImageCard>
        </ImageGrid>
        */}
      </ProcessStep>
      
      {/* Step 12: Continuous testing */}
      <ProcessStep number="12">
        <StepTitle>
          <FaVial />
          Continuous testing
        </StepTitle>
        <StepContent>
          <p>
            Ran quick hallway tests every sprint. Aimed for ten design iterations 
            before first release; the case study landed at about that number.
          </p>
        </StepContent>
        {/*
        <ImageGrid columns={2}>
          <ImageCard>
            <img src={placeholderImgUrl} alt="Hallway testing" />
            <ImageCaption>Sprint hallway testing</ImageCaption>
          </ImageCard>
          <ImageCard>
            <img src={placeholderImgUrl} alt="Iteration timeline" />
            <ImageCaption>Design iterations timeline</ImageCaption>
          </ImageCard>
        </ImageGrid>
        */}
      </ProcessStep>
      
      
    </ProcessContainer>
  );
};

export default ProcessSection;
