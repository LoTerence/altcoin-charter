// import "@testing-library/jest-dom";
// import * as React from "react";
import { describe, it, expect, vi, global } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "@/App.jsx";

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
  removeItem: vi.fn(),
};
global.localStorage = localStorageMock;

describe("App renders", () => {
  it("renders without crashing", async () => {
    render(<App />);

    expect(await screen.findByText("App")).toBeInTheDocument();
  });
});
