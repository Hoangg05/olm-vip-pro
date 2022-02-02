function importAll(r) {
	let images = [];
	r.keys().map((item, index) => {
		images[index] = r(item);
		return images;
	});
	return images;
}

const images = importAll(
	require.context("../../images/carousel images", true, /\.(png|jpe?g|svg)$/)
);

export default images;
