import React from "react";
import { render } from "react-testing-library";

import App from "../App";

describe("<App />", () => {
  it("should render without errors", () => {
    expect(render(<App />)).toBeTruthy();
  });
});
