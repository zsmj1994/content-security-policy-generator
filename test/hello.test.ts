import { parseCSP, generateCspString } from "../src/index";
import { camelize } from "../src/utils/camelize";
import { dasherize } from "../src/utils/dasherize";

test("hello", () => {
  const str = "default-src 'self' http://example.com;";
  const csp = parseCSP(str);
  expect(csp["default-src"]).toEqual(["'self'", "http://example.com"]);
});

test("camelize", () => {
  expect(camelize("default-src")).toBe("defaultSrc");
});

test("dasherize", () => {
  expect(dasherize("defaultSrc")).toBe("default-src");
});

test("generate", () => {
  expect(
    generateCspString({
      defaultSrc: {
        none: true,
      },
    })
  ).toBe("default-src 'none'");

  expect(
    generateCspString({
      defaultSrc: {
        self: true,
      },
      scriptSrc: {
        all: true,
      },
    })
  ).toBe("default-src 'self'; script-src *");

  expect(
    generateCspString({
      defaultSrc: {
        self: true,
        hosts: ["a.com", "b.com"],
      },
      scriptSrc: {
        all: true,
      },
    })
  ).toBe("default-src 'self' a.com b.com; script-src *");
});
