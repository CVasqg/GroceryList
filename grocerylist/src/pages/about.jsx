import React from 'react';
import { useNavigate } from 'react-router-dom';
import healthyPlate from '../assets/healthyplate.png';
import healthyPyramid from '../assets/healthypyramid.svg';
import './about.css';
import avatar1 from '../assets/raspberry.png';
import avatar2 from '../assets/cherry.png';
import avatar3 from '../assets/mango.png';
import avatar4 from '../assets/passionfruit.png';

export default function About() {
	const navigate = useNavigate();

	return (
		<section className="about-page">
			<div className="about-hero">
				<h1 className="page-title">Create Your Balanced Grocery List</h1>
				<button onClick={() => navigate('/create')}>Create List</button>
			</div>

			<div className="about-block">
				<div className="about-text">
					<h2>Why?</h2>
					<p>
						Many people struggle with eating well due to an overwhelming food market saturated with highly processed options and misleading “healthy” labels. This application helps users with limited nutrition knowledge quickly create balanced grocery lists rooted in science rather than trends.
					</p>
				</div>
			</div>

			<div className="about-block">				<div className="about-text">
					<h2>How it Works</h2>
					<p>
						Select items from different food groups to build your own healthy grocery list. Our application organizes foods into key food groups based on nutritional science, helping you create meals that follow the Healthy Eating Plate and Pyramid guidelines. View your selections as a breakdown by food group to ensure balanced nutrition.
					</p>
				</div>
			</div>

			<div className="about-block">				<div className="about-text">
					<h2>The Healthy Eating plate</h2>
					<p>
						The Healthy Eating Plate is a visual guide for creating balanced meals. It encourages the use of healthy oils, drinking mainly water, limiting sugary drinks, and keeping dairy intake moderate. The plate includes a reminder to stay physically active as part of maintaining overall health.
					</p>
				</div>
				<div className="about-media">
					<img src={healthyPlate} alt="Harvard Healthy Eating Plate" />
				</div>
			</div>

			<div className="about-block">
				<div className="about-text">
					<h2>The Healthy Eating Pyramid</h2>
					<p>
						The Healthy Eating Pyramid is a long-term guide that organizes foods into levels based on how often they should be eaten. Its base highlights daily physical activity and weight management as the foundation for health. The pyramid helps illustrate balanced eating patterns over time.
					</p>
				</div>
				<div className="about-media">
					<img src={healthyPyramid} alt="Harvard Healthy Eating Pyramid" />
				</div>
			</div>

			<footer className="about-footer">
				<div className="made-by">
					<h3>Made by</h3>
					<div className="creators">
						<div className="creator">
							<img className="avatar" src={avatar1} alt="creator 1" />
							<div className="creator-name">Anita Demirci</div>
						</div>
						<div className="creator">
							<img className="avatar" src={avatar2} alt="creator 2" />
							<div className="creator-name">Citlally Vasquez</div>
						</div>
						<div className="creator">
							<img className="avatar" src={avatar3} alt="creator 3" />
							<div className="creator-name">Belle Lopez</div>
						</div>
						<div className="creator">
							<img className="avatar" src={avatar4} alt="creator 4" />
							<div className="creator-name">Nathan Heidari</div>
						</div>
					</div>
				</div>
			</footer>
		</section>
	);
}
