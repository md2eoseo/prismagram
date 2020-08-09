import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    sendMessage: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { roomId, toId, text } = args;
      let room;
      if (roomId === undefined) {
        if (user.id !== toId) {
          room = await prisma.createRoom({
            participants: { connect: [{ id: user.id }, { id: toId }] },
          });
        }
      } else {
        room = await prisma.room({ id: roomId });
      }
      if (!room) {
        throw Error("Room not found!");
      }

      const participants = await prisma.room({ id: room.id }).participants();
      const getTo = participants.filter(
        (participant) => participant.id != user.id
      )[0];
      const message = await prisma.createMessage({
        text,
        from: { connect: { id: user.id } },
        to: { connect: { id: roomId ? getTo.id : toId } },
        room: {
          connect: {
            id: room.id,
          },
        },
      });

      return message;
    },
  },
};
