
import * as path from 'path';
import * as fs from 'fs';
import { BUILD_DIRECTORIES, SOURCE_PATHS } from '../config/fileStructure';
import { createDirectoriesConditionally, copyImages, getFilesWithExtension, readVersion } from '../utils/fileUtils';
import { generateIndexHtml, writeIndexHtml } from '../utils/htmlGenerator';

export const performBuildOperations = async (): Promise<void> => {
  try {
    const appVersion = readVersion(SOURCE_PATHS.manifest);
    console.log(`شروع کپی فایل‌ها و بهینه‌سازی برای نسخه ${appVersion}...`);

    // ایجاد پوشه اصلی Assets و زیرپوشه‌ها
    createDirectoriesConditionally([
      'dist/Assets',
      'dist/Assets/Images', 
      'dist/Assets/Styles',
      'dist/Assets/Scripts'
    ]);

    // حذف پوشه‌های تکراری اگر وجود دارند
    if (fs.existsSync('dist/Image')) {
      fs.rmSync('dist/Image', { recursive: true, force: true });
      console.log('🗑️ پوشه تکراری Image حذف شد');
    }
    if (fs.existsSync('dist/Images')) {
      fs.rmSync('dist/Images', { recursive: true, force: true });
      console.log('🗑️ پوشه تکراری Images حذف شد');
    }

    // کپی تصاویر به Assets/Images
    copyImages(SOURCE_PATHS.publicImages, 'dist/Assets/Images');

    // پیدا کردن فایل‌های CSS و JS
    const cssFiles = getFilesWithExtension('dist/Assets/Styles', '.css');
    const jsFiles = getFilesWithExtension('dist/Assets/Scripts', '.js');
    
    const mainCssFile = cssFiles.find(file => file.includes('Main-App')) || cssFiles[0];
    const mainJsFile = jsFiles.find(file => file.includes('Main-App')) || jsFiles[0];

    // استفاده از مسیرهای مطلق
    const cssFileName = mainCssFile ? `/${path.relative('dist', mainCssFile)}` : '/Assets/Styles/Main-App.css';
    const jsFileName = mainJsFile ? `/${path.relative('dist', mainJsFile)}` : '/Assets/Scripts/Main-App.js';

    // بازنویسی index.html با مسیرهای مطلق
    const indexContent = generateIndexHtml(cssFileName, jsFileName);
    writeIndexHtml(SOURCE_PATHS.distIndex, indexContent);

    console.log(`✅ تمام فایل‌ها با موفقیت در ساختار یکپارچه Assets سازماندهی شدند برای نسخه ${appVersion}!`);
    console.log(`📁 ساختار نهایی:`);
    console.log(`  └── Assets/`);
    
    if (jsFiles.length > 0) {
      console.log(`      ├── Scripts/ (${jsFiles.length} فایل JS)`);
    }
    if (cssFiles.length > 0) {
      console.log(`      ├── Styles/ (${cssFiles.length} فایل CSS)`);
    }
    
    const imageFiles = getFilesWithExtension('dist/Assets/Images', '.png') 
      .concat(getFilesWithExtension('dist/Assets/Images', '.jpg'))
      .concat(getFilesWithExtension('dist/Assets/Images', '.svg'));
    
    if (imageFiles.length > 0) {
      console.log(`      └── Images/ (${imageFiles.length} فایل تصویر)`);
    }

    console.log(`🔗 فایل‌های ایجاد شده با مسیرهای مطلق:`);
    console.log(`  📄 CSS: ${cssFileName}`);
    console.log(`  📄 JS: ${jsFileName}`);

  } catch (error) {
    console.error('❌ خطا در سازماندهی فایل‌ها:', error);
  }
};
