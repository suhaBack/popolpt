import { logDOM } from "@testing-library/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  let [user, setUser] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/login/logincheck").then((result) => {
      setUser(result.data);
    });
  }, []);

  const handleLogout = () => {
    axios.get("http://localhost:3001/login/logout").then((result) => {
      setUser("");
      console.log(result.data);
      window.location.href = '/';
    });
    
  };
  return (
    <div class="nav">
      <Link class="logo" to="/">
        AppleForum
      </Link>
      {user ? (
        <>
          <Link to="/write">Write</Link>
          <span onClick={handleLogout} style={{padding:"0 1vw"}}>Logout</span>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
      {user.username === "ssp04364" && <Link to="/cardupload">카드등록</Link>}
      <Link to="/list">List</Link>
      <Link to="/card/none">card</Link>
      {user ? <span>{user.username}님 환영합니다!</span>: ""}
      
    </div>
  );
}

export default Header;
