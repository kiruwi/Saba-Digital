import styled from 'styled-components';
import { Link } from 'react-router-dom';

/* Full‑screen dark backdrop, flex‑centred */
export const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 24px;
  background: #000000;
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
  max-width: 700px;
  background: #111111;
  padding: 50px 32px;
  display: grid;
  border: 1px solid #333;   /* subtle border */
  border-radius: 0;         /* square corners */
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;

  @media (max-width: 400px) {
    padding: 32px 22px;
  }
`;

export const FormH1 = styled.h1`
  margin-bottom: 40px;
  color: #fff;
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
    background-color: #0bd147;
  }
`;

export const FormLabel = styled.label`
  margin-bottom: 8px;
  font-size: 14px;
  color: #fff;
  display: block;
  text-align: center;
  
  p {
    margin: 12px 0;
    color: #0bd147;
    font-weight: 500;
    font-size: 16px;
  }
`;

export const FormInput = styled.input`
  padding: 16px;
  margin-bottom: 24px;
  border: none;
  border-bottom: 2px solid #333;
  border-radius: 0;
  background-color: rgba(255, 255, 255, 0.05);
  color: white;
  transition: all 0.3s;
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-bottom: 2px solid #0bd147;
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;

export const FormButton = styled.button`
  padding: 16px 0;
  border: 2px solid #0bd147;
  border-radius: 0;
  background: #0bd147;
  color: #000;
  font-size: 18px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 16px;
  
  &:hover {
    background: transparent;
    color: #0bd147;
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

/* Back‑to‑hero link */
export const BackButton = styled(Link)`
  position: absolute;
  top: 24px;
  left: 24px;
  padding: 10px 20px;
  border: 2px solid #0bd147;
  background: transparent;
  color: #0bd147;
  font-size: 14px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    background: #0bd147;
    color: #000;
  }
`;
