import styled from 'styled-components';
import { Link } from 'react-router-dom';

/* Full‑screen green backdrop, flex‑centred */
export const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 24px;
  background: #0bd147;
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
  background: #01244a;
  padding: 50px 22px;
  display: grid;
  border: 1px solid #fff;   /* boxed */
  border-radius: 0;         /* square corners */
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.6);

  @media (max-width: 400px) {
    padding: 32px 22px;
  }
`;

export const FormH1 = styled.h1`
  margin-bottom: 32px;
  color: #fff;
  font-size: 20px;
  font-weight: 400;
  text-align: center;
`;

export const FormLabel = styled.label`
  margin-bottom: 8px;
  font-size: 14px;
  color: #fff;
`;

export const FormInput = styled.input`
  padding: 16px;
  margin-bottom: 24px;
  border: none;
  border-radius: 0;
`;

export const FormButton = styled.button`
  padding: 16px 0;
  border: none;
  border-radius: 0;
  background: #0bd147;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
`;

/* Back‑to‑hero link */
export const BackButton = styled(Link)`
  position: absolute;
  margin-bottom: 24px;
  margin-top: 24px;
  padding: 8px 16px;
  border: 2px solid #fff;
  background: transparent;
  color: #fff;
  font-size: 14px;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #fff;
    color: #01244a;
  }
`;
