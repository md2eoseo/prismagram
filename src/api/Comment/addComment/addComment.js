import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    addComment: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { text, postId } = args;
      const { user } = request;
      const comment = {
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
      };
      try {
        await prisma.createComment(comment);
        return comment;
      } catch (error) {
        console.log(error);
        return;
      }
    },
  },
};
