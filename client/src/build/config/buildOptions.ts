
// تنظیمات ساخت پروژه - بهینه‌شده برای GymSync
export const buildOptions = {
  outDir: 'dist',
  assetsDir: 'Assets',
  chunkSizeWarningLimit: 800,
  assetsInlineLimit: 0,
  cssCodeSplit: true,
  minify: 'terser' as const,
  terserOptions: {
    compress: {
      drop_console: false, // true برای production، ولی فعلاً false برای کنترل بهتر
      drop_debugger: true,
      pure_funcs: [],
      passes: 2
    },
    mangle: {
      safari10: true
    }
  },
  sourcemap: false,
};
