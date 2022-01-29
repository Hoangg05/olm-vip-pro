import moment from "moment";
import React, { Fragment, memo } from "react";
import { ChildColumn, Column } from "../../customs/class.styled";

function ItemsStudent({ dataSlice, history }) {
	return (
		<Fragment>
			{dataSlice &&
				dataSlice.map((item, index) => {
					return (
						<Column
							no_hover={item.__date.__lock}
							key={index}
							onClick={() =>
								!item.__date.__lock &&
								history(`/exam/make/${item.__id}`)}>
							<ChildColumn>
								{item.__title}
							</ChildColumn>
							<ChildColumn>
								{item.__s.value}
							</ChildColumn>
							<ChildColumn>
								{item.__teacher.__name}
							</ChildColumn>
							<ChildColumn>
								{moment(item.__date.__open.__start).fromNow()}
							</ChildColumn>
							<ChildColumn>
								{item.__date.__lock
									? "Đã hết giờ làm"
									: item.__date.__open.__end
										? moment(
												new Date(item.__date.__open.__end)
											).fromNow()
										: "Không giới hạn"}
							</ChildColumn>
						</Column>
					);
				})}
		</Fragment>
	);
}

export default memo(ItemsStudent);
