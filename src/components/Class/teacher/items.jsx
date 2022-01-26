import { Fragment, memo, useContext, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { ChildColumn, Column, Paginate } from "../../customs/class.styled";
import moment from "moment";
import "moment/locale/vi";
import { HandleContext } from "../../../Context";

function PaginatedItems({ itemsPerPage, history, items, filterLectures }) {
	const { user_data_store } = useContext(HandleContext);
	moment.locale("vi");
	const [currentItems, setCurrentItems] = useState(null);
	const [pageCount, setPageCount] = useState(0);
	const [itemOffset, setItemOffset] = useState(0);

	useEffect(
		() => {
			let c = false;
			if (items && !c) {
				const endOffset = itemOffset + itemsPerPage;
				setCurrentItems(items.slice(itemOffset, endOffset));
				setPageCount(Math.ceil(items.length / itemsPerPage));
			}
			return () => (c = true);
		},
		[itemOffset, itemsPerPage, items]
	);

	const handlePageClick = event => {
		const newOffset = event.selected * itemsPerPage % items.length;
		setItemOffset(newOffset);
	};

	return (
		<Fragment>
			{items &&
				user_data_store &&
				<Items
					dataSlice={currentItems}
					history={history}
					filterLectures={filterLectures}
				/>}

			<Paginate>
				<ChildColumn>
					<ReactPaginate
						onPageChange={handlePageClick}
						pageRangeDisplayed={5}
						pageCount={pageCount}
						previousLabel={"<"}
						nextLabel={">"}
						renderOnZeroPageCount={null}
					/>
				</ChildColumn>
			</Paginate>
		</Fragment>
	);
}

function Items({ history, dataSlice, filterLectures }) {
	return (
		<Fragment>
			{dataSlice &&
				<Item
					data={dataSlice}
					history={history}
					filterLectures={filterLectures}
				/>}
		</Fragment>
	);
}

function Item({ data, history, filterLectures }) {
	const data_group = Array.from(new Set(data.map(a => a.__id)))
		.map(id => {
			return data.find(a => a.__id === id);
		})
		.filter(
			item =>
				filterLectures.value !== "Tất cả"
					? item.__s.value === filterLectures.value
					: item
		);

	return (
		data_group &&
		data_group.map((item, index) => {
			return (
				<Column
					c={4}
					no_hover={item.__date.__lock}
					key={index}
					onClick={() => history(`/exam/edit/${item.__id}`)}>
					<ChildColumn>
						{item.__title}
					</ChildColumn>
					<ChildColumn>
						{item.__s.label}
					</ChildColumn>
					<ChildColumn>
						{moment(item.__date.__open.__start).fromNow()}
					</ChildColumn>
					<ChildColumn>
						{item.__date.__lock
							? "Đã khóa bài"
							: item.__date.__open.__end
								? moment(item.__date.__open.__end).fromNow()
								: "Không giới hạn"}
					</ChildColumn>
				</Column>
			);
		})
	);
}

export default memo(PaginatedItems);
