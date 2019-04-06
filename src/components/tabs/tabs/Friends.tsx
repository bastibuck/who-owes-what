import React, { useState } from "react";
import { addFriendAction } from "../../../store/actions";
import { useStateValue } from "../../../store/useStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { IFriend, IRootStore } from "../../../store/initialState";
import FriendsList from "./friends/FriendsList";
import Error from "../../common/ErrorNotification";

const Friends = () => {
  // @ts-ignore
  const [stateValue, dispatch]: [IRootStore, any] = useStateValue();

  const emptyFriend: IFriend = {
    id: -1,
    name: "",
  };
  const [friend, setFriend] = useState(emptyFriend);
  const [error, setError] = useState("");

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
    setError("");
  };

  const handleFriendNameFocus = (e: React.FocusEvent) =>
    // @ts-ignore
    e.currentTarget.select();

  return (
    <>
      <div className={"columns"}>
        <div className="column is-half-tablet is-offset-one-quarter-tablet">
          {error && <Error resetError={setError}>{error}</Error>}
          <form onSubmit={handleSubmit}>
            <div className="field has-addons">
              <div className="control has-icons-left is-expanded">
                <input
                  className="input"
                  type="text"
                  placeholder="Input a friend's name"
                  value={friend.name}
                  onChange={handleFriendNameChange}
                  onFocus={handleFriendNameFocus}
                />
                <span className="icon is-small is-left">
                  <FontAwesomeIcon icon={faUser} />
                </span>
              </div>
              <div className="control">
                <button
                  type={"submit"}
                  className={`button is-link`}
                  disabled={!friend.name}
                >
                  Add Friend
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {stateValue.friends.length > 0 && <FriendsList />}
    </>
  );
};

export default Friends;
