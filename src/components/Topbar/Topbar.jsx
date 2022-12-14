import "./topbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";

const Topbar = () => {
	const { user, dispatch } = useContext(Context);
	const PF = "https://blogapi-yh0r.onrender.com/images/";

	const handleLogout = () => {
		dispatch({ type: "LOGOUT" });
	};
	return (
		<div className="topbar">
			<div className="topLeft">
				<i className="topIcon fa-brands fa-square-facebook"></i>
				<i className="topIcon fa-brands fa-square-twitter"></i>
				<i className="topIcon fa-brands fa-square-pinterest"></i>
				<i className="topIcon fa-brands fa-square-instagram"></i>
			</div>
			<div className="topCenter">
				<ul className="topList">
					<li className="topListItem">
						<Link className="link" to={"/"}>
							HOME
						</Link>
					</li>
					<li className="topListItem">ABOUT</li>
					<li className="topListItem">CONTACT</li>
					<li className="topListItem">
						<Link className="link" to={"/write"}>
							WRITE
						</Link>
					</li>
					{user && (
						<li className="topListItem" onClick={handleLogout}>
							<Link className="link">LOGOUT</Link>
						</li>
					)}
				</ul>
			</div>
			<div className="topRight">
				{user ? (
					<Link to={"/settings"}>
						<img
							src={
								user.profilePic
									? PF + user.profilePic
									: "https://react-node-blog-site.netlify.app/assets/nouser.png"
							}
							alt="profile-img"
							className="topbarProfile"
						/>
					</Link>
				) : (
					<ul className="topList">
						<li className="topListItem">
							<Link className="link" to={"/login"}>
								LOGIN
							</Link>
						</li>
						<li className="topListItem">
							<Link className="link" to={"/register"}>
								REGISTER
							</Link>
						</li>
					</ul>
				)}

				<i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
			</div>
		</div>
	);
};

export default Topbar;
