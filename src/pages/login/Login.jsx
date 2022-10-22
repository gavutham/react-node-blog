import "./login.css";
import { Link } from "react-router-dom";
import { useContext, useRef } from "react";
import { Context } from "../../context/Context";
import api from "../../apiRequest";

const Login = () => {
	const emailRef = useRef();
	const passRef = useRef();
	const { dispatch, isFetching } = useContext(Context);

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch({ type: "LOGIN_START" });
		try {
			const res = await api.post("/auth/login", {
				email: emailRef.current.value,
				password: passRef.current.value,
			});
			dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
		} catch (err) {
			dispatch({ type: "LOGIN_FAILURE" });
		}
	};

	return (
		<div className="login" onSubmit={handleSubmit}>
			<span className="loginTitle">Login</span>
			<form className="loginForm">
				<label>Email</label>
				<input ref={emailRef} type="email" placeholder="Enter your email..." />
				<label>Password</label>
				<input ref={passRef} type="password" />
				<button className="loginButton">Login</button>
			</form>
			<button className="loginRegisterButton" disabled={isFetching}>
				<Link className="link" type="submit" to={"/register"}>
					Register
				</Link>
			</button>
		</div>
	);
};

export default Login;
