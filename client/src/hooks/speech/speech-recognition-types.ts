
import { RefObject, MutableRefObject } from 'react';

export interface UseSpeechRecognitionProps {
  lang?: string;
  onTranscriptChange: (transcript: string) => void;
  initialValue?: string;
  multiLine?: boolean;
}

export interface UseSpeechRecognitionReturn {
  transcript: string;
  isListening: boolean;
  isSupported: boolean;
  interimTranscript: string;
  startListening: () => Promise<void>;
  stopListening: () => void;
  resetTranscript: () => void;
}

export interface RecognitionState {
  transcript: string;
  interimTranscript: string;
  isRecording: boolean;
  isStopped: boolean;
  autoRestart: boolean;
  error: string;
  startTime: number;
}

export interface RecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
  error?: string;
}

export interface UseRecognitionRestartProps {
  recognition: any;
  state: RecognitionState;
  setState: (state: RecognitionState) => void;
}

export interface UseRecognitionEventHandlersProps {
  recognition: any;
  state: RecognitionState;
  setState: (state: RecognitionState) => void;
  onTextRecognized?: (text: string) => void;
  onError?: (error: string) => void;
  onRestart?: () => void;
  restartTimeoutRef: RefObject<number | null>;
  maxRestarts?: number;
  restartCountRef: RefObject<number>;
}

// Define the SpeechRecognitionResult interface
export interface SpeechRecognitionResult {
  readonly isFinal: boolean;
  readonly length: number;
  [index: number]: SpeechRecognitionAlternative;
}

// Define the SpeechRecognitionAlternative interface
export interface SpeechRecognitionAlternative {
  readonly transcript: string;
  readonly confidence: number;
}

// Define the SpeechRecognitionResultList interface
export interface SpeechRecognitionResultList {
  readonly length: number;
  [index: number]: SpeechRecognitionResult;
  item(index: number): SpeechRecognitionResult;
}

// Define the SpeechRecognition interface
export interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  onaudioend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onaudiostart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onerror: ((this: SpeechRecognition, ev: Event) => any) | null;
  onnomatch: ((this: SpeechRecognition, ev: Event) => any) | null;
  onresult: ((this: SpeechRecognition, ev: RecognitionEvent) => any) | null;
  onsoundend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onsoundstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onspeechend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onspeechstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  start(): void;
  stop(): void;
  abort(): void;
}

// Define the SpeechRecognition constructor
export interface SpeechRecognitionConstructor {
  new (): SpeechRecognition;
  prototype: SpeechRecognition;
}
