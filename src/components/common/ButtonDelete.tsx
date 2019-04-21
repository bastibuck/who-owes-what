import React from "react";
import styled from "styled-components";

export interface IProps {
  readonly title: string;
  readonly action: (e: React.MouseEvent<HTMLButtonElement>) => void;
  readonly additionalClassName?: string;
  readonly dataItemId?: number;
}

const StyledDelete = styled.button`
  cursor: pointer;
`;

const ButtonDelete: React.FC<IProps> = ({
  action,
  title,
  additionalClassName,
  dataItemId,
}) => (
  <StyledDelete
    className={`delete ${additionalClassName}`}
    role={"button"}
    onClick={action}
    title={title}
    data-item-id={dataItemId}
  />
);

export default ButtonDelete;
