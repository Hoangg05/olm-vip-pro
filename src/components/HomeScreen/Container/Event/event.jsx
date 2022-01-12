import React from "react";
import { Card, List } from "../../../customs/container.styled";

function EventComponent() {
	return (
		<Card color="blue">
			<a href="/event">
				<h4>Thông tin - Sự kiện</h4>
			</a>
			<List>
				<h1>Không có gì cả...</h1>
			</List>
		</Card>
	);
}

export default EventComponent;
