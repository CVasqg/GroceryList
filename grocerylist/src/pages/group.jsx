import React, { useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GroceryContext } from '../App';
import './group.css';

const HARD_CODED = {
  vegetables: ['Broccoli', 'Spinach', 'Carrots', 'Kale'],
  fruits: ['Apples', 'Bananas', 'Berries', 'Oranges'],
  wholegrains: ['Brown Rice', 'Quinoa', 'Oats', 'Whole Wheat Bread'],
  proteins: ['Chicken', 'Beans', 'Tofu', 'Fish'],
  dairy: ['Yogurt', 'Milk', 'Cheese', 'Plant Milk'],
  oils: ['Olive Oil', 'Nuts', 'Avocado', 'Seeds'],
};

export default function GroupPage() {
  const { groupId } = useParams();
  const { selected, addSelectedItem, removeSelectedItem } = useContext(GroceryContext);
  const baseList = HARD_CODED[groupId] || [];
  const [customItems, setCustomItems] = useState([]);

  function handleAddCustom() {
    const val = window.prompt('Enter an item to add to this group:');
    if (val && val.trim()) {
      setCustomItems(prev => [...prev, val.trim()]);
    }
  }

  function toggleSelect(item) {
    const already = selected[groupId] && selected[groupId].includes(item);
    if (already) removeSelectedItem(groupId, item);
    else addSelectedItem(groupId, item);
  }

  const combined = [...baseList, ...customItems];

  return (
    <section>
      <h2 style={{ textTransform: 'capitalize' }}>{groupId.replace(/([A-Z])/g, ' $1')}</h2>
      <p>
        <Link to="/create">Back to groups</Link>
      </p>
      <div className="group-list">
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
      </div>
      <div style={{ marginTop: '1rem' }}>
        <button onClick={handleAddCustom}>Add another item</button>
      </div>
    </section>
  );
}
