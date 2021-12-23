import React, { useRef, FormEvent } from 'react';
import styled from 'styled-components';
import { IoCheckmark } from "react-icons/io5";

import Button from './Button';

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
    background-color: ${({ theme }) => theme.backgroundColors.main};
    color: ${({ theme }) => theme.text.main};
    transition: all .5s linear;

    &:focus {
        outline: none;
    }

    &:disabled {
        filter: brightness(.75);
        cursor: not-allowed;
    }
`;

type Params = { addTask: (task: string) => void, disabled?: boolean, showMoreConfig?: boolean }
export default function TaskForm({ addTask, disabled, showMoreConfig }: Params) {
    const inputRef = useRef<HTMLInputElement>(null)
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if(!inputRef.current) return;

        addTask(inputRef.current.value);
        inputRef.current.value = '';        
    }

    return (
        <StyledForm onSubmit={handleSubmit}>
            <div>
                <StyledInput 
                    type="text" 
                    ref={inputRef} 
                    maxLength={60} 
                    disabled={disabled} 
                    placeholder="Add new Task..." 
                    required 
                />
                <Button color="main" disabled={disabled} type="submit">
                    <IoCheckmark />
                </Button>
            </div>
        </StyledForm>
    )
}