import { Fragment, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { ChildColumn, Column, Paginate } from "../../customs/class.styled";
import { doc, onSnapshot } from "firebase/firestore";
import moment from "moment";
import "moment/locale/vi";

function PaginatedItems({ itemsPerPage, history, fs, data_user, filter }) {
	moment.locale("vi");
	const [currentItems, setCurrentItems] = useState(null);
	const [pageCount, setPageCount] = useState(0);
	const [itemOffset, setItemOffset] = useState(0);
	const [[items, __class], setItems] = useState([null, null]);

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
			{data_user &&
				data_user.__class.__all.map((item, index) =>
					<Items
						filter={filter}
						key={index}
						item={item}
						dataSlice={currentItems}
						history={history}
						fs={fs}
						setItems={setItems}
						__class={__class}
					/>
				)}

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

function Items({ history, dataSlice, fs, setItems, item, __class, filter }) {
	useEffect(
		() => {
			let c = false;
			if (c) return;
			onSnapshot(doc(fs, "class", decodeStr(item.__id)), doc => {
				if (doc.data())
					setItems([
						doc
							.data()
							.all_data.filter(
								item =>
									filter.value !== "Tất cả"
										? item.__s === filter.value
										: item
							),
						doc.data().__name
					]);
			});
			return () => (c = true);
		},
		[fs, item, setItems, filter]
	);
	return (
		<Fragment>
			{dataSlice &&
				<Item data={dataSlice} __class={__class} history={history} />}
		</Fragment>
	);
}

function Item({ data, history, __class }) {
	return (
		data &&
		data.map((item, index) => {
			const time4mat = time => {
				return time * 1000;
			};
			return (
				<Column
					key={index}
					onClick={() => history(`/exam/edit/${item.__id}`)}>
					<ChildColumn>
						{item.__title}
					</ChildColumn>
					<ChildColumn>
						{item.__s}
					</ChildColumn>
					<ChildColumn>
						{__class}
					</ChildColumn>
					<ChildColumn>
						{moment(
							time4mat(item.__date.__open.__start.seconds)
						).fromNow()}
					</ChildColumn>
					<ChildColumn>
						{item.__date.__lock
							? "Đã hết giờ làm"
							: item.__date.__open.__end
								? moment(
										time4mat(item.__date.__open.__end.seconds)
									).fromNow()
								: "Không giới hạn"}
					</ChildColumn>
				</Column>
			);
		})
	);
}

function decodeStr(number) {
	if (number) {
		let string = "";
		const length = number.length;
		for (let i = 0; i < length; i++) {
			const code = number.slice(i, (i += 2));
			string += String.fromCharCode(parseInt(code, 16));
		}
		return string;
	}
	return false;
}

export default PaginatedItems;
