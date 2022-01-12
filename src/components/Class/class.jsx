import React, { useEffect } from "react";
import * as enc from "crypto-js/enc-utf8";
import { getFirestore } from "firebase/firestore";
import app from "../../firebase/firebase";
import LoadingScreen from "../../loading_screen";
import { useNavigate } from "react-router-dom";
import StudentThemes from "./student/studentThemes";
import { lectures } from "../__data__.module";
import TeacherThemes from "./teacher/teacherThemes";

const ClassComponent = ({ userEncode, dataUserEncode, Base64, setID }) => {
	//!!! Variables !!!//
	const fs = getFirestore(app);
	const user = userEncode
		? JSON.parse(Base64.decrypt(userEncode, "hoangyuri").toString(enc))
		: null;
	const data_user = userEncode
		? JSON.parse(Base64.decrypt(dataUserEncode, "hoangyuri").toString(enc))
		: null;

	const history = useNavigate();

	const customStyles = {
		option: (provided, state) => ({
			...provided,
			color: state.isSelected ? "#fff" : "#333"
		}),
		control: () => ({
			margin: "20px 0",
			width: "100%",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			border: "1px solid #ccc"
		}),
		menu: () => ({
			position: "absolute",
			width: "100%",
			background: "#fff",
			border: "1px solid #ddd"
		})
	};

	useEffect(() => {
		let c = false;
		if (c) return;
		setID(user.uid);
		return () => (c = true);
	});

	return user && data_user
		? data_user.role === "student"
			? <StudentThemes
					user={user}
					history={history}
					lectures={lectures}
					data_user={data_user}
					customStyles={customStyles}
					setID={setID}
					fs={fs}
					Base64={Base64}
				/>
			: <TeacherThemes
					user={user}
					history={history}
					lectures={lectures}
					data_user={data_user}
					customStyles={customStyles}
					fs={fs}
				/>
		: <LoadingScreen p />;
};

export default ClassComponent;
