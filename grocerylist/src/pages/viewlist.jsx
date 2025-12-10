
import React, { useContext } from 'react';
import { GroceryContext } from '../App';
import { useNavigate } from 'react-router-dom';
import './viewlist.css';

export default function ViewList() {
	const { selected } = useContext(GroceryContext);
	const navigate = useNavigate();
	const groups = Object.keys(selected || {});
	const totalCount = groups.reduce((sum, g) => sum + (selected[g] ? selected[g].length : 0), 0) || 0;

	return (
		<section className="viewlist-page">
			<nav className="viewlist-nav">
				<button className="back-btn" onClick={() => navigate('/')}>Go back to plate</button>
			</nav>
			<div className="viewlist-content">
				<div className="list-box">
					  <h2 className="list-title">Your List</h2>
					{totalCount === 0 ? (
						<p className="empty-msg">No items selected yet. Go to Create List to add items.</p>
					) : (
						<ul className="item-list">
							{groups.map(g => (
								selected[g].map(item => (
									<li key={`${g}-${item}`} className="item-row">
										<span className="item-name">{item}</span>
										<span className="item-count">1x</span>
									</li>
								))
							))}
						</ul>
					)}
				</div>
				<div className="viewlist-side">
					<div className="plate-box">
						<h2 className="plate-title">Your Plate</h2>
						<ul className="percent-list">
							{groups.map(g => {
								const count = selected[g] ? selected[g].length : 0;
								const pct = totalCount ? Math.round((count / totalCount) * 100) : 0;
								return (
									<li key={g} className="percent-row">
										<span className="percent-group">{g.charAt(0).toUpperCase() + g.slice(1)}</span> - <span className="percent-value">{pct}%</span>
									</li>
								);
							})}
						</ul>
					</div>
					<div className="diagram-section">
						<h2 className="diagram-title">Diagram of Balances</h2>
						{/* You can add your diagram image or SVG here */}
						<div className="diagram-placeholder">[Diagram Here]</div>
					</div>
				</div>
			</div>
		</section>
	);
}
