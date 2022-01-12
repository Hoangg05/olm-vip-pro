import React, { Fragment } from "react";
import styled from "styled-components";
import { news } from "../../__data__.module";

function NewInDayComponent() {
	return (
		<Fragment>
			{news &&
				<NewStyled>
					<h4>Tin mới nhất</h4>
					<NewContentComponent>
						<NewContentWrap total_length={news.length}>
							{news &&
								news.map((item, index) =>
									<NewContent
										key={index}
										target="_blank"
										href="/news">
										{item}
									</NewContent>
								)}
						</NewContentWrap>
					</NewContentComponent>
				</NewStyled>}
		</Fragment>
	);
}

const NewStyled = styled.div`
	margin: 20px 0;
	width: 100%;
	height: 3em;
	border-radius: 5px;
	background: #d4e1ee;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 0 0 20px;
	& h4 {
		padding: 0 20px 0 0;
		white-space: nowrap;
	}
`;

const NewContentComponent = styled.div`
	width: 100%;
	height: 100%;
	position: relative;
	overflow: hidden;
`;

const NewContentWrap = styled.div`
	position: absolute;
	right: -100%;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	animation: new 100s linear infinite;
	@keyframes new {
		100% {
			right: ${props => props.total_length * 100}%;
		}
	}
`;

const NewContent = styled.a`
	white-space: nowrap;
	color: #333;
	margin-right: 20vw;
`;

export default NewInDayComponent;
