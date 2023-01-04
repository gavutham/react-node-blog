import "./settings.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useContext, useState } from "react";
import api from "../../apiRequest";
import { Context } from "../../context/Context";

const Settings = () => {
	const { user, dispatch } = useContext(Context);
	const [file, setFile] = useState(null);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [success, setSuccess] = useState(false);
	const PF = "https://blogapi-yh0r.onrender.com/images/";

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch({ type: "UPDATE_START" });
		const updatedUser = {
			userId: user._id,
			username: username !== "" ? username : user.username,
			email: email !== "" ? email : user.email,
			password: password !== "" ? password : user.password,
		};
		if (file) {
			const data = new FormData();
			const filename = Date.now() + file.name;
			data.append("name", filename);
			data.append("file", file);
			updatedUser.profilePic = filename;
			try {
				await api.post("/upload", data);
			} catch (err) {
				console.log(err);
			}
		}
		try {
			const res = await api.put("/users/" + user._id, updatedUser);
			setSuccess(true);
			dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
		} catch (err) {
			dispatch({ type: "UPDATE_FAILURE" });
		}
	};

	return (
		<div className="settings">
			<div className="settingsWrapper">
				<div className="settingsTitle">
					<span className="settingsUpdateTitle">Update Your Account</span>
					<span className="settingsDeleteTitle">Delete Your Account</span>
				</div>
				<form className="settingsForm" onSubmit={handleSubmit}>
					<label>Profile Picture</label>
					<div className="settingsPP">
						<img
							src={
								file
									? URL.createObjectURL(file)
									: user.profilePic
									? PF + user.profilePic
									: "https://react-node-blog-site.netlify.app/assets/nouser.png"
							}
							alt=""
						/>
						<label htmlFor="fileInput">
							<i className="settingsPPIcon fa-regular fa-user"></i>
						</label>
						<input
							type="file"
							style={{ display: "none" }}
							id="fileInput"
							onChange={(e) => setFile(e.target.files[0])}
						/>
					</div>
					<label>Username</label>
					<input
						type="text"
						placeholder={user.username}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<label>Email</label>
					<input
						type="text"
						placeholder={user.email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<label>Password</label>
					<input
						type="password"
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button className="settingsSubmit" type="submit">
						Update
					</button>
					{success && (
						<span
							style={{ color: "green", textAlign: "center", marginTop: "20px" }}
						>
							Profile has been updated
						</span>
					)}
				</form>
			</div>
			<Sidebar />
		</div>
	);
};

export default Settings;
