import styled from 'styled-components';
import { Link } from 'react-router-dom';

/* Full‑screen dark backdrop, flex‑centred */
export const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 120px 24px 24px;
  background: ${({ theme }) => theme.colors.background};
  position: relative;
`;

/* Holds logo + form */
export const FormWrap = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

/* Optional logo link */
export const Icon = styled(Link)`
  margin-bottom: 24px;
  margin-top: 24px;
`;

/* Keeps form centred */
export const FormContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

/* Main box */
export const Form = styled.form`
  width: 100%;
  max-width: 900px;
  background: ${({ theme }) => theme.colors.background};
  padding: 50px 32px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: flex-start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;

  @media (max-width: 400px) {
    padding: 32px 22px;
  }
`;

export const FormH1 = styled.h2`
  margin-bottom: 40px;
  color: ${({ theme }) => theme.colors.headingText};
  font-size: 24px;
  font-weight: 500;
  text-align: center;
  line-height: 1.4;
  position: relative;
  padding-bottom: 16px;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const FormLabel = styled.label`
  margin-bottom: 8px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  display: block;
  text-align: center;
  
  p {
    margin: 12px 0;
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 500;
    font-size: 16px;
  }
`;

export const FormInput = styled.input`
  padding: 16px;
  margin-bottom: 24px;
  border: none;
  border-bottom: 2px solid ${({ theme }) => theme.theme === 'dark' ? '#333' : '#ddd'};
  border-radius: 0;
  background-color: ${({ theme }) => theme.theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)'};
  color: ${({ theme }) => theme.colors.text};
  transition: all 0.3s;
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.04)'};
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.theme === 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.4)'};
  }
`;

export const FormButton = styled.button`
  padding: 16px 0;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 28px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.buttonText};
  font-size: 18px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 16px;
  
  &:hover {
    background: transparent;
    color: ${({ theme }) => theme.colors.primary};
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

/* Back‑to‑hero link */
export const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: 768px) {
    padding-right: 0;
    margin-bottom: 2rem;
  }
`;

export const FieldsColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

/* Back-to-hero link */
export const BackButton = styled(Link)`
  position: absolute;
  top: 24px;
  left: 24px;
  padding: 10px 20px;
  border: 2px solid #2db670;
  background: transparent;
  color: #2db670;
  font-size: 14px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    background: #2db670;
    color: #000;
  }
`;
