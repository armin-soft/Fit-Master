
/**
 * Gets the base path for the application based on the current window location
 * Optimized for universal deployment compatibility - auto-versioned from Manifest.json
 */
export function getBasePath(): string {
  // در محیط توسعه همیشه از مسیر اصلی استفاده کن
  if (process.env.NODE_ENV === 'development') {
    return '';
  }
  
  // زمانی که در محیط مرورگر نیستیم
  if (typeof window === 'undefined') {
    return '';
  }
  
  try {
    // تشخیص خودکار base path از مسیر فعلی
    const path = window.location.pathname;
    
    // اگر در root قرار داریم
    if (path === '/' || path === '') {
      return '';
    }
    
    // تشخیص اگر در subfolder قرار داریم
    const pathParts = path.split('/').filter(part => part !== '');
    
    // اگر path شامل index.html است، آن را حذف کن
    if (pathParts.length > 0 && pathParts[pathParts.length - 1] === 'index.html') {
      pathParts.pop();
    }
    
    // اگر آخرین بخش شبیه فایل است (دارای extension), آن را حذف کن
    if (pathParts.length > 0 && pathParts[pathParts.length - 1].includes('.')) {
      pathParts.pop();
    }
    
    const basePath = pathParts.length > 0 ? '/' + pathParts.join('/') : '';
    console.log('Auto-detected base path:', basePath);
    return basePath;
  } catch (e) {
    console.error("Error determining base path:", e);
    return '';
  }
}

/**
 * Gets the full URL for an asset based on the base path
 * Optimized for build output structure - Always uses absolute paths
 */
export function getAssetPath(assetPath: string): string {
  // اگر مسیر به صورت مطلق است، همان‌طور که هست برگردان
  if (assetPath.startsWith('http') || assetPath.startsWith('//')) {
    return assetPath;
  }
  
  const basePath = getBasePath();
  
  // تنظیم مسیر asset برای ساختار جدید - نسبی یا مطلق بر اساس basePath
  let cleanAssetPath = assetPath;
  
  // حذف slash اول اگر موجود است برای ساخت مسیر نسبی
  if (cleanAssetPath.startsWith('/')) {
    cleanAssetPath = cleanAssetPath.substring(1);
  }
  
  // اگر basePath وجود دارد، آن را اضافه کن
  const finalPath = basePath ? `${basePath}/${cleanAssetPath}` : `./${cleanAssetPath}`;
  
  console.log('Asset path resolved:', { assetPath, basePath, finalPath });
  return finalPath;
}

/**
 * Helper function to get image paths for the new structure - Always absolute
 */
export function getImagePath(imageName: string): string {
  return getAssetPath(`/Assets/Image/${imageName}`);
}
