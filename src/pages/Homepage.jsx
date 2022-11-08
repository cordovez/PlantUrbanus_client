import { AuthContext } from "../context/authContext";
import { useContext } from "react";

export default function Homepage() {
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      <h1>Homepage</h1>
      {user ? (
        <h2>{user.email} is logged in</h2>
      ) : (
        <>
          <p>there is no user data</p>
        </>
      )}
    </>
  );
}
