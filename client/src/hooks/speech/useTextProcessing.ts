
import { useCallback } from 'react';

export const useTextProcessing = () => {
  // Function to clean text and remove ALL periods
  const cleanTranscriptText = useCallback((text: string) => {
    return text
      .trim()
      .replace(/\.+/g, '') // Remove all periods (single or multiple)
      .replace(/\u06D4/g, '') // Remove Arabic-Indic period
      .replace(/\u2E3C/g, '') // Remove stenographic period
      .replace(/\u002E/g, '') // Remove ASCII period
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .trim();
  }, []);

  return {
    cleanTranscriptText
  };
};
