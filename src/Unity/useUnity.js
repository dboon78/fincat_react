import { useEffect, useState } from "react";

const useUnity = (useUnityContext) => {
  const [unityInfo, setUnityInfo] = useState({
    unityProvider: null,
    sendMessage: null,
    addEventListener: null,
    removeEventListener: null,
    isLoaded: false,
    unload: null,
    loadingProgression: 0,
  });

  const buildUrl = "/webgl/";
  const {
    unityProvider,
    sendMessage,
    addEventListener,
    removeEventListener,
    unload,
    loadingProgression,
  } = useUnityContext({
    loaderUrl: buildUrl + "Build/webgl.loader.js",
    dataUrl: buildUrl + "Build/webgl.data.unityweb",
    frameworkUrl: buildUrl + "Build/webgl.framework.js.unityweb",
    codeUrl: buildUrl + "Build/webgl.wasm.unityweb",
  });

  useEffect(() => {
    if (unityProvider && !unityInfo.isLoaded) {
      setUnityInfo({
        unityProvider,
        sendMessage,
        addEventListener,
        removeEventListener,
        isLoaded: false,
        unload,
        loadingProgression,
      });
    }
  }, [
    unityProvider,
    sendMessage,
    addEventListener,
    removeEventListener,
    unload,
    loadingProgression,
  ]);

  useEffect(() => {
    if (!unityProvider) return;

    const handleSetIsLoaded = (val) => {
      setUnityInfo((prevInfo) => ({
        ...prevInfo,
        isLoaded: true,
      }));
    };

    addEventListener("SetIsLoaded", handleSetIsLoaded);

    return () => {
      removeEventListener("SetIsLoaded", handleSetIsLoaded);
    };
  }, [unityProvider, addEventListener, removeEventListener]);

  return unityInfo;
};

export default useUnity;
