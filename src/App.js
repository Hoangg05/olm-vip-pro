import React, { Fragment, useContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import HomeComponent from "./components/HomeScreen/_home_";
import Navbar from "./components/Navbar/nav";
import LoginComponent from "./components/Login and Register/login";
import E404 from "./components/404/404";
import { ToastContainer } from "react-toastify";
import LoadingScreen from "./loading_screen";
import RegisterComponent from "./components/Login and Register/res";
import ProfileComponent from "./components/Profile/profile";
import FooterComponent from "./components/Footer/footer";
import ClassComponent from "./components/Class/class";
import MainScreenExam from "./components/Exam/main";
import { HandleContext } from "./Context";

function MainComponent() {
	const [h, _h_] = useState(0);
	const [dropdown, isDrop] = useState(false);

	const { user_data_login, load } = useContext(HandleContext);

	return (
		<BODY
			h={h}
			onClick={() => {
				if (dropdown) isDrop(false);
			}}>
			{!load
				? <Fragment>
						<ToastContainer />
						<BrowserRouter>
							<Navbar key={0} isDrop={isDrop} dropdown={dropdown} />
							<Routes>
								<Route
									path="/"
									exact
									element={<HomeComponent />}
								/>
								<Route
									path="/login"
									exact
									element={<LoginComponent />}
								/>
								<Route
									path="/register"
									exact
									element={<RegisterComponent />}
								/>
								<Route
									path="/profile/:id"
									exact
									element={
										<Fragment>
											{user_data_login
												? <ProfileComponent />
												: <E404 />}
										</Fragment>
									}
								/>
								<Route
									path="/my-class"
									exact
									element={
										<Fragment>
											{user_data_login
												? <ClassComponent />
												: <E404 />}
										</Fragment>
									}
								/>
								<Route
									path="/exam/*"
									exact
									element={
										<Fragment>
											{user_data_login
												? <MainScreenExam />
												: <E404 />}
										</Fragment>
									}
								/>
								<Route path="*" exact element={<E404 />} />
							</Routes>
						</BrowserRouter>
						<FooterComponent heightReturn={_h_} />
					</Fragment>
				: <LoadingScreen />}
		</BODY>
	);
}

const BODY = styled.div`
	padding-top: 65px;
	background: ${props => props.background || "#fff"};
	width: 100%;
	min-height: 95vh;
	display: grid;
	align-items: baseline;
	grid-template-rows: 1fr auto;
`;

export default React.memo(MainComponent);
