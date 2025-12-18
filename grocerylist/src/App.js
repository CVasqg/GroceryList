import React, { useState, createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar';
import About from './pages/about';
import CreateList from './pages/createlist';
import ViewList from './pages/viewlist';
import GroupPage from './pages/group';

export const GroceryContext = createContext();

function App() {
  const [selected, setSelected] = useState({});

  function addSelectedItem(groupId, item) {
    setSelected(prev => {
      const groupItems = prev[groupId] ? [...prev[groupId]] : [];
      if (!groupItems.includes(item)) groupItems.push(item);
      return { ...prev, [groupId]: groupItems };
    });
  }

  function removeSelectedItem(groupId, item) {
    setSelected(prev => {
      const groupItems = prev[groupId] ? prev[groupId].filter(i => i !== item) : [];
      return { ...prev, [groupId]: groupItems };
    });
  }

  function increaseItemCount(groupId, item) {
    setSelected(prev => {
      const groupItems = prev[groupId] ? [...prev[groupId]] : [];
      groupItems.push(item);
      return { ...prev, [groupId]: groupItems };
    });
  }

  function decreaseItemCount(groupId, item) {
    setSelected(prev => {
      const groupItems = prev[groupId] ? [...prev[groupId]] : [];
      const idx = groupItems.indexOf(item);
      if (idx !== -1) groupItems.splice(idx, 1);
      return { ...prev, [groupId]: groupItems };
    });
  }

  function resetSelected() {
    setSelected({});
  }

  return (
    <GroceryContext.Provider value={{ selected, addSelectedItem, removeSelectedItem, increaseItemCount, decreaseItemCount, resetSelected }}>
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <main style={{ padding: '1rem' }}>
            <Routes>
              <Route path="/" element={<About />} />
              <Route path="/about" element={<About />} />
              <Route path="/create" element={<CreateList />} />
              <Route path="/view" element={<ViewList />} />
              <Route path="/group/:groupId" element={<GroupPage />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </GroceryContext.Provider>
  );
}

export default App;
