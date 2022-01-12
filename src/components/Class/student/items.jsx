import { Fragment, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { ChildColumn, Column, Paginate } from "../../customs/class.styled";

function PaginatedItems({ itemsPerPage, items, history, info }) {
	const [currentItems, setCurrentItems] = useState(null);
	const [pageCount, setPageCount] = useState(0);
	const [itemOffset, setItemOffset] = useState(0);

	useEffect(
		() => {
			if (items) {
				const endOffset = itemOffset + itemsPerPage;
				setCurrentItems(items.slice(itemOffset, endOffset));
				setPageCount(Math.ceil(items.length / itemsPerPage));
			}
		},
		[itemOffset, itemsPerPage, items]
	);

	const handlePageClick = event => {
		const newOffset = event.selected * itemsPerPage % items.length;
		setItemOffset(newOffset);
	};

	return (
		<Fragment>
			<Items data={currentItems} history={history} info={info} />
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
function Items({ data, history, info }) {
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
						{item.__date.__start}
					</ChildColumn>
					<ChildColumn>
						{item.__date.__end
							? item.__date.__end
							: "Không giới hạn"}
					</ChildColumn>
				</Column>
			);
		})
	);
}

export default PaginatedItems;
