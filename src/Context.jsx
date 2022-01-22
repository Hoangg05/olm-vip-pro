import React, { createContext, useEffect, useState } from "react";
import app from "./firebase/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const HandleContext = createContext();
function Context({ children }) {
	// FIREBASE
	const auth = getAuth(app);
	const fs = getFirestore(app);
	const storage = getStorage(app);

	const [[user_data_login, user_data_store], StoreDataUser] = useState([
		null,
		null
	]);

	const [load, isLoad] = useState(true);

	useEffect(
		() => {
			onAuthStateChanged(auth, u => {
				if (u) StoreDataUser([u, user_data_store]);
				else StoreDataUser([null, null]);
			});
			const Snapshot = user_data_login
				? onSnapshot(doc(fs, "users", user_data_login.uid), d => {
						if (d && d.data())
							StoreDataUser([user_data_login, d.data()]);
					})
				: function() {};

			return () => {
				Snapshot();
				isLoad(false);
			};
		},
		[user_data_login, user_data_store, fs, auth]
	);

	const ConfigDataUser = id => {
		if (id !== "me") {
			onSnapshot(doc(fs, "users", id), d => {
				if (d && d.data()) StoreDataUser([user_data_login, d.data()]);
			});
		} else {
			onSnapshot(doc(fs, "users", user_data_login.uid), d => {
				if (d && d.data()) StoreDataUser([user_data_login, d.data()]);
			});
		}
	};

	return (
		<HandleContext.Provider
			value={{
				user_data_login,
				user_data_store,
				auth,
				fs,
				load,
				storage,
				ConfigDataUser
			}}>
			{children}
		</HandleContext.Provider>
	);
}

export { Context, HandleContext };
