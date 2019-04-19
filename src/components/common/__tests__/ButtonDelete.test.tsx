import React from "react";
import { cleanup, fireEvent, render } from "react-testing-library";

// components
import ButtonDelete, { IProps } from "../ButtonDelete";

afterEach(cleanup);

const renderButtonDelete = (props?: Partial<IProps>) => {
  const mockCallback = jest.fn();
  const title = "Delete this";

  const utils = render(
    <ButtonDelete action={mockCallback} title={title} {...props} />,
  );

  return { ...utils, mockCallback };
};

/**
 * Tests for <ButtonDelete />
 */
describe("<ButtonDelete />", () => {
  it("should handle click correctly", () => {
    const { getByRole, mockCallback } = renderButtonDelete();
    expect(mockCallback).toBeCalledTimes(0);
    fireEvent.click(getByRole("button"));
    expect(mockCallback).toBeCalledTimes(1);
  });

  it("should use correct title attribute", () => {
    const { getByTitle } = renderButtonDelete({
      title: "This is a custom title",
    });
    expect(getByTitle("This is a custom title")).toBeTruthy();
  });
});
