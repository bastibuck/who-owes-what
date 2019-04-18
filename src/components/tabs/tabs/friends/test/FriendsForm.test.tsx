import React, { FormEvent } from "react";
import { cleanup, fireEvent, render } from "react-testing-library";

import FriendsForm from "../FriendsForm";

afterEach(cleanup);

describe("<FriendsForm />", () => {
  it("should change input value on change", () => {
    const mockSubmitCallback = jest.fn();
    const mockFocusFriendName = jest.fn();
    let friendName = "";
    const mockChangeFriendName = jest.fn(
      (e: React.FormEvent<HTMLInputElement>) => {
        friendName = e.currentTarget.value;
      },
    );

    const { getByPlaceholderText, rerender } = render(
      <FriendsForm
        friendName={friendName}
        submitCallback={mockSubmitCallback}
        handleFriendNameChange={mockChangeFriendName}
        handleFriendNameFocus={mockFocusFriendName}
      />,
    );

    const Input = getByPlaceholderText(
      /input a friend's name/i,
    ) as HTMLInputElement;

    expect(Input).toBeDefined();
    expect(Input.value).toEqual(friendName);

    // type into input and rerender with new value
    fireEvent.change(Input, { target: { value: "Tom Sinclair" } });
    rerender(
      <FriendsForm
        friendName={friendName}
        submitCallback={mockSubmitCallback}
        handleFriendNameChange={mockChangeFriendName}
        handleFriendNameFocus={mockFocusFriendName}
      />,
    );
    expect(mockChangeFriendName).toBeCalledTimes(1);
    expect(Input.value).toEqual(friendName);
  });

  it("should have disabled button on empty value", () => {
    const friendName = "";
    const mockSubmitCallback = jest.fn();
    const mockFocusFriendName = jest.fn();
    const mockChangeFriendName = jest.fn();

    const { getByText } = render(
      <FriendsForm
        friendName={friendName}
        submitCallback={mockSubmitCallback}
        handleFriendNameChange={mockChangeFriendName}
        handleFriendNameFocus={mockFocusFriendName}
      />,
    );

    const Button = getByText(/add friend/i) as HTMLButtonElement;

    expect(Button.disabled).toBeTruthy();
  });

  it("should have button activated on set value", () => {
    const friendName = "Mickey Mouse";
    const mockSubmitCallback = jest.fn();
    const mockFocusFriendName = jest.fn();
    const mockChangeFriendName = jest.fn();

    const { getByText } = render(
      <FriendsForm
        friendName={friendName}
        submitCallback={mockSubmitCallback}
        handleFriendNameChange={mockChangeFriendName}
        handleFriendNameFocus={mockFocusFriendName}
      />,
    );

    const Button = getByText(/add friend/i) as HTMLButtonElement;

    expect(Button.disabled).toBeFalsy();
  });

  it("should call submitCallback correctly", () => {
    const friendName = "Pluto";
    const mockSubmitCallback = jest.fn((e: FormEvent) => e.preventDefault());
    const mockFocusFriendName = jest.fn();
    const mockChangeFriendName = jest.fn();

    const { getByText } = render(
      <FriendsForm
        friendName={friendName}
        submitCallback={mockSubmitCallback}
        handleFriendNameChange={mockChangeFriendName}
        handleFriendNameFocus={mockFocusFriendName}
      />,
    );

    fireEvent.click(getByText(/add friend/i));
    expect(mockSubmitCallback).toBeCalledTimes(1);
  });

  it("should call focusCallback correctly", () => {
    const friendName = "Donald Duck";
    const mockSubmitCallback = jest.fn();
    const mockFocusFriendName = jest.fn();
    const mockChangeFriendName = jest.fn();

    const { getByValue } = render(
      <FriendsForm
        friendName={friendName}
        submitCallback={mockSubmitCallback}
        handleFriendNameChange={mockChangeFriendName}
        handleFriendNameFocus={mockFocusFriendName}
      />,
    );

    fireEvent.focus(getByValue(friendName));
    expect(mockFocusFriendName).toBeCalledTimes(1);
  });
});
