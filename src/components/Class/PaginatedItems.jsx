import React, { Fragment, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { ChildColumn, Paginate } from "../customs/class.styled";
import { GiPreviousButton, GiNextButton } from "react-icons/gi";
import { GrChapterPrevious, GrChapterNext } from "react-icons/gr";
import ItemsTeacher from "./teacher/items";
import ItemsStudent from "./student/items";

const PaginatedItems = React.memo(({ itemsPerPage, items, history, role }) => {
	const [pageCount, setPageCount] = useState(null);
	const [itemOffset, setItemOffset] = useState(0);
	const [currentItems, setCurrentItems] = useState(null);

	useEffect(
		() => {
			let c = false;
			if (items && !c) {
				const endOffset =
					itemOffset !== 0
						? itemOffset * itemsPerPage + itemsPerPage
						: itemsPerPage;
				setCurrentItems(
					items.slice(itemOffset * itemsPerPage, endOffset)
				);
				setPageCount(Math.ceil(items.length / itemsPerPage));
			}
			return () => (c = true);
		},
		[itemOffset, items, itemsPerPage, setCurrentItems]
	);

	const handlePageClick = number => {
		setItemOffset(number.selected);
	};

	return (
		<Fragment>
			{currentItems && role && role !== "student"
				? <ItemsTeacher history={history} dataSlice={currentItems} />
				: <ItemsStudent history={history} dataSlice={currentItems} />}
			<Paginate no_border>
				<ChildColumn paginate>
					<GrChapterPrevious
						onClick={() =>
							setItemOffset(itemOffset > 1 ? itemOffset - 2 : 0)}
					/>
					<GiPreviousButton
						onClick={() =>
							setItemOffset(itemOffset > 1 ? itemOffset - 1 : 0)}
					/>
					{pageCount &&
						<ReactPaginate
							onPageChange={handlePageClick}
							pageRangeDisplayed={5}
							pageCount={pageCount}
							previousLabel={null}
							nextLabel={null}
							breakLabel={"..."}
							renderOnZeroPageCount={null}
							forcePage={itemOffset}
						/>}
					<GiNextButton
						onClick={() =>
							setItemOffset(
								itemOffset < pageCount - 1 ? itemOffset + 1 : 0
							)}
					/>
					<GrChapterNext
						onClick={() =>
							setItemOffset(
								itemOffset < pageCount - 2 ? itemOffset + 2 : 0
							)}
					/>
				</ChildColumn>
			</Paginate>
		</Fragment>
	);
});

export default PaginatedItems;
