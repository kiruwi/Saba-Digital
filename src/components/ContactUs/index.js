import React, { useState } from "react";
import emailjs, { init } from "emailjs-com";

import {
  Container,
  Form,
  FormButton,
  FormContent,
  FormH1,
  FormWrap,
  FormInput,
  FormLabel,
} from "./ContactElements";

init("user_bnH34jSZHmD6H4Xw9PyyF");

const Result = () => <p>Your message has been successfully sent! I'll get back to you soon.</p>;

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
      <FormWrap>

        <FormContent>
          <Form onSubmit={sendEmail}>
            <FormH1>
              Got a project you’d like to team up on? Drop your info or reach out directly and let’s start the
              conversation!
            </FormH1>

            <FormInput type="text" name="Name" placeholder="Your Name" required />
            <FormInput type="email" name="Email" placeholder="Your Email" required />
            <FormInput type="text" name="Subject" placeholder="Subject" required />
            <FormInput 
              as="textarea" 
              name="Message" 
              placeholder="Your Message" 
              required 
              style={{ 
                minHeight: '120px', 
                resize: 'vertical', 
                marginBottom: '30px',
                padding: '16px'
              }} 
            />

            <FormButton type="submit">Continue</FormButton>

            <FormLabel>{result && <Result />}</FormLabel>
          </Form>
        </FormContent>
      </FormWrap>
    </Container>
  );
}

export default ContactUs;
