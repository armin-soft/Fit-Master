
import { useState, useCallback } from 'react';
import { correctPersianWords } from "@/utils/persian-word-correction";

interface UseTranscriptManagementProps {
  initialValue: string;
  onTranscriptChange: (transcript: string) => void;
  multiLine?: boolean;
}

export function useTranscriptManagement({
  initialValue,
  onTranscriptChange,
  multiLine = false
}: UseTranscriptManagementProps) {
  const [transcript, setTranscript] = useState(initialValue);
  const [interimTranscript, setInterimTranscript] = useState("");

  // Reset transcript function
  const resetTranscript = useCallback(() => {
    setTranscript("");
    setInterimTranscript("");
    onTranscriptChange("");
  }, [onTranscriptChange]);

  // Update transcript with new content
  const updateTranscript = useCallback((newText: string, isFinal: boolean) => {
    if (isFinal) {
      let processedText = newText.trim();
      
      // Correct Persian words
      processedText = correctPersianWords(processedText);
      
      // Clean up whitespace
      processedText = processedText.replace(/\s+/g, " ")
                           .replace(/\n +/g, "\n")
                           .replace(/\n+/g, "\n")
                           .trim();
      
      // For multi-line, preserve line breaks, otherwise flatten
      if (!multiLine) {
        processedText = processedText.replace(/\n/g, " ");
      }
      
      const updatedTranscript = transcript + (transcript ? " " : "") + processedText;
      setTranscript(updatedTranscript);
      onTranscriptChange(updatedTranscript);
    } else {
      setInterimTranscript(newText);
    }
  }, [transcript, onTranscriptChange, multiLine]);

  return {
    transcript,
    interimTranscript,
    setTranscript,
    setInterimTranscript,
    resetTranscript,
    updateTranscript
  };
}
