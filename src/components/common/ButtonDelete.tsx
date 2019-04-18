import React from "react";

interface IProps {
  readonly title: string;
  readonly action: () => void;
}

const ButtonDelete: React.FC<IProps> = ({ action, title }) => (
  <button className="delete" role={"button"} onClick={action} title={title} />
);

export default ButtonDelete;
