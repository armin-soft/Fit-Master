
import { useState, useCallback, useRef } from 'react';

export const useMicrophonePermission = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isRequesting, setIsRequesting] = useState(false);
  const permissionChecked = useRef(false);
  
  const checkMicrophoneAvailability = useCallback(async (): Promise<boolean | null> => {
    if (permissionChecked.current) {
      return hasPermission;
    }
    
    try {
      // Check if mediaDevices is available
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        return false;
      }
      
      // Check if there are any audio input devices
      const devices = await navigator.mediaDevices.enumerateDevices();
      const hasAudioInput = devices.some(device => device.kind === 'audioinput');
      
      if (!hasAudioInput) {
        return false;
      }
      
      permissionChecked.current = true;
      return true;
    } catch (error) {
      console.error('Error checking microphone availability:', error);
      return null;
    }
  }, [hasPermission]);
  
  const requestMicrophonePermission = useCallback(async (): Promise<boolean> => {
    if (isRequesting) {
      return hasPermission === true;
    }
    
    setIsRequesting(true);
    
    try {
      // First check if microphone is available
      const isAvailable = await checkMicrophoneAvailability();
      
      if (isAvailable === false) {
        setHasPermission(false);
        setIsRequesting(false);
        return false;
      }
      
      // Request permission
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: true 
      });
      
      // Stop the stream immediately as we only needed permission
      stream.getTracks().forEach(track => track.stop());
      
      setHasPermission(true);
      setIsRequesting(false);
      return true;
    } catch (error) {
      console.error('Microphone permission denied:', error);
      setHasPermission(false);
      setIsRequesting(false);
      return false;
    }
  }, [isRequesting, hasPermission, checkMicrophoneAvailability]);
  
  return {
    hasPermission,
    isRequesting,
    requestMicrophonePermission,
    checkMicrophoneAvailability
  };
};
