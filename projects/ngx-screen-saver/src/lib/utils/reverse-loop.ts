export const reverseLoop = <T = any>(
  arr: T[],
  callback: (item: T, index: number) => void
) => {
  for (let i = arr.length - 1; i >= 0; i--) {
    callback(arr[i], i);
  }
};
