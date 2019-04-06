import React from "react";
import { TFriendId } from "../../../../store/initialState";
import ResultFriendBox from "./ResultFriendBox";
import { useStateValue } from "../../../../store/useStore";

const ResultList = () => {
  // @ts-ignore
  const [stateValue]: [IRootStore] = useStateValue();

  return (
    <>
      <h2 className="subtitle">See who owes what</h2>
      <div className="columns is-multiline">
        {stateValue.friends.map((friendId: TFriendId) => (
          <ResultFriendBox friendId={friendId} key={`friendsBox-${friendId}`} />
        ))}
      </div>
    </>
  );
};

export default ResultList;
