import React, { useState } from "react";
import { addFriendAction } from "../../../store/actions";
import { useStateValue } from "../../../store/useStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import FriendBox, { EEvenState } from "./friends/FriendBox";
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

      {stateValue.friends.length > 0 && (
        <>
          <hr />
          <h2 className="subtitle">Splitting expenses between:</h2>
          <div className="columns is-multiline">
            {stateValue.friends.map((friend: IFriend, index: number) => (
              <FriendBox
                friend={friend}
                evenState={
                  index % 3 === 0
                    ? EEvenState.EVEN
                    : index % 2 === 0
                    ? EEvenState.GETS
                    : EEvenState.OWES
                }
                key={`friendsBox-${index}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Friends;
