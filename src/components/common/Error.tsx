import React from "react";

interface IProps {
  readonly resetError: (newError: string) => void;
}

const Error: React.FunctionComponent<IProps> = ({ resetError, children }) => {
  const handleHide = (e: React.MouseEvent) => {
    resetError("");
  };

  return (
    <>
      <div className="notification is-danger">
        <button className="delete" onClick={handleHide} />
        {children}
      </div>
    </>
  );
};

export default Error;
