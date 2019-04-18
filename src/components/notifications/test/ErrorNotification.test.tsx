import React from "react";
import { cleanup, fireEvent, render } from "react-testing-library";

// components
import ErrorNotification from "../ErrorNotification";

afterEach(cleanup);

describe("<ErrorNotification />", () => {
  it("should render correct error message", () => {
    const mockReset = jest.fn();
    const error = "This is a custom error msg";

    const { getByText } = render(
      <ErrorNotification errorMsg={error} closeCallback={mockReset} />,
    );

    expect(getByText(error)).toBeTruthy();
  });

  it('should show the default title of "close"', () => {
    const mockReset = jest.fn();
    const error = "This is a custom error msg";

    const { getByTitle } = render(
      <ErrorNotification errorMsg={error} closeCallback={mockReset} />,
    );

    expect(getByTitle(/close/i)).toBeTruthy();
  });

  it("should show correct title text on the button", () => {
    const mockReset = jest.fn();
    const error = "This is a custom error msg";
    const title = "Custom optional title";

    const { getByTitle } = render(
      <ErrorNotification
        errorMsg={error}
        closeCallback={mockReset}
        title={title}
      />,
    );

    expect(getByTitle(title)).toBeTruthy();
  });

  it("should handle button closeCallback correctly", () => {
    const mockReset = jest.fn();
    const error = "This is a custom error msg";

    const { getByRole } = render(
      <ErrorNotification errorMsg={error} closeCallback={mockReset} />,
    );

    fireEvent.click(getByRole("button"));
    expect(mockReset).toBeCalledTimes(1);
  });
});
