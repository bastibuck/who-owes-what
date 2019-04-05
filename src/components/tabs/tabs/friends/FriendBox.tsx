import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { IFriend, IRootStore } from "../../../../store/initialState";
import { useStateValue } from "../../../../store/useStore";
import { removeFriendAction } from "../../../../store/actions";

interface IProps {
  readonly friend: IFriend;
  readonly evenState: EEvenState;
}

export enum EEvenState {
  EVEN,
  OWES,
  GETS,
}

const StyledDelete = styled.button`
  cursor: pointer;
`;

const FriendBox = ({ friend, evenState }: IProps) => {
  // @ts-ignore
  const [stateValue, dispatch]: [IRootStore, any] = useStateValue();

  const handleDeleteFriend = (e: React.MouseEvent) => {
    dispatch(removeFriendAction(friend.id));
  };

  // build strings
  let cssColorClass = "";
  let evenStateKey = "";
  switch (evenState) {
    case EEvenState.EVEN:
      cssColorClass = "has-background-info";
      evenStateKey = "is even";
      break;
    case EEvenState.OWES:
      cssColorClass = "has-background-danger";
      evenStateKey = "owes ";
      break;
    case EEvenState.GETS:
      cssColorClass = "has-background-success";
      evenStateKey = "lends ";
      break;

    default:
      throw new Error("unknown EEvenState");
  }

  // only enable deleting for friends that don't share any expenses
  let deletable = true;
  for (const expense of stateValue.expenses) {
    if (expense.sharedWith.includes(friend.id)) {
      deletable = false;
    }
  }

  return (
    <div className={"column is-one-quarter"}>
      <div className={`box has-text-white ${cssColorClass}`}>
        <article className="media">
          <div className="media-left">
            <FontAwesomeIcon icon={faUser} />
          </div>
          <div className="media-content">
            <div className="content">
              <p>
                <strong className={`has-text-white ${cssColorClass}`}>
                  {friend.name}
                </strong>
                <br />
                <small>{evenStateKey}</small>
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
