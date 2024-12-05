import React, { useEffect, useRef, useState } from "react";
// import hero from "./hero.png";
import useUnity from "../../Unity/useUnity";
import "./Hero.css";
import { Link } from "react-router-dom";
import { Unity, useUnityContext } from "react-unity-webgl";
import { Spinner } from "flowbite-react";

interface Props {}

const Hero = (props: Props) => {
  const unityData = useUnity(useUnityContext);

  const [devicePixelRatio, setDevicePixelRatio] = useState(
    window.devicePixelRatio
  );
  const canvasRef = useRef(null);

  const unloader = async () => {
    //console.log(`unloader ${unityData.unload != undefined}`);
    if (unityData.unload != undefined) {
      console.log(`unloading unity webgl`);
      await unityData.unload;
    }
  };

  useEffect(
    function () {
      // A function which will update the device pixel ratio of the Unity
      // Application to match the device pixel ratio of the browser.
      const updateDevicePixelRatio = function () {
        setDevicePixelRatio(window.devicePixelRatio);
      };
      // A media matcher which watches for changes in the device pixel ratio.
      const mediaMatcher = window.matchMedia(
        `screen and (resolution: ${devicePixelRatio}dppx)`
      );
      // Adding an event listener to the media matcher which will update the
      // device pixel ratio of the Unity Application when the device pixel
      // ratio changes.
      mediaMatcher.addEventListener("change", updateDevicePixelRatio);
      return function () {
        // Removing the event listener when the component unmounts.
        mediaMatcher.removeEventListener("change", updateDevicePixelRatio);
        unloader();
        const canvas = document.querySelector(".unity-webgl") as HTMLElement;
        if (canvas) canvas.blur();
      };
    },
    [devicePixelRatio]
  );

  return (
    <section id="hero">
      {unityData?.unityProvider ? (
        <Unity
          unityProvider={unityData?.unityProvider}
          style={{ visibility: unityData?.isLoaded ? "visible" : "hidden" }}
          matchWebGLToCanvasSize={true}
          devicePixelRatio={devicePixelRatio}
          ref={canvasRef}
          className="unity-webgl"
        />
      ) : (
        <></>
      )}
      <div className="absolute container mt-20 flex flex-col-reverse mx-auto p-8 lg:flex-row">
        <div className="flex flex-col space-y-10 mb-44 m-10 lg:m-10 xl:m-20 lg:mt:16 lg:w-1/2 xl:mb-52 p-10 drop-shadow-lg  border-gray-200 border-2 bg-gray-100 bg-opacity-50 rounded-md">
          <h1 className="text-3xl  font-bold text-center lg:text-6xl lg:max-w-md lg:text-left">
            Track Stocks and Crypto in any currency worldwide.
          </h1>
          <p className="text-1xl text-center text-gray-900 md:text-gray-900 lg:text-gray-500 lg:max-w-md lg:text-left">
            Search, track and analyze your holdings with ease.
          </p>
          <p className="inline-flex mx-auto lg:mx-0">
            <Link
              to={`/search`}
              className="flex drop-shadow-lg py-5 px-10 text-2xl font-bold text-white bg-lightGreen rounded lg:py-4 hover:opacity-70"
            >
              Get Started
            </Link>
          </p>
        </div>
        <div className="mb-24 mx-auto md:w-180 md:px-10 lg:mb-0 lg:w-1/2 flex">
          {unityData?.isLoaded ? (
            <></>
          ) : (
            <div
              className="flex flex-col m-auto flex-nowrap justify-end w-10 h-full bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700"
              role="progressbar"
            >
              <div
                className="rounded-full overflow-hidden bg-lightGreen"
                style={{ height: unityData.loadingProgression * 100 + "%" }}
              ></div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
