
// تنظیمات خروجی برای rollup - GymSync ویژه

import { getChunkFileName } from './rollup/chunkFileNames';
import { getAssetFileName } from './rollup/assetFileNames';
import { getManualChunk } from './rollup/manualChunks';

export const rollupOutputOptions = {
  entryFileNames: 'Assets/Scripts/Main-App.js',  // حذف slash ابتدایی برای سازگاری
  chunkFileNames: getChunkFileName,
  assetFileNames: getAssetFileName,
  manualChunks: getManualChunk
};
