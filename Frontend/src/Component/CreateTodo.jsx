import React, { useState } from 'react';

export function CreateTodo() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    return (
        <div>
            <input 
                type="text" 
                placeholder="title" 
                value={title}
                onChange={(e) => setTitle(e.target.value)} 
            /><br /><br />
            <input 
                type="text" 
                placeholder="description" 
                value={description}
                onChange={(e) => setDescription(e.target.value)} 
            /><br /><br />
            <button onClick={() => {
                fetch("http://localhost:3000/todo", {
                    method: "POST",
                    body: JSON.stringify({
                        title: title,
                        description: description
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then(async (res) => {
                    if (res.ok) {
                        const json = await res.json();
                        alert("TODO added");
                    } else {
                        alert("Failed to add TODO");
                    }
                })
                .catch(err => {
                    console.error("Error:", err);
                    alert("Something went wrong");
                });
            }}>
                Add a todo
            </button>
        </div>
    );
}
