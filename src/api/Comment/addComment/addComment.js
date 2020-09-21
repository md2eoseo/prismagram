import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    addComment: (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { text, postId } = args;
      const { user } = request;
      try {
        return prisma.createComment({
          text,
          user: {
            connect: {
              id: user.id,
            },
          },
          post: {
            connect: {
              id: postId,
            },
          },
        });
      } catch (error) {
        console.log(error);
        return;
      }
    },
  },
};
