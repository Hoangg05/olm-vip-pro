import React, { StrictMode } from "react";
import { render } from "react-dom";
import "./index.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import App from "./App";
import "react-toastify/dist/ReactToastify.css";
import Context from "./Context";
import LazyLoad from "react-lazyload";

render(
	<StrictMode>
		<LazyLoad>
			<Context>
				<App />
			</Context>
		</LazyLoad>
	</StrictMode>,
	document.getElementById("olm_vjp_pro_by_hoangyuri")
);
