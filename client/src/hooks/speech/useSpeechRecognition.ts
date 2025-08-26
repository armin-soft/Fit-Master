
import { useRecognitionCore } from './useRecognitionCore';
import { useRecognitionSetup } from './useRecognitionSetup';
import { useRecognitionEventHandlers } from './useRecognitionEventHandlers';
import { useRecognitionRestart } from './useRecognitionRestart';
import { useMicrophonePermission } from './useMicrophonePermission';
import { useBrowserSupport } from './useBrowserSupport';
import { useToast } from '@/hooks/use-toast';

export const useSpeechRecognition = (options: any = {}) => {
  const { toast } = useToast();
  const browserSupport = useBrowserSupport();
  const microphonePermission = useMicrophonePermission();
  const recognitionCore = useRecognitionCore(options);
  
  const showRecordingStartedToast = () => {
    toast({
      title: "ضبط صدا شروع شد",
      description: "در حال گوش دادن به صحبت شما...",
    });
  };

  const showRecordingStoppedToast = () => {
    toast({
      title: "ضبط صدا متوقف شد",
      description: "متن گفتار شما ثبت شد.",
    });
  };

  return {
    ...recognitionCore,
    ...browserSupport,
    ...microphonePermission,
    showRecordingStartedToast,
    showRecordingStoppedToast,
    toast
  };
};

export default useSpeechRecognition;
