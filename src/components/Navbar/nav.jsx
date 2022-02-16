import React, { Fragment, memo, useContext } from "react";
import logo from "../images/logo/logo.png";
import { BsThreeDots } from "react-icons/bs";
import { AiFillCaretDown } from "react-icons/ai";
import {
	Avatar,
	Child,
	CustomNavbar,
	Icon,
	Part,
	PartDropDown,
	UserConfig
} from "../customs/navbar.styled";
import { signOut, getAuth } from "firebase/auth";
import app from "../../firebase/firebase";
import { HandleContext } from "../../Context";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ isDrop, dropdown }) {
	const { user_data_login, user_data_store, hideNav } = useContext(
		HandleContext
	);
	const history = useNavigate();

	if (!hideNav)
		return (
			<CustomNavbar>
				<Part>
					<Part icon>
						<Link to="/">
							<Icon draggable={false} src={logo} />
						</Link>
					</Part>
					<Child>
						<Link to="/courses">học bài</Link>
					</Child>
					<Child>
						<Link to="/ask">hỏi bài</Link>
					</Child>
					<Child>
						<Link to="/help">trợ giúp</Link>
					</Child>
					<Child>
						<Link to="/my-class">lớp của tôi</Link>
					</Child>
					<Child hasIcon>
						<BsThreeDots />
					</Child>
				</Part>
				<Part>
					{!user_data_login &&
						<Fragment>
							<Part>
								<Link to="/login">
									<Child isButton as="button" role="login">
										Đăng nhập
									</Child>
								</Link>
							</Part>
							<Part>
								<Link to="/register">
									<Child isButton as="button">
										Đăng ký
									</Child>
								</Link>
							</Part>
						</Fragment>}
					{user_data_login &&
						<Part>
							<Avatar>
								<Icon
									draggable={false}
									full
									src={
										user_data_login
											? user_data_login.photoURL
												? user_data_login.photoURL
												: logo
											: logo
									}
								/>
							</Avatar>
							<UserConfig>
								<Part
									onClick={() =>
										isDrop(dropdown ? false : true)}>
									<h4>
										{user_data_login.displayName}
									</h4>
									<AiFillCaretDown />
								</Part>
								{dropdown &&
									<PartDropDown isdrop={dropdown}>
										<Part column hasImage>
											<Avatar width="8rem" height="8rem">
												<Icon
													full
													draggable={false}
													src={
														user_data_login
															? user_data_login.photoURL
																? user_data_login.photoURL
																: logo
															: logo
													}
												/>
											</Avatar>
										</Part>
										<Part column>
											<Child normal>
												<Link to="/profile/me">
													Trang cá nhân
												</Link>
											</Child>
											<Child normal>
												<Link to="/buy-vip">
													Nạp VIP
												</Link>
											</Child>
											{user_data_store &&
												user_data_store.role !==
													"student" &&
												<Child normal>
													<Link to="/exam">
														Trang giao bài
													</Link>
												</Child>}
											<Child
												color="red"
												normal
												onClick={() => {
													history("/");
													signOut(getAuth(app));
												}}>
												Thoát
											</Child>
										</Part>
									</PartDropDown>}
							</UserConfig>
						</Part>}
				</Part>
			</CustomNavbar>
		);
	return false;
}

export default memo(Navbar);
