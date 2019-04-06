import React from "react";
import { TFriendId } from "../../../../store/initialState";
import FriendBox, { EEvenState } from "./FriendBox";
import { useStateValue } from "../../../../store/useStore";

const FriendsList = () => {
  // @ts-ignore
  const [stateValue, dispatch]: [IRootStore, any] = useStateValue();

  return (
    <>
      <hr />
      <h2 className="subtitle">Splitting expenses between:</h2>
      <div className="columns is-multiline">
        {stateValue.friends.map((friendId: TFriendId) => (
          <FriendBox
            friendId={friendId}
            evenState={
              friendId % 3 === 0
                ? EEvenState.EVEN
                : friendId % 2 === 0
                ? EEvenState.GETS
                : EEvenState.OWES
            }
            key={`friendsBox-${friendId}`}
          />
        ))}
      </div>
    </>
  );
};

export default FriendsList;
