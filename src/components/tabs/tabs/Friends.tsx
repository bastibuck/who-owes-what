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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (friendName) {
      dispatch(addFriendAction(friendName));
      setFriendName("");
    }
  };

  const handleFriendNameChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFriendName(e.currentTarget.value);
  };

  const handleFriendNameFocus = (e: React.FocusEvent) =>
    // @ts-ignore
    e.currentTarget.select();

  return (
    <>
      <div className={"columns"}>
        <div className="column is-half-tablet is-offset-one-quarter-tablet">
          <form onSubmit={handleSubmit}>
            <div className="field has-addons">
              <div className="control has-icons-left is-expanded">
                <input
                  className="input"
                  type="text"
                  placeholder="Input a friend's name"
                  value={friendName}
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
                  disabled={!friendName}
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
