import Video from "../models/Video";

export const home = async (req, res) => {
	const videos = await Video.find({});
	return res.render("home", { pageTitle: "Home", videos });
};

export const watch = (req, res) => {
	const { id } = req.params;
	return res.render("watch", { pageTitle: `Watching` });
};
export const getEdit = (req, res) => {
	const { id } = req.params;

	return res.render("edit", { pageTitle: `Editing` });
};

export const postEdit = (req, res) => {
	const { id } = req.params;
	const { title } = req.body;
	res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
	res.render("upload", { pageTitle: `Upload New Video` });
};
export const postUpload = async (req, res) => {
	const { title, description, hashtags } = req.body;
	const video = new Video({
		title,
		description,
		createdAt: Date.now(),
		hashtags: hashtags
			.split(",")
			.map((word) =>
				!word.trim().startsWith("#") ? `#${word.trim()}` : word.trim()
			),
		meta: {
			views: 0,
			rating: 0,
		},
	});
	const createVid = await video.save();
	console.log(createVid);
	res.redirect("/");
};
