import React from "react";
import ButtonDelete from "./ButtonDelete";

export interface IProps {
  readonly closeCallback: () => void;
  readonly errorMsg?: string;
  readonly title?: string;
}

const ErrorNotification: React.FC<IProps> = ({
  closeCallback,
  errorMsg,
  title,
}) => {
  if (!errorMsg) {
    return null;
  }

  return (
    <div className="notification is-danger">
      <ButtonDelete action={closeCallback} title={title ? title : "Close"} />
      {errorMsg}
    </div>
  );
};

export default ErrorNotification;
