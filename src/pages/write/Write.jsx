import { useContext, useState } from "react";
import "./write.css";
import api from "../../apiRequest";
import { Context } from "../../context/Context";

const Write = () => {
	const [title, setTitle] = useState("");
	const [desc, setDesc] = useState("");
	const [category, setCategory] = useState("");
	const [file, setFile] = useState(null);
	const { user } = useContext(Context);

	const handleSubmit = async (e) => {
		e.preventDefault();
		var categories;
		if (category !== "") {
			categories = category.split(",");
			for (let i = 0; i < categories.length; i++) {
				categories[i] = categories[i].trim().toLowerCase();
			}
		} else {
			categories = [];
		}
		const post = {
			username: user.username,
			title,
			desc,
			categories,
		};
		console.log(post);
		if (file) {
			const data = new FormData();
			const filename = Date.now() + file.name;
			data.append("name", filename);
			data.append("file", file);
			post.photo = filename;
			try {
				await api.post("/upload", data);
			} catch (err) {
				console.log(err);
			}
		}
		try {
			const res = await api.post("/posts", post);
			window.location.replace("/post/" + res.data._id);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="write">
			{file && (
				<img src={URL.createObjectURL(file)} alt="" className="writeImg" />
			)}
			<form className="writeForm" onSubmit={handleSubmit}>
				<div className="writeFormGroup">
					<label htmlFor="fileInput">
						<i className="writeIcon fa-solid fa-plus"></i>
					</label>
					<input
						type="file"
						id="fileInput"
						style={{ display: "none" }}
						onChange={(e) => setFile(e.target.files[0])}
					/>
					<input
						type="text"
						placeholder="Title"
						className="writeInput"
						autoFocus={true}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<div className="writeFormGroup">
					<input
						type="text"
						placeholder="Category"
						className="writeInput"
						autoFocus={true}
						onChange={(e) => setCategory(e.target.value)}
					/>
				</div>
				<div className="writeFormGroup">
					<textarea
						placeholder="Share the information on your mind..."
						className="writeInput writeText"
						onChange={(e) => setDesc(e.target.value)}
					></textarea>
				</div>
				<button className="writeSubmit" type="submit">
					Publish
				</button>
			</form>
		</div>
	);
};

export default Write;
