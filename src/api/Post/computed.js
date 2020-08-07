import { prisma } from "../../../generated/prisma-client";

export default {
  Post: {
    isLiked: (parent, _, { request }) => {
      const { user } = request;
      const { id: postId } = parent;
      try {
        return prisma.$exists.like({
          AND: [{ user: { id: user.id } }, { post: { id: postId } }],
        });
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    likeCount: async (parent) => {
      const count = await (await prisma.post({ id: parent.id }).likes()).length;
      //   const likeCount = await prisma
      //     .likesConnection({
      //       where: { post: { id } },
      //     })
      //     .aggregate()
      //     .count();
      return count;
    },
  },
};
