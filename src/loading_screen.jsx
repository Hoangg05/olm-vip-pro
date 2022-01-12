import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import logo from "./components/images/logo/logo2.png";

const Loading = styled.div`
	display: grid;
	place-items: center;
	position: ${props => (props.p ? "relative" : "absolute")};
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 100%;
	height: 100%;
	& div {
		width: 8vh;
		height: 8vh;
		background: #000;
		margin: 0 auto;
		position: relative;
		display: grid;
		place-items: center;
		& img {
			width: 80%;
			position: absolute;
		}
	}
	${({ t }) =>
		t &&
		`& h4 {text-align: center;padding: 0 24%;word-break: break-word;}`};
`;

function LoadingScreen({ p, t }) {
	return (
		<Loading p={p} t={t}>
			{!t
				? <motion.div
						animate={{
							scale: [0, 3, 4, 2, 0],
							rotate: [0, 0, 360, 0, 360],
							backgroundColor: [
								"#BE6CFF",
								"#8567FD",
								"#987DFE",
								"#7E8BFE",
								"#8690FF",
								"#4886FF",
								"#AF51FD",
								"#FF5AFE",
								"#FF51FD",
								"#FE7D3B",
								"#FE69A9"
							],
							borderRadius: ["20%", "20%", "50%", "50%", "10%"]
						}}
						transition={{
							duration: 5,
							ease: "easeInOut",
							times: [0.2, 0.4, 0.6, 0.8, 1],
							repeat: Infinity,
							repeatDelay: 1
						}}>
						<img alt="" src={logo} />
					</motion.div>
				: <h4>
						{t}
					</h4>}
		</Loading>
	);
}

export default LoadingScreen;
