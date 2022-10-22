import "./register.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import api from "../../apiRequest";

const Register = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [err, setErr] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErr(false);
		const user = {
			username,
			email,
			password,
		};
		try {
			const res = await api.post("/auth/register", user);
			res.data && window.location.replace("/login");
		} catch (err) {
			setErr(true);
		}
	};
	return (
		<div className="register">
			<span className="registerTitle">Register</span>
			<form className="registerForm" onSubmit={handleSubmit}>
				<label>Username</label>
				<input
					type="text"
					placeholder="Enter your username..."
					onChange={(e) => setUsername(e.target.value)}
				/>
				<label>Email</label>
				<input
					type="text"
					placeholder="Enter your email..."
					onChange={(e) => setEmail(e.target.value)}
				/>
				<label>Password</label>
				<input type="password" onChange={(e) => setPassword(e.target.value)} />
				<button type="submit" className="registerButton">
					Register
				</button>
			</form>
			<button className="registerLoginButton">
				<Link className="link" to={"/login"}>
					Login
				</Link>
			</button>
			{err && <span style={{ color: "red" }}>Something went wrong</span>}
		</div>
	);
};

export default Register;
