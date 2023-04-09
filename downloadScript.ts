import axios from "axios";
import * as fs from "fs";

async function downloadVideo(
	url: string,
	outputPath: string
): Promise<unknown> {
	const response = await axios({
		method: "GET",
		url: url,
		responseType: "stream",
	});

	response.data.pipe(fs.createWriteStream(outputPath));

	return new Promise<void>((resolve, reject) => {
		response.data.on("end", () => {
			console.log("Video downloaded successfully");
			resolve();
		});

		response.data.on("error", (err: any) => {
			console.error("Error downloading video", err);
			reject(err);
		});
	});
}

downloadVideo(
	"https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
	"video.mp4"
);
