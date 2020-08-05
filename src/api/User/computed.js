import { prisma } from "../../../generated/prisma-client";

export default {
  User: {
    fullName: (parent) => `${parent.firstName} ${parent.lastName}`,
    isFollowing: (parent, _, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { id: parentId } = parent;
      try {
        return prisma.$exists.user({
          AND: [{ id: parentId }, { followers_some: { id: user.id } }],
        });
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    isSelf: (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      return user.id === parentId;
    },
  },
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
  },
};
