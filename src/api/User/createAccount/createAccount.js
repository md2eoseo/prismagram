import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createAccount: async (_, args) => {
      const { username, email, firstName = "", lastName = "", bio = "" } = args;
      const existsUsername = await prisma.$exists.user({ username });
      const existsEmail = await prisma.$exists.user({ email });
      if (existsUsername) {
        throw Error("This username is already taken");
      }
      if (existsEmail) {
        throw Error("This email is already taken");
      }
      await prisma.createUser({
        username,
        email,
        firstName,
        lastName,
        bio,
      });
      return true;
    },
  },
};
