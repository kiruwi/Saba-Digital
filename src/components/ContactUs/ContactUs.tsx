// src/components/ContactUs/ContactUs.tsx
import React, { useState, useRef, useEffect } from "react";

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
  TurnstileContainer,
} from "./ContactElements";

const Result: React.FC = () => <p>Your message has been successfully sent! I'll get back to you soon.</p>;
const ErrorResult: React.FC<{ message: string }> = ({ message }) => (
  <p style={{ color: "red" }}>{message}</p>
);

interface TurnstileApi {
  render(
    container: HTMLElement,
    options: {
      sitekey: string;
      theme: "auto";
      callback: (token: string) => void;
      "expired-callback": () => void;
      "error-callback": () => void;
    }
  ): string;
  reset(widgetId?: string): void;
  remove(widgetId: string): void;
}

type TurnstileWindow = Window &
  typeof globalThis & {
    turnstile?: TurnstileApi;
  };

// TypeScript interfaces
interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

// Simple email validation regex
const validateEmail = (email: string): boolean => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
};

const ContactUs: React.FC = () => {
  const [result, showResult] = useState<boolean>(false);
  const [error, showError] = useState<string>("");
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [turnstileSiteKey, setTurnstileSiteKey] = useState<string>("");
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const submitTimeRef = useRef<number>(Date.now());
  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetRef = useRef<string | null>(null);
  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  // Anti-spam timing measure
  useEffect(() => {
    submitTimeRef.current = Date.now();
  }, []);

  useEffect(() => {
    const loadConfiguration = async () => {
      try {
        const response = await fetch("/api/contact/config", {
          headers: { Accept: "application/json" },
        });
        const data = (await response.json()) as {
          turnstileSiteKey?: string;
          error?: string;
        };

        if (!response.ok || !data.turnstileSiteKey) {
          throw new Error(data.error || "Contact service is unavailable.");
        }

        setTurnstileSiteKey(data.turnstileSiteKey);
      } catch {
        showError("The contact form is temporarily unavailable.");
      }
    };

    loadConfiguration();
  }, []);

  useEffect(() => {
    if (!turnstileSiteKey) return;

    const turnstileWindow = window as TurnstileWindow;
    let cancelled = false;

    const renderWidget = () => {
      if (
        cancelled ||
        !turnstileWindow.turnstile ||
        !turnstileContainerRef.current ||
        turnstileWidgetRef.current
      ) {
        return;
      }

      turnstileWidgetRef.current = turnstileWindow.turnstile.render(
        turnstileContainerRef.current,
        {
          sitekey: turnstileSiteKey,
          theme: "auto",
          callback: (token) => {
            setTurnstileToken(token);
            showError("");
          },
          "expired-callback": () => setTurnstileToken(""),
          "error-callback": () => {
            setTurnstileToken("");
            showError("Security verification could not be loaded.");
          },
        }
      );
    };

    const existingScript = document.getElementById("turnstile-script");
    if (!existingScript) {
      const script = document.createElement("script");
      script.id = "turnstile-script";
      script.src =
        "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.addEventListener("load", renderWidget, { once: true });
      document.head.appendChild(script);
    } else {
      renderWidget();
    }

    const renderTimer = window.setInterval(renderWidget, 200);

    return () => {
      cancelled = true;
      window.clearInterval(renderTimer);
      if (turnstileWidgetRef.current && turnstileWindow.turnstile) {
        turnstileWindow.turnstile.remove(turnstileWidgetRef.current);
        turnstileWidgetRef.current = null;
      }
    };
  }, [turnstileSiteKey]);

  const validateForm = (): { isValid: boolean; errors: FormErrors } => {
    let errors: FormErrors = {};
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
    return { isValid, errors };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Basic input sanitization - strip HTML tags
    const sanitizedValue = value.replace(/<[^>]*>?/gm, '');
    
    setFormState({
      ...formState,
      [name.toLowerCase()]: sanitizedValue
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate form
    const validation = validateForm();
    if (!validation.isValid) {
      return;
    }
    
    // Anti-spam timing check
    const timeSinceLoad = Date.now() - submitTimeRef.current;
    if (timeSinceLoad < 1500) {
      // Form submitted too quickly - likely a bot
      // Silent bot detection - no logging needed
      setTimeout(() => {
        showResult(true);
        setTimeout(() => showResult(false), 5000);
      }, 1000);
      return;
    }

    if (!turnstileToken) {
      showError("Please complete the security verification.");
      return;
    }

    setIsSubmitting(true);
    showError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...formState,
          website: formData.get("website") || "",
          turnstileToken,
        }),
      });
      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error || "Message delivery failed.");
      }

      showResult(true);
      showError("");
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setTurnstileToken("");
      (window as TurnstileWindow).turnstile?.reset(
        turnstileWidgetRef.current ?? undefined
      );
      setTimeout(() => showResult(false), 5000);
    } catch (submissionError) {
      showError(
        submissionError instanceof Error
          ? submissionError.message
          : "Something went wrong. Please try again later."
      );
      setTurnstileToken("");
      (window as TurnstileWindow).turnstile?.reset(
        turnstileWidgetRef.current ?? undefined
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <FormWrap>

        <FormContent>
          <Form 
            name="contact" 
            method="POST" 
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ display: "none" }}
            />
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
              maxLength={50}
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
              maxLength={100}
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
              value={formState.email}
              onChange={handleChange}
            />
            {formErrors.subject && <p style={{ color: 'red', fontSize: '12px', margin: '0' }}>{formErrors.subject}</p>}
            <FormInput 
              type="text" 
              name="subject" 
              placeholder="Subject" 
              maxLength={100}
              value={formState.subject}
              onChange={handleChange}
            />
            {formErrors.message && <p style={{ color: 'red', fontSize: '12px', margin: '0' }}>{formErrors.message}</p>}
            <FormInput 
              as="textarea" 
              rows={5} 
              name="message" 
              placeholder="Your Message" 
              required 
              maxLength={5000}
              value={formState.message}
              onChange={handleChange}
              style={{ 
                minHeight: '120px', 
                resize: 'vertical', 
                marginBottom: '30px',
                padding: '16px'
              }} 
            />

            <TurnstileContainer ref={turnstileContainerRef} />

            <FormButton
              type="submit" 
              disabled={isSubmitting || !turnstileToken}
            >
              {isSubmitting ? "Sending..." : "Send"}
            </FormButton>

            <FormLabel>
              {result && <Result />}
              {error && <ErrorResult message={error} />}
            </FormLabel>
            </FieldsColumn>
          </Form>
        </FormContent>
      </FormWrap>
    </Container>
  );
}

export default ContactUs;
