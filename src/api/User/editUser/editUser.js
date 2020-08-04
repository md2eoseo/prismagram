import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    editUser: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { username, email, firstName, lastName, bio } = args;
      const { user } = request;
      // await 써서 const user에 저장하고 return user를 해도되지만 어차피 마지막 요청이라 알아서 서버에서 기다려줌.
      return prisma.updateUser({
        where: { id: user.id },
        data: {
          username,
          email,
          firstName,
          lastName,
          bio,
        },
      });
    },
  },
};
