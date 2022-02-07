import React, { useState, useEffect } from 'react';
import { IoClose } from "react-icons/io5";
import styled from 'styled-components';
import Button from './Button';

const StyledAlert = styled.div<{ type: 'danger' | 'success' | 'main' }>`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  right: 1rem;
  margin: 0 auto;
  padding: .5rem;
  border-radius: 10px;
  background-color: ${({theme }) => theme.backgroundColors.body};
  box-shadow:  ${({ theme }) => theme.shades.md};
  border: 2px solid ${({theme, type}) => theme.colors[type]};
  max-width: 90vw;
`;

const StyledTitleAlert = styled.h2<{ type: 'danger' | 'success' | 'main' }>`
  margin: 0;
  font-size: .9rem;
  font-weight: 500;
  color: ${({theme, type}) => theme.colors[type]}
`;

const StyledContentAlert = styled.p`
  margin: 0;
  font-size: .75rem;
  font-weight: 300;
`;

const StyledButtonCloseAlert = styled.button`
  padding: 5px;
  background-color: ${({theme }) => theme.alphaColors.secondary};
  color: ${({theme }) => theme.colors.secondary};
  border: none;
  border-radius: 100px;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-left: auto;
  margin-right: 0;
`;

const StyledButtonActionAlert = styled(Button)`
  padding: 5px 10px;
  margin: 0;
  margin-top: 10px;

`;

export type Params = { 
  show: boolean;
  type: 'danger' | 'success' | 'main';
  title: string;
  content: string; //Are you sure you want to delete this task?
  confirmAction?: () => void;
  autoClose?: boolean;
};

export default function Alert({ show, type, title, content, confirmAction, autoClose }: Params) {

  const [showAlert, setShowAlert] = useState(false);
  
  useEffect(() => {
    if(autoClose) {
      setTimeout(() => setShowAlert(false), 1500);
    }
  }, [autoClose]);

  useEffect(() => setShowAlert(show), [show]);

  if(!showAlert) return null;

  return (
    <StyledAlert type={type}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
        <StyledTitleAlert type={type}>{title}</StyledTitleAlert>
        <StyledButtonCloseAlert onClick={() => setShowAlert(false)}>
          <IoClose />
        </StyledButtonCloseAlert>
      </div>
      <StyledContentAlert dangerouslySetInnerHTML={{ __html: content }} />
      {
        confirmAction && <StyledButtonActionAlert small color="danger" onClick={confirmAction}>Confirm</StyledButtonActionAlert> 
      }
    </StyledAlert>
  )
}
