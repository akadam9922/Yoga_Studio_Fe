import {withAuth} from "next-auth/middleware";
import { NextResponse } from "next/server";


// export {default} from "next-auth/middleware";
export default withAuth(
    function middleware(req){
        console.log(req.nextUrl.pathname);
        console.log(req.nextauth.token.userType);

        if(req.nextUrl.pathname.startsWith("/Admin") && req.nextauth.token.userType != "admin")
        {
            return NextResponse.rewrite(new URL("/Denied",req.url))
        }

    },
    {callbacks:{
        authorized:({token})=> !!token,

    }}
    
    )



export const config={matcher:[
    "/Admin/dashboard"
]}