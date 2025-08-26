
import * as React from "react"

// Added additional breakpoints for more precise responsive design
export const BREAKPOINTS = {
  xs: 375, // Mobile phones
  sm: 640, // Small tablets
  md: 768, // Tablets
  lg: 1024, // Small laptops
  xl: 1280, // Laptops and desktops
  "2xl": 1400, // Large desktops
  "3xl": 1600, // Extra large desktops
  "4xl": 1920, // Ultra wide screens
};

// Memoize breakpoint values to prevent re-renders
const memoizedBreakpoints = Object.freeze(BREAKPOINTS);

export function useBreakpoint(breakpoint: keyof typeof BREAKPOINTS) {
  const [isAboveBreakpoint, setIsAboveBreakpoint] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    // Initial check function
    const checkBreakpoint = () => {
      const windowWidth = window.innerWidth;
      const breakpointValue = memoizedBreakpoints[breakpoint];
      const newValue = windowWidth >= breakpointValue;
      
      // Only update state if value has changed
      if (isAboveBreakpoint !== newValue) {
        setIsAboveBreakpoint(newValue);
      }
    };
    
    // Initial check
    checkBreakpoint();
    
    // Use a debounced resize handler to prevent excessive updates
    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(checkBreakpoint, 150); // debounce by 150ms
    };
    
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, [breakpoint, isAboveBreakpoint]);

  return isAboveBreakpoint;
}

// Improved isMobile hook with stable state updates
export function useIsMobile() {
  const [deviceType, setDeviceType] = React.useState<{
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
  }>(() => {
    // Default to desktop until we can check
    return {
      isMobile: false,
      isTablet: false,
      isDesktop: true
    };
  });

  React.useEffect(() => {
    // Initial check function
    const checkDeviceType = () => {
      const width = window.innerWidth;
      const newDeviceType = {
        isMobile: width < memoizedBreakpoints.md,
        isTablet: width >= memoizedBreakpoints.md && width < memoizedBreakpoints.lg,
        isDesktop: width >= memoizedBreakpoints.lg
      };
      
      // Only update if values changed
      if (
        newDeviceType.isMobile !== deviceType.isMobile ||
        newDeviceType.isTablet !== deviceType.isTablet ||
        newDeviceType.isDesktop !== deviceType.isDesktop
      ) {
        setDeviceType(newDeviceType);
      }
    };
    
    // Initial check
    checkDeviceType();
    
    // Debounced resize handler
    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(checkDeviceType, 150); // debounce by 150ms
    };
    
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, [deviceType]);

  // Return the stable boolean value
  return deviceType.isMobile;
}

// Memoized device info for more stable component rendering
export function useDeviceInfo() {
  const [deviceInfo, setDeviceInfo] = React.useState(() => ({
    isMobile: false,
    isTablet: false,
    isSmallLaptop: false,
    isDesktop: false,
    isLargeDesktop: false,
    currentWidth: typeof window !== 'undefined' ? window.innerWidth : 0
  }));

  React.useEffect(() => {
    // Initial check function
    const checkDeviceInfo = () => {
      const width = window.innerWidth;
      const newDeviceInfo = {
        isMobile: width < memoizedBreakpoints.sm,
        isTablet: width >= memoizedBreakpoints.sm && width < memoizedBreakpoints.lg,
        isSmallLaptop: width >= memoizedBreakpoints.lg && width < memoizedBreakpoints.xl,
        isDesktop: width >= memoizedBreakpoints.xl && width < memoizedBreakpoints["2xl"],
        isLargeDesktop: width >= memoizedBreakpoints["2xl"],
        currentWidth: width
      };
      
      // Check if anything actually changed before updating state
      if (
        newDeviceInfo.isMobile !== deviceInfo.isMobile ||
        newDeviceInfo.isTablet !== deviceInfo.isTablet ||
        newDeviceInfo.isSmallLaptop !== deviceInfo.isSmallLaptop ||
        newDeviceInfo.isDesktop !== deviceInfo.isDesktop ||
        newDeviceInfo.isLargeDesktop !== deviceInfo.isLargeDesktop ||
        Math.abs(newDeviceInfo.currentWidth - deviceInfo.currentWidth) > 10 // Only update width if changed by more than 10px
      ) {
        setDeviceInfo(newDeviceInfo);
      }
    };
    
    // Initial check
    checkDeviceInfo();
    
    // Debounced resize handler
    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(checkDeviceInfo, 150); // debounce by 150ms
    };
    
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, [deviceInfo]);

  // Memoize the result to prevent unnecessary re-renders
  return React.useMemo(() => deviceInfo, [deviceInfo]);
}
