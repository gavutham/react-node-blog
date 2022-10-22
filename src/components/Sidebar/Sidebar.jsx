// import { useEffect, useState } from "react";
import "./sidebar.css";
// import api from "../../apiRequest";
import { Link } from "react-router-dom";

const Sidebar = () => {
	const cats = ["music", "tech", "food", "lifestyle"];

	return (
		<div className="sidebar">
			{/* <div className="sidebarItem">
				<span className="sidebarTitle">ABOUT ME</span>
				<img
					src="https://images.pexels.com/photos/2773977/pexels-photo-2773977.jpeg?auto=compress&cs=tinysrgb&w=400"
					alt=""
				/>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Voluptate qui
					necessitatibus nostrum illum reprehenderit.
				</p>
			</div> */}
			<div className="sidebarItem">
				<span className="sidebarTitle">CATEGORIES</span>
				<ul className="sidebarList">
					{cats?.map((cat) => (
						<Link to={"/?cat=" + cat} className="link" key={cat}>
							<li className="sidebarListItem">{cat}</li>
						</Link>
					))}
				</ul>
			</div>
			<div className="sidebarItem">
				<span className="sidebarTitle">FOLLOW US</span>
				<div className="sidebarSocial">
					<i className="sidebarIcon fa-brands fa-square-facebook"></i>
					<i className="sidebarIcon fa-brands fa-square-twitter"></i>
					<i className="sidebarIcon fa-brands fa-square-pinterest"></i>
					<i className="sidebarIcon fa-brands fa-square-instagram"></i>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
