import React from "react";
import { cleanup, fireEvent, render } from "react-testing-library";

// components
import ErrorNotification from "../ErrorNotification";

afterEach(cleanup);

describe("<ErrorNotification />", () => {
  it("renders correct message", () => {
    const mockReset = jest.fn();
    const error = "This is a custom error msg";

    const { getByText } = render(
      <ErrorNotification callback={mockReset}>{error}</ErrorNotification>,
    );

    expect(getByText(error)).toBeTruthy();
  });

  it("handles button callback correctly", () => {
    const mockReset = jest.fn();
    const error = "This is a custom error msg";

    const { getByRole } = render(
      <ErrorNotification callback={mockReset}>{error}</ErrorNotification>,
    );

    fireEvent.click(getByRole("button"));
    expect(mockReset).toBeCalledTimes(1);
  });
});
