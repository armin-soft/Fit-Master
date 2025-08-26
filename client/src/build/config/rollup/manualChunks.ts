/**
 * Logic for Rollup's manualChunks option.
 */
export function getManualChunk(id: string): string | undefined {
  // React Core - Keep React and React-DOM together
  if (
    id.includes('node_modules/react/') ||
    id.includes('node_modules/react-dom/') ||
    id.includes('node_modules/scheduler/') ||
    id.includes('react/jsx-runtime')
  ) {
    return 'React-Core';
  }

  if (id.includes('node_modules/@radix-ui')) {
    return 'UI-Components';
  }

  if (
    id.includes('node_modules/react-router') ||
    id.includes('node_modules/@tanstack/react-query')
  ) {
    return 'Router-Query';
  }

  if (id.includes('node_modules/framer-motion')) {
    return 'Animations';
  }

  if (id.includes('node_modules/lucide-react')) {
    return 'Icons';
  }

  if (id.includes('node_modules/date-fns')) {
    return 'Date-Utils';
  }

  if (
    id.includes('node_modules/react-hook-form') ||
    id.includes('node_modules/@hookform')
  ) {
    return 'Forms';
  }

  if (
    id.includes('node_modules/jspdf') ||
    id.includes('node_modules/canvas') ||
    id.includes('node_modules/html2canvas')
  ) {
    return 'PDF-Canvas';
  }

  if (id.includes('node_modules/recharts')) {
    return 'Charts';
  }

  // Vendor libs
  if (
    id.includes('node_modules/') &&
    !id.includes('node_modules/react/') &&
    !id.includes('node_modules/react-dom/') &&
    !id.includes('node_modules/@radix-ui') &&
    !id.includes('node_modules/react-router') &&
    !id.includes('node_modules/@tanstack/react-query') &&
    !id.includes('node_modules/framer-motion') &&
    !id.includes('node_modules/lucide-react') &&
    !id.includes('node_modules/date-fns') &&
    !id.includes('node_modules/react-hook-form') &&
    !id.includes('node_modules/@hookform') &&
    !id.includes('node_modules/jspdf') &&
    !id.includes('node_modules/canvas') &&
    !id.includes('node_modules/html2canvas') &&
    !id.includes('node_modules/recharts')
  ) {
    return 'Vendor-Libs';
  }

  // Pages and components
  if (id.includes('src/pages/')) {
    if (id.includes('src/pages/students')) return 'Students-Pages';
    if (id.includes('src/pages/exercises')) return 'Exercises-Pages';
    if (id.includes('src/pages/diet')) return 'Diet-Pages';
    if (id.includes('src/pages/supplements')) return 'Supplements-Pages';
    return 'Other-Pages';
  }

  if (id.includes('src/components/students')) return 'Students-Components';
  if (id.includes('src/components/exercises')) return 'Exercises-Components';
  if (id.includes('src/components/diet')) return 'Diet-Components';
  if (id.includes('src/components/supplements')) return 'Supplements-Components';
  if (id.includes('src/components/')) return 'UI-Components-Custom';
  if (
    id.includes('src/hooks/') ||
    id.includes('src/lib/') ||
    id.includes('src/utils/')
  ) {
    return 'Utils-Hooks';
  }

  return undefined;
}
