import { parseCSP, parseDefaultSrc } from "../src/index";

test("hello", () => {
  const str = "default-src 'self' http://example.com;";
  const csp = parseCSP(str);
  expect(csp["default-src"]).toEqual(["'self'", "http://example.com"]);
});

test("parseDefaultSrc", () => {
  const defaultSrc = parseDefaultSrc(["'self'", "http://example.com"]);
  expect(defaultSrc).toEqual({
    self: true
  });
});
