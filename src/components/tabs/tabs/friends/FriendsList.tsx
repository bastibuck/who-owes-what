import React from "react";
import { TFriendId } from "../../../../store/initialState";
import FriendBox from "./FriendBox";
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
          <FriendBox friendId={friendId} key={`friendsBox-${friendId}`} />
        ))}
      </div>
    </>
  );
};

export default FriendsList;
