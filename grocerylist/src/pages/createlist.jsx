import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GroceryContext } from '../App';
import './createlist.css';

function PlateDiagram({ onSelect, percentages, disableClicks }) {
	// Colors for each category
	const colors = {
		grains: '#F4B942',
		proteins: '#7B3FA0', // purple for protein
		fruits: '#E94F37',
		vegetables: '#4CAF50',
		dairy: '#4F8FE9',
	};
	// Center of the plate and radius for label placement
	const cx = 250, cy = 160, r = 90; // r is less than plate radius for better centering
	// Angles for each quadrant (in radians)
	const quadrantData = [
		{ id: 'grains', label: 'Grains', angle: -Math.PI / 4 },      // top right
		{ id: 'proteins', label: 'Protein', angle: Math.PI / 4 },    // bottom right
		{ id: 'fruits', label: 'Fruits', angle: (3 * Math.PI) / 4 }, // bottom left
		{ id: 'vegetables', label: 'Vegetables', angle: -(3 * Math.PI) / 4 }, // top left
	];
	// Helper to get label positions
	function getLabelPos(angle, offset = 0) {
		return {
			x: cx + (r + offset) * Math.cos(angle),
			y: cy + (r + offset) * Math.sin(angle),
		};
	}
	// If disableClicks, don't attach onClick
	const getClick = id => disableClicks ? undefined : () => onSelect(id);
	return (
		<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '2.5rem 0' }}>
			<svg width="500" height="320" viewBox="0 0 500 320" style={{ cursor: disableClicks ? 'default' : 'pointer' }}>
				{/* Main plate (large circle) - 4 pizza slices */}
				<g>
					{/* Each quadrant as a path */}
					{/* Grains */}
					<path d="M250,160 L250,10 A150,150 0 0,1 400,160 Z" fill={colors.grains} stroke="#A25701" strokeWidth="2" onClick={getClick('grains')} style={{ cursor: disableClicks ? 'default' : 'pointer' }} />
					{/* Proteins */}
					<path d="M250,160 L400,160 A150,150 0 0,1 250,310 Z" fill={colors.proteins} stroke="#A25701" strokeWidth="2" onClick={getClick('proteins')} style={{ cursor: disableClicks ? 'default' : 'pointer' }} />
					{/* Fruits */}
					<path d="M250,160 L250,310 A150,150 0 0,1 100,160 Z" fill={colors.fruits} stroke="#A25701" strokeWidth="2" onClick={getClick('fruits')} style={{ cursor: disableClicks ? 'default' : 'pointer' }} />
					{/* Vegetables */}
					<path d="M250,160 L100,160 A150,150 0 0,1 250,10 Z" fill={colors.vegetables} stroke="#A25701" strokeWidth="2" onClick={getClick('vegetables')} style={{ cursor: disableClicks ? 'default' : 'pointer' }} />
				</g>
				{/* Labels and percentages for each slice, percentage always below label */}
				{quadrantData.map(q => {
					const labelPos = getLabelPos(q.angle);
					return (
						<g key={q.id} pointerEvents="none">
							<text x={labelPos.x} y={labelPos.y} textAnchor="middle" fontSize="1.3rem" fill="#fff" fontWeight="bold" fontFamily="'Itim', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif">{q.label}</text>
							<text x={labelPos.x} y={labelPos.y + 22} textAnchor="middle" fontSize="1.1rem" fill="#fff" fontFamily="'Itim', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif">{percentages[q.id]}%</text>
						</g>
					);
				})}
				{/* Dairy plate (small circle) - positioned to the right of the main plate */}
				<circle cx="430" cy="160" r="55" fill={colors.dairy} stroke="#A25701" strokeWidth="2" onClick={disableClicks ? undefined : () => onSelect('dairy')} style={{ cursor: disableClicks ? 'default' : 'pointer' }} />
				<text x="430" y="167" textAnchor="middle" fontSize="1.3rem" fill="#fff" fontWeight="bold" fontFamily="'Itim', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" pointerEvents="none">Dairy</text>
				<text x="430" y="187" textAnchor="middle" fontSize="1.1rem" fill="#fff" fontFamily="'Itim', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" pointerEvents="none">{percentages.dairy}%</text>
			</svg>
		</div>
	);
}

export default function CreateList() {
	const navigate = useNavigate();
	const { selected, resetSelected } = useContext(GroceryContext);
	const hasItems = Object.values(selected).some(items => items && items.length > 0);

	// Calculate percentages for each group
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

	function handleSelect(groupId) {
		navigate(`/group/${groupId}`);
	}

	return (
		<section className="createlist-page">
			<div className="createlist-container">

				<div className="createlist-main">
					<nav className="createlist-nav">
						<div className="createlist-header">
							<h1>Create Your List</h1>
							<p className="createlist-subheader">Choose your food category</p>
						</div>
						<button className="start-new-btn" onClick={() => {
						resetSelected();
						navigate('/create');
					}}>Start New List</button>
					</nav>
					<PlateDiagram onSelect={handleSelect} percentages={percentages} />
					{hasItems && (
						<div style={{ marginTop: '2rem', textAlign: 'center' }}>
							<button className="view-list-btn" onClick={() => navigate('/view')}>View your list</button>
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
