import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCubes, faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { IExpense, IFriend, IRootStore } from "../../../store/initialState";
import { useStateValue } from "../../../store/useStore";
import SharedWithOption from "./expenses/SharedWithOption";
import SharedWithSelected from "./expenses/SharedWithSelected";
import { addExpenseAction } from "../../../store/actions";
import ExpensesList from "./expenses/ExpensesList";

const emptyExpense: IExpense = {
  amount: 0,
  id: -1,
  name: "",
  sharedWith: [],
};
const Expenses = () => {
  const [expense, setExpense] = useState(emptyExpense);

  // @ts-ignore
  const [stateValue, dispatch]: [IRootStore, any] = useStateValue();

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (expense.name && expense.amount > 0 && expense.sharedWith.length > 0) {
      dispatch(addExpenseAction(expense));
      setExpense(emptyExpense);
    }
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
      amount: parseFloat(e.currentTarget.value),
    });
  };

  // @ts-ignore
  const handleAmountFocus = (e: React.FocusEvent) => e.currentTarget.select();

  const handleSharedWithChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setExpense({
      ...expense,
      sharedWith: [...expense.sharedWith, parseFloat(e.currentTarget.value)],
    });
  };

  const handleDeleteSharedWidthSelected = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setExpense({
      ...expense,
      sharedWith: [
        ...expense.sharedWith.filter(
          (id: number) => id.toString() !== e.currentTarget.dataset.friendId,
        ),
      ],
    });
  };

  const resetExpense = (e: React.MouseEvent) => {
    setExpense(emptyExpense);
  };

  return (
    <>
      <div className="columns">
        <div className="column is-half-tablet is-offset-one-quarter-tablet">
          <form onSubmit={handleAddExpense}>
            <div className="field">
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
            </div>
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input
                  className="input"
                  type="number"
                  min={0.0}
                  step={0.01}
                  placeholder="Amount"
                  value={expense.amount}
                  onChange={handleAmountChange}
                  onFocus={handleAmountFocus}
                />
                <span className="icon is-small is-left">
                  <FontAwesomeIcon icon={faDollarSign} />
                </span>
              </p>
            </div>
            <div className="field">
              <div className="control is-expanded">
                <div className="select is-fullwidth">
                  <select onChange={handleSharedWithChange}>
                    <option>Shared amongst...</option>
                    {stateValue.friends
                      .filter((friend: IFriend) => {
                        if (!expense.sharedWith) {
                          return true;
                        }
                        return !expense.sharedWith.includes(friend.id);
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
            <div className="field tags">
              {expense.sharedWith.length > 0 &&
                expense.sharedWith.map((id: number) => (
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
                <a onClick={resetExpense} className="button is-text">
                  Clear
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>

      {stateValue.expenses.length > 0 && <ExpensesList />}
    </>
  );
};

export default Expenses;
