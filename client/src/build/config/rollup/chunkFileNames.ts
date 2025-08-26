
/**
 * Logic for Rollup's chunkFileNames option.
 */
export function getChunkFileName(chunkInfo: any): string {
  const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/').pop() : 'chunk';
  const chunkName = facadeModuleId ? (facadeModuleId as string).replace(/\.[^/.]+$/, '') : chunkInfo.name;

  // React and core libraries
  if (chunkName.includes('React') || chunkInfo.name === 'React-Core') {
    return 'Assets/Scripts/Libraries/React-Core.js';
  }
  if (chunkName.includes('UI') || chunkInfo.name === 'UI-Components') {
    return 'Assets/Scripts/Libraries/UI-Components.js';
  }
  if (chunkName.includes('Router') || chunkInfo.name === 'Router-Query') {
    return 'Assets/Scripts/Libraries/Router-Query.js';
  }
  if (chunkName.includes('Animation') || chunkInfo.name === 'Animations') {
    return 'Assets/Scripts/Libraries/Framer-Motion.js';
  }
  if (chunkName.includes('Icon') || chunkInfo.name === 'Icons') {
    return 'Assets/Scripts/Libraries/Lucide-Icons.js';
  }
  if (chunkName.includes('Date') || chunkInfo.name === 'Date-Utils') {
    return 'Assets/Scripts/Utilities/Date-Functions.js';
  }
  if (chunkName.includes('Form') || chunkInfo.name === 'Forms') {
    return 'Assets/Scripts/Libraries/Form-Libraries.js';
  }
  if (chunkName.includes('PDF') || chunkInfo.name === 'PDF-Canvas') {
    return 'Assets/Scripts/Libraries/PDF-Canvas.js';
  }
  if (chunkName.includes('Chart') || chunkInfo.name === 'Charts') {
    return 'Assets/Scripts/Libraries/Recharts.js';
  }

  // Page-specific chunks - use exact name matching to prevent duplicates
  if (chunkInfo.name === 'Students-Pages' || (chunkName.includes('Students') && chunkInfo.facadeModuleId && chunkInfo.facadeModuleId.includes('pages/students'))) {
    return 'Assets/Scripts/Pages/Students-Manager.js';
  }
  if (chunkInfo.name === 'Exercises-Pages' || (chunkName.includes('Exercise') && chunkInfo.facadeModuleId && chunkInfo.facadeModuleId.includes('pages/exercises'))) {
    return 'Assets/Scripts/Pages/Exercise-Manager.js';
  }
  if (chunkInfo.name === 'Diet-Pages' || (chunkName.includes('Diet') && chunkInfo.facadeModuleId && chunkInfo.facadeModuleId.includes('pages/diet'))) {
    return 'Assets/Scripts/Pages/Diet-Manager.js';
  }
  if (chunkInfo.name === 'Supplements-Pages' || (chunkName.includes('Supplement') && chunkInfo.facadeModuleId && chunkInfo.facadeModuleId.includes('pages/supplements'))) {
    return 'Assets/Scripts/Pages/Supplement-Manager.js';
  }

  // Utility chunks
  if (chunkName.includes('Utils') || chunkInfo.name === 'Utils-Hooks') {
    return 'Assets/Scripts/Utilities/Hooks-Utils.js';
  }

  // Component chunks
  if (chunkInfo.name === 'Students-Components' || (chunkName.includes('Component') && chunkInfo.facadeModuleId && chunkInfo.facadeModuleId.includes('components/students'))) {
    return 'Assets/Scripts/Components/Students-Components.js';
  }
  if (chunkInfo.name === 'Exercises-Components' || (chunkName.includes('Component') && chunkInfo.facadeModuleId && chunkInfo.facadeModuleId.includes('components/exercises'))) {
    return 'Assets/Scripts/Components/Exercise-Components.js';
  }
  if (chunkInfo.name === 'Diet-Components' || (chunkName.includes('Component') && chunkInfo.facadeModuleId && chunkInfo.facadeModuleId.includes('components/diet'))) {
    return 'Assets/Scripts/Components/Diet-Components.js';
  }
  if (chunkInfo.name === 'Supplements-Components' || (chunkName.includes('Component') && chunkInfo.facadeModuleId && chunkInfo.facadeModuleId.includes('components/supplements'))) {
    return 'Assets/Scripts/Components/Supplement-Components.js';
  }
  if (chunkName.includes('Component') || chunkInfo.name.includes('Component')) {
    return 'Assets/Scripts/Components/Custom-Components.js';
  }

  // Generic pages fallback
  if (chunkName.includes('Page') || chunkInfo.name.includes('Page')) {
    return 'Assets/Scripts/Pages/Other-Pages.js';
  }

  // Default fallback
  const formattedName = chunkName
    .split(/[-_]/)
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('-');
  return `Assets/Scripts/Components/${formattedName}.js`;
}
