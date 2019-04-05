import React from "react";
import SharedWithSelected from "./SharedWithSelected";
import { useStateValue } from "../../../../store/useStore";
import { IExpense, IRootStore } from "../../../../store/initialState";

const ExpensesList = () => {
  // @ts-ignore
  const [stateValue]: [IRootStore] = useStateValue();

  return (
    <>
      <hr />
      <h2 className="subtitle">Expenses:</h2>
      <table className="table is-striped is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>What for?</th>
            <th>Amount</th>
            <th>Shared amongst</th>
          </tr>
        </thead>

        <tbody>
          {stateValue.expenses.map((expense: IExpense, index: number) => {
            return (
              <tr key={`expenseRow-${index}`}>
                <td>{expense.name}</td>
                <td>{expense.amount}</td>
                <td>
                  <div className={"tags"}>
                    {expense.sharedWith.map((sharedId: number) => {
                      return (
                        <SharedWithSelected
                          friendId={sharedId}
                          key={`sharedWithSelectedRow-${sharedId}`}
                        />
                      );
                    })}
                  </div>
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
