'use client';

import { useState, useRef, useEffect } from 'react';

interface EditableTextProperties {
  text: string;
  onSave: (newText: string) => void;
  className?: string;
}

export function EditableText({ text, onSave, className = '' }: EditableTextProperties) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(text);
  const inputReference = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputReference.current) {
      inputReference.current.focus();
      inputReference.current.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    const trimmedValue = editValue.trim();
    if (trimmedValue && trimmedValue !== text) {
      onSave(trimmedValue);
    }
    setIsEditing(false);
    setEditValue(text);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditValue(text);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSave();
    } else if (event.key === 'Escape') {
      handleCancel();
    }
  };

  if (isEditing) {
    return (
      <input
        ref={inputReference}
        type="text"
        value={editValue}
        onChange={(event) => setEditValue(event.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        className="flex-1 px-2 py-1 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
      />
    );
  }

  return (
    <span
      onClick={() => setIsEditing(true)}
      className={`flex-1 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded ${className}`}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          setIsEditing(true);
        }
      }}
    >
      {text}
    </span>
  );
}