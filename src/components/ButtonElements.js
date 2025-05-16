// src/components/ButtonElements.js
import styled from 'styled-components';
import { Link as LinkS } from 'react-scroll';

export const Button = styled(LinkS).attrs(props => ({
  to: props.to || '',
  smooth: props.smooth !== undefined ? props.smooth : true,
  duration: props.duration || 500,
  spy: props.spy !== undefined ? props.spy : true,
  exact: props.exact || 'true',
  offset: props.offset || -80
}))`
  border-radius: 0;  /* ← rectangular */
  background: ${({ primary }) => (primary ? '#01BF71' : '#010606')};
  white-space: nowrap;
  padding: ${({ big }) => (big ? '14px 48px' : '12px 30px')};
  color: ${({ dark }) => (dark ? '#010606' : '#fff')};
  font-size: ${({ fontBig }) => (fontBig ? '20px' : '16px')};
  outline: none;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background 0.2s ease-in-out;

  &:hover {
    background: ${({ primary }) => (primary ? '#fff' : '#01BF71')};
  }
`;
