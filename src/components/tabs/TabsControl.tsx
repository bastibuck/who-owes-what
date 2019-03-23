import React from "react";

const TabsControl = () => {
  return (
    <div className="section">
      <div className="container">
        <div className="tabs is-toggle  is-fullwidth">
          <ul className={"is-block-mobile is-flex-desktop"}>
            <li className="is-active is-marginless">
              <a>
                <span className="icon is-small">
                  <i className="fas fa-users" />
                </span>
                <span>Add friends</span>
              </a>
            </li>
            <li className={"is-marginless"}>
              <a>
                <span className="icon is-small">
                  <i className="fas fa-dollar-sign" />
                </span>
                <span>Add expenses</span>
              </a>
            </li>
            <li className={"is-marginless"}>
              <a>
                <span className="icon is-small">
                  <i className="fas fa-chart-bar" />
                </span>
                <span>See results</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TabsControl;
