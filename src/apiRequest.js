import axios from "axios";

const BASE_URL = "https://blogapi-yh0r.onrender.com/api/";

export default axios.create({
	baseURL: BASE_URL,
});
