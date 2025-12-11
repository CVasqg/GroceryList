import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GroceryContext } from '../App';
import './createlist.css';

const GROUPS = [
	{ id: 'vegetables', name: 'Vegetables' },
	{ id: 'fruits', name: 'Fruits' },
	{ id: 'grains', name: 'Grains' },
	{ id: 'proteins', name: 'Proteins' },
	{ id: 'dairy', name: 'Dairy' },
];

export default function CreateList() {
	const navigate = useNavigate();
	const { selected } = useContext(GroceryContext);

	const hasItems = Object.values(selected).some(items => items && items.length > 0);

	return (
		<section>
			<h1>Create Your List</h1>
			<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
				{GROUPS.map(g => (
					<button key={g.id} onClick={() => navigate(`/group/${g.id}`)} style={{ padding: '1rem' }}>
						{g.name}
					</button>
				))}
			</div>
			{hasItems && (
				<div style={{ marginTop: '2rem', textAlign: 'center' }}>
					<button className="view-list-btn" onClick={() => navigate('/view')}>View your list</button>
				</div>
			)}
		</section>
	);
}
