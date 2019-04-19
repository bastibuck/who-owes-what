import React from "react";
import { useStateValue } from "../../../../store/useStore";
import { IRootStore } from "../../../../store/initialState";

export interface IProps {
  readonly friendId: number;
  readonly deleter?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const SharedWithSelected = ({ friendId, deleter }: IProps) => {
  // @ts-ignore
  const [stateValue]: [IRootStore] = useStateValue();

  const { name } = stateValue.friendsById[friendId];

  return (
    <span className="tag is-primary is-medium">
      {name}
      {deleter && (
        <button
          data-friend-id={friendId}
          onClick={deleter}
          className="delete is-small"
          title={`remove ${name}`}
        />
      )}
    </span>
  );
};

export default SharedWithSelected;
