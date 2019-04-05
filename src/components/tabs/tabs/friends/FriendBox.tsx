import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { IFriend } from "../../../../store/initialState";
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

const FriendBox = (props: IProps) => {
  // @ts-ignore
  const [stateValue, dispatch] = useStateValue();

  const handleDeleteFriend = (e: React.MouseEvent) => {
    dispatch(removeFriendAction(props.friend.id));
  };

  return (
    <div className={"column is-one-quarter"}>
      <div className="box">
        <article className="media">
          <div className="media-left">
            <FontAwesomeIcon icon={faUser} />
          </div>
          <div className="media-content">
            <div className="content">
              <p>
                <strong>{props.friend.name}</strong>
                <br />
                <small>Quitt / schuldet 123€</small>
              </p>
            </div>
          </div>
          <div className="media-right">
            <StyledDelete className="delete" onClick={handleDeleteFriend} />
          </div>
        </article>
      </div>
    </div>
  );
};

export default FriendBox;
