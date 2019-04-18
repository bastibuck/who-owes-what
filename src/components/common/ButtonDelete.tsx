import React from "react";
import styled from "styled-components";

export interface IProps {
  readonly title: string;
  readonly action: (e: React.MouseEvent) => void;
}

const StyledDelete = styled.button`
  cursor: pointer;
`;

const ButtonDelete: React.FC<IProps> = ({ action, title }) => (
  <StyledDelete
    className="delete"
    role={"button"}
    onClick={action}
    title={title}
  />
);

export default ButtonDelete;
