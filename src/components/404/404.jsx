import React from "react";
import { Er404 } from "../customs/e404.styled";

function E404() {
	return (
		<Er404>
			<h1>404</h1>
			<h4>404 Not Found</h4>
		</Er404>
	);
}

export default React.memo(E404);
