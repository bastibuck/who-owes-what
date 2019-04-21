import React from "react";
import SharedWithSelected from "./SharedWithSelected";
import { useStateValue } from "../../../../store/useStore";
import { IRootStore, TExpenseId } from "../../../../store/initialState";
import { removeExpenseAction } from "../../../../store/actions";

const ExpensesList = () => {
  // @ts-ignore
  const [stateValue, dispatch]: [IRootStore, any] = useStateValue();

  const handleDeleteExpense = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (e.currentTarget.dataset.expenseId) {
      dispatch(
        removeExpenseAction(parseInt(e.currentTarget.dataset.expenseId, 10)),
      );
    }
  };

  return (
    <>
      <hr />
      <h2 className="subtitle">Expenses:</h2>
      <table className="table is-striped is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>Payer</th>
            <th>What for?</th>
            <th>Amount</th>
            <th>Shared with</th>
            <th />
          </tr>
        </thead>

        <tfoot>
          <tr>
            <th />
            <th />
            <th>{stateValue.pools.total}</th>
            <th />
            <th />
          </tr>
        </tfoot>

        <tbody>
          {stateValue.expenses.map((expenseId: TExpenseId) => {
            const expense = stateValue.expensesById[expenseId];

            return (
              <tr key={`expenseRow-${expenseId}`}>
                <td>{stateValue.friendsById[expense.payer].name}</td>
                <td>{expense.name}</td>
                <td>{expense.amount}</td>
                <td>
                  <div className={"tags"}>
                    {expense.sharedWith.sort().map((sharedId: number) => {
                      return (
                        <SharedWithSelected
                          friendId={sharedId}
                          key={`sharedWithSelectedFriend-${sharedId}`}
                        />
                      );
                    })}
                  </div>
                </td>
                <td>
                  <button
                    data-expense-id={expense.id}
                    onClick={handleDeleteExpense}
                    className="delete is-small"
                    title={`Remove expense`}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default ExpensesList;
