import { createTRPCProxyClient, httpBatchLink } from "@trpc/client"
import { getToken } from "next-auth/jwt"
import { withAuth } from "next-auth/middleware"
// import { signOut } from "next-auth/react"
import { NextResponse } from "next/server"
import superjson from "superjson"

import { RootRouter } from "@/server/routers/_root.router"

export default withAuth(
  async (req) => {
    const token = await getToken({ req })
    const isAuth = !!token
    const isAuthPage = req.nextUrl.pathname.startsWith("/login") || req.nextUrl.pathname.startsWith("/register")
    console.log({ token, isAuth, isAuthPage })

    const redirectAuth = () => {
      let from = req.nextUrl.pathname
      if (req.nextUrl.search) {
        from += req.nextUrl.search
      }

      return NextResponse.redirect(new URL(`/login?from=${encodeURIComponent(from)}`, req.url))
    }

    if (isAuthPage) {
      if (!isAuth) return redirectAuth()
      const proxy = createTRPCProxyClient<RootRouter>({
        links: [
          // loggerLink(),
          httpBatchLink({ url: `${req.headers.get("origin") ?? process.env.NEXT_PUBLIC_APP_URL!}/api/trpc` }),
        ],
        transformer: superjson,
      })
      /**
       * todo: token interface
       * 本来有，重新登录后没了
       *
       * {
       *   token: {
       *   id: 'Paiqv',
       *   name: null,
       *   email: 'cto@cs-magic.com',
       *   picture: null,
       *   iat: 1693660530,
       *   exp: 1696252530,
       *   jti: '1224d688-9ed1-492e-be66-0ca9b49fe75f'
       * },
       *   isAuth: true,
       *   isAuthPage: true
       * }
       */
      if (token.id) {
        const userInDB = await proxy.user.getProfile.query({ id: token.id as string })
        if (!userInDB)
          // 浏览器有数据，但是数据库没有，清除
          return redirectAuth()
      }
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }
  },
  {
    callbacks: {
      async authorized() {
        // This is a work-around for handling redirect on auth pages.
        // We return true here so that the middleware function above
        // is always called.
        return true
      },
    },
  },
)

export const config = {
  matcher: [
    "/dashboard",
    "/editor/:path*",
    // "/login", "/register"
  ],
}
