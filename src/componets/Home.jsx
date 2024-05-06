import logo from "../assets/logo.jpg";
import img from "../assets/bg-logo.jpg";
import { FaTelegramPlane } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import getIcon from "../assets/social_logo/getIcon";
import { useState, useEffect } from "react";
import { getDatabase, ref, get } from "firebase/database";
import { storage } from "../firebase/firebase";
import { listAll,getDownloadURL,ref as RefS } from "firebase/storage";
import LoaderPage from "./LoaderPage";

const Home = () => {
  

//Creating Timing Loaders
const [loader,setLoader] = useState(true);
useEffect(() => {
  setTimeout(() => {
    setLoader(false);
  }, 3000);
}, [])
//fething Buttons and links data
const [buttonsData, setButtonsData] = useState(null);
const [linksData, setLinksData] = useState(null);
const db = getDatabase();
const buttonsRef = ref(db, "buttons");
const LinksRef = ref(db, "links");
useEffect(() => {
  const fetchData = async () => {
    try {
      const buttonsSnapshot = await get(ref(db, "buttons"));
      const buttonsData = buttonsSnapshot.val();
      const linksSnapshot = await get(ref(db, "links"));
      const linksData = linksSnapshot.val();
      setButtonsData(buttonsData);
      setLinksData(linksData);
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  };
  fetchData();
}, [linksData,buttonsData]);

//fething Logo and background Images
const [logoImg,setLogoImg] = useState(logo);
const [bgImg,setBgImg] = useState(img)
useEffect(() => {
  listAll(RefS(storage, "uploads")).then((imgs) => {
    imgs.items.forEach((item, index) => {
      getDownloadURL(item).then((url) => {
        if (index === 1) {
          setLogoImg(url);
        } else if (index === 0) {
          setBgImg(url);
        }
      });
    });
  });
}, [logoImg,bgImg]);

//Creating Buttons and links
  const createSocialButton=(buttonName,stateBtn,link,key)=>{
     if(buttonName === 'telegram' && stateBtn){
      return (
        <a href={link} key={key} target="_blank" className="social-button linkedin">
          <FaTelegramPlane size={30}/>
        </a>
      );
     }else if(buttonName === 'facebook' && stateBtn){
      return( <a href={link} target="_blank" key={key} className="social-button facebook">
        <FaFacebook size={30}/>
       </a>);
     }else{
      return null;
     }
  }
  const createSocialLink = (buttonLink, buttonTxt, buttonIcon,key) => {
    return (
      <a
        target="_blank"
        key={key}
        href={buttonIcon === "call" ? `tel:+964${buttonLink}` : buttonLink}
        className="w-full h-full overflow-hidden capitalize font-extrabold bg-white hover:opacity-100 opacity-80 sm:text-sm text-xl rounded-3xl   hover:scale-[1.01] transition-all duration-500 flex justify-between items-center px-5"
      >
        {buttonTxt}
        <img
          className="w-10 rounded-full object-cover"
          src={getIcon(buttonIcon)}
          alt="BtnIcon"
        />
      </a>
    );
  };


  return (
    <>
      <div className="w-full bg-gradient-to-r from-blue to-rose-500 area mx-auto overflow-hidden h-[100dvh]  ">
        <div className="font-Amce  bg-transparent w-full mx-auto h-[100dvh] flex flex-col justify-around items-center  gap-6 sm:gap-3  p-5">
          <div className="card sm:w-[26rem] !cursor-default sm:h-[12rem]   w-full mx-12 h-[250px]   z-50">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="card-inner flex items-center flex-col !rounded-3xl p-3">
              <div className="header relative w-full flex flex-col items-center ">
                <div className="w-full bg-orange-700 bg-opacity-25 h-24 rounded-3xl object-cover object-bottom overflow-hidden">
                  <img src={bgImg} alt="Background" />
                </div>
                <img
                  src={logoImg}
                  alt="Logo"
                  className="sm:w-[6rem] sm:h-[6rem] object-cover sm:top-1/4 sm:left-[30px] top-[40px] absolute  w-1/3 rounded-full shadow-xl border-4 border-opacity-35 border-white"
                />
              </div>
              <div className="w-full h-full transition-all duration-700 font-Amce rounded-3xl hover:scale-90  tracking-[0.5rem] text-white flex justify-center  items-center sm:pt-0 pt-7">
                <span className="text-2xl opacity-95 w-full font-extrabold text-center sm:ml-10">
                  Raiy Store
                </span>
              </div>
            </div>
          </div>

          <div className="card-inner  grid grid-cols-1  grid-rows-4 hover:scale-[1.01] sm:!w-[26rem]  !h-full z-30 w-full gap-3  !rounded-3xl  p-3  ">
            {linksData &&
              Object.keys(linksData).map(
                (key) =>
                  linksData[key].stats &&
                  createSocialLink(
                    linksData[key].link,
                    linksData[key].text,
                    linksData[key].name,
                    key
                  )
              )}
          </div>

          <div className="social-buttons z-50 ">
            {buttonsData &&
              Object.keys(buttonsData).map(
                (key) =>
                  buttonsData[key].stats &&
                  createSocialButton(
                    buttonsData[key].name,
                    true,
                    buttonsData[key].link,
                    key
                  )
              )}
          </div>
        </div>

        <ul className="circles absolute">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      {loader && <LoaderPage />}
    </>
  );
};

export default Home;
