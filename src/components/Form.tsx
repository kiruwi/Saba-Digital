import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Theme } from '../themes/theme';
import { FaEnvelope, FaPaperPlane } from 'react-icons/fa';

interface FormField {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
  pattern?: string;
  error?: string;
}

interface FormProps {
  fields: FormField[];
  onSubmit: (data: { [key: string]: string }) => void;
  submitLabel: string;
  isLoading?: boolean;
}

const FormContainer = styled.form<{ theme: Theme }>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  max-width: 600px;
  width: 100%;
  margin: 0 auto;

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  label {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ theme }) => theme.colors.text};
  }

  input, textarea {
    padding: 12px;
    border: 1px solid ${({ theme }) => theme.colors.secondary};
    border-radius: 4px;
    font-size: ${({ theme }) => theme.fontSizes.base};
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    transition: border-color ${({ theme }) => theme.transitions.default};

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary};
    }
  }

  textarea {
    min-height: 150px;
    resize: vertical;
  }

  .error {
    color: ${({ theme }) => theme.colors.error};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    margin-top: 4px;
  }

  button {
    padding: 12px 24px;
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
    border: none;
    border-radius: 4px;
    font-size: ${({ theme }) => theme.fontSizes.base};
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: background-color ${({ theme }) => theme.transitions.default};

    &:hover {
      background-color: ${({ theme }) => theme.colors.secondary};
    }

    &.loading {
      opacity: 0.8;
      cursor: not-allowed;
    }
  }
`;

export const Form: React.FC<FormProps> = ({ fields, onSubmit, submitLabel, isLoading = false }) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    // Validate on change
    const field = fields.find((f) => f.id === id);
    if (field) {
      const error = validateField(field, value);
      setErrors((prev) => ({ ...prev, [id]: error }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors = validateForm(formData);
    setErrors(formErrors);

    if (Object.values(formErrors).every((error) => !error)) {
      onSubmit(formData);
    }
  };

  const validateField = (field: FormField, value: string): string | undefined => {
    if (field.required && !value.trim()) {
      return `${field.label} is required`;
    }

    if (field.pattern) {
      const regex = new RegExp(field.pattern);
      if (!regex.test(value)) {
        return `Invalid ${field.label.toLowerCase()}`;
      }
    }

    return undefined;
  };

  const validateForm = (data: { [key: string]: string }): { [key: string]: string | undefined } => {
    return fields.reduce((acc, field) => {
      const error = validateField(field, data[field.id] || '');
      return { ...acc, [field.id]: error };
    }, {} as { [key: string]: string | undefined });
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field.id} className="form-group">
          <label htmlFor={field.id}>{field.label}</label>
          {field.type === 'textarea' ? (
            <textarea
              id={field.id}
              value={formData[field.id] || ''}
              onChange={handleChange}
              placeholder={field.placeholder}
              required={field.required}
            />
          ) : (
            <input
              type={field.type}
              id={field.id}
              value={formData[field.id] || ''}
              onChange={handleChange}
              placeholder={field.placeholder}
              required={field.required}
            />
          )}
          {errors[field.id] && <div className="error">{errors[field.id]}</div>}
        </div>
      ))}
      <button type="submit" disabled={isLoading} className={isLoading ? 'loading' : ''}>
        {isLoading ? (
          <div className="loading-spinner"></div>
        ) : (
          <>
            <FaPaperPlane />
            {submitLabel}
          </>
        )}
      </button>
    </FormContainer>
  );
};
