import React from "react";
import { IFriend } from "../../../../store/initialState";
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
        {stateValue.friends.map((friend: IFriend, index: number) => (
          <FriendBox
            friend={friend}
            evenState={
              index % 3 === 0
                ? EEvenState.EVEN
                : index % 2 === 0
                ? EEvenState.GETS
                : EEvenState.OWES
            }
            key={`friendsBox-${index}`}
          />
        ))}
      </div>
    </>
  );
};

export default FriendsList;
