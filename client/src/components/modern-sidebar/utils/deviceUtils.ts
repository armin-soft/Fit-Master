
import { useDeviceInfo } from "@/hooks/use-mobile";

export const useSidebarDimensions = () => {
  const deviceInfo = useDeviceInfo();
  
  const getSidebarWidth = () => {
    if (deviceInfo.isMobile) return "w-[280px]";
    if (deviceInfo.isTablet) return "w-[320px]";
    if (deviceInfo.isSmallLaptop) return "w-[350px]";
    return "w-[380px]";
  };

  const getHeaderPadding = () => {
    if (deviceInfo.isMobile) return "p-3 py-4";
    if (deviceInfo.isTablet) return "p-4 py-5";
    return "p-4 py-5";
  };

  const getNavigationPadding = () => {
    if (deviceInfo.isMobile) return "p-3";
    if (deviceInfo.isTablet) return "p-3";
    return "p-4";
  };

  const getFooterPadding = () => {
    if (deviceInfo.isMobile) return "p-3";
    if (deviceInfo.isTablet) return "p-3";
    return "p-4";
  };

  return {
    getSidebarWidth,
    getHeaderPadding,
    getNavigationPadding,
    getFooterPadding,
    deviceInfo
  };
};
