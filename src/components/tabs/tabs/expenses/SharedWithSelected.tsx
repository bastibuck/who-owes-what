import React from "react";
import { useStateValue } from "../../../../store/useStore";
import { IRootStore } from "../../../../store/initialState";

interface IProps {
  readonly friendId: number;
  readonly deleter?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const SharedWithSelected = ({ friendId, deleter }: IProps) => {
  // @ts-ignore
  const [stateValue]: [IRootStore] = useStateValue();

  return (
    <span className="tag is-primary is-medium">
      {stateValue.friendsById[friendId].name}
      {deleter && (
        <button
          data-friend-id={friendId}
          onClick={deleter}
          className="delete is-small"
        />
      )}
    </span>
  );
};

export default SharedWithSelected;
