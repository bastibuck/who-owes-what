import React from "react";
import { cleanup, fireEvent, render } from "react-testing-library";

// components
import ErrorNotification, { IProps } from "../ErrorNotification";

afterEach(cleanup);

const renderErrorNotification = (props?: Partial<IProps>) => {
  const mockReset = jest.fn();
  const error = "This is a custom error msg";

  const utils = render(
    <ErrorNotification errorMsg={error} closeCallback={mockReset} {...props} />,
  );

  return { ...utils, mockReset };
};

/**
 * Tests for <ErrorNotification />
 */
describe("<ErrorNotification />", () => {
  it("should render correct error message", () => {
    const { getByText } = renderErrorNotification({
      errorMsg: "My custom error to look for",
    });
    expect(getByText("My custom error to look for")).toBeTruthy();
  });

  it('should show the default title of "close"', () => {
    const { getByTitle } = renderErrorNotification();
    expect(getByTitle(/close/i)).toBeTruthy();
  });

  it("should show correct title text on the button", () => {
    const { getByTitle } = renderErrorNotification({
      title: "Custom optional title",
    });
    expect(getByTitle("Custom optional title")).toBeTruthy();
  });

  it("should handle button closeCallback correctly", () => {
    const { getByRole, mockReset } = renderErrorNotification();
    fireEvent.click(getByRole("button"));
    expect(mockReset).toBeCalledTimes(1);
  });

  it("should not render when error is undefined", () => {
    const { queryByRole } = renderErrorNotification({ errorMsg: undefined });
    expect(queryByRole("button")).toBeNull();
  });
});
