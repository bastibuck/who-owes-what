import React from "react";
import {
  render,
  fireEvent,
  queryByText,
  getByText,
  getAllByText,
} from "react-testing-library";
import Friends from "../Friends";
import { StoreProvider } from "../../../../store/useStore";

const renderFriends = () => {
  const utils = render(
    <StoreProvider>
      <Friends />
    </StoreProvider>,
  );

  return { ...utils };
};

describe("Integration test: <Friends /> ", () => {
  it("should add friends correctly", () => {
    const { getByPlaceholderText, getByText, queryByText } = renderFriends();

    const Input = getByPlaceholderText(/input a friend's name/i);
    const Button = getByText(/add friend/i);

    // check empty friends list
    expect(queryByText("Splitting expenses between:")).toBeNull();

    // add three friends
    fireEvent.change(Input, { target: { value: "Daisy Duck" } });
    fireEvent.click(Button);
    expect(getByText("Daisy Duck")).toBeDefined();

    fireEvent.change(Input, { target: { value: "Donald Duck" } });
    fireEvent.submit(Input);
    expect(getByText("Donald Duck")).toBeDefined();

    fireEvent.change(Input, { target: { value: "Goofy" } });
    fireEvent.click(Button);
    expect(getByText("Goofy")).toBeDefined();

    // check friend names in friend list
    expect(getByText("Splitting expenses between:")).toBeDefined();
    expect(getByText("Daisy Duck")).toBeDefined();
    expect(getByText("Donald Duck")).toBeDefined();
    expect(getByText("Goofy")).toBeDefined();
  });

  it("should remove friends correctly", () => {
    const { getByPlaceholderText, queryByText, getByTitle } = renderFriends();

    const Input = getByPlaceholderText(/input a friend's name/i);

    // setup friends Daisy, Donald and Goofy
    fireEvent.change(Input, { target: { value: "Daisy Duck" } });
    fireEvent.submit(Input);
    fireEvent.change(Input, { target: { value: "Donald Duck" } });
    fireEvent.submit(Input);
    fireEvent.change(Input, { target: { value: "Goofy" } });
    fireEvent.submit(Input);

    // remove friends one-by-one
    fireEvent.click(getByTitle("remove 'Donald Duck'"));
    expect(queryByText("Donald Duck")).toBeNull();

    fireEvent.click(getByTitle("remove 'Goofy'"));
    expect(queryByText("Goofy")).toBeNull();

    fireEvent.click(getByTitle("remove 'Daisy Duck'"));
    expect(queryByText("Daisy Duck")).toBeNull();
  });

  it("should throw error notification on duplicate friend name and remove notification correctly", () => {
    const {
      getByPlaceholderText,
      getByText,
      getAllByText,
      getByTitle,
      queryByText,
    } = renderFriends();

    const Input = getByPlaceholderText(/input a friend's name/i);

    // add first friend
    fireEvent.change(Input, { target: { value: "Daisy Duck" } });
    fireEvent.submit(Input);

    // try adding second friend with same name
    fireEvent.change(Input, { target: { value: "Daisy Duck" } });
    fireEvent.submit(Input);

    // check error and friend not being added
    expect(
      getByText("Friend with name Daisy Duck already added"),
    ).toBeDefined();
    expect(getAllByText("Daisy Duck")).toHaveLength(1);

    // remove notification
    fireEvent.click(getByTitle("Close"));
    expect(queryByText("Friend with name Daisy Duck already added")).toBeNull();
  });
});
