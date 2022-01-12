import styled from "styled-components";

const FilterComponentCustom = styled.div`
	background: #0088cc;
	border-radius: 15px;
	color: #fff;
	overflow: hidden;
	& h2 {
		height: 80px;
		width: 100%;
		border-bottom: 1px solid #fff;
		display: grid;
		place-items: center;
	}
`;

const Filter = styled.ul`
	width: 100%;
	display: flex;
	justify-content: space-around;
	align-items: center;
	padding: 20px 0;
`;

const FilterChild = styled.li`
	display: flex;
	justify-content: center;
	align-items: center;
	& input {
		appearance: none;
	}
	& label {
		text-decoration: ${props => (props.is_active ? "underline" : "none")};
	}
`;

export { FilterComponentCustom, Filter, FilterChild };
