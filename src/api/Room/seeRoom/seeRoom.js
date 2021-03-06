import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeRoom: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { roomId } = args;
      const { user } = request;
      const canSee = await prisma.$exists.room({
        participants_some: { id: user.id },
      });
      if (canSee) {
        return prisma.room({ id: roomId });
      } else {
        throw Error("You can't see this");
      }
    },
  },
};
