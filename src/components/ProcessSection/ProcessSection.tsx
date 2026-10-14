import React from 'react';
import { FaShoppingCart, FaLanguage, FaUniversalAccess, FaCreditCard } from 'react-icons/fa';
import { ProcessContainer, SectionTitle, ProcessStep, StepTitle, StepContent } from './ProcessElements';

const ProcessSection: React.FC = () => (
  <ProcessContainer>
    <SectionTitle>Key Design Decisions</SectionTitle>
    <ProcessStep number="1">
      <StepTitle><FaShoppingCart aria-hidden="true" />A shorter path to ordering</StepTitle>
      <StepContent>
        <p>I brought meal categories, search, and repeat orders onto the home screen so customers
          could start with the task that mattered to them. The design targeted three taps from
          launch to checkout.</p>
      </StepContent>
    </ProcessStep>
    <ProcessStep number="2">
      <StepTitle><FaLanguage aria-hidden="true" />Language choices within reach</StepTitle>
      <StepContent>
        <p>I included an English/Swahili toggle and paired key actions with clear icons.
          The aim was to make navigation easier for customers with different language preferences.</p>
      </StepContent>
    </ProcessStep>
    <ProcessStep number="3">
      <StepTitle><FaUniversalAccess aria-hidden="true" />Readable content and clear controls</StepTitle>
      <StepContent>
        <p>I used stronger contrast, consistent typography, and larger tap targets to make the
          interface easier to read and interact with. Voice search was included as an alternative
          to typing.</p>
      </StepContent>
    </ProcessStep>
    <ProcessStep number="4">
      <StepTitle><FaCreditCard aria-hidden="true" />Flexible checkout</StepTitle>
      <StepContent>
        <p>I prioritised mobile money while retaining cash payment options. Saved preferences
          and repeat ordering were designed to reduce the effort of placing another order.</p>
      </StepContent>
    </ProcessStep>
  </ProcessContainer>
);

export default ProcessSection;
