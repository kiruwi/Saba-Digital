import React, { useState, useRef } from "react";
import { useEffect } from "react";

import {
  Container,
  Form,
  FormButton,
  FormContent,
  FormH1,
  FormWrap,
  FormInput,
  FormLabel,
  InfoColumn,
  FieldsColumn,
} from "./ContactElements";

const Result = () => <p>Your message has been successfully sent! I'll get back to you soon.</p>;
const ErrorResult = () => <p style={{ color: 'red' }}>Something went wrong. Please try again later.</p>;

// Simple email validation regex
const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
};

function ContactUs() {
  const [result, showResult] = useState(false);
  const [error, showError] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitTimeRef = useRef(Date.now());
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  // Anti-spam timing measure
  useEffect(() => {
    submitTimeRef.current = Date.now();
  }, []);

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    // Name validation
    if (!formState.name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }

    // Email validation
    if (!formState.email) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!validateEmail(formState.email)) {
      errors.email = "Email is invalid";
      isValid = false;
    }

    // Subject validation - optional but limit length
    if (formState.subject && formState.subject.length > 100) {
      errors.subject = "Subject must be less than 100 characters";
      isValid = false;
    }

    // Message validation
    if (!formState.message.trim()) {
      errors.message = "Message is required";
      isValid = false;
    } else if (formState.message.length > 5000) {
      errors.message = "Message must be less than 5000 characters";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Basic input sanitization - strip HTML tags
    const sanitizedValue = value.replace(/<[^>]*>?/gm, '');
    
    setFormState({
      ...formState,
      [name.toLowerCase()]: sanitizedValue
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    // Anti-spam timing check
    const timeSinceLoad = Date.now() - submitTimeRef.current;
    if (timeSinceLoad < 1500) {
      // Form submitted too quickly - likely a bot
      console.log("Form submitted too quickly. Possible bot detected.");
      setTimeout(() => {
        showResult(true); // Show success but don't actually submit
        setTimeout(() => showResult(false), 5000);
      }, 1000);
      return;
    }
    
    setIsSubmitting(true);
    
    // Get form data
    const form = e.target;
    
    // Submit form data to Netlify using fetch with CSRF protection
    const formData = new FormData(form);
    
    fetch('/', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(formData).toString()
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      return response;
    })
    .then(() => {
      // Show success message
      showResult(true);
      showError(false);
      
      // Reset form
      form.reset();
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      
      // Hide success message after 5 seconds
      setTimeout(() => showResult(false), 5000);
    })
    .catch((error) => {
      console.error('Form submission error:', error);
      showError(true);
      setTimeout(() => showError(false), 5000);
    })
    .finally(() => {
      setIsSubmitting(false);
    });
  };

  return (
    <Container>
      <FormWrap>

        <FormContent>
          <Form 
            name="contact" 
            method="POST" 
            data-netlify="true" 
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
             
          >
            {/* Hidden fields needed for Netlify Forms */}
            <input type="hidden" name="form-name" value="contact" />
            <input type="hidden" name="bot-field" />
            {/* Add CSRF protection */}
            <input type="hidden" name="form-timestamp" value={Date.now()} />
            <InfoColumn>
              <FormH1>
              Got a project you’d like to team up on? Drop your info or reach out directly and let’s start the
              conversation!
            </FormH1>
            </InfoColumn>

            <FieldsColumn>

            {formErrors.name && <p style={{ color: 'red', fontSize: '12px', margin: '0' }}>{formErrors.name}</p>}
            <FormInput 
              type="text" 
              name="name" 
              placeholder="Your Name"
              autoComplete="name" 
              required 
              maxLength="50"
              value={formState.name}
              onChange={handleChange}
            />
            {formErrors.email && <p style={{ color: 'red', fontSize: '12px', margin: '0' }}>{formErrors.email}</p>}
            <FormInput 
              type="email" 
              name="email" 
              placeholder="Your Email"
              autoComplete="email" 
              required 
              maxLength="100"
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
              value={formState.email}
              onChange={handleChange}
            />
            {formErrors.subject && <p style={{ color: 'red', fontSize: '12px', margin: '0' }}>{formErrors.subject}</p>}
            <FormInput 
              type="text" 
              name="subject" 
              placeholder="Subject" 
              maxLength="100"
              value={formState.subject}
              onChange={handleChange}
            />
            {formErrors.message && <p style={{ color: 'red', fontSize: '12px', margin: '0' }}>{formErrors.message}</p>}
            <FormInput 
              as="textarea" 
              rows="5" 
              name="message" 
              placeholder="Your Message" 
              required 
              maxLength="5000"
              value={formState.message}
              onChange={handleChange}
              style={{ 
                minHeight: '120px', 
                resize: 'vertical', 
                marginBottom: '30px',
                padding: '16px'
              }} 
            />

            <FormButton 
              type="submit" 
              value={isSubmitting ? "Sending..." : "Send"} 
              disabled={isSubmitting} 
            />

            <FormLabel>
              {result && <Result />}
              {error && <ErrorResult />}
            </FormLabel>
            </FieldsColumn>
          </Form>
        </FormContent>
      </FormWrap>
    </Container>
  );
}

export default ContactUs;
