/**
 * Logic for Rollup's assetFileNames option.
 */
export function getAssetFileName(assetInfo: any): string {
  const info = assetInfo.name || '';
  // CSS
  if (info.endsWith('.css')) {
    if (info.includes('index') || info.includes('main')) {
      return 'Assets/Styles/Main-App.css';
    }
    if (info.includes('component')) {
      return 'Assets/Styles/Components.css';
    }
    if (info.includes('page')) {
      return 'Assets/Styles/Pages.css';
    }

    const cssName = info.replace('.css', '')
      .split(/[-_]/)
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('-');
    return `Assets/Styles/${cssName}.css`;
  }

  // Images
  if (info.match(/\.(png|jpe?g|gif|svg|webp|ico)$/)) {
    if (info.toLowerCase().includes('logo')) {
      return `Assets/Images/Branding/${info}`;
    }
    if (info.toLowerCase().includes('avatar') || info.toLowerCase().includes('profile')) {
      return `Assets/Images/Profiles/${info}`;
    }
    if (info.toLowerCase().includes('icon')) {
      return `Assets/Images/Icons/${info}`;
    }
    if (info.toLowerCase().includes('background') || info.toLowerCase().includes('bg')) {
      return `Assets/Images/Backgrounds/${info}`;
    }
    return `Assets/Images/General/${info}`;
  }

  // Fonts
  if (info.match(/\.(woff|woff2|ttf|eot)$/)) {
    if (info.toLowerCase().includes('vazir')) {
      return `Assets/Fonts/Vazir/${info}`;
    }
    if (info.toLowerCase().includes('noto')) {
      return `Assets/Fonts/Noto/${info}`;
    }
    return `Assets/Fonts/Other/${info}`;
  }

  // Other files
  const fileName = info.replace(/\.[^/.]+$/, '')
    .split(/[-_]/)
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('-');
  const ext = info.split('.').pop();
  return `Assets/Other/${fileName}.${ext}`;
}
