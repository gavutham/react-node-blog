import { useEffect } from "react";
import { useState } from "react";
import Header from "../../components/Header/Header";
import Posts from "../../components/Posts/Posts";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./home.css";
import api from "../../apiRequest";
import { useLocation } from "react-router-dom";

const Home = () => {
	const [posts, setPosts] = useState([]);
	const { search } = useLocation();

	useEffect(() => {
		async function getPost() {
			const res = await api.get("/posts/" + search);
			setPosts(res.data);
		}
		getPost();
	}, [search]);

	return (
		<>
			<Header />
			<div className="home">
				<Posts posts={posts} />
				<Sidebar />
			</div>
		</>
	);
};

export default Home;
