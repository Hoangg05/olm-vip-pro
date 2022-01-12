import React from "react";
import { Carousel } from "react-responsive-carousel";
import images from "./images";

const CarouselComponent = () => {
	return (
		<Carousel
			showIndicators={false}
			showThumbs={false}
			infiniteLoop={true}
			autoPlay={true}
			interval={10000}
			useKeyboardArrows>
			{images.map((item, index) =>
				<div key={index}>
					<img src={item} alt="" />
				</div>
			)}
		</Carousel>
	);
};

export default CarouselComponent;
