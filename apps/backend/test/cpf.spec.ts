import { expect, test } from "vitest";
import { Cpf } from "../src/cpf.ts";

test.each(["83432616074", "74587887803", "87175659520"])("Should test valid cpf - %s", (value: string) => {
  expect(Cpf.isValid(value)).toBe(true);
});

test.each(["83432616076", "99999999999", "834326160", ""])("Should test invalid cpf - %s", (value: string) => {
  expect(Cpf.isValid(value)).toBe(false);
});
