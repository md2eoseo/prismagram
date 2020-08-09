import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeFullPost: (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id } = args;
      return prisma.post({ id });
    },
  },
};
