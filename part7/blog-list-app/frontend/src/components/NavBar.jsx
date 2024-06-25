import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../reducers/loginReducer";
import { Button } from "@mui/material";
import { styled } from "@mui/material";
// import styled from "@emotion/styled";

const NavBarContainer = styled(`div`)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: "auto",
  width: "100%",
});

const Buttons = styled(`div`)({
  display: "flex",
  justifyContent: "space-between",
});

const LoginInfo = styled(`div`)({
  display: "flex",
  justifyContent: "space-between",
});

const NavBar = ({ user, setErrorMessage }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    setErrorMessage(null);
  };

  return (
    <NavBarContainer className="navbar">
      <Buttons>
        <Link to="/blogs">
          <Button variant="text">blogs</Button>
        </Link>
        &nbsp;
        <Link to="/users">
          <Button variant="text">users</Button>
        </Link>
      </Buttons>
      <LoginInfo>
        <div className="usename">
          <span style={{ color: "#1876D1" }}>{user.name} </span>logged in
        </div>
        &nbsp;
        <Button onClick={handleLogout} variant="contained">
          log out
        </Button>
      </LoginInfo>
    </NavBarContainer>
  );
};

export default NavBar;
