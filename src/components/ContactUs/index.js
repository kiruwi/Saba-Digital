import React, { useState } from "react";

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

const Result = () => <p>Your message has been successfully sent! I'll get back to you soon.</p>;

function ContactUs() {
  const [result, showResult] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name.toLowerCase()]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form is handled by Netlify, this is just for UX feedback
    showResult(true);
    e.target.reset();
    setFormState({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
    
    /* hide notice after 5 s */
    setTimeout(() => showResult(false), 5000);
  };

  return (
    <Container>
      <FormWrap>

        <FormContent>
          <Form 
            name="contact" 
            method="POST" 
            data-netlify="true" 
            netlify-honeypot="bot-field" 
            onSubmit={handleSubmit}
          >
            {/* Hidden fields needed for Netlify Forms */}
            <input type="hidden" name="form-name" value="contact" />
            <input type="hidden" name="bot-field" />
            <FormH1>
              Got a project you’d like to team up on? Drop your info or reach out directly and let’s start the
              conversation!
            </FormH1>

            <FormInput 
              type="text" 
              name="name" 
              placeholder="Your Name" 
              required 
              onChange={handleChange}
              value={formState.name}
            />
            <FormInput 
              type="email" 
              name="email" 
              placeholder="Your Email" 
              required 
              onChange={handleChange}
              value={formState.email}
            />
            <FormInput 
              type="text" 
              name="subject" 
              placeholder="Subject" 
              required 
              onChange={handleChange}
              value={formState.subject}
            />
            <FormInput 
              as="textarea" 
              name="message" 
              placeholder="Your Message" 
              required 
              style={{ 
                minHeight: '120px', 
                resize: 'vertical', 
                marginBottom: '30px',
                padding: '16px'
              }} 
              onChange={handleChange}
              value={formState.message}
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
