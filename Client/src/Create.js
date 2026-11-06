import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

const Create = () => {
    const [task, setTask] = useState('');
    const [dueDate, setDueDate] = useState('');

    const createTask = () => {
        axios.post('http://localhost:5001/add', { task: task.trim(), dueDate: dueDate || null })
            .then(result => {
                console.log(result.data);
                window.location.reload();
                setTask('');
            })
            .catch(err => console.log(err));
    };

    return (
        <main>
            <h1>Todo List</h1>
            <div className='create-form'>
                <input
                    type='text'
                    placeholder='Enter a task'
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    required
                />
                <input
                    type="date" min="2026-01-01" max="2040-12-31"
                    className='date-input'
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />
                <button onClick={createTask}>ADD</button>
            </div>
        </main>
    );
};

export default Create;

