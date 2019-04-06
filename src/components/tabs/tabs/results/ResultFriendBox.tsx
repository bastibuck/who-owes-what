import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { IRootStore, TFriendId } from "../../../../store/initialState";
import { useStateValue } from "../../../../store/useStore";

interface IProps {
  readonly friendId: TFriendId;
}

enum EEvenState {
  EVEN,
  OWES,
  GETS,
}

const ResultFriendBox = ({ friendId }: IProps) => {
  // @ts-ignore
  const [stateValue, dispatch]: [IRootStore, any] = useStateValue();

  // friend object
  const friend = stateValue.friendsById[friendId];

  // build strings
  let cssColorClass = "";
  let total = 0;
  const rnd = Math.round(Math.random() * 10) % 3;
  const evenState =
    rnd === 0 ? EEvenState.EVEN : rnd === 1 ? EEvenState.OWES : EEvenState.GETS;
  switch (evenState) {
    case EEvenState.EVEN:
      cssColorClass = "has-background-info";
      total = 0;
      break;
    case EEvenState.OWES:
      cssColorClass = "has-background-danger";
      total = -23.45;
      break;
    case EEvenState.GETS:
      cssColorClass = "has-background-success";
      total = 15.76;
      break;

    default:
      throw new Error("unknown EEvenState");
  }

  return (
    <>
      <div className={"column is-one-half"}>
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
                </p>
                <div>
                  <ul>
                    <li>owes 32.45 to FRIENDNAME</li>
                    <li>FRIENDNAME owes 10.23 to {friend.name}</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="media-right">
              <sup>Total: {total}</sup>
            </div>
          </article>
        </div>
      </div>
    </>
  );
};

export default ResultFriendBox;
