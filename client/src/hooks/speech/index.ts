
export * from './useSimpleSpeechRecognition';
export * from './useContinuousSpeechRecognition';
export * from './speech-recognition-types';
export * from './useMicrophonePermission';
export * from './useRecognitionSetup';
export * from './useSpeechRecognitionErrors';
export * from './useRecognitionRestart';
export * from './useRecognitionEventHandlers';
export * from './useBrowserSupport';
export * from './useRecognitionState';
export * from './utils';

// Export the new simple hook as default for convenience
export { useSimpleSpeechRecognition as default } from './useSimpleSpeechRecognition';
