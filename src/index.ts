import { dasherize } from "./utils/dasherize";

const sourcesParser: CspParser = {
  self: () => "'self'",
  none: () => "'none'",
  all: () => "*",
  inline: () => "'unsafe-inline'",
  hosts: (hosts: string[] = []) => {
    return hosts.join(" ");
  },
};

export const parseCSP = (cspString: string) => {
  const result: {
    [key: string]: any;
  } = {
    childSrc: undefined,
    connectSrc: undefined,
    defaultSrc: undefined,
    fontSrc: undefined,
    frameSrc: undefined,
    imgSrc: undefined,
    manifestSrc: undefined,
    mediaSrc: undefined,
    objectSrc: undefined,
    scriptSrc: undefined,
    styleSrc: undefined,
    workerSrc: undefined,
  };
  let directives = cspString.split(";");
  directives.forEach((value) => {
    const directive = value.trim();
    const tokens = directive.split(/\s+/);
    const name = tokens[0];
    const sources = tokens.slice(1, tokens.length);
    result[name] = sources;
  });
  return result;
};

export const generateCspString = (options: CspDirectiveOptions) => {
  let arr: string[][] = [];
  Object.keys(options).forEach((key) => {
    const directiveKey = key as keyof CspDirectiveOptions;
    const te = options[directiveKey];
    let result: string[] = [];

    result.push(dasherize(key));

    Object.keys(sourcesParser).forEach((v) => {
      if (te && te[v as keyof DirectivePolicies]) {
        const parser = sourcesParser[v as keyof DirectivePolicies];
        parser && result.push(parser(te[v as keyof DirectivePolicies]));
      }
    });
    arr.push(result);
  });

  return arr
    .map((value) => {
      return value.join(" ");
    })
    .join("; ");
};
