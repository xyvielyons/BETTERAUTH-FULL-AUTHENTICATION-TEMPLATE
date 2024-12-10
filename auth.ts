import { betterAuth,BetterAuthOptions } from "better-auth";
import {prismaAdapter} from 'better-auth/adapters/prisma'
import prisma from "./lib/prisma";
import { sendEmail } from "./actions/email";
import {openAPI} from "better-auth/plugins"
import { admin } from "better-auth/plugins"
export const auth = betterAuth({
    database:prismaAdapter(prisma,{ 
        provider:"mongodb"
    }),
    session: {
        expiresIn: 60 * 60 * 24 * 7, // 7 days
        updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
        cookieCache: {
          enabled: true,
          maxAge: 5 * 60 // Cache duration in seconds
        }
    },
    user:{
        additionalFields:{
            premium:{
                type:"boolean",
                required:false
            },
            role:{
                type:"string"
            }
        }
    },
    emailAndPassword: { 
        enabled: true, 
        requireEmailVerification:true,
        sendResetPassword: async ({user, url, token}, request) => {
            await sendEmail({
                to: user.email,
                subject: "Reset your password",
                text: `Click the link to reset your password: ${url}`,
            });
        }
    },
    plugins:[openAPI(),admin()], //api/auth/reference
    emailVerification:{
        sendOnSignUp:true,
        autoSignInAfterVerification:true,
        sendVerificationEmail:async({user,token})=>{
            const verificationUrl = `${process.env.BETTER_AUTH_URL}/api/auth/verify-email?token=${token}&callbackURL=${process.env.EMAIL_VERIFICATION_CALLBACK_URL}`;
            await sendEmail({
                to:user.email,
                subject:"Verify your email address",
                text:`Click the link to verify your email:${verificationUrl}`
            })

        }
    },
    socialProviders:{
        github:{
            clientId: process.env.GITHUB_CLIENT_ID as string, 
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
        }
    }
}satisfies BetterAuthOptions)
export type Session = typeof auth.$Infer.Session;