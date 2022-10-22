import axios from "axios";

const BASE_URL = "https://react-node-blogapi.herokuapp.com/api/";

export default axios.create({
	baseURL: BASE_URL,
});
