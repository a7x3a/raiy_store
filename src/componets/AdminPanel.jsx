// Admin.jsx
import React from "react";
import { useAuth } from "../firebase/AuthContext";
import { storage } from "../firebase/firebase";
import { ref as refStore, uploadBytes, getDownloadURL } from "firebase/storage";
import { logout } from "../firebase/auth";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getDatabase, ref, get, set } from "firebase/database";
import error from "../assets/error.png";
import LoaderPage from "./LoaderPage";
import getIcon from "../assets/social_logo/getIcon";
import { IoMdLogOut } from "react-icons/io";
import { ring } from "ldrs";

ring.register();

// Default values shown

const Admin = () => {
  const [loader, setLoader] = useState(true);
  const [saveLoader, setSaveLoader] = useState(false);
  const [uploadLoader, setUploadLoader] = useState(false);
  const [messegeUpload, setMessegeUpload] = useState(null);
  const [SaveMessege, setSaveMessege] = useState(null);
  {
    /**Genarate The Loader and Sucess Alerts for images and buttons */
  }

  //Getting Data From  DB
  const { currentUser } = useAuth();
  const [buttonsData, setButtonsData] = useState(null);
  const [linksData, setLinksData] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const db = getDatabase();
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
  }, []);

  //Getting Data from storeage and override it
  const [bgImage, setBgImage] = useState(null);
  const [logoImage, setLogoImage] = useState(null);
  const [bgImageUrl, setBgImageUrl] = useState("");
  const [logoImageUrl, setLogoImageUrl] = useState("");
  useEffect(() => {
    // Retrieve background image URL from Firebase Storage
    const backgroundRef = refStore(storage, "uploads/bg-logo.jpg");
    getDownloadURL(backgroundRef)
      .then((url) => {
        setBgImageUrl(url);
      })
      .catch((error) => {
        console.error("Error retrieving background image:", error);
      });

    // Retrieve logo URL from Firebase Storage
    const logoRef = refStore(storage, "uploads/logo.jpg");
    getDownloadURL(logoRef)
      .then((url) => {
        setLogoImageUrl(url);
      })
      .catch((error) => {
        console.error("Error retrieving logo:", error);
      });
  }, []);

  const handleBgImageChange = (e) => {
    if (e.target.files[0]) {
      setBgImage(e.target.files[0]);
      setMessegeUpload(null);
    }
  };

  const handleLogoImageChange = (e) => {
    if (e.target.files[0]) {
      setLogoImage(e.target.files[0]);
      setMessegeUpload(null);
    }
  };

  const handleUpload = async () => {
    setUploadLoader(true);
    if (bgImage) {
      setMessegeUpload(null);
      const bgImageRef = refStore(storage, `uploads/bg-logo.jpg`);
      await uploadBytes(bgImageRef, bgImage);
      const url = await getDownloadURL(bgImageRef);
      setBgImageUrl(url);
    }

    if (logoImage) {
      setMessegeUpload(null);
      const logoImageRef = refStore(storage, `uploads/logo.jpg`);
      await uploadBytes(logoImageRef, logoImage);
      const url = await getDownloadURL(logoImageRef);
      setLogoImageUrl(url);
    }
    if (!logoImage && !bgImage) {
      setMessegeUpload("Nothing Selected To Upload!");
      setUploadLoader(false);
    }

    setUploadLoader(false);
  };

  //Set Loader
  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  }, []);

  //Handle Logout
  const handleLogout = async () => {
    try {
      logout();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Function to handle changes to a specific link
  const handleLinkChange = (key, property, value) => {
    const updatedLinksData = { ...linksData };
    updatedLinksData[key] = { ...updatedLinksData[key], [property]: value };
    setLinksData(updatedLinksData);
  };

  // Function to handle changes to a specific button
  const handleButtonChange = (key, property, value) => {
    const updatedButtonsData = { ...buttonsData };
    updatedButtonsData[key] = { ...updatedButtonsData[key], [property]: value };
    setButtonsData(updatedButtonsData);
  };

  // Function to save links and buttons data to the database
  const handleSave = async () => {
    try {
      setSaveLoader(true);
      await set(ref(db, "links"), linksData);
      await set(ref(db, "buttons"), buttonsData);
      setSaveLoader(false);
    } catch (error) {
      console.error("Error updating and pushing data:", error);
      setSaveMessege("Error 404");
    }
  };

  return (
    <div className="w-full flex justify-center flex-col items-center gap-5  min-h-[100dvh] h-fit bg-pink  text-white ">
      {currentUser ? (
        <>
          <div className="sm:w-3/4 h-full grid place-content-center sm:grid-cols-4 grid-cols-2  gap-4 p-10">
            {/**Header */}
            <span className="font-Amce text-2xl sm:col-span-2 sm:text-left text-center col-span-1 tracking-widest hover:opacity-75 transition-all duration-300 cursor-default">
              Welcome Ray Store
            </span>
            <div className="sm:col-span-2 col-span-1 flex pb-4 items-center justify-end">
              <div
                className="relative inline-block transition-all duration-300"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <IoMdLogOut
                  size={35}
                  className="cursor-pointer hover:opacity-90 active:opacity-75 active:scale-90 transition-all duration-300"
                  onClick={handleLogout}
                />
                {showTooltip && (
                  <div className="bg-white text-black text-center  px-2 py-1 rounded absolute z-10 -left-10 top-0 transform  -translate-x-1/2">
                    Logout
                  </div>
                )}
              </div>
            </div>

            <div className="card sm:!w-full !cursor-default sm:h-fit col-span-2 sm:col-span-4  w-full h-full  z-50 hover:!scale-100 ">
              <div className="card-inner flex  items-center flex-col w-full h-full !rounded-3xl p-7 pt-5 pb-4">
                <h1 className="font-Amce pb-6">Change Background and Logo</h1>
                {/*Changing Background and Logo */}
                <div className="w-full overflow-hidden flex flex-col  gap-7   rounded-3xl">
                  <div className="w-full text-black flex flex-col justify-center items-center p-5 rounded-3xl bg-white">
                    <h2 className="pb-4 font-Poppins opacity-65 capitalize text-center">
                      Upload Background Image
                    </h2>
                    <input
                      className="w-full p-4 text-gray-700"
                      type="file"
                      accept="image/*"
                      onChange={handleBgImageChange}
                    />
                  </div>

                  <div className="w-full text-black flex flex-col justify-center items-center p-5 rounded-3xl bg-white">
                    <h2 className="pb-4 font-Poppins opacity-65 capitalize text-center">
                      Upload Logo Image
                    </h2>
                    <input
                      className="w-full p-4 text-gray-700"
                      type="file"
                      accept="image/*"
                      onChange={handleLogoImageChange}
                    />
                  </div>

                  {/* Upload button */}
                  <div className="flex justify-center items-center">
                    <button
                      onClick={handleUpload}
                      className="w-fit bg-white text-black px-7 py-4 rounded-3xl font-Poppins font-bold active:scale-75 active:opacity-60 hover:opacity-90 cursor-pointer transition-all duration-300 "
                    >
                      Upload
                    </button>
                  </div>

                  {uploadLoader && (
                    <div className="absolute w-32 h-32 rounded-full top-[41%] sm:left-[41%] left-[30%] bg-gray-700 flex justify-center items-center border  ">
                      <l-ring
                        size="40"
                        stroke="5"
                        bg-opacity="0"
                        speed="2"
                        color="white"
                      ></l-ring>
                    </div>
                  )}
                  {messegeUpload && (
                    <h2 className="text-white bg-red-600 rounded-3xl font-Amce text-center  px-5  py-5  absolute  top-[3%] left-[8%]">
                      {messegeUpload}
                    </h2>
                  )}
                </div>
              </div>
            </div>

            <div className="card sm:!w-full !cursor-default sm:h-fit sm:col-span-4 col-span-2 w-full h-fit   z-50 hover:!scale-100">
              <div className="card-inner flex items-center flex-col w-full h-full !rounded-3xl py-3">
                <div className="links w-full  h-fit rounded-3xl p-5 py-2  font-Poppins flex flex-col justify-center items-center">
                  <div className="w-full h-fit sm:grid text-black sm:grid-cols-1 gap-4 flex flex-col flex-wrap overflow-hidden  text-center">
                    {/* Retrive and Edit Buttons And Links*/}
                    {linksData &&
                      Object.keys(linksData).map((key) => {
                        const link = linksData[key];
                        return (
                          <div
                            key={key}
                            className="link w-full flex sm:flex-row bg-white text-gray-700   rounded-3xl   flex-col gap-3 items-center text-xs sm:justify-around sm:text-sm sm:py-4 lowercase p-7"
                          >
                            <img
                              src={getIcon(link.name)}
                              alt="Icons"
                              className="w-10"
                            />
                            <div className=" flex flex-col gap-1 sm:flex-col sm:w-1/2">
                              <div className="flex gap-3 items-center w-full">
                                <label className=" font-bold text-nowrap">
                                  Link :
                                </label>
                                <input
                                  type="text"
                                  className="w-full"
                                  value={link.link}
                                  onChange={(e) =>
                                    handleLinkChange(
                                      key,
                                      "link",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div className="flex gap-3 items-center w-full">
                                <label className=" font-bold text-nowrap">
                                  Text :
                                </label>
                                <input
                                  type="text"
                                  className="w-full"
                                  value={link.text}
                                  onChange={(e) =>
                                    handleLinkChange(
                                      key,
                                      "text",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            </div>
                            <div className="flex gap-3 items-center">
                              <label className=" font-bold">Enabled :</label>

                              <input
                                type="checkbox"
                                checked={link.stats}
                                className="scale-150"
                                onChange={(e) =>
                                  handleLinkChange(
                                    key,
                                    "stats",
                                    e.target.checked
                                  )
                                }
                              />
                            </div>
                          </div>
                        );
                      })}
                    {buttonsData &&
                      Object.keys(buttonsData).map((key) => {
                        const button = buttonsData[key];
                        return (
                          <div
                            key={key}
                            className="link w-full flex sm:flex-row flex-col gap-3 bg-white text-gray-700 rounded-3xl items-center text-xs sm:justify-around sm:text-sm sm:py-4 lowercase p-7"
                          >
                            <img
                              src={getIcon(button.name)}
                              alt="Icons"
                              className="w-10"
                            />
                            <div className="  items-center flex flex-col gap-1 sm:flex-col sm:w-1/2">
                              <div className="flex gap-3 items-center w-full">
                                <label className=" font-bold text-nowrap">
                                  Link :
                                </label>
                                <input
                                  type="text"
                                  value={button.link}
                                  className="w-full"
                                  onChange={(e) =>
                                    handleButtonChange(
                                      key,
                                      "link",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            </div>

                            <div className="flex gap-3 items-center">
                              <label className=" font-bold">Enabled :</label>

                              <input
                                type="checkbox"
                                checked={button.stats}
                                className="scale-150"
                                onChange={(e) =>
                                  handleButtonChange(
                                    key,
                                    "stats",
                                    e.target.checked
                                  )
                                }
                              />
                            </div>
                          </div>
                        );
                      })}
                    <div className="w-full flex justify-center items-center gap-4 transition-all duration-300">
                      <button
                        className="w-fit bg-white px-10 font-Poppins font-bold hover:opacity-90 active:opacity-75 transition-all duration-300 active:scale-95 py-3 rounded-3xl"
                        onClick={handleSave}
                      >
                        Save
                      </button>
                      {saveLoader && (
                        <div className="w-fit">
                          <l-ring
                            size="30"
                            stroke="5"
                            bg-opacity="0"
                            speed="2"
                            color="white"
                          ></l-ring>
                        </div>
                      )}
                      {SaveMessege && <h1>{SaveMessege}</h1>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        //While Not Login and Try /admin Messege Login Again
        <div className="bg-pink w-full h-full text-white flex justify-center items-center gap-3 flex-col ">
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
          <div className="card sm:w-[30rem] !cursor-default font-Poppins text-xl sm:h-[20rem]   mx-12 h-[400px]   z-50">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="card-inner flex items-center flex-col gap-3 h-full !rounded-3xl p-5">
              <img
                src={error}
                alt="Invalid Login"
                className="  p-5 rounded-full w-28 bg-white   "
              />
              <h2 className="font-bold p-5 text-center">
                Please login first to access the admin panel
              </h2>
              <Link
                to={"/login"}
                className="w-1/2 text-center bg-white py-2 text-black rounded-full hover:opacity-85 hover:scale-100 active:scale-90 transition-all duration-300"
                onClick={handleLogout}
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      )}
      {/*Loader*/}
      {loader && <LoaderPage />}
    </div>
  );
};

export default Admin;
