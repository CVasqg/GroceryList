import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { GroceryContext } from '../App';
import AddItem from '../components/additem';
import './group.css';

const HARD_CODED = {
  vegetables: ['Broccoli', 'Spinach', 'Carrots', 'Kale'],
  fruits: ['Apples', 'Bananas', 'Berries', 'Oranges'],
  grains: ['Brown Rice', 'Quinoa', 'Oats', 'Whole Wheat Bread'],
  proteins: ['Chicken', 'Beans', 'Tofu', 'Fish'],
  dairy: ['Yogurt', 'Milk', 'Cheese', 'Plant Milk'],
};

export default function GroupPage() {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const { selected, addSelectedItem, removeSelectedItem } = useContext(GroceryContext);
  const baseList = HARD_CODED[groupId] || [];
  const [customItems, setCustomItems] = useState([]);
  const [showModal, setShowModal] = useState(false);

  function handleAddCustom(itemName) {
    setCustomItems(prev => [...prev, itemName]);
    setShowModal(false);
  }

  function handleOpenModal() {
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  function toggleSelect(item) {
    const already = selected[groupId] && selected[groupId].includes(item);
    if (already) removeSelectedItem(groupId, item);
    else addSelectedItem(groupId, item);
  }

  const combined = [...baseList, ...customItems];

  return (
    <section>
      <nav className="group-nav">
        <button className="back-btn" onClick={() => navigate('/create')}>Go back to plate</button>
      </nav>
      <div className="group-list">
        <h2 style={{ textTransform: 'capitalize', marginTop: 0 }}>{groupId.replace(/([A-Z])/g, ' $1')}</h2>
        <ul className="group-items">
          {combined.map(item => {
            const isSelected = selected[groupId] && selected[groupId].includes(item);
            return (
              <li key={item} className="group-item">
                <button
                  type="button"
                  className={`select-dot ${isSelected ? 'selected' : ''}`}
                  aria-pressed={!!isSelected}
                  onClick={() => toggleSelect(item)}
                  title={isSelected ? `Remove ${item}` : `Add ${item}`}
                />
                <span className="item-label">{item}</span>
              </li>
            );
          })}
        </ul>
        <div style={{ marginTop: '1rem', textAlign: 'right' }}>
          <button onClick={handleOpenModal}>Add another item +</button>
        </div>
      </div>

      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <button className="view-list-btn" onClick={() => navigate('/view')}>View your list</button>
      </div>

      <AddItem isOpen={showModal} onAdd={handleAddCustom} onClose={handleCloseModal} />
    </section>
  );
}
