import React from "react";
import { Card, List } from "../../../customs/container.styled";

function AboutComponent() {
	return (
		<Card color="pink">
			<a href="/">
				<h4>Thông tin về OLMVP</h4>
			</a>
			<List>
				<h4 style={{ padding: "10px 10%", textAlign: "center" }}>
					Đây là sản phẩm của Trần Huy Hoàng - học sinh lớp 11D7 THPT
					Trung Giã. Mọi thông tin chi tiết vui lòng liên hệ đến{" "}
					<a
						href="https://fb.com/HoangLoveYuri"
						target="_blank"
						rel="noreferrer">
						Hoàng Yuri
					</a>
				</h4>
			</List>
		</Card>
	);
}

export default AboutComponent;
