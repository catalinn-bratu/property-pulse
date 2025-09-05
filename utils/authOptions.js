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
            //check if user exists
            //if not create user
            //return true allow sign in
        },
        //Modifies the session object that is returned to the client
        async session({session}){
            //get user from db
            //assign user to session
            //return session

        }
    }
}