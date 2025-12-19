import React, { useContext } from 'react';
import { GroceryContext } from '../App';
import { useNavigate } from 'react-router-dom';
import './viewlist.css';
import { FaTrashAlt } from 'react-icons/fa';

// Copy of PlateDiagram for view list (non-interactive)
function PlateDiagramStatic({ percentages }) {
	const colors = {
		grains: '#F4B942',
		proteins: '#7B3FA0',
		fruits: '#E94F37',
		vegetables: '#4CAF50',
		dairy: '#4F8FE9',
	};
	const cx = 250, cy = 160, r = 90;
	const quadrantData = [
		{ id: 'grains', label: 'Grains', angle: -Math.PI / 4 },
		{ id: 'proteins', label: 'Protein', angle: Math.PI / 4 },
		{ id: 'fruits', label: 'Fruits', angle: (3 * Math.PI) / 4 },
		{ id: 'vegetables', label: 'Vegetables', angle: -(3 * Math.PI) / 4 },
	];
	function getLabelPos(angle, offset = 0) {
		return {
			x: cx + (r + offset) * Math.cos(angle),
			y: cy + (r + offset) * Math.sin(angle),
		};
	}
	return (
		<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '2.5rem 0' }}>
			<svg width="500" height="320" viewBox="0 0 500 320">
				<g>
					<path d="M250,160 L250,10 A150,150 0 0,1 400,160 Z" fill={colors.grains} stroke="#A25701" strokeWidth="2" />
					<path d="M250,160 L400,160 A150,150 0 0,1 250,310 Z" fill={colors.proteins} stroke="#A25701" strokeWidth="2" />
					<path d="M250,160 L250,310 A150,150 0 0,1 100,160 Z" fill={colors.fruits} stroke="#A25701" strokeWidth="2" />
					<path d="M250,160 L100,160 A150,150 0 0,1 250,10 Z" fill={colors.vegetables} stroke="#A25701" strokeWidth="2" />
				</g>
				{quadrantData.map(q => {
					const labelPos = getLabelPos(q.angle);
					return (
						<g key={q.id} pointerEvents="none">
							<text x={labelPos.x} y={labelPos.y} textAnchor="middle" fontSize="1.3rem" fill="#fff" fontWeight="bold" fontFamily="'Itim', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif">{q.label}</text>
							<text x={labelPos.x} y={labelPos.y + 22} textAnchor="middle" fontSize="1.1rem" fill="#fff" fontFamily="'Itim', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif">{percentages[q.id]}%</text>
						</g>
					);
				})}
				<circle cx="430" cy="160" r="55" fill={colors.dairy} stroke="#A25701" strokeWidth="2" />
				<text x="430" y="167" textAnchor="middle" fontSize="1.3rem" fill="#fff" fontWeight="bold" fontFamily="'Itim', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" pointerEvents="none">Dairy</text>
				<text x="430" y="187" textAnchor="middle" fontSize="1.1rem" fill="#fff" fontFamily="'Itim', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" pointerEvents="none">{percentages.dairy}%</text>
			</svg>
		</div>
	);
}

export default function ViewList() {
	const { selected, increaseItemCount, decreaseItemCount, removeSelectedItem } = useContext(GroceryContext);
	const navigate = useNavigate();
	const groups = Object.keys(selected || {});
	const totalCount = groups.reduce((sum, g) => sum + (selected[g] ? selected[g].length : 0), 0) || 0;

	// Calculate percentages for each group for the diagram
	const groupIds = ['grains', 'proteins', 'fruits', 'vegetables', 'dairy'];
	const counts = groupIds.reduce((acc, id) => {
		acc[id] = selected[id]?.length || 0;
		return acc;
	}, {});
	const total = groupIds.reduce((sum, id) => sum + counts[id], 0) || 1;
	const percentages = groupIds.reduce((acc, id) => {
		acc[id] = Math.round((counts[id] / total) * 100);
		return acc;
	}, {});

	// Helper to count occurrences of each item in a group
	function getItemCounts(arr) {
		const map = {};
		arr.forEach(item => { map[item] = (map[item] || 0) + 1; });
		return map;
	}

	return (
		<section className="viewlist-page">
			<nav className="viewlist-nav">
				<button className="back-btn" onClick={() => navigate('/create')}>Go back to plate</button>
			</nav>
			<div className="viewlist-content">
				<div className="list-box">
					<h2 className="list-title">Your List</h2>
					{totalCount === 0 ? (
						<p className="empty-msg">No items selected yet. Go to Create List to add items.</p>
					) : (
						<ul className="item-list">
							{groups.map(g => {
								const itemCounts = getItemCounts(selected[g]);
								return Object.entries(itemCounts).map(([item, count]) => (
									<li key={`${g}-${item}`} className="item-row">
										<span className="item-name">{item}</span>
										<span className="item-controls icons">
											<span className="icon-btn" onClick={() => decreaseItemCount(g, item)} title="Decrease">−</span>
											<span className="item-count">{count}x</span>
											<span className="icon-btn" onClick={() => increaseItemCount(g, item)} title="Increase">+</span>
											<span className="icon-btn delete" onClick={() => removeSelectedItem(g, item)} title="Delete"><FaTrashAlt /></span>
										</span>
									</li>
								));
							})}
						</ul>
					)}
				</div>
				<div className="viewlist-side">
					<div className="diagram-section">
						<h2 className="diagram-title">Diagram of Balances</h2>
						<PlateDiagramStatic percentages={percentages} />
					</div>
				</div>
			</div>
		</section>
	);
}
