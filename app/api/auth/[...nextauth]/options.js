import  CredentialsProvider  from "next-auth/providers/credentials"

export const options = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                userID: {
                    label: "User ID",
                    type: "text",
                    placeholder: "Your ID"
                },
                userType: {
                    label: "User Type",
                    type: "text",
                    placeholder: "User/Admin"
                },
            },
            async authorize(credentials) {
                const adminUser = { userID: "1", userType: "admin" };
                const normalUser = { userID: "2", userType: "user" };

                try {
                    if (credentials.userID == "1") {
                        return adminUser;
                    } else {
                        return normalUser;
                    }
                } catch (error) {
                    console.log(error);

                }
                return null;
            }
        })

    ],

    callbacks: {
        async jwt({ token, user }) {
          if (user) {
            token.userType = user.userType;
            token.userID = user.userID;
        }
          return token;
        },
        async session({ session, token }) {
          if (session?.user) {
            session.user.userID = token.userID;
            session.user.userType = token.userType
        };
          return session;
        },
      },
}