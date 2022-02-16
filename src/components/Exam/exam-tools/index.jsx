import React, { Fragment, memo, useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import POPUPComponent from "./popup";

function EditTools({ updateCharacters, characters }) {
	const [createPopup, isCreatePopup] = useState(false);
	const [value, setValue] = useState(null);

	function handleOnDragEnd(result) {
		if (!result.destination) return;

		const items = Array.from(characters);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);

		updateCharacters(items);
	}

	useEffect(
		() => {
			if (value) {
				updateCharacters(prev => [...prev, value]);
				setValue(null);
			}
		},
		[characters, updateCharacters, value]
	);

	return (
		<Fragment>
			{!createPopup &&
				<Fragment>
					<DragDropContext onDragEnd={handleOnDragEnd}>
						<Droppable droppableId="characters">
							{provided =>
								<div>
									<div
										className="characters"
										{...provided.droppableProps}
										ref={provided.innerRef}>
										{characters &&
											characters.length > 0 &&
											characters.map((quest, index) => {
												return (
													<Draggable
														key={index}
														draggableId={`${index}`}
														index={index}>
														{provided =>
															<ItemDrag
																ref={
																	provided.innerRef
																}
																{...provided.draggableProps}
																{...provided.dragHandleProps}>
																<ExamQuestion>
																	<h2>
																		Câu{" "}
																		{index + 1}:{" "}
																		{quest.question}
																	</h2>
																	<Answer>
																		{quest.answers.map(
																			(
																				ans,
																				idx
																			) =>
																				<div
																					style={{
																						color: {
																							true:
																								"#43b581",
																							false:
																								"#f04747"
																						}[
																							ans
																								.correct
																						]
																					}}
																					key={
																						idx
																					}>
																					<input
																						value={
																							{
																								once:
																									"radio",
																								more: `checkbox${idx}`
																							}[
																								quest
																									.type
																							]
																						}
																						name={
																							{
																								once:
																									"radio",
																								more:
																									"checkbox"
																							}[
																								quest
																									.type
																							]
																						}
																						id={`${ans.title}${index}${idx}`}
																						type={
																							{
																								once:
																									"radio",
																								more:
																									"checkbox"
																							}[
																								quest
																									.type
																							]
																						}
																						disabled
																					/>
																					<label
																						htmlFor={`${ans.title}${index}${idx}`}>
																						{String.fromCharCode(65 + idx)}.{" "}
																						{ans.title}
																					</label>
																				</div>
																		)}
																	</Answer>
																	<RemoveExamQuest
																		onClick={() =>
																			updateCharacters(
																				characters.filter(
																					(
																						_,
																						idx
																					) =>
																						idx !==
																						index
																				)
																			)}>
																		Xóa
																	</RemoveExamQuest>
																</ExamQuestion>
															</ItemDrag>}
													</Draggable>
												);
											})}
										{provided.placeholder}
									</div>
								</div>}
						</Droppable>
					</DragDropContext>
					<Button onClick={() => isCreatePopup(true)}>
						<h2>+</h2>
					</Button>
				</Fragment>}
			{createPopup &&
				<POPUPComponent
					returnValue={setValue}
					turnON={isCreatePopup}
				/>}
		</Fragment>
	);
}

const ItemDrag = styled.div`
	display: flex;
	width: 95%;
	margin: 10px auto;
`;

const RemoveExamQuest = styled.div`
	position: absolute;
	top: 4%;
	right: 1%;
	color: #9b84ee;
	border-radius: 50%;
	cursor: pointer;
`;

const ExamQuestion = styled.div`
	width: 100%;
	height: fit-content;
	position: relative;
	box-shadow: 5px 5px 10px #999;
	padding: 10px;
`;

const Answer = styled.div`
	width: 100%;
	margin-top: 50px;
	display: flex;
	justify-content: space-around;
	align-items: center;
	& input {
		margin-right: 10px;
		border: none;
	}
`;

const Button = styled.div`
	border: none;
	background: #7289da;
	padding: 5px 12px;
	border-radius: 10px;
	font-size: 20px;
	margin: 20px auto;
	width: fit-content;
	color: #ddd;
	cursor: pointer;
`;

export default memo(EditTools);
