// import "next-auth/jwt";
// import NextAuth from "next-auth";
// import { MongoDBAdapter } from "@auth/mongodb-adapter";
// import { getBooksByAuthor } from "@/lib/connectDB";
// import clientPromise from "@/lib/mongodb";
// import type { Provider } from "next-auth/providers";
// // Providers
// import Google from "next-auth/providers/google";
// import Resend from "next-auth/providers/resend";

// const providers: Provider[] = [
//   Google({
//     clientId: process.env.GOOGLE_CLIENT_ID!,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//   }),
//   Resend({
//     apiKey: process.env.AUTH_RESEND_KEY,
//     from: "no-reply@agatha-stories.com",
//   }),
// ];

// export const providerMap = providers
//   .map((provider) => {
//     if (typeof provider === "function") {
//       const providerData = provider();

//       return { id: providerData.id, name: providerData.name };
//     } else {
//       return { id: provider.id, name: provider.name };
//     }
//   });  

// export const { handlers, auth, signIn, signOut } = NextAuth({
//   debug: !!process.env.AUTH_DEBUG,
//   theme: {
//     logo: "https://agatha-stories.com/_next/static/media/Agatha-logo.8995bdce.svg",
//     colorScheme: "light",
//   },
//   adapter: MongoDBAdapter(clientPromise),
//   providers,
//   pages: {
//     signIn: "/auth/signin",
//     error: "/auth/error",
//     verifyRequest: "/auth/verify-request",
//   },
//   basePath: "/auth",
//   session: { strategy: "jwt" },
//   callbacks: {
//     authorized({ request, auth }) {
//       const { pathname } = request.nextUrl;

//       if (pathname === "/middleware-example") return !!auth;

//       return true;
//     },
//     async jwt({ token, trigger, session, account }) {
//       if (trigger === "update") token.name = session.user.name;

//       if (token) {
//         const bookList = await getBooksByAuthor(token.email!); // Use optional chaining operator

//         if (bookList && bookList.length > 0) {
//           token.bookId = bookList[0].id;
//           token.clientLanguage = bookList[0].language;
//         }
//       }
//       if (account?.provider === "keycloak") {
//         return { ...token, accessToken: account.access_token };
//       }

//       return token;
//     },
//     async session({ session, token }) {
//       if (token?.accessToken) session.accessToken = token.accessToken;

//       if (session.user) {
//         session.user.bookId = token.bookId;
//         session.user.clientLanguage = token.clientLanguage;
//       }

//       return session;
//     },
//   },
//   trustHost: true,
//   experimental: { enableWebAuthn: true },
// });

// declare module "next-auth" {
//   interface Session {
//     accessToken?: string;
//     user: {
//       id?: string;
//       name?: string | null;
//       email?: string | null;
//       image?: string | null;
//       bookId?: string;
//       clientLanguage?: string;
//     };
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     accessToken?: string;
//     id?: string;
//     bookId?: string;
//     clientLanguage?: string;
//   }
// }
