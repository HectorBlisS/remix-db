import { useEffect, useState } from 'react'
import { createCookieSessionStorage, json, redirect } from 'remix'

let error

const { getSession: getCookieSession, commitSession, destroySession } = createCookieSessionStorage({
  cookie: {
    name: '__session',
    secrets: ["bliss"],
  }
})

const getSession = async (request) => {
  if (!request) { throw Error("Incluye el request en la invocación") }
  const session = await getCookieSession(
    request.headers.get("Cookie")
  );
  error = session.get("error")
  return session
}

const setUserSessionAndRedirect = async (path, user, request) => {
  const session = await getSession(request)
  session.set("user", { ...user.toObject(), salt: null, hash: null, id: user._id });
  return redirect(path || '/login', {
    headers: {
      "Set-Cookie": await commitSession(session)
    }
  });
}

const isAuthenticatedAndRedirect = async (request) => {
  const session = await getSession(request)
  if (session.has('user')) {
    return redirect('/', {
      headers: {
        "Set-Cookie": await commitSession(session)
      }
    });
  }
  return redirect('/login', {
    headers: {
      "Set-Cookie": await destroySession(session)
    }
  });
}

const getUserFromSession = async (request) => {
  const session = await getSession(request)
  if (session.has('user')) {
    return session.get('user')
  }
  return null
  // return redirect('/login', {
  //     headers: {
  //         "Set-Cookie": await destroySession(session)
  //       }
  // })
}


const jsonResponse = async (data, request) => {
  const session = await getSession(request)
  return json(data || {}, {
    headers: {
      "Set-Cookie": await commitSession(session)
    }
  });
}

const redirectResponse = async (path, request) => {
  const session = await getSession(request)
  return redirect(path || '/login', {
    headers: {
      "Set-Cookie": await commitSession(session)
    }
  });
}

const destroySessionAndRedirect = async (request, path) => {
  const session = await getSession(request)
  return redirect(path || '/login', {
    headers: {
      "Set-Cookie": await destroySession(session)
    }
  });
}

export {
  getSession,
  error,

  isAuthenticatedAndRedirect,
  setUserSessionAndRedirect,
  getUserFromSession,
  destroySessionAndRedirect,
}
