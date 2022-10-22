import "./header.css";

const Header = () => {
	return (
		<div className="header">
			<div className="headerTitles">
				<span className="headerTitleSmall">React & Node</span>
				<span className="headerTitleLarge">Blog</span>
			</div>
			<img
				src="https://images.pexels.com/photos/2499793/pexels-photo-2499793.jpeg?auto=compress&cs=tinysrgb&w=2000"
				alt=""
				className="headerImg"
			/>
		</div>
	);
};

export default Header;
