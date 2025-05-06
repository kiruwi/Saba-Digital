import React from 'react';
import styled from 'styled-components';
import { Form } from '../../components/Form';
import { constants } from '../../utils/constants';
import { SEO } from '../../components/SEO';

const Container = styled.div`
  min-height: 100vh;
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  color: ${props => props.theme.colors.text};
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 2rem;
  color: ${props => props.theme.colors.primary};
`;

const ContactForm = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const ContactPage: React.FC = () => {
  const handleSubmit = async (data: { [key: string]: string }) => {
    // TODO: Implement form submission logic
    console.log('Form submitted:', data);
  };

  const fields = [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true,
      pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$',
      validationMessage: 'Please enter a valid email address',
    },
    {
      name: 'message',
      label: 'Message',
      type: 'textarea',
      required: true,
    },
  ];

  return (
    <Container>
      <SEO title="Contact" description="Get in touch with me" />
      <Title>Contact Me</Title>
      <ContactForm>
        <Form
          fields={fields}
          onSubmit={handleSubmit}
          submitLabel="Send Message"
        />
      </ContactForm>
    </Container>
  );
};

export default ContactPage;
