const API = process.env.REACT_APP_API_URL || 'http://localhost:5001';
import React, { useEffect, useState } from 'react';
import Create from './Create';
import './App.css';
import axios from 'axios';
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill, BsPencil } from 'react-icons/bs';

const Home = () => {
    const [todos, setTodos] = useState([]);
    const [updatetask, setUpdatetask] = useState('');
    const [taskid, setTaskid] = useState('');

    useEffect(() => {
        axios.get(`${API}/get`)
            .then(result => setTodos(result.data))
            .catch(err => console.log(err));
    }, []);

    const edit = (id) => {
        axios.put(`${API}/edit/${id}`)
            .then(result => {
                console.log(result.data);
                const updatedTodos = todos.map(todo => {
                    if (todo._id === id) {
                        return { ...todo, done: !todo.done };
                    }
                    return todo;
                });
                setTodos(updatedTodos);
            })
            .catch(err => console.log(err));
    };

    const Update = (id, updatedTask) => {
        axios.put(`${API}/update/${id}`, { task: updatedTask })
            .then(result => {
                console.log(result.data);
                const updatedTodos = todos.map(todo => {
                    if (todo._id === id) {
                        return { ...todo, task: updatedTask };
                    }
                    return todo;
                });
                setTodos(updatedTodos);
                setTaskid('');
                setUpdatetask('');
            })
            .catch(err => console.log(err));
    };

    const Hdelete = (id) => {
        axios.delete(`${API}/delete/${id}`)
            .then(result => {
                console.log(result.data);
                const updatedTodos = todos.filter(todo => todo._id !== id);
                setTodos(updatedTodos);
            })
            .catch(err => console.log(err));
    };

    const [filter, setFilter] = useState('all');
    const filteredTodos = todos.filter((todo) => {
        if (filter === 'active') return !todo.done;
        if (filter === 'completed') return todo.done;
        return true;
    });

    const today = new Date().setHours(0, 0, 0, 0);
    const isOverdue = (t) => t.dueDate && !t.done && new Date(t.dueDate) < today;
    const fmt = (d) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
    const total = todos.length;
    const doneCount = todos.filter((t) => t.done).length;
    const percent = total ? Math.round((doneCount / total) * 100) : 0;
    const overdueCount = todos.filter(isOverdue).length;
    const startOfDay = (d) => new Date(d).setHours(0, 0, 0, 0);
    const daysLeft = (d) => {
        const n = Math.round((startOfDay(d) - today) / 86400000);
        if (n === 0) return 'Today';
        if (n === 1) return 'Tomorrow';
        if (n < 0) return Math.abs(n) + 'd late';
        return 'in ' + n + ' days';
    };
    const dueTodayCount = todos.filter((t) => t.dueDate && !t.done && startOfDay(t.dueDate) === today).length;
    const overdueList = todos.filter(isOverdue);
    const activeCount = total - doneCount;
    const tips = [
        'Break big tasks into small steps.',
        'Do the hardest task first.',
        'Set a due date for every task.',
        'Take a short break every hour.',
        'Finish one thing before starting another.',
        'Review your list every morning.',
        'Small progress is still progress.',
    ];
    const upcoming = todos
        .filter((t) => t.dueDate && !t.done)
        .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
        .slice(0, 5);

    return (
        <div className='layout'>
            <aside className='panel'>
                <h3>Today</h3>
                <p className='big-date'>
                    {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
                </p>
                <div className='progress'><div style={{ width: percent + '%' }} /></div>
                <p>{doneCount}/{total} completed ({percent}%)</p>
                <div className='stats'>
                    <div><b>{total}</b><small>Total</small></div>
                    <div><b>{total - doneCount}</b><small>Active</small></div>
                    <div><b>{doneCount}</b><small>Done</small></div>
                </div>
                <p>⚠️ Overdue: {overdueCount}</p>
                <p>🔥 Due today: {dueTodayCount}</p>
                <p className='quote'>{total > 0 && percent === 100 ? '🎉 All done!' : 'Keep going, you got this 💪'}</p>
            </aside>
            <main>
            <div className="filters">
                {['all', 'active', 'completed'].map((f) => (
                    <button
                        key={f}
                        className={filter === f ? 'filter-btn active' : 'filter-btn'}
                        onClick={() => setFilter(f)}
                    >
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                ))}
            </div>
            <Create />
            {
                todos.length === 0 ? <div className='task'>No tasks found</div> :
                    filteredTodos.map((todo) => (
                        <div className='task' key={todo._id}>
                            <div className='checkbox'>
                                {todo.done ? <BsFillCheckCircleFill className='icon' /> :
                                    <BsCircleFill className='icon' onClick={() => edit(todo._id)} />}
                                {taskid === todo._id ?
                                    <input type='text' value={updatetask} onChange={e => setUpdatetask(e.target.value)} />
                                    :
                                    <p className={todo.done ? 'through' : 'normal'}>{todo.task}</p>
                                }
                            </div>
                            <div>
                                <span className={'priority-badge ' + (todo.priority || 'medium')}>{todo.priority || 'medium'}</span>
                            {todo.dueDate && (
                                <span className={'date-badge ' + (isOverdue(todo) ? 'overdue' : '')}>
                                    📅 {fmt(todo.dueDate)}
                                </span>
                            )}
                            <span>
                                    <BsPencil className='icon' onClick={() => {
                                        if (taskid === todo._id) {
                                            Update(todo._id, updatetask);
                                        } else {
                                            setTaskid(todo._id);
                                            setUpdatetask(todo.task);
                                        }
                                    }} />
                                    <BsFillTrashFill className='icon' onClick={() => Hdelete(todo._id)} />
                                </span>
                            </div>
                        </div>
                    ))
            }
        </main>
        </div>
    );
};

export default Home;
