
import * as fs from 'fs';

export const generateIndexHtml = (cssFileName: string, jsFileName: string): string => {
  // اطمینان از اینکه مسیرها مطلق هستند
  const absoluteCssPath = cssFileName.startsWith('/') ? cssFileName : `/${cssFileName}`;
  const absoluteJsPath = jsFileName.startsWith('/') ? jsFileName : `/${jsFileName}`;
  
  return `<!DOCTYPE html>
<html lang="fa" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="سیستم مدیریت برنامه های تمرینی و تغذیه ورزشکاران" />
    <meta name="theme-color" content="#7c3aed" />
    <title>مدیریت برنامه</title>
    <base href="/" />

    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="/Assets/Image/Icon.svg" />
    <link rel="icon" type="image/svg+xml" sizes="32x32" href="/Assets/Image/Icon.svg" />
    <link rel="apple-touch-icon" sizes="180x180" href="/Assets/Image/Icon.svg" />
    <link rel="icon" type="image/svg+xml" sizes="192x192" href="/Assets/Image/Icon.svg" />
    <link rel="icon" type="image/svg+xml" sizes="512x512" href="/Assets/Image/Icon.svg" />

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@100..900&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://cdn.jsdelivr.net/gh/rastikerdar/vazir-font@v30.1.0/dist/font-face.css"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@100..900&display=swap"
      rel="stylesheet"
    />
    
    <!-- CSS -->
    <link rel="stylesheet" href="${absoluteCssPath}" />
  </head>

  <body>
    <div id="root"></div>

    <!-- Scripts -->
    <script src="${absoluteJsPath}" type="module"></script>
    
    <noscript>برای استفاده از این برنامه، لطفاً جاوااسکریپت مرورگر خود را فعال کنید.</noscript>
  </body>
</html>`;
};

export const writeIndexHtml = (distIndexPath: string, content: string): void => {
  fs.writeFileSync(distIndexPath, content);
  console.log('✅ index.html با مسیرهای مطلق صحیح بازنویسی شد');
};
