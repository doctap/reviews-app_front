import axios from "axios";

export const API_CONFIG = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL || 'http://localhost:3000',
	withCredentials: true,
})