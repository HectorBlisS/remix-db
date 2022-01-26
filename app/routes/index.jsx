import { Link, useLoaderData, useTransition } from "remix";
import { getUserFromSession } from "~/sessions";
// import User from "~/db/models/User";
// import { getUsers } from "../db";

export const loader = async ({request}) => {
  return await getUserFromSession(request) || 'null'
}

export default function Index() {
  const user = useLoaderData()
  // const transition = useTransition()
  // console.log("transition: ", transition)
  // console.log("client?",users) // this is running in server why?
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h2>Bienvenid@!</h2>
      {/* {users?.map(user=><p key={user._id}>{user.displayName}</p>)} */}
{user==='null' ? <>
<Link to="/signup">
        Crea una cuenta
      </Link>
      {" | "}
      <Link to="/login">
        Inicia sesión
      </Link>
      </>
    :
    <Link to="/profile">
    Perfil
  </Link>
    }
    </div>
  );
}
