import React, { Fragment } from "react";
import { Er404 } from "../customs/e404.styled";

function E404({ children }) {
	return (
		<Er404>
			{!children &&
				<Fragment>
					<h1>404</h1>
					<h4>404 Not Found</h4>
				</Fragment>}
			{children && children}
		</Er404>
	);
}

export default React.memo(E404);
