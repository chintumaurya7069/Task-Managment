import React, { useState } from 'react';

const TaskList = ({ tasks, onToggle, onDelete, onEdit }) => {
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState('');

    const handleStartEdit = (task) => {
        setEditingId(task.id);
        setEditText(task.text);
    };

    const handleSaveEdit = () => {
        if (editingId !== null && editText.trim()) {
            onEdit(editingId, editText);
            setEditingId(null);
            setEditText('');
        }
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditText('');
    };

    if (tasks.length === 0) {
        return <p className="text-gray-500">No tasks found.</p>;
    }

    return (
        <ul className="space-y-2">
            {tasks.map((task) => (
                <li
                    key={task.id}
                    className="flex justify-between items-center border px-3 py-2 rounded"
                >
                    {editingId === task.id ? (
                        <>
                            <input
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                className="flex-1 border px-2 py-1 rounded mr-2"
                            />
                            <button
                                onClick={handleSaveEdit}
                                className="text-green-600 hover:text-green-800 mr-2"
                            >
                                Save
                            </button>
                            <button
                                onClick={handleCancelEdit}
                                className="text-gray-600 hover:text-gray-800"
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <>
                            <span
                                onClick={() => onToggle(task.id)}
                                className={`flex-1 cursor-pointer ${
                                    task.completed ? 'line-through text-gray-400' : ''
                                }`}
                            >
                                {task.text}
                            </span>
                            <div className="flex gap-2 items-center">
                                <button
                                    onClick={() => handleStartEdit(task)}
                                    disabled={task.completed}
                                    className={`text-blue-500 hover:text-blue-700 ${
                                        task.completed ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                >
                                    ✎
                                </button>
                                <button
                                    onClick={() => onDelete(task.id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    ✕
                                </button>
                            </div>
                        </>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default TaskList;
