import { AuthContext } from "../context/authContext";
import { useContext } from "react";
import OwnerPlants from "../components/OwnerPlants";
export default function Homepage() {
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      {user ? (
        <>
          <OwnerPlants />
        </>
      ) : (
        <>
          <p>there is no user data</p>
          {logout}
        </>
      )}
    </>
  );
}
