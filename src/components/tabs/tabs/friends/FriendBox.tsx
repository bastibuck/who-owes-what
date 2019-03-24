import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

interface IProps {
  friend: string;
}

const StyledDelete = styled.button`
  cursor: pointer;
`;

const FriendBox = (props: IProps) => (
  <div className={"column is-one-quarter"}>
    <div className="box">
      <article className="media">
        <div className="media-left">
          <FontAwesomeIcon icon={faUser} />
        </div>
        <div className="media-content">
          <div className="content">
            <p>
              <strong>{props.friend}</strong>
              <br />
              <small>Quitt / schuldet 123€</small>
            </p>
          </div>
        </div>
        <div className="media-right">
          <StyledDelete className="delete" />
        </div>
      </article>
    </div>
  </div>
);

export default FriendBox;
