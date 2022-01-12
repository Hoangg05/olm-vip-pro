import React from "react";
import { FooterStyle } from "../customs/footer.styled";
import footer_image from "../images/foot.jpg";

const FooterComponent = props => {
	return (
		<FooterStyle>
			<img
				src={footer_image}
				alt=""
				onLoad={e => props.heightReturn(e.target.offsetHeight)}
			/>
		</FooterStyle>
	);
};

export default FooterComponent;
