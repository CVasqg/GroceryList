import React, { useContext } from 'react';
import { GroceryContext } from '../App';

export default function ViewList() {
	const { selected } = useContext(GroceryContext);

	const groups = Object.keys(selected || {});
	const totalCount = groups.reduce((sum, g) => sum + (selected[g] ? selected[g].length : 0), 0) || 0;

	return (
		<section>
			<h1>Your Final Grocery List</h1>
			{totalCount === 0 ? (
				<p>No items selected yet. Go to Create List to add items.</p>
			) : (
				<>
					<h2>Items</h2>
					<ul>
						{groups.map(g => (
							selected[g].map(item => <li key={`${g}-${item}`}>{item} <small>({g})</small></li>)
						))}
					</ul>

					<h2>Percent by Food Group</h2>
					<ul>
						{groups.map(g => {
							const count = selected[g] ? selected[g].length : 0;
							const pct = totalCount ? Math.round((count / totalCount) * 100) : 0;
							return (
								<li key={g}>
									<strong style={{ textTransform: 'capitalize' }}>{g}</strong>: {count} item(s) — {pct}%
								</li>
							);
						})}
					</ul>
				</>
			)}
		</section>
	);
}
