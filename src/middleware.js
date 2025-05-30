export { default } from "next-auth/middleware"; // Middleware to protect routes if left alone not page can be visited until log in

export const config = {
    matcher: [ "/properties/add", "/profile", "/properties/saved", "/properties/:id", "/messages"],
};