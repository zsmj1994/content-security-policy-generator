interface BasePolicy {
  none: boolean;
  all: boolean;
  self: boolean;
  hosts: string[];
}

interface InlinePolicy {
  inline: boolean;
}

interface EvalPolicy {
  eval: boolean;
}

type DirectivePolicies = BasePolicy & InlinePolicy & EvalPolicy;

interface DirectiveTypes {
  defaultSrc: Partial<DirectivePolicies>;
  scriptSrc: Partial<DirectivePolicies>;
  styleSrc: DirectivePolicies;
  imgSrc: DirectivePolicies;
  fontSrc: DirectivePolicies;
  connectSrc: DirectivePolicies;
  mediaSrc: DirectivePolicies;
  objectSrc: DirectivePolicies;
  frameSrc: DirectivePolicies;
  reportUri: DirectivePolicies;
}

type CspParser = {
  [P in keyof Partial<DirectivePolicies>]: (...args: any[]) => string;
};
