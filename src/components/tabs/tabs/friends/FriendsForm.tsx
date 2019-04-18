import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

interface IProps {
  readonly submitCallback: (e: React.FormEvent<Element>) => void;
  readonly friendName: string;
  readonly handleFriendNameChange: (
    e: React.FormEvent<HTMLInputElement>,
  ) => void;
  readonly handleFriendNameFocus: (
    e: React.FocusEvent<HTMLInputElement>,
  ) => void;
}

const FriendsForm: React.FC<IProps> = ({
  submitCallback,
  friendName,
  handleFriendNameChange,
  handleFriendNameFocus,
}) => (
  <form onSubmit={submitCallback}>
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
);

export default FriendsForm;
