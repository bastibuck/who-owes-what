import React from "react";
import { addFriendAction } from "../../../store/actions";
import { useStateValue } from "../../../store/useStore";

const Friends = () => {
  // @ts-ignore
  const [stateValue, dispatch] = useStateValue();

  const handleAddFriend = (e: React.MouseEvent) => {
    dispatch(addFriendAction());
  };

  return (
    <div>
      <p>Friends</p>
      <button onClick={handleAddFriend}>Add Friend</button>
      <ul>
        {stateValue.friends.map((friend: string, index: number) => (
          <li key={index}>{friend}</li>
        ))}
      </ul>
    </div>
  );
};

export default Friends;
