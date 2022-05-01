export const generateArray = <T>(item: T, length: number): T[] => {
  const array = Array.from({ length }, () => {
    return item;
  });

  return array;
};
