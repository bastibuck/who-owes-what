import React from "react";
import SharedWithSelected from "./SharedWithSelected";
import { useStateValue } from "../../../../store/useStore";
import { IRootStore, TExpenseId } from "../../../../store/initialState";
import { removeExpenseAction } from "../../../../store/actions";
import ButtonDelete from "../../../common/ButtonDelete";

const ExpensesList = () => {
  // @ts-ignore
  const [stateValue, dispatch]: [IRootStore, any] = useStateValue();

  const handleDeleteExpense = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (e.currentTarget.dataset.itemId) {
      dispatch(
        removeExpenseAction(parseInt(e.currentTarget.dataset.itemId, 10)),
      );
    }
  };

  if (stateValue.expenses.length < 1) {
    return null;
  }

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
                  <ButtonDelete
                    title={"Remove expense"}
                    action={handleDeleteExpense}
                    additionalClassName={"is-small"}
                    dataItemId={expense.id}
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
