import React, { useState, useEffect } from 'react';
import './additem.css';

export default function AddItem({ isOpen, onAdd, onClose }) {
  const [inputValue, setInputValue] = useState('');

  // Clear input when modal closes
  useEffect(() => {
    if (!isOpen) {
      setInputValue('');
    }
  }, [isOpen]);

  function handleConfirm() {
    if (inputValue.trim()) {
      onAdd(inputValue.trim());
      setInputValue('');
    }
  }

  function handleCancel() {
    setInputValue('');
    onClose();
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleConfirm();
    if (e.key === 'Escape') handleCancel();
  }

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleCancel}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h3>Add New Item</h3>
        <input
          type="text"
          className="modal-input"
          placeholder="Enter item name..."
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
        <div className="modal-buttons">
          <button className="modal-btn modal-confirm" onClick={handleConfirm}>Add</button>
          <button className="modal-btn modal-cancel" onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
