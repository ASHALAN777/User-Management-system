import { useContext } from "react";
import { AuthContext } from "../Customhooks/AuthProvider";

function Tester() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Not logged in</p>;

  return <h1 style={{color:"black"}}>Welcome {user.email}</h1>;
}


export default Tester;