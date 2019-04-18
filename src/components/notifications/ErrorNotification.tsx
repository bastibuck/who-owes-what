import React from "react";
import ButtonDelete from "../common/ButtonDelete";

interface IProps {
  readonly closeCallback: () => void;
  readonly errorMsg: string;
  readonly title?: string;
}

const ErrorNotification: React.FC<IProps> = ({
  closeCallback,
  errorMsg,
  title,
}) => (
  <div className="notification is-danger">
    <ButtonDelete action={closeCallback} title={title ? title : "Close"} />
    {errorMsg}
  </div>
);

export default ErrorNotification;
