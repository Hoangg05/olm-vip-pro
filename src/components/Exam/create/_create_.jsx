import React, { useEffect, useState } from "react";
import { CreateCustomComponent } from "../../customs/exam.styled";
import ConfigurationExam from "./config_exam";
import { query, onSnapshot, where, collection } from "firebase/firestore";

function CreateExamComponent({ user, fs }) {
	const [Class, setClass] = useState(null);
	const [[create, data], isCreate] = useState([null, null]);
	useEffect(
		() => {
			let c = false;
			if (c) return;
			const q = query(
				collection(fs, "class"),
				where("__teachers", "array-contains", user.uid)
			);
			const GRD = q
				? onSnapshot(q, doc => {
						if (!doc) return;
						const d = doc.docs.reduce((_, val) => {
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
						}, []);

						setClass(d);
					})
				: function() {
						return false;
					};
			return () => {
				c = true;
				GRD();
			};
		},
		[fs, user, Class]
	);

	return (
		<CreateCustomComponent>
			<ConfigurationExam isCreate={isCreate} Class={Class} fs={fs} />
		</CreateCustomComponent>
	);
}

export default React.memo(CreateExamComponent);
