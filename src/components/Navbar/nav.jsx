import React, { Fragment, memo } from "react";
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

function Navbar({ userEncode, isDrop, dropdown, Base64, enc }) {
	const user = JSON.parse(
		Base64.decrypt(userEncode, "hoangyuri").toString(enc)
	);

	return (
		<CustomNavbar>
			<Part>
				<Part as="a" href="/" icon>
					<Icon draggable={false} src={logo} />
				</Part>
				<Child as="a" href="/study">
					học bài
				</Child>
				<Child as="a" href="/ask">
					hỏi bài
				</Child>
				<Child as="a" href="/help">
					trợ giúp
				</Child>
				<Child as="a" href="/my-class">
					lớp của tôi
				</Child>
				<Child hasIcon>
					<BsThreeDots />
				</Child>
			</Part>
			<Part>
				{!user &&
					<Fragment>
						<Part as="a" href="/login">
							<Child isButton as="button" role="login">
								Đăng nhập
							</Child>
						</Part>
						<Part as="a" href="/register">
							<Child isButton as="button">
								Đăng ký
							</Child>
						</Part>
					</Fragment>}
				{user &&
					<Part>
						<Avatar>
							<Icon
								draggable={false}
								full
								src={
									user
										? user.photoURL ? user.photoURL : logo
										: logo
								}
							/>
						</Avatar>
						<UserConfig>
							<Part
								onClick={() => isDrop(dropdown ? false : true)}>
								<h4>
									{user.displayName}
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
													user
														? user.photoURL
															? user.photoURL
															: logo
														: logo
												}
											/>
										</Avatar>
									</Part>
									<Part column>
										<Child as="a" href="/profile/me" normal>
											Trang cá nhân
										</Child>
										<Child
											as="a"
											href="/buy-vip"
											color="blue"
											normal>
											Nạp VIP
										</Child>
										<Child
											color="red"
											normal
											onClick={() =>
												signOut(getAuth(app))}>
											Thoát
										</Child>
									</Part>
								</PartDropDown>}
						</UserConfig>
					</Part>}
			</Part>
		</CustomNavbar>
	);
}

export default memo(Navbar);
