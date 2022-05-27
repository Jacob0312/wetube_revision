import Video from "../models/Video";

export const home = async (req, res) => {
	const videos = await Video.find({});
	return res.render("home", { pageTitle: "Home", videos });
};

export const watch = async (req, res) => {
	const { id } = req.params;
	const video = await Video.findById(id);
	if (!video) {
		return res.render("404", { pageTitle: "Video not found." });
	}
	return res.render("watch", { pageTitle: video.title, video });
};
export const getEdit = async (req, res) => {
	const { id } = req.params;
	const video = await Video.findById(id);
	if (!video) {
		return res.render("404", { pageTitle: "Video not found." });
	}
	return res.render("edit", { pageTitle: `Edit: ${video.title}`, video });
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
	try {
		await Video.create({
			title,
			description,
			hashtags: hashtags
				.split(",")
				.map((word) => (!word.startsWith("#") ? `#${word}` : word)),
		});
		res.redirect("/");
	} catch (error) {
		return res.render("upload", {
			pageTitle: "Upload Video",
			errorMessage: error._message,
		});
	}
};
