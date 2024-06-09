import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../reducers/loginReducer";
import { Button } from "@mui/material";

const NavBar = ({ user, setErrorMessage }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    setErrorMessage(null);
  };

  return (
    <p className="navbar">
      <Link to="/blogs">
        <Button variant="text">blogs</Button>
      </Link>
      &nbsp;
      <Link to="/users">
        <Button variant="text">users</Button>
      </Link>
      &nbsp;
      <div className="usename">{user.name} logged in</div>
      &nbsp;
      <Button onClick={handleLogout} variant="contained">
        log out
      </Button>
    </p>
  );
};

export default NavBar;
