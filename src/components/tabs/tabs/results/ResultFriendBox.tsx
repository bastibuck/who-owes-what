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
  const [stateValue]: [IRootStore] = useStateValue();

  const getTotal = () => {
    let sum = 0;
    Object.keys(friend.owes).map(owesFriendId => {
      const owerId = parseInt(owesFriendId, 10);

      return (sum += friend.owes[owerId]);
    });

    return sum;
  };

  // friend object
  const friend = stateValue.friendsById[friendId];

  // build strings
  const total = getTotal();

  let cssColorClass = "";
  let evenState = EEvenState.EVEN;

  if (total === 0) {
    evenState = EEvenState.EVEN;
  }

  if (total > 0) {
    evenState = EEvenState.OWES;
  }

  if (total < 0) {
    evenState = EEvenState.GETS;
  }

  switch (evenState) {
    case EEvenState.EVEN:
      cssColorClass = "has-background-info";
      break;
    case EEvenState.OWES:
      cssColorClass = "has-background-danger";
      break;
    case EEvenState.GETS:
      cssColorClass = "has-background-success";
      break;

    default:
      throw new Error("unknown EEvenState");
  }

  return (
    <div className={"column is-half"}>
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
                  {Object.keys(friend.owes).map(owesFriendId => {
                    const owerId = parseInt(owesFriendId, 10);

                    if (friend.owes[owerId] === 0) {
                      return null;
                    } else if (friend.owes[owerId] > 0) {
                      return (
                        <li key={`owes-to-${owerId}`}>
                          owes {friend.owes[owerId]} to{" "}
                          {stateValue.friendsById[owerId].name}
                        </li>
                      );
                    } else {
                      return (
                        <li key={`owes-to-${owerId}`}>
                          gets {friend.owes[owerId] * -1} from{" "}
                          {stateValue.friendsById[owerId].name}
                        </li>
                      );
                    }
                  })}
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
  );
};

export default ResultFriendBox;
