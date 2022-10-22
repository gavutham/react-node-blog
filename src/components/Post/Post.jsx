import "./post.css";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
	const PF = "https://react-node-blogapi.herokuapp.com/images/";
	return (
		<div className="post">
			<img
				src={
					post.photo
						? PF + post.photo
						: "https://react-node-blog-site.netlify.app/assets/noimg.png"
				}
				alt="post-img"
				className="postImg"
			/>
			<div className="postInfo">
				<div className="postCats">
					{post.categories.map((c) => (
						<Link
							style={{ textDecoration: "none", color: "inherit" }}
							to={"/?cat=" + c}
						>
							<span className="postCat">{c}</span>
						</Link>
					))}
				</div>
				<Link to={`/post/${post._id}`} className="link">
					<span className="postTitle">{post.title}</span>
				</Link>
				<hr />
				<span className="postDate">
					{new Date(post.createdAt).toDateString()}
				</span>
			</div>
			<p className="postDesc">{post.desc}</p>
		</div>
	);
};

export default Post;
