import { prisma } from "../../../../generated/prisma-client";
import { COMMENT_FRAGMENT } from "../../../fragments";

export default {
  Query: {
    seeFullPost: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id } = args;
      const post = await prisma.post({ id });
      const user = await prisma.post({ id }).user();
      const files = await prisma.post({ id }).files();
      const comments = await prisma
        .post({ id })
        .comments()
        .$fragment(COMMENT_FRAGMENT);
      const likeCount = await (await prisma.post({ id }).likes()).length;
      //   const likeCount = await prisma
      //     .likesConnection({
      //       where: { post: { id } },
      //     })
      //     .aggregate()
      //     .count();
      return { post, user, files, comments, likeCount };
    },
  },
};
