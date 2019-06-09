import React, { FormEvent } from "react";
import { fireEvent, render } from "@testing-library/react";

import FriendsForm, { IProps } from "../FriendsForm";

const renderFriendsForm = (props?: Partial<IProps>) => {
  let friendName = "";
  const mockSubmitCallback = jest.fn((e: FormEvent) => e.preventDefault());
  const mockFocusFriendName = jest.fn();
  const mockChangeFriendName = jest.fn((e: FormEvent<HTMLInputElement>) => {
    friendName = e.currentTarget.value;
  });

  const utils = render(
    <FriendsForm
      friendName={friendName}
      submitCallback={mockSubmitCallback}
      handleFriendNameChange={mockChangeFriendName}
      handleFriendNameFocus={mockFocusFriendName}
      {...props}
    />,
  );

  const rerenderForm = () =>
    utils.rerender(
      <FriendsForm
        friendName={friendName}
        submitCallback={mockSubmitCallback}
        handleFriendNameChange={mockChangeFriendName}
        handleFriendNameFocus={mockFocusFriendName}
        {...props}
      />,
    );

  const Input = utils.getByPlaceholderText(
    /input a friend's name/i,
  ) as HTMLInputElement;

  const Button = utils.getByText(/add friend/i) as HTMLButtonElement;

  return {
    ...utils,
    Input,
    Button,
    rerenderForm,
    mockChangeFriendName,
    mockSubmitCallback,
    mockFocusFriendName,
  };
};

/**
 * Tests for <FriendsForm />
 */
describe("<FriendsForm />", () => {
  it("should change input value on change", () => {
    const { Input, rerenderForm, mockChangeFriendName } = renderFriendsForm();

    expect(Input).toBeDefined();
    expect(Input.value).toEqual("");

    fireEvent.change(Input, { target: { value: "Tom Sinclair" } });
    rerenderForm();

    expect(mockChangeFriendName).toBeCalledTimes(1);
    expect(Input.value).toEqual("Tom Sinclair");
  });

  it("should have disabled button on empty value", () => {
    const { Button } = renderFriendsForm();
    expect(Button).toBeDisabled();
  });

  it("should have button enabled on set value", () => {
    const { Button } = renderFriendsForm({ friendName: "Mickey Mouse" });
    expect(Button).toBeEnabled();
  });

  it("should call submitCallback correctly", () => {
    const { Button, mockSubmitCallback } = renderFriendsForm({
      friendName: "Pluto",
    });

    fireEvent.click(Button);
    expect(mockSubmitCallback).toBeCalledTimes(1);
  });

  it("should call focusCallback correctly", () => {
    const { getByDisplayValue, mockFocusFriendName } = renderFriendsForm({
      friendName: "Donald Duck",
    });

    fireEvent.focus(getByDisplayValue("Donald Duck"));
    expect(mockFocusFriendName).toBeCalledTimes(1);
  });
});
