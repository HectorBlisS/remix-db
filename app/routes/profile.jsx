import { Form, redirect, useLoaderData } from "remix"
import { getUserFromSession, destroySessionAndRedirect } from "~/sessions"

export async function loader({ request }) {
    return await getUserFromSession(request) || redirect('/login')
}

export async function action({ request }) {
    return destroySessionAndRedirect(request)
}

export default () => {
    const user = useLoaderData()
    return (
        <>
            <h2>Ruta protegida!</h2>
            <h3>Bienvenido {user.email}</h3>
            <Form method="post" >
                <button type="submit">
                    Cerrar Sesión
                </button>
            </Form>
        </>
    )
}
