import React from "react";
import styled from "styled-components";

// Create a button styled like FooterLink
const EmailButton = styled.button`
  color: #fff;
  text-decoration: none;
  margin-bottom: 0.5rem;
  font-size: 14px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-family: inherit;
  padding: 0;
  
  &:hover {
    color: #2db670;
    transition: 0.3s ease-out;
  }
`;

/**
 * Renders a mail link without exposing the actual e-mail address in the HTML markup.
 * The address is split into parts and assembled only when the user clicks, which
 * defeats simple scraping extensions that parse the DOM for e-mail patterns.
 */
const EmailLink: React.FC = () => {
  const handleClick = (): void => {
    const user = "iankcheruiyot";
    const domain = "gmail.com";
    window.location.href = `mailto:${user}@${domain}`;
  };

  return (
    <EmailButton onClick={handleClick} type="button">
      Email&nbsp;me
    </EmailButton>
  );
};

export default EmailLink;
