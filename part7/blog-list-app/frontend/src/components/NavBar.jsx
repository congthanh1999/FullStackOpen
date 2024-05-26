import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../reducers/loginReducer";

const NavBar = ({ user, setErrorMessage }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    setErrorMessage(null);
  };

  return (
    <p>
      <Link to="/blogs">blogs</Link>&nbsp;
      <Link to="/users">users</Link>&nbsp;
      {user.name} logged in&nbsp;
      <button onClick={handleLogout}>log out</button>
    </p>
  );
};

export default NavBar;
