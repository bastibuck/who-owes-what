import React from "react";

interface IProps {
  readonly callback: () => void;
}

const ErrorNotification: React.FunctionComponent<IProps> = ({
  callback,
  children,
}) => {
  const handleHide = (e: React.MouseEvent) => callback();

  return (
    <>
      <div className="notification is-danger">
        <button className="delete" onClick={handleHide} role={"button"} />
        {children}
      </div>
    </>
  );
};

export default ErrorNotification;
