import { expect } from "vitest";
import matchers from "@testing-library/jest-dom/matchers";

// extend Vitest's expect with jest-dom's matchers
expect.extend(matchers);
