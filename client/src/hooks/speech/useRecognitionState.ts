
import { useState } from "react";
import { RecognitionState } from "./speech-recognition-types";

export function useRecognitionState() {
  // Initialize a state object for recognition state
  const [recognitionState, setRecognitionState] = useState<RecognitionState>({
    transcript: "",
    interimTranscript: "",
    isRecording: false,
    isStopped: false,
    autoRestart: true,
    error: "",
    startTime: 0
  });

  return { recognitionState, setRecognitionState };
}
