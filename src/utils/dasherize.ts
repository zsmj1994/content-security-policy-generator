export const dasherize = (str: string) => {
  return str.replace(/[A-Z](?:(?=[^A-Z])|[A-Z]*(?=[A-Z][^A-Z]|$))/g, (s, i) => {
    return (i > 0 ? "-" : "") + s.toLowerCase();
  });
};
