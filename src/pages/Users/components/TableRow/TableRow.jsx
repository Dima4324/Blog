import PropTypes from "prop-types";
import styled from "styled-components";

const TableRowContainer = ({ children, className }) => (
  <tr className={className}>{children}</tr>
);

export const TableRow = styled(TableRowContainer)`
  display: flex;
  align-items: center;
  padding: 4px 10px;

  & .login-column {
    display: flex;
    width: 172px;
  }

  & .registered-at-column {
    display: flex;
    width: 213px;
  }

  & .role-column {
    display: flex;
    width: auto;
    align-items: center;
    gap: 10px;
  }
`;

TableRow.propTypes = {
  children: PropTypes.node.isRequired,
};
