import { initializeApp } from "firebase/app";

const firebaseConfig = {
	apiKey: "AIzaSyBOX_J0XpwbJwzgEZpPZr5siMRn-v8yug4",
	authDomain: "olm-vip-pro.firebaseapp.com",
	projectId: "olm-vip-pro",
	storageBucket: "olm-vip-pro.appspot.com",
	messagingSenderId: "156637200427",
	appId: "1:156637200427:web:5a1089d105a178f86d6a6e",
	measurementId: "G-4TV1NFJXR4"
};

const app = initializeApp(firebaseConfig);
export default app;
