import React, { useState, Dispatch, SetStateAction } from "react";
import { addFriendAction } from "../../../store/actions";
import { useStateValue } from "../../../store/useStore";
import { emptyFriend, IRootStore } from "../../../store/initialState";
import FriendsList from "./friends/FriendsList";
import ErrorNotification from "../../common/ErrorNotification";
import FriendsForm from "./friends/FriendsForm";

const Friends = () => {
  // @ts-ignore
  const [stateValue, dispatch]: [IRootStore, any] = useStateValue();

  const [friend, setFriend] = useState(emptyFriend);

  type TError = string | undefined;
  const [error, setError]: [
    TError,
    Dispatch<SetStateAction<TError>>
  ] = useState();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (friend.name) {
      let friendExists = false;
      for (const friendId of stateValue.friends) {
        if (stateValue.friendsById[friendId].name === friend.name) {
          friendExists = true;
        }
      }

      if (!friendExists) {
        dispatch(addFriendAction(friend));
        setFriend(emptyFriend);
      } else {
        setError(`Friend with name ${friend.name} already added`);
      }
    }
  };

  const handleFriendNameChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFriend({ ...friend, name: e.currentTarget.value });
    setError(undefined);
  };

  const handleFriendNameFocus = (e: React.FocusEvent) =>
    // @ts-ignore
    e.currentTarget.select();

  const handleResetError = () => setError("");

  return (
    <>
      <div className={"columns"}>
        <div className="column is-half-tablet is-offset-one-quarter-tablet">
          <ErrorNotification
            errorMsg={error}
            closeCallback={handleResetError}
          />

          <FriendsForm
            submitCallback={handleSubmit}
            friendName={friend.name}
            handleFriendNameChange={handleFriendNameChange}
            handleFriendNameFocus={handleFriendNameFocus}
          />
        </div>
      </div>
      <FriendsList />
    </>
  );
};

export default Friends;
