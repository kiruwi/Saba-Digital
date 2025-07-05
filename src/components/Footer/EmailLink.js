import React from "react";
import { FooterLink } from "./FooterElements";

/**
 * Renders a mail link without exposing the actual e-mail address in the HTML markup.
 * The address is split into parts and assembled only when the user clicks, which
 * defeats simple scraping extensions that parse the DOM for e-mail patterns.
 */
function EmailLink() {
  const handleClick = () => {
    const user = "iankcheruiyot";
    const domain = "gmail.com";
    window.location.href = `mailto:${user}@${domain}`;
  };

  return (
    <FooterLink as="button" onClick={handleClick} type="button">
      Email&nbsp;me
    </FooterLink>
  );
}

export default EmailLink;
