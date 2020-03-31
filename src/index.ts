interface PolicyDirective {}

interface Csp {
  childSrc: FetchDirective;
  connectSrc: FetchDirective;
  defaultSrc: FetchDirective;
  fontSrc: FetchDirective;
  frameSrc: FetchDirective;
  imgSrc: FetchDirective;
  manifestSrc: FetchDirective;
  mediaSrc: FetchDirective;
  objectSrc: FetchDirective;
  scriptSrc: FetchDirective;
  styleSrc: FetchDirective;
  workerSrc: FetchDirective;
  [key: string]: any;
}

interface CspData {
  childSrc: boolean;
  connectSrc: boolean;
  defaultSrc: boolean;
  fontSrc: boolean;
  frameSrc: boolean;
  imgSrc: boolean;
  manifestSrc: boolean;
  mediaSrc: boolean;
  objectSrc: boolean;
  scriptSrc: boolean;
  styleSrc: boolean;
  workerSrc: boolean;
}

type FetchDirective = "'self'" | undefined | string;

type Hosts = string[];

interface DefaultSrc {}

type defaultSrc_source =
  | "'self'"
  | "'unsafe-inline'"
  | "'unsafe-eval'"
  | "'none'"
  | "'strict-dynamic'";

interface Source {}

interface DefaultSrc {
  hostSource: string[];
  schemeSource: string[];
  self: boolean;
  unsafeEval: boolean;
  unsafeHashes: boolean;
  unsafeInline: boolean;
  none: boolean;
  nonceBase64Value: string;
  strictDynamic: boolean;
}

interface Default {
  none: boolean;
  all: boolean;
  self: boolean;
  data: boolean;
  hosts: string[];
}

export const parseDefaultSrc = (directive: string[]) => {
  const d: Partial<Default> = {};
  if (directive.indexOf("'self'") > -1) {
    d.self = true;
  }
  if (directive.indexOf("*") > -1) {
    d.all = true;
  }
  if (directive.indexOf("'none'") > -1) {
    d.none = true;
  }
  if (directive.indexOf("Data:") > -1) {
    d.data = true;
  }
  return d;
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
    workerSrc: undefined
  };
  let directives = cspString.split(";");
  directives.forEach(value => {
    const directive = value.trim();
    const tokens = directive.split(/\s+/);
    const name = tokens[0];
    const sources = tokens.slice(1, tokens.length);
    result[name] = sources;
  });
  return result;
};
