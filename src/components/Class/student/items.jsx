import moment from "moment";
import { Fragment, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { ChildColumn, Column, Paginate } from "../../customs/class.styled";

function PaginatedItems({ itemsPerPage, items, history }) {
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
			<Items data={currentItems} history={history} />
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
function Items({ data, history }) {
	const time4mat = time => {
		return time * 1000;
	};
	return (
		data &&
		data.map((item, index) => {
			return (
				<Column
					key={index}
					onClick={() => history(`/exam/make/${item.__id}`)}>
					<ChildColumn>
						{item.__title}
					</ChildColumn>
					<ChildColumn>
						{item.__s}
					</ChildColumn>
					<ChildColumn>
						{item.__teacher.__name}
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

export default PaginatedItems;
