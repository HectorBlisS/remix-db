import { Form, useActionData, useTransition } from "remix"
import db from "~/db/db.server"
import { isAuthenticatedAndRedirect, setUserSessionAndRedirect } from "~/sessions"
import formDataToObject from "~/utils/formDataToObject"

export async function action({request}){
    const data = await request.formData()
    const body = formDataToObject(data)
    const result = await db.loginUser(body)
    if(result.user){
        return setUserSessionAndRedirect('/profile',result.user, request)
    }
    return result
   
}

// export async function loader({request}){
//     // const user = await isAuthenticatedAndRedirect(request)
//     // return user
// }

export default () => {
    const actionData = useActionData()
    const transition = useTransition()
    return (
        <Form method="post">
            <h2>Inicia sesión</h2>
            {actionData?.error && <p style={{color:"red"}} >{actionData?.error.message}</p>}
            <fieldset disabled={transition.state==='submitting'}>
                <p>
                <label>
                    <span>
                        Email:
                    </span>
                    <br/>
                    <input type="email" placeholder="Tu correo" name="email" />
                </label>
                </p>
                <p>
                    <label>
                        <span>
                            Constraseña
                        </span>
                        <br />
                        <input type="password" placeholder="Tu pass" name="password" />
                    </label>
                </p>
                <button type="submit">
                    Entrar
                </button>

            </fieldset>
        </Form>
    )
}