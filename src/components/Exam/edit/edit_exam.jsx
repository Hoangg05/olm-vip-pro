import React, {
	Fragment,
	memo,
	useContext,
	useEffect,
	useLayoutEffect,
	useState
} from "react";
import { useParams } from "react-router-dom";
import { HandleContext } from "../../../Context";
import EditTools from "../exam-tools/index";

function EditExamComponent() {
	const { idExam } = useParams();
	const [__data__exam, setDataExamProject] = useState([]);
	const [dataExam, setDataExam] = useState(null);
	const { all_data__tables, filterDataTables, user_data_login } = useContext(
		HandleContext
	);

	useEffect(
		() => {
			filterDataTables({
				path: "class",
				callback: "__teachers",
				type: "array-contains",
				value: user_data_login.uid
			});
		},
		[filterDataTables, user_data_login]
	);

	useLayoutEffect(
		() => {
			if (all_data__tables) {
				setDataExam(
					...all_data__tables.filter(exam => exam.__id === idExam)
				);
			}
		},
		[all_data__tables, idExam]
	);

	return (
		<Fragment>
			{dataExam &&
				<div>
					<h1>
						{dataExam.__title}
					</h1>
					<div>
						<EditTools
							updateCharacters={setDataExamProject}
							characters={__data__exam}
						/>
					</div>
					<button>Lưu</button>
					<button>Xem trước</button>
				</div>}
		</Fragment>
	);
}

export default memo(EditExamComponent);
