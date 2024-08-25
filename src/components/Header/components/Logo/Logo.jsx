import styled from "styled-components";
import { Link } from "react-router-dom";
import { Icon } from "../../../../components";

const LargeText = styled.p`
  font-size: 48px;
  font-weight: 600;
  line-height: 48px;
  margin: 0;
`;

const SmallTest = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin: 0;
`;

const LogoContainer = ({ className }) => (
  <Link className={className} to="/">
    <Icon size="70px" margin="0 10px 0 0" id="fa-code"/>
    <div>
      <LargeText>Блог</LargeText>
      <SmallTest>веб-разработчика</SmallTest>
    </div>
  </Link>
);

export const Logo = styled(LogoContainer)`
  display: flex;
  align-items: center;
`;
