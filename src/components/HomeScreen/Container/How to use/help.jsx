import React from "react";
import { LargeCard, List } from "../../../customs/container.styled";

function HelpComponent() {
	return (
		<LargeCard color="blue">
			<a href="/help">
				<h4>Hướng dẫn sử dụng</h4>
			</a>
			<List>
				<h1 style={{ margin: 20, textAlign: "center" }}>
					Chưa có tính năng này :(
				</h1>
			</List>
		</LargeCard>
	);
}

export default React.memo(HelpComponent);
