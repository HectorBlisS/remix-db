import { Form, redirect, useActionData, useTransition } from "remix"
import db from "~/db/db.server"
import formDataToObject from "~/utils/formDataToObject"
import {setUserSessionAndRedirect,isAuthenticatedAndRedirect} from '~/sessions'

export async function action({request}){
    const fd = await request.formData()
    const body = formDataToObject(fd)
    // passport-local-mongoose-required
    body.username = body.email
    if(!fd || !body){
        return {
            errors:[{
                global: 'No se encontraron datos',
            },],
            success:false
        }
    }
    // password match
    if(body.password !== body.password2){
        return {
            errors:[{
                field:'password',
                message: 'El password no coincide'
            },],
            success:false
        }
    }
    if(!body.email?.includes('@')){
        return {
            errors:[{
                field:'email',
                message: 'Correo no válido'
            },],
            success:false
        }
    }
    const newUser = await db.registerUser(body)
    // redirection maybe?
    if(newUser.error) {
        return {
                errors:[{feld:'global', message:newUser.error}],
                success:false,
        }
    }
    return setUserSessionAndRedirect('/profile', newUser, request)
    // return redirect('/profile')
    // return  {
    //     errors:null,
    //     success:true,
    //     user:newUser,
    // }
}

// export const loader = async ({request}) => {
//     const user = await isAuthenticatedAndRedirect(request)
//     return user
// }

export default ()=>{
    const data = useActionData()
    const transition = useTransition()
    return (
        <Form method="post" >
            <h2>Regístrate</h2>
            <fieldset disabled={transition.state === "submitting"}>
           {data?.errors && <div style={{color:'red'}}>
                {data.errors.map((err, index)=><p key={index}>{err.message}</p>)}
            </div>}
            <label >
                <p>Email</p>
                <input name="email" type="email" placeholder="Tu correo" />
            </label>
            <label >
                <p>Password</p>
                <input name="password" type="password" placeholder="Tu contraseña" />
            </label>
            <label >
                <p>Repite tu Password</p>
                <input name="password2" type="password" placeholder="Tu contraseña" />
            </label>
            <br/>
            <button type="submit">
                {transition.state === "submitting" ? "loading...":"Registrarme"}
            </button>
            </fieldset>
        </Form>
    )
}