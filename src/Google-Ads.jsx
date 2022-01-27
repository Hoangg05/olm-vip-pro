import React from "react";
import AdSense from "react-adsense";

function GoogleAds() {
	return (
		<AdSense.Google
			client="ca-pub-5393240490244594"
			slot="5946204515"
			style={{ display: "block" }}
			format="auto"
			responsive="true"
		/>
	);
}

export default GoogleAds;
