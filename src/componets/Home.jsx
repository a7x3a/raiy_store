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
        className="w-full h-full rounded-3xl text-black/70 hover:text-black overflow-hidden capitalize font-extrabold bg-white hover:opacity-100 opacity-80 sm:text-sm text-xl   hover:scale-[1.01] transition-all duration-500 flex justify-between items-center px-5"
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
      <div className="w-full select-none gradient-background area mx-auto overflow-hidden h-[100dvh]  ">
        <div className="font-Amce  bg-transparent w-full mx-auto h-[100dvh] flex flex-col justify-center items-center  gap-5 sm:gap-3   p-10">
          <div className="card sm:w-[26rem] !cursor-default sm:h-[12rem]  w-full mx-12 h-5/6  z-50">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="card-inner flex !h-full items-center flex-col !rounded-3xl p-3">
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
              <div className="w-full h-full transition-all duration-700 font-Amce rounded-3xl   tracking-[0.5rem] text-white flex justify-center  items-center sm:pt-0 pt-7">
                <span className="text-2xl sm:p-5 sm:bg-none bg-white/10 rounded-3xl sm:rounded-full z-0 h-full sm:h-[3rem] sm:mt-3  sm:pt-4 !w-full  opacity-95 flex justify-center items-center  font-extrabold text-center sm:ml-10">
                  Raiy Store
                </span>
              </div>
            </div>
          </div>

            <div className="card-inner !h-full   p-3  grid grid-cols-1  grid-rows-4 hover:scale-[1.01] sm:!w-[26rem]   z-30 w-full gap-2  !rounded-3xl     ">
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
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2em"
              height="2em"
              viewBox="0 0 256 256"
            >
              <path
                fill="#ffff"
                d="M208 50a85.5 85.5 0 0 0-36.17 8c-14.67-25.9-40-38.79-41.15-39.37a6 6 0 0 0-5.36 0c-1.14.58-26.48 13.47-41.15 39.37A85.5 85.5 0 0 0 48 50a6 6 0 0 0-6 6v40a86.1 86.1 0 0 0 80 85.77v40.52l-39.32-19.66a6 6 0 0 0-5.36 10.74l48 24a6 6 0 0 0 5.36 0l48-24a6 6 0 1 0-5.36-10.74L134 222.29v-40.52A86.1 86.1 0 0 0 214 96V56a6 6 0 0 0-6-6m-80-19.12c6.46 3.84 23.07 15 33.33 32.94A86.5 86.5 0 0 0 128 104.5a86.5 86.5 0 0 0-33.33-40.68c10.26-17.99 26.87-29.11 33.33-32.94M54 96V62.24A74.11 74.11 0 0 1 122 136v33.76A74.1 74.1 0 0 1 54 96m148 0a74.1 74.1 0 0 1-68 73.76V136a74.11 74.11 0 0 1 68-73.76Z"
              />
            </svg>
          </li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2em"
              height="2em"
              viewBox="0 0 256 256"
            >
              <path
                fill="#ffff"
                d="M208 50a85.5 85.5 0 0 0-36.17 8c-14.67-25.9-40-38.79-41.15-39.37a6 6 0 0 0-5.36 0c-1.14.58-26.48 13.47-41.15 39.37A85.5 85.5 0 0 0 48 50a6 6 0 0 0-6 6v40a86.1 86.1 0 0 0 80 85.77v40.52l-39.32-19.66a6 6 0 0 0-5.36 10.74l48 24a6 6 0 0 0 5.36 0l48-24a6 6 0 1 0-5.36-10.74L134 222.29v-40.52A86.1 86.1 0 0 0 214 96V56a6 6 0 0 0-6-6m-80-19.12c6.46 3.84 23.07 15 33.33 32.94A86.5 86.5 0 0 0 128 104.5a86.5 86.5 0 0 0-33.33-40.68c10.26-17.99 26.87-29.11 33.33-32.94M54 96V62.24A74.11 74.11 0 0 1 122 136v33.76A74.1 74.1 0 0 1 54 96m148 0a74.1 74.1 0 0 1-68 73.76V136a74.11 74.11 0 0 1 68-73.76Z"
              />
            </svg>
          </li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2em"
              height="2em"
              viewBox="0 0 256 256"
            >
              <path
                fill="#ffff"
                d="M208 50a85.5 85.5 0 0 0-36.17 8c-14.67-25.9-40-38.79-41.15-39.37a6 6 0 0 0-5.36 0c-1.14.58-26.48 13.47-41.15 39.37A85.5 85.5 0 0 0 48 50a6 6 0 0 0-6 6v40a86.1 86.1 0 0 0 80 85.77v40.52l-39.32-19.66a6 6 0 0 0-5.36 10.74l48 24a6 6 0 0 0 5.36 0l48-24a6 6 0 1 0-5.36-10.74L134 222.29v-40.52A86.1 86.1 0 0 0 214 96V56a6 6 0 0 0-6-6m-80-19.12c6.46 3.84 23.07 15 33.33 32.94A86.5 86.5 0 0 0 128 104.5a86.5 86.5 0 0 0-33.33-40.68c10.26-17.99 26.87-29.11 33.33-32.94M54 96V62.24A74.11 74.11 0 0 1 122 136v33.76A74.1 74.1 0 0 1 54 96m148 0a74.1 74.1 0 0 1-68 73.76V136a74.11 74.11 0 0 1 68-73.76Z"
              />
            </svg>
          </li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2em"
              height="2em"
              viewBox="0 0 256 256"
            >
              <path
                fill="#ffff"
                d="M208 50a85.5 85.5 0 0 0-36.17 8c-14.67-25.9-40-38.79-41.15-39.37a6 6 0 0 0-5.36 0c-1.14.58-26.48 13.47-41.15 39.37A85.5 85.5 0 0 0 48 50a6 6 0 0 0-6 6v40a86.1 86.1 0 0 0 80 85.77v40.52l-39.32-19.66a6 6 0 0 0-5.36 10.74l48 24a6 6 0 0 0 5.36 0l48-24a6 6 0 1 0-5.36-10.74L134 222.29v-40.52A86.1 86.1 0 0 0 214 96V56a6 6 0 0 0-6-6m-80-19.12c6.46 3.84 23.07 15 33.33 32.94A86.5 86.5 0 0 0 128 104.5a86.5 86.5 0 0 0-33.33-40.68c10.26-17.99 26.87-29.11 33.33-32.94M54 96V62.24A74.11 74.11 0 0 1 122 136v33.76A74.1 74.1 0 0 1 54 96m148 0a74.1 74.1 0 0 1-68 73.76V136a74.11 74.11 0 0 1 68-73.76Z"
              />
            </svg>
          </li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2em"
              height="2em"
              viewBox="0 0 256 256"
            >
              <path
                fill="#ffff"
                d="M208 50a85.5 85.5 0 0 0-36.17 8c-14.67-25.9-40-38.79-41.15-39.37a6 6 0 0 0-5.36 0c-1.14.58-26.48 13.47-41.15 39.37A85.5 85.5 0 0 0 48 50a6 6 0 0 0-6 6v40a86.1 86.1 0 0 0 80 85.77v40.52l-39.32-19.66a6 6 0 0 0-5.36 10.74l48 24a6 6 0 0 0 5.36 0l48-24a6 6 0 1 0-5.36-10.74L134 222.29v-40.52A86.1 86.1 0 0 0 214 96V56a6 6 0 0 0-6-6m-80-19.12c6.46 3.84 23.07 15 33.33 32.94A86.5 86.5 0 0 0 128 104.5a86.5 86.5 0 0 0-33.33-40.68c10.26-17.99 26.87-29.11 33.33-32.94M54 96V62.24A74.11 74.11 0 0 1 122 136v33.76A74.1 74.1 0 0 1 54 96m148 0a74.1 74.1 0 0 1-68 73.76V136a74.11 74.11 0 0 1 68-73.76Z"
              />
            </svg>
          </li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2em"
              height="2em"
              viewBox="0 0 256 256"
            >
              <path
                fill="#ffff"
                d="M208 50a85.5 85.5 0 0 0-36.17 8c-14.67-25.9-40-38.79-41.15-39.37a6 6 0 0 0-5.36 0c-1.14.58-26.48 13.47-41.15 39.37A85.5 85.5 0 0 0 48 50a6 6 0 0 0-6 6v40a86.1 86.1 0 0 0 80 85.77v40.52l-39.32-19.66a6 6 0 0 0-5.36 10.74l48 24a6 6 0 0 0 5.36 0l48-24a6 6 0 1 0-5.36-10.74L134 222.29v-40.52A86.1 86.1 0 0 0 214 96V56a6 6 0 0 0-6-6m-80-19.12c6.46 3.84 23.07 15 33.33 32.94A86.5 86.5 0 0 0 128 104.5a86.5 86.5 0 0 0-33.33-40.68c10.26-17.99 26.87-29.11 33.33-32.94M54 96V62.24A74.11 74.11 0 0 1 122 136v33.76A74.1 74.1 0 0 1 54 96m148 0a74.1 74.1 0 0 1-68 73.76V136a74.11 74.11 0 0 1 68-73.76Z"
              />
            </svg>
          </li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2em"
              height="2em"
              viewBox="0 0 256 256"
            >
              <path
                fill="#ffff"
                d="M208 50a85.5 85.5 0 0 0-36.17 8c-14.67-25.9-40-38.79-41.15-39.37a6 6 0 0 0-5.36 0c-1.14.58-26.48 13.47-41.15 39.37A85.5 85.5 0 0 0 48 50a6 6 0 0 0-6 6v40a86.1 86.1 0 0 0 80 85.77v40.52l-39.32-19.66a6 6 0 0 0-5.36 10.74l48 24a6 6 0 0 0 5.36 0l48-24a6 6 0 1 0-5.36-10.74L134 222.29v-40.52A86.1 86.1 0 0 0 214 96V56a6 6 0 0 0-6-6m-80-19.12c6.46 3.84 23.07 15 33.33 32.94A86.5 86.5 0 0 0 128 104.5a86.5 86.5 0 0 0-33.33-40.68c10.26-17.99 26.87-29.11 33.33-32.94M54 96V62.24A74.11 74.11 0 0 1 122 136v33.76A74.1 74.1 0 0 1 54 96m148 0a74.1 74.1 0 0 1-68 73.76V136a74.11 74.11 0 0 1 68-73.76Z"
              />
            </svg>
          </li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2em"
              height="2em"
              viewBox="0 0 256 256"
            >
              <path
                fill="#ffff"
                d="M208 50a85.5 85.5 0 0 0-36.17 8c-14.67-25.9-40-38.79-41.15-39.37a6 6 0 0 0-5.36 0c-1.14.58-26.48 13.47-41.15 39.37A85.5 85.5 0 0 0 48 50a6 6 0 0 0-6 6v40a86.1 86.1 0 0 0 80 85.77v40.52l-39.32-19.66a6 6 0 0 0-5.36 10.74l48 24a6 6 0 0 0 5.36 0l48-24a6 6 0 1 0-5.36-10.74L134 222.29v-40.52A86.1 86.1 0 0 0 214 96V56a6 6 0 0 0-6-6m-80-19.12c6.46 3.84 23.07 15 33.33 32.94A86.5 86.5 0 0 0 128 104.5a86.5 86.5 0 0 0-33.33-40.68c10.26-17.99 26.87-29.11 33.33-32.94M54 96V62.24A74.11 74.11 0 0 1 122 136v33.76A74.1 74.1 0 0 1 54 96m148 0a74.1 74.1 0 0 1-68 73.76V136a74.11 74.11 0 0 1 68-73.76Z"
              />
            </svg>
          </li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2em"
              height="2em"
              viewBox="0 0 256 256"
            >
              <path
                fill="#ffff"
                d="M208 50a85.5 85.5 0 0 0-36.17 8c-14.67-25.9-40-38.79-41.15-39.37a6 6 0 0 0-5.36 0c-1.14.58-26.48 13.47-41.15 39.37A85.5 85.5 0 0 0 48 50a6 6 0 0 0-6 6v40a86.1 86.1 0 0 0 80 85.77v40.52l-39.32-19.66a6 6 0 0 0-5.36 10.74l48 24a6 6 0 0 0 5.36 0l48-24a6 6 0 1 0-5.36-10.74L134 222.29v-40.52A86.1 86.1 0 0 0 214 96V56a6 6 0 0 0-6-6m-80-19.12c6.46 3.84 23.07 15 33.33 32.94A86.5 86.5 0 0 0 128 104.5a86.5 86.5 0 0 0-33.33-40.68c10.26-17.99 26.87-29.11 33.33-32.94M54 96V62.24A74.11 74.11 0 0 1 122 136v33.76A74.1 74.1 0 0 1 54 96m148 0a74.1 74.1 0 0 1-68 73.76V136a74.11 74.11 0 0 1 68-73.76Z"
              />
            </svg>
          </li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2em"
              height="2em"
              viewBox="0 0 256 256"
            >
              <path
                fill="#ffff"
                d="M208 50a85.5 85.5 0 0 0-36.17 8c-14.67-25.9-40-38.79-41.15-39.37a6 6 0 0 0-5.36 0c-1.14.58-26.48 13.47-41.15 39.37A85.5 85.5 0 0 0 48 50a6 6 0 0 0-6 6v40a86.1 86.1 0 0 0 80 85.77v40.52l-39.32-19.66a6 6 0 0 0-5.36 10.74l48 24a6 6 0 0 0 5.36 0l48-24a6 6 0 1 0-5.36-10.74L134 222.29v-40.52A86.1 86.1 0 0 0 214 96V56a6 6 0 0 0-6-6m-80-19.12c6.46 3.84 23.07 15 33.33 32.94A86.5 86.5 0 0 0 128 104.5a86.5 86.5 0 0 0-33.33-40.68c10.26-17.99 26.87-29.11 33.33-32.94M54 96V62.24A74.11 74.11 0 0 1 122 136v33.76A74.1 74.1 0 0 1 54 96m148 0a74.1 74.1 0 0 1-68 73.76V136a74.11 74.11 0 0 1 68-73.76Z"
              />
            </svg>
          </li>
        </ul>
      </div>
      {loader && <LoaderPage />}
    </>
  );
};

export default Home;
