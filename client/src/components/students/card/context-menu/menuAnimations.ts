
export const menuItemVariants = {
  hidden: { opacity: 0, x: -5 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.04,
      duration: 0.15,
    }
  }),
  exit: { opacity: 0, x: -5, transition: { duration: 0.1 } }
};
