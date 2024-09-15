import PropTypes from "prop-types";
import styled from "styled-components";

const IconContainer = ({ className, id, ...props }) => (
  <button className={className} {...props}>
    <i className={`fa ${id}`} aria-hidden="true"></i>
  </button>
);

export const Icon = styled(IconContainer)`
  font-size: ${({ size = "24px" }) => size};
  margin: ${({ margin = "0" }) => margin};
  color: ${({ disabled }) => (disabled ? "#ccc" : "#000")};
  height: ${({ size = "24px" }) => size};

  border: none;
  background-color: inherit;

  &:hover {
    cursor: ${({inactive, disabled}) => inactive || disabled ? "default" : "pointer" };
  }
`;

Icon.propTypes = {
	id: PropTypes.string.isRequired,
}
