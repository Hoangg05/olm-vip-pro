import React, { Fragment, useEffect, useState } from "react";
import logo from "../images/logo/logo.png";
import * as enc from "crypto-js/enc-utf8";
import { Avatar, Icon } from "../customs/navbar.styled";
import {
	ChangeImages,
	Information,
	Name,
	Profile,
	TableProperties,
	User
} from "../customs/profile.styled";
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL
} from "firebase/storage";
import LoadingScreen from "../../loading_screen";
import app from "../../firebase/firebase";
import { updateProfile, getAuth } from "firebase/auth";
import { useParams } from "react-router-dom";
import { doc, getFirestore, updateDoc } from "firebase/firestore";

function ProfileComponent({ userEncode, Base64, dataUserEncode, setID }) {
	const auth = getAuth(app);
	const storage = getStorage();
	const fs = getFirestore(app);

	const { id } = useParams();

	const [loading, setLoading] = useState(false);

	const user_id = userEncode
		? JSON.parse(Base64.decrypt(userEncode, "hoangyuri").toString(enc))
		: null;

	const data_user = dataUserEncode
		? JSON.parse(Base64.decrypt(dataUserEncode, "hoangyuri").toString(enc))
		: null;

	useEffect(
		() => {
			if (id !== "me") {
				setID(id);
			} else {
				setID(user_id);
			}
		},
		[id, setID, user_id]
	);

	const changeAvatar = async e => {
		const file = e.target.files[0];

		const metadata = { contentType: "image/jpeg" };

		const storageRef = ref(storage, `avatar/${user_id}/${file.name}`);
		const uploadTask = uploadBytesResumable(storageRef, file, metadata);

		await uploadTask.on(
			"state_changed",
			snapshot => {
				setLoading(true);
			},
			error => {
				switch (error.code) {
					case "storage/unauthorized":
						console.log("You don't have a permission");
						break;
					case "storage/canceled":
						console.log("You was canceled");
						break;

					default:
						console.log("Unknown error");
						break;
				}
			},
			async () => {
				await getDownloadURL(
					uploadTask.snapshot.ref
				).then(async downloadURL => {
					await updateProfile(auth.currentUser, {
						photoURL: downloadURL
					});
					await updateDoc(doc(fs, "users", user_id), {
						photoURL: downloadURL
					})
						.then(() => setLoading(false))
						.catch(() => console.log("Unknown error"));
				});
			}
		);
	};
	return (
		<Fragment>
			{!loading
				? <Profile>
						<User>
							<Avatar width="20vh" height="20vh">
								<Icon
									full
									src={
										data_user
											? data_user.photoURL
												? data_user.photoURL
												: logo
											: logo
									}
									alt={`Avatar của ${data_user &&
										data_user.displayName} ${data_user &&
									!data_user.photoURL
										? "(avatar mặc định)"
										: ""}`}
								/>
							</Avatar>
							<Information>
								<Name>
									{data_user && data_user.displayName}
								</Name>
								<ul>
									<li>Lớp: 11D7</li>
									{data_user &&
										user_id &&
										user_id === data_user.uid &&
										<Fragment>
											<li>
												Tên đăng nhập:{" "}
												{data_user.username}
											</li>
											<li>
												<ChangeImages htmlFor="avatar">
													<input
														type="file"
														id="avatar"
														accept="image/png, image/jpeg"
														onChange={e =>
															changeAvatar(e)}
														disabled={loading}
													/>
													<p>Đổi ảnh hiển thị</p>
												</ChangeImages>
											</li>
										</Fragment>}
								</ul>
							</Information>
						</User>
						<TableProperties>
							<div>
								<p>Thông tin liên kết tài khoản: </p>
								<p>Mã ID:</p>
								<p>Ngày đăng kí:</p>
								<p>Vai trò:</p>
								<p>
									{data_user && data_user.vip.__value
										? `Gói VIP "${data_user.vip.__package
												.__name}":`
										: "Chưa mua VIP"}
								</p>
							</div>
							<div>
								<p>
									{data_user && data_user.eop}
								</p>
								<p>
									{data_user && data_user.uid}
								</p>
								<p>
									{data_user &&
										new Date(
											data_user.timeCreated
										).toDateString()}
								</p>
								<p>
									{data_user &&
										{
											student: "Học sinh",
											teacher: "Giáo viên",
											admin: "Quản trị viên",
											null: ""
										}[data_user.role]}
								</p>
								<p>
									{data_user && data_user.vip.__value
										? data_user.vip.__time.__buyAt +
											" - " +
											data_user.vip.__time.__endAt
										: false}
								</p>
							</div>
						</TableProperties>
					</Profile>
				: <LoadingScreen p={true} />}
		</Fragment>
	);
}

export default ProfileComponent;
