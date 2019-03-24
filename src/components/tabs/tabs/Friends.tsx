import React, { useState } from "react";
import { addFriendAction } from "../../../store/actions";
import { useStateValue } from "../../../store/useStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import FriendBox from "./friends/FriendBox";
import { IFriend } from "../../../store/initialState";

const Friends = () => {
  // @ts-ignore
  const [stateValue, dispatch] = useStateValue();

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

  const handleCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    setFriendName("");
  };

  return (
    <div>
      <div className="columns is-multiline">
        {stateValue.friends.map((friend: IFriend, index: number) => (
          <FriendBox friend={friend} key={`friendsBox-${index}`} />
        ))}
      </div>

      <form onSubmit={handleAddFriend}>
        <div className="field">
          <p className="control has-icons-left has-icons-right">
            <input
              className="input"
              type="text"
              placeholder="Input a friend's name"
              value={friendName}
              onChange={handleFriendNameChange}
            />
            <span className="icon is-small is-left">
              <FontAwesomeIcon icon={faUser} />
            </span>
          </p>
        </div>
        {friendName && (
          <div className={"field is-grouped"}>
            <div className="control">
              <button className="button is-link">Add Friend</button>
            </div>
            <div className="control">
              <button onClick={handleCancel} className="button is-text">
                Cancel
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Friends;
