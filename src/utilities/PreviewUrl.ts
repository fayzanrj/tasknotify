import axios from "axios";
import toast from "react-hot-toast";

export const previewUrl = async (
  url: string
): Promise<{ title: string; img: string }> => {

  // if link is not available
  if (url.length <= 1) {
    return { title: "", img: "" };
  }
  // Api options
  const options = {
    method: "GET",
    url: `https://${process.env.NEXT_PUBLIC_PREVIEW_LINK_HOST}/`,
    params: {
      url: url,
      oembed: "false",
    },
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_PREVIEW_LINK_API_KEY,
      "X-RapidAPI-Host": process.env.NEXT_PUBLIC_PREVIEW_LINK_HOST,
    },
  };

  try {
    // Api Request
    const response = await axios.request(options);
    const title = response.data.title || "(No Title found)";
    const img =
      (response.data.ogp &&
        response.data.ogp["og:image"] &&
        response.data.ogp["og:image"][0]) ||
      "https://res.cloudinary.com/dbce45rdg/image/upload/v1704054031/tn6undfhtcx8hdrfpr5n.png";

    return { title, img };
  } catch (error: any) {
    console.error(error);
    toast.error("Errors previewing link");

    return {
      title: "(No Title found)",
      img: "https://res.cloudinary.com/dbce45rdg/image/upload/v1704054031/tn6undfhtcx8hdrfpr5n.png",
    };
  }
};
