import React from 'react';
import { useNavigate } from 'react-router-dom';

const GROUPS = [
	{ id: 'vegetables', name: 'Vegetables' },
	{ id: 'fruits', name: 'Fruits' },
	{ id: 'wholegrains', name: 'Grains' },
	{ id: 'proteins', name: 'Proteins' },
	{ id: 'dairy', name: 'Dairy' },
];

export default function CreateList() {
	const navigate = useNavigate();

	return (
		<section>
			<h1>Create Your Healthy Grocery List</h1>
			<p>Click a food group to view items and add selections.</p>
			<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
				{GROUPS.map(g => (
					<button key={g.id} onClick={() => navigate(`/group/${g.id}`)} style={{ padding: '1rem' }}>
						{g.name}
					</button>
				))}
			</div>
		</section>
	);
}
