import React, { useContext } from "react";
import LoadingScreen from "../../loading_screen";
import { useNavigate } from "react-router-dom";
import StudentThemes from "./student/studentThemes";
import TeacherThemes from "./teacher/teacherThemes";
import { HandleContext } from "../../Context";

const ClassComponent = () => {
	const { user_data_login, user_data_store, fs } = useContext(HandleContext);

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

	return user_data_login && user_data_store
		? user_data_store.role === "student"
			? <StudentThemes history={history} customStyles={customStyles} />
			: <TeacherThemes
					history={history}
					customStyles={customStyles}
					fs={fs}
				/>
		: <LoadingScreen p={true} />;
};

export default React.memo(ClassComponent);
