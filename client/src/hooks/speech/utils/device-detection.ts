
export const detectDevice = () => {
  const userAgent = navigator.userAgent;
  
  return {
    isIOS: /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream,
    isAndroid: /android/i.test(userAgent),
    isEdge: /Edge/.test(userAgent),
    isSafari: /^((?!chrome|android).)*safari/i.test(userAgent),
    isFirefox: /firefox/i.test(userAgent),
    isChrome: /chrome/i.test(userAgent) && !/edge/i.test(userAgent)
  };
};

export const getOptimalRecognitionSettings = () => {
  const device = detectDevice();
  
  return {
    continuous: device.isIOS ? false : true,
    interimResults: true,
    maxAlternatives: device.isAndroid ? 5 : 3
  };
};
