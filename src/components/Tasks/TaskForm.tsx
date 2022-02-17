import React, { useRef, FormEvent, useState } from "react";
import styled from "styled-components";
import { IoCheckmark, IoAlert } from "react-icons/io5";

import Button from "../utils/Button";

const StyledForm = styled.form`
  margin-bottom: 7px;
  border-radius: 10px;
  padding: 5px;
`;

const StyledSection = styled.section`
  display: flex;
`;

const StyledInput = styled.input`
  border-radius: 10px;
  border: none;
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  background-color: ${({ theme }) => theme.backgroundColors.main};
  color: ${({ theme }) => theme.text.main};
  transition: all 0.5s linear;

  &:focus {
    outline: none;
  }

  &:disabled {
    filter: brightness(0.75);
    cursor: not-allowed;
  }
`;

type Params = {
  addTask: (task: string, important?: boolean) => void;
  disabled?: boolean;
  showMoreConfig?: boolean;
};
export default function TaskForm({
  addTask,
  disabled,
  showMoreConfig,
}: Params) {
  const [showConfig, setShowConfig] = useState(false);
  const [important, setImportant] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!inputRef.current?.value) return;

    addTask(inputRef.current.value, important);
    inputRef.current.value = "";
    setImportant(false);
  };

  const MakeImportantButton = ({ label }: { label?: boolean }) => {
    if (!showMoreConfig) return null;

    return (
      <Button
        check
        color="info"
        disabled={disabled}
        type="button"
        title={important ? "Make not important" : "Make important"}
        className={`${important ? "active" : ""} ${label && "small"} icon-left`}
        onClick={() => setImportant(!important)}
        icon={label}
      >
        <IoAlert className="left" />
        {label ? (important ? "Important" : "Make important") : null}
      </Button>
    );
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledSection>
        <StyledInput
          type="text"
          ref={inputRef}
          maxLength={60}
          disabled={disabled}
          placeholder="Add new Task..."
          required
        />
        {!showConfig ? <MakeImportantButton /> : null}
        <Button
          color="main"
          disabled={disabled}
          type="submit"
          title="Create task"
        >
          <IoCheckmark />
        </Button>
      </StyledSection>
      {showConfig && (
        <StyledSection>
          <MakeImportantButton label />
        </StyledSection>
      )}
      {showMoreConfig && (
        <div>
          <Button link type="button" onClick={() => setShowConfig(!showConfig)}>
            {showConfig ? "Show less" : "Show more"}
          </Button>
        </div>
      )}
    </StyledForm>
  );
}
