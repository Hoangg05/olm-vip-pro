import React from "react";
import { Container } from "../../customs/container.styled";
import AboutComponent from "./About/about";
import EventComponent from "./Event/event";
import FunEnglishComponent from "./Fun English/fun_english";
import FunMathComponent from "./Fun Math/fun_math";
import HelpMathComponent from "./Help Math/help_math";
import HelpComponent from "./How to use/help";
import NiceLiteratureComponent from "./Nice Literature/nice_literature";

function ContainerComponent() {
	return (
		<Container>
			<HelpMathComponent />
			<FunEnglishComponent />
			<FunMathComponent />
			<NiceLiteratureComponent />
			<HelpComponent />
			<EventComponent />
			<AboutComponent />
		</Container>
	);
}

export default ContainerComponent;
