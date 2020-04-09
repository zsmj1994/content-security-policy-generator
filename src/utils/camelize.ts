export const camelize = (str: string) => {
  return str.replace(/[_.-](\w|$)/g, (_, x) => x.toUpperCase());
};
