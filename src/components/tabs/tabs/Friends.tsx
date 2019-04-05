import React, { useState } from "react";
import { addFriendAction } from "../../../store/actions";
import { useStateValue } from "../../../store/useStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { IRootStore } from "../../../store/initialState";
import FriendsList from "./friends/FriendsList";

const Friends = () => {
  // @ts-ignore
  const [stateValue, dispatch]: [IRootStore, any] = useStateValue();

  const [friendName, setFriendName] = useState("");

  const handleAddFriend = (e: React.FormEvent) => {
    e.preventDefault();
    if (friendName) {
      dispatch(addFriendAction(friendName));
      setFriendName("");
    }
  };

  const handleFriendNameChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFriendName(e.currentTarget.value);
  };

  const handleCancel = (e: React.FocusEvent) => {
    e.preventDefault();
    setFriendName("");
  };

  return (
    <div>
      <form onSubmit={handleAddFriend}>
        <div className="field has-addons">
          <div className="control has-icons-left">
            <input
              className="input"
              type="text"
              placeholder="Input a friend's name"
              value={friendName}
              onChange={handleFriendNameChange}
              onBlur={handleCancel}
            />
            <span className="icon is-small is-left">
              <FontAwesomeIcon icon={faUser} />
            </span>
          </div>
          <div className="control">
            <button
              className={`button is-link`}
              disabled={!friendName ? true : false}
            >
              Add Friend
            </button>
          </div>
        </div>
      </form>

      {stateValue.friends.length > 0 && <FriendsList />}
    </div>
  );
};

export default Friends;
