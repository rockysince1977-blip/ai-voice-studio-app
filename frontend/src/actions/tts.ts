"use server"

import { headers } from "next/headers"
import { cache } from "react"
import { auth } from "~/lib/auth"
import { db } from "~/server/db"


export const getUserCredits = cache(async()=>{
    try{
        const session = await auth.api.getSession({
            headers: await headers(),
        })
        if(!session?.user?.id){
            return {success:false, error: "Unathorized", credits:0};
        }
        
        const user = await db.user.findUnique({
            where:{id: session.user.id},
            select:{credits: true},
        })

        if(!user){
            return {success:false, error: "User not found", credits: 0};
        }

        return {
            success: true,
            credits: user.credits,
        };

    }catch(err){
        console.error("Error fetching user credits", err);
        return {success: false, error:"Failed to fetch credits", credits:0};
    }
})
