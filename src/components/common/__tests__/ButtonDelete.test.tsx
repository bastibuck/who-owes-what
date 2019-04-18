import React from "react";
import { cleanup, fireEvent, render } from "react-testing-library";

// components
import ButtonDelete from "../ButtonDelete";

afterEach(cleanup);

describe("<ButtonDelete />", () => {
  it("should handle click correctly", () => {
    const mockCallback = jest.fn();
    const title = "my title";

    const { getByTitle } = render(
      <ButtonDelete action={mockCallback} title={title} />,
    );

    expect(mockCallback).toBeCalledTimes(0);
    fireEvent.click(getByTitle(title));
    expect(mockCallback).toBeCalledTimes(1);
  });

  it("should use correct title attribute", () => {
    const mockCallback = jest.fn();
    const title = "my title";

    const { getByTitle } = render(
      <ButtonDelete action={mockCallback} title={title} />,
    );

    expect(getByTitle(title)).toBeTruthy();
  });
});
