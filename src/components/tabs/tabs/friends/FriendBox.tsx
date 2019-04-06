import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { IRootStore, TFriendId } from "../../../../store/initialState";
import { useStateValue } from "../../../../store/useStore";
import { removeFriendAction } from "../../../../store/actions";

interface IProps {
  readonly friendId: TFriendId;
}

const StyledDelete = styled.button`
  cursor: pointer;
`;

const FriendBox = ({ friendId }: IProps) => {
  // @ts-ignore
  const [stateValue, dispatch]: [IRootStore, any] = useStateValue();

  const handleDeleteFriend = (e: React.MouseEvent) => {
    dispatch(removeFriendAction(friendId));
  };

  // friend object
  const friend = stateValue.friendsById[friendId];

  // only enable deleting for friends that don't share any expenses
  let deletable = true;
  for (const expenseId of stateValue.expenses) {
    if (
      stateValue.expensesById[expenseId].sharedWith.includes(friendId) ||
      stateValue.expensesById[expenseId].payer === friendId
    ) {
      deletable = false;
    }
  }

  return (
    <div className={"column is-one-quarter"}>
      <div className={`box`}>
        <article className="media">
          <div className="media-left">
            <FontAwesomeIcon icon={faUser} />
          </div>
          <div className="media-content">
            <div className="content">
              <p>
                <strong>{friend.name}</strong>
              </p>
            </div>
          </div>
          {deletable && (
            <div className="media-right">
              <StyledDelete className="delete" onClick={handleDeleteFriend} />
            </div>
          )}
        </article>
      </div>
    </div>
  );
};

export default FriendBox;
