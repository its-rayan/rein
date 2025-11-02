"use server";

import { actionClient } from "@/actions/safe-action";
import connectToDbClient from "@/database/connect-db-client";
import User from "@/database/models/user";
import { email, z } from "zod";

const schema = z.object({ email: email() });

export const checkAccountExists = actionClient
  .inputSchema(schema)
  .action(async ({ parsedInput }) => {
    await connectToDbClient();

    const { email } = parsedInput;

    const userExists = await User.findOne({ email });

    return {
      accountExists: !!userExists
    };
  });
