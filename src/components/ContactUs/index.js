import React, { useState } from "react";
import emailjs, { init } from "emailjs-com";

import {
  Container,
  Form,
  FormButton,
  FormContent,
  FormH1,
  FormWrap,
  Icon,
  FormInput,
  FormLabel,
  BackButton,          // new
} from "./ContactElements";

init("user_bnH34jSZHmD6H4Xw9PyyF");

const Result = () => <p>Your message has been sent</p>;

function ContactUs() {
  const [result, showResult] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("smpt", "72.sabaEmail.19", e.target, "user_bnH34jSZHmD6H4Xw9PyyF")
      .then(
        (res) => console.log(res.text),
        (err) => console.log(err.text)
      );

    e.target.reset();
    showResult(true);

    /* hide notice after 5 s */
    setTimeout(() => showResult(false), 5000);
  };

  return (
    <Container>
      <BackButton to="/#hero">← Back to hero</BackButton>

      <FormWrap>
        <Icon to="/">
          <img src={require("../../images/logo.png").default} alt="logo" />
        </Icon>

        <FormContent>
          <Form onSubmit={sendEmail}>
            <FormH1>
              Got a project you’d like to team up on? Drop your info or reach out directly and let’s start the
              conversation!
            </FormH1>

            <FormInput type="text" name="Subject" placeholder="Subject" required />
            <FormInput type="text" name="Name" placeholder="Name" required />
            <FormInput type="email" name="Email" placeholder="Email" required />
            <FormInput type="text" name="Message" placeholder="Message" required />

            <FormButton type="submit">Continue</FormButton>

            <FormLabel>{result && <Result />}</FormLabel>
          </Form>
        </FormContent>
      </FormWrap>
    </Container>
  );
}

export default ContactUs;
