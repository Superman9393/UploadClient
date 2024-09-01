export const load = async ({ fetch }) => {
    console.log("Starting to fetch videos");
    const videoRes = await fetch("http://localhost:3000/videos");
    console.log("Video response received", videoRes);
    const videoInfo = await videoRes.json();
    console.log("Video info parsed", videoInfo);
    return {
      videos: videoInfo
    };
  };