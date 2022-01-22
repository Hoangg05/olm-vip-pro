import React, { Fragment, useContext, useEffect, useState } from "react";
import logo from "../images/logo/logo.png";
import { Avatar, Icon } from "../customs/navbar.styled";
import {
	ChangeImages,
	Information,
	Name,
	Profile,
	TableProperties,
	User
} from "../customs/profile.styled";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import LoadingScreen from "../../loading_screen";
import { updateProfile } from "firebase/auth";
import { useParams } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { HandleContext } from "../../Context";

function ProfileComponent() {
	const {
		user_data_login,
		user_data_store,
		fs,
		auth,
		ConfigDataUser,
		storage
	} = useContext(HandleContext);

	const { id } = useParams();

	useEffect(
		() => {
			let c = false;
			if (c) return;
			ConfigDataUser(id);
		},
		[id, ConfigDataUser]
	);

	const [loading, setLoading] = useState(false);

	const changeAvatar = async e => {
		const file = e.target.files[0];

		const metadata = { contentType: "image/jpeg" };

		const storageRef = ref(
			storage,
			`avatar/${user_data_login.uid}/${file.name}`
		);
		const uploadTask = uploadBytesResumable(storageRef, file, metadata);

		await uploadTask.on(
			"state_changed",
			snapshot => {
				setLoading(true);
			},
			error => {
				switch (error.code) {
					case "storage/unauthorized":
						alert(
							"Anh zai à anh không có quyền truy cập kho lưu trữ :V"
						);
						break;
					case "storage/canceled":
						alert("Bạn đã hủy tiến trình thay đổi ảnh này!");
						break;

					default:
						alert("Xảy ra lỗi không xác định khi thay đổi ảnh!");
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
					await updateDoc(doc(fs, "users", user_data_login.uid), {
						photoURL: downloadURL
					})
						.then(() => setLoading(false))
						.catch(() =>
							alert("Xảy ra lỗi không xác định khi thay đổi ảnh!")
						);
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
										user_data_login
											? user_data_login.photoURL
												? user_data_login.photoURL
												: logo
											: logo
									}
									alt={`Avatar của ${user_data_login &&
										user_data_login.displayName} ${user_data_login &&
									!user_data_login.photoURL
										? "(avatar mặc định)"
										: ""}`}
								/>
							</Avatar>
							<Information>
								<Name>
									{user_data_login &&
										user_data_login.displayName}
								</Name>
								<ul>
									<li>Lớp: 11D7</li>
									{user_data_login &&
										user_data_login.uid &&
										(user_data_login.uid === id ||
											id === "me") &&
										<Fragment>
											<li>
												Tên đăng nhập:{" "}
												{user_data_login.displayName}
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
									{user_data_store &&
									user_data_store.vip.__value
										? `Gói VIP "${user_data_store.vip
												.__package.__name}":`
										: "Chưa mua VIP"}
								</p>
							</div>
							<div>
								<p>
									{user_data_login &&
									(user_data_login.uid === id || id === "me") &&
									user_data_store
										? user_data_store.eop
										: "******"}
								</p>
								<p>
									{user_data_login && user_data_login.uid}
								</p>
								<p>
									{user_data_store
										? new Date(
												user_data_store.timeCreated
											).toDateString()
										: "Lỗi kết nối với kho lưu trữ"}
								</p>
								<p>
									{user_data_store &&
										{
											student: "Học sinh",
											teacher: "Giáo viên",
											admin: "Quản trị viên",
											null: ""
										}[user_data_store.role]}
								</p>
								<p>
									{user_data_store &&
									user_data_store.vip.__value
										? user_data_store.vip.__time.__buyAt +
											" - " +
											user_data_store.vip.__time.__endAt
										: false}
								</p>
							</div>
						</TableProperties>
					</Profile>
				: <LoadingScreen p />}
		</Fragment>
	);
}

export default React.memo(ProfileComponent);
