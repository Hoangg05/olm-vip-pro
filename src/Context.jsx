import React, { createContext, useState, useMemo, useEffect } from "react";
import app from "./firebase/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
	collection,
	doc,
	getFirestore,
	onSnapshot,
	query,
	where
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

const HandleContext = createContext();

function Context({ children }) {
	// FIREBASE
	const auth = getAuth(app);
	const fs = getFirestore(app);
	const storage = getStorage(app);

	// data

	// user
	const [[user_data_login, user_data_store], StoreDataUser] = useState([
		null,
		null
	]);

	// profile user data
	const [id_user_config, ConfigDataUser] = useState(null);

	// filter data table teacher
	const [filter_data_tables, filterDataTables] = useState(null);

	// class data

	const [ClassData, setClassData] = useState(null);

	// data table teacher
	const [[__class__tables, all_data__tables], setDataTables] = useState([
		null,
		null
	]);

	const [load, isLoad] = useState(true);

	// logic
	useMemo(
		() => {
			const Auth = !user_data_login
				? onAuthStateChanged(auth, u => {
						if (u) StoreDataUser([u, user_data_store]);
						else StoreDataUser([null, null]);
						isLoad(false);
					})
				: false;
			const Snapshot =
				user_data_login && !user_data_store
					? id_user_config && id_user_config !== "me"
						? onSnapshot(doc(fs, "users", id_user_config), d => {
								if (d && d.data())
									StoreDataUser([user_data_login, d.data()]);
							})
						: onSnapshot(doc(fs, "users", user_data_login.uid), d => {
								if (d && d.data())
									StoreDataUser([user_data_login, d.data()]);
							})
					: false;

			return () => {
				Snapshot && Snapshot();
				Auth && Auth();
			};
		},
		[user_data_login, user_data_store, fs, auth, id_user_config]
	);

	// exam tables data
	useEffect(
		() => {
			const q = filter_data_tables
				? query(
						collection(fs, filter_data_tables.path),
						where(
							filter_data_tables.callback,
							filter_data_tables.type,
							filter_data_tables.value
						)
					)
				: null;
			const Snapshot = q
				? onSnapshot(q, doc => {
						if (!doc) return;
						const d = doc.docs.reduce((_, item) => {
							if (item.data().all_data.length === 0) return _;
							_.push(
								...item
									.data()
									.all_data.reduce((arr, itemChild) => {
										itemChild["__idHash"] = item.id;
										arr.push(itemChild);
										return arr;
									}, [])
							);
							return _;
						}, []);
						const _d_f_ = d.filter(
							item =>
								user_data_store.role !== "student"
									? item.__teacher.__id === user_data_login.uid
									: item.__who_make.indexOf(
											user_data_login.uid
										) > -1
						);

						setDataTables([
							doc.docs.reduce((arr, item) => {
								const d = item.data();
								arr.push({
									__k: d.__k,
									__name: d.__name,
									__school: d.__school,
									__type: d.__type,
									__year: d.__year
								});
								return arr;
							}, []),
							_d_f_
						]);
						setClassData(
							doc.docs.reduce((_, val) => {
								const data = val.data();
								if (data.__name) {
									_.push({
										[data.__name]: data.__students,
										__name: data.__name,
										__type: data.__type,
										__school: data.__school,
										__k: data.__k,
										__year: data.__year,
										__idHash: val.id
									});
								}
								return _;
							}, [])
						);
					})
				: false;
			return () => {
				Snapshot && Snapshot();
			};
		},
		[
			__class__tables,
			all_data__tables,
			filter_data_tables,
			fs,
			user_data_login,
			user_data_store
		]
	);

	return (
		<HandleContext.Provider
			value={{
				user_data_login,
				user_data_store,
				auth,
				fs,
				load,
				storage,
				all_data__tables,
				__class__tables,
				ConfigDataUser,
				filterDataTables,
				ClassData
			}}>
			{children}
		</HandleContext.Provider>
	);
}

export default React.memo(Context);

export { HandleContext };
