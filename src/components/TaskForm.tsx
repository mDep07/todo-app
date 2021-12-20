import React, { useRef, FormEvent } from 'react';
import styled from 'styled-components';
import { IoCheckmark } from "react-icons/io5";

import Button from './Button';
import { Theme } from './Themes';

const StyledForm = styled.form`
    margin-bottom: 7px;
    border-radius: 10px;
    padding: 5px;
    display: flex;
`;

const StyledInput = styled.input`
    border-radius: 10px;
    border: none;
    width: 100%;
    padding: 10px;
    font-size: 1rem;
    background-color: ${({ theme }: { theme: Theme }) => theme.cardBgColor};
    color: ${({ theme }: { theme: Theme }) => theme.text};
    transition: all .5s linear;

    &:focus {
        outline: none;
    }

    &:disabled {
        filter: brightness(.25);
        cursor: not-allowed;
    }
`;

type Params = { addTask: (task: string) => void, disabled?: boolean }
export default function TaskForm({ addTask, disabled }: Params) {
    const inputRef = useRef<HTMLInputElement>(null)
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if(!inputRef.current) return;

        addTask(inputRef.current.value);
        inputRef.current.value = '';        
    }

    return (
        <StyledForm onSubmit={handleSubmit}>
            <StyledInput disabled={disabled} ref={inputRef} type="text" placeholder="Add new Task..." required />
            <Button disabled={disabled} type="submit"><IoCheckmark /></Button>
        </StyledForm>
    )
}