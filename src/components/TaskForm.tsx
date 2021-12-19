import React, { useRef, FormEvent } from 'react';

type Params = { addTask: (task: string) => void }
export default function TaskForm({ addTask }: Params) {
    const inputRef = useRef<HTMLInputElement>(null)
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if(!inputRef.current) return;

        addTask(inputRef.current.value);
        inputRef.current.value = '';        
    }

    return (
        <form onSubmit={handleSubmit}>
            <input ref={inputRef} type="text" placeholder="Add new Task..." required />
            <button type="submit">Add</button>
        </form>
    )
}