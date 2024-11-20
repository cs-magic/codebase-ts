import React, { useState } from 'react';

interface AddTodoFormProps {
  onAdd: (text: string) => void;
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({ onAdd }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text);
      setText('');
    }
  };

  return (
    <form className="mb-4" onSubmit={handleSubmit}>
      <input
        className="border p-2 mr-2"
        placeholder="Add a new todo"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="bg-blue-500 text-white p-2 rounded" type="submit">
        Add Todo
      </button>
    </form>
  );
};

export default AddTodoForm;