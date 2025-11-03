/*################################################
###### NEEDED TO MAKE MIDDLEWARE WORK   #########
#################################################*/

// This is need to fix The edge runtime does not support Node.js 'stream' module error
// thrown by the next middleware. The error is being caused by the Nodemailer provider which is needed
// for sending verification emails in local development.

import type { NextAuthConfig } from "next-auth";

export default {
  providers: []
} satisfies NextAuthConfig;
