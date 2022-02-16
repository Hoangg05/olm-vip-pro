import { Fragment, memo } from "react";
import { ChildColumn, Column } from "../../customs/class.styled";
import moment from "moment";
import "moment/locale/vi";

function ItemsTeacher({ history, dataSlice }) {
	return (
		<Fragment>
			{dataSlice &&
				dataSlice.map((item, index) => {
					return (
						<Column
							c={4}
							no_hover={item.__protection.__lock}
							key={index}
							onClick={() => history(`/exam/edit/${item.__id}`)}>
							<ChildColumn>
								{item.__title}
							</ChildColumn>
							<ChildColumn>
								{item.__s.label}
							</ChildColumn>
							<ChildColumn capitalize>
								{moment(item.__date.__open.__start).calendar()}
							</ChildColumn>
							<ChildColumn capitalize>
								{item.__protection.__lock
									? "Đã khóa bài"
									: item.__date.__open.__end
										? moment(
												item.__date.__open.__end
											).calendar()
										: "Không giới hạn"}
							</ChildColumn>
						</Column>
					);
				})}
		</Fragment>
	);
}

export default memo(ItemsTeacher);
