import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign, faCubes } from "@fortawesome/free-solid-svg-icons";
import { IFriend } from "../../../../store/initialState";
import { useStateValue } from "../../../../store/useStore";
import SharedWithOption from "./SharedWithOption";
import SharedWithSelected from "./SharedWithSelected";

const Expenses = () => {
  const emptyExpense = { amount: "", name: "", sharedWith: [] };
  const [expense, setExpense] = useState(emptyExpense);
  const [sharedWithIds, setSharedWithIds] = useState();

  //@ts-ignore
  const [stateValue, dispatch] = useStateValue();

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleNameChange = (e: React.FormEvent<HTMLInputElement>) => {
    setExpense({
      ...expense,
      name: e.currentTarget.value,
    });
  };

  const handleAmountChange = (e: React.FormEvent<HTMLInputElement>) => {
    setExpense({
      ...expense,
      amount: e.currentTarget.value,
    });
  };

  const handleSharedWithChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setSharedWithIds([
      ...(sharedWithIds ? sharedWithIds : []),
      e.currentTarget.value,
    ]);
  };

  const handleDeleteSharedWidthSelected = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setSharedWithIds([
      ...sharedWithIds.filter(
        (id: number) => id.toString() !== e.currentTarget.dataset["friendId"],
      ),
    ]);
  };

  const resetExpense = (e: React.MouseEvent) => {
    setExpense(emptyExpense);
  };

  return (
    <form onSubmit={handleAddExpense}>
      <div className="field is-grouped">
        <p className="control has-icons-left has-icons-right">
          <input
            className="input"
            type="text"
            placeholder="What for?"
            value={expense.name}
            onChange={handleNameChange}
          />
          <span className="icon is-small is-left">
            <FontAwesomeIcon icon={faCubes} />
          </span>
        </p>
        <p className="control has-icons-left has-icons-right">
          <input
            className="input"
            type="number"
            placeholder="Amount"
            value={expense.amount}
            onChange={handleAmountChange}
          />
          <span className="icon is-small is-left">
            <FontAwesomeIcon icon={faDollarSign} />
          </span>
        </p>

        <div className="control">
          <div className="field">
            <div className="control is-expanded">
              <div className="select is-fullwidth">
                <select value={""} onChange={handleSharedWithChange}>
                  <option>Shared with...</option>
                  {stateValue.friends
                    .filter((friend: IFriend) => {
                      if (!sharedWithIds) {
                        return true;
                      }
                      return !sharedWithIds.includes(friend.id.toString());
                    })
                    .map((friend: IFriend, index: number) => (
                      <SharedWithOption
                        friend={friend}
                        key={`sharedWithOption-${index}`}
                      />
                    ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="field tags">
        {sharedWithIds &&
          sharedWithIds.map((id: number) => (
            <SharedWithSelected
              friendId={id}
              deleter={handleDeleteSharedWidthSelected}
              key={`sharedWithSelected-${id}`}
            />
          ))}
      </div>
      <div className="field is-grouped">
        <div className="control">
          <button className="button is-link">Add Expense</button>
        </div>
        <div className="control">
          <button onClick={resetExpense} className="button is-text">
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default Expenses;
