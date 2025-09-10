import connectDB from "@/config/database";
import User from "@/models/User";

import GoogleProvider from "next-auth/providers/google";


export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        })
    ],
    callbacks: {
        async signIn({ profile}) {
            //connect to database
            await connectDB();
            //check if user exists
            const userExists = await User.findOne({email: profile.email});
            
            //if not create user
            if(!userExists){
                //truncate name if too long
                const username = profile.name.slice(0,20);

                await User.create({
                    email: profile.email,
                    username: username,
                    image: profile.picture
                })
            }
            //return true allow sign in
            return true;
        },
        //Modifies the session object that is returned to the client
        async session({session}){
            //get user from db
            const user = await User.findOne({email: session.user.email});
            //assign user to session
            session.user.id = user._id.toString();
            //return session
            return session;

        }
    }
}