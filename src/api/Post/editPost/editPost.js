import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    editPost: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { postId, caption, location } = args;
      const post = await prisma.$exists.post({
        id: postId,
        user: { id: user.id },
      });
      if (post) {
        return prisma.updatePost({
          where: { id: postId },
          data: { caption, location },
        });
      } else {
        throw Error("You can't edit the post!");
      }
    },
  },
};
