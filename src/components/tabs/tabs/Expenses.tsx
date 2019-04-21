import React, { useState, Dispatch, SetStateAction } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCubes, faDollarSign } from "@fortawesome/free-solid-svg-icons";
import {
  emptyExpense,
  IRootStore,
  TFriendId,
} from "../../../store/initialState";
import { useStateValue } from "../../../store/useStore";
import SharedWithOption from "./expenses/SharedWithOption";
import SharedWithSelected from "./expenses/SharedWithSelected";
import { addExpenseAction } from "../../../store/actions";
import ExpensesList from "./expenses/ExpensesList";
import ErrorNotification from "../../common/ErrorNotification";

const Expenses = () => {
  const [expense, setExpense] = useState(emptyExpense);

  type TError = string | undefined;
  const [error, setError]: [
    TError,
    Dispatch<SetStateAction<TError>>
  ] = useState();

  // @ts-ignore
  const [stateValue, dispatch]: [IRootStore, any] = useStateValue();

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();

    if (expense.name && expense.amount > 0 && expense.sharedWith.length > 0) {
      let expenseExists = false;
      for (const expenseItem of Object.keys(stateValue.expensesById)) {
        const { expensesById } = stateValue;
        const expenseId = parseInt(expenseItem, 10);

        if (
          expensesById[expenseId].payer === expense.payer &&
          expensesById[expenseId].name === expense.name &&
          expensesById[expenseId].amount === expense.amount &&
          JSON.stringify(expensesById[expenseId].sharedWith.sort) ===
            JSON.stringify(expense.sharedWith.sort)
        ) {
          expenseExists = true;
        }
      }

      if (!expenseExists) {
        dispatch(addExpenseAction(expense));
        setExpense(emptyExpense);
      } else {
        setError(`Expense already added`);
      }
    }
  };

  const handleWhoPaid = (e: React.FormEvent<HTMLSelectElement>) => {
    if (parseInt(e.currentTarget.value, 10) !== -1) {
      setExpense({
        ...expense,
        payer: parseInt(e.currentTarget.value, 10),
      });
      setError(undefined);
    }
  };

  const handleNameChange = (e: React.FormEvent<HTMLInputElement>) => {
    setExpense({
      ...expense,
      name: e.currentTarget.value,
    });
    setError(undefined);
  };

  const handleAmountChange = (e: React.FormEvent<HTMLInputElement>) => {
    setExpense({
      ...expense,
      amount: parseFloat(e.currentTarget.value),
    });
    setError(undefined);
  };

  // @ts-ignore
  const handleAmountFocus = (e: React.FocusEvent) => e.currentTarget.select();

  const handleSharedWithChange = (e: React.FormEvent<HTMLSelectElement>) => {
    if (parseInt(e.currentTarget.value, 10) !== -1) {
      setExpense({
        ...expense,
        sharedWith: [
          ...expense.sharedWith,
          parseInt(e.currentTarget.value, 10),
        ],
      });
      setError(undefined);
    }
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
    setError(undefined);
  };

  const resetExpense = (e: React.MouseEvent) => {
    setExpense(emptyExpense);
    setError(undefined);
  };

  const handleResetError = () => setError(undefined);

  return (
    <>
      <div className="columns">
        <div className="column is-half-tablet is-offset-one-quarter-tablet">
          <ErrorNotification
            errorMsg={error}
            closeCallback={handleResetError}
          />
          <form onSubmit={handleAddExpense}>
            <div className="field">
              <div className="control is-expanded">
                <div className="select is-fullwidth">
                  <select onChange={handleWhoPaid} value={expense.payer}>
                    <option value={"-1"} disabled={true}>
                      Who paid?
                    </option>
                    {stateValue.friends.map((friendId: TFriendId) => (
                      <SharedWithOption
                        friendId={friendId}
                        key={`sharedWithOption-${friendId}`}
                      />
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="field">
              <p className="control has-icons-left">
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
                  value={expense.amount > 0 ? expense.amount : ""}
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
                  <select
                    onChange={handleSharedWithChange}
                    value={"-1"}
                    disabled={expense.payer === -1}
                  >
                    <option value={"-1"} disabled={true}>
                      Shared with...
                    </option>
                    {stateValue.friends
                      .filter((friendId: TFriendId) => {
                        if (!expense.sharedWith) {
                          return true;
                        }
                        return (
                          !expense.sharedWith.includes(friendId) &&
                          expense.payer !== friendId
                        );
                      })
                      .map((friendId: TFriendId) => (
                        <SharedWithOption
                          friendId={friendId}
                          key={`sharedWithOption-${friendId}`}
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
                <button
                  className="button is-link"
                  disabled={
                    expense.payer === -1 ||
                    !expense.name ||
                    !expense.amount ||
                    !(expense.sharedWith.length > 0)
                  }
                >
                  Add Expense
                </button>
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
