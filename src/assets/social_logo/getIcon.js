import tiktok from "./tiktok.png";
import instagram from "./instagram.png";
import whatsapp from "./whatsapp.png";
import call from "./call.png";
import telegram from "./tellegram.png";
import facebook from "./facebook.png";
const getIcon = (buttonText) => {
  switch (buttonText) {
    case "instagram":
      return instagram;
    case "tiktok":
      return tiktok;
    case "call":
      return call;
    case "whatsapp":
      return whatsapp;
    case "telegram":
      return telegram;
    case "facebook":
      return facebook;
    default:
      console.warn(`Unknown Image logo: ${buttonText}`);
      return instagram;
  }
};

export default getIcon;
