import { forwardRef } from "react";
import styled from "styled-components";

// eslint-disable-next-line react/display-name
export const InputContainer = forwardRef(
  ({ className, ...props }, ref) => {
    return <input className={className} {...props} ref={ref} />;
  }
);

export const Input = styled(InputContainer)`
  width: ${({ width = "100%" }) => width};
  margin: ${({ margin = "0px" }) => margin};
  height: 40px;
  padding: 10px;
  border: 1px solid #000;
  font-size: 18px;
`;
