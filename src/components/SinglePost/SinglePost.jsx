import "./singlePost.css";
import { useLocation } from "react-router";
import { useContext, useEffect } from "react";
import api from "../../apiRequest";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";

const SinglePost = () => {
	const location = useLocation();
	const id = location.pathname.split("/")[2];
	const [post, setPost] = useState({});
	const PF = "https://react-node-blogapi.herokuapp.com/images/";
	const { user } = useContext(Context);
	const [title, setTitle] = useState("");
	const [desc, setDesc] = useState("");
	const [updatemode, setUpdatemode] = useState(false);

	useEffect(() => {
		async function getPost() {
			const res = await api.get("/posts/" + id);
			setPost(res.data);
			setTitle(res.data.title);
			setDesc(res.data.desc);
		}
		getPost();
	}, [id]);

	const handleDelete = async () => {
		try {
			await api.delete("/posts/" + id, { data: { username: user.username } });
			window.location.replace("/");
		} catch (err) {
			console.log(err);
		}
	};

	const handleUpdate = async () => {
		try {
			await api.put(`/posts/${post._id}`, {
				username: user.username,
				title,
				desc,
			});
		} catch (err) {
			console.log(err);
		}
		setUpdatemode(false);
		window.location.reload();
	};

	return (
		<div className="singlePost">
			<div className="singlePostWrapper">
				<img
					src={
						post.photo
							? PF + encodeURIComponent(post.photo)
							: "https://react-node-blog-site.netlify.app/assets/noimg.png"
					}
					alt=""
					className="singlePostImg"
				/>
				{updatemode ? (
					<input
						type="text"
						value={title}
						className="singlePostTitleInput"
						autoFocus
						onChange={(e) => setTitle(e.target.value)}
					/>
				) : (
					<h1 className="singlePostTitle">
						{post.title}
						{post.username === user?.username && (
							<div className="singlePostEdit">
								<i
									className="singlePostIcon fa-regular fa-pen-to-square"
									onClick={() => setUpdatemode(true)}
								></i>
								<i
									className="singlePostIcon fa-solid fa-trash"
									onClick={handleDelete}
								></i>
							</div>
						)}
					</h1>
				)}

				<div className="singlePostInfo">
					<span className="singlePostAuthor">
						Author:
						<Link to={"/?user=" + post.username} className="link">
							<b>{post.username}</b>
						</Link>
					</span>
					<span className="singlePostDate">
						{new Date(post.createdAt).toDateString()}
					</span>
				</div>
				{updatemode ? (
					<textarea
						className="singlePostDescInput"
						value={desc}
						onChange={(e) => setDesc(e.target.value)}
					/>
				) : (
					<p className="singlePostDesc">{post.desc}</p>
				)}
				{updatemode && (
					<button className="singlePostButton" onClick={handleUpdate}>
						Update
					</button>
				)}
			</div>
		</div>
	);
};

export default SinglePost;
