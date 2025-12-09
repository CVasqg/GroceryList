import React from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';

export default function Navbar() {
	return (
		<nav className="gl-navbar">
			<div className="gl-brand">Balanced Plate</div>
			<div className="gl-links">
				<NavLink to="/about" className="gl-link" activeclassname="active">About</NavLink>
				<NavLink to="/create" className="gl-link" activeclassname="active">Create List</NavLink>
				<NavLink to="/view" className="gl-link" activeclassname="active">View List</NavLink>
			</div>
		</nav>
	);
}
