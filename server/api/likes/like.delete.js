import { prisma } from "../../db";

export default defineEventHandler(async (event) => {
  // Assuming the user is authenticated and their ID is in the context
  const userId = event.context?.auth?.user?.id;
  // Extract tweetId from the request
  const { tweetId } = await useBody(event);

  // Validate tweetId and userId
  if (!tweetId || !userId) {
    return { error: "Invalid data provided." };
  }

  // Check if the user has already liked the tweet
  const existingLike = await prisma.like.findFirst({
    where: {
      userId: userId,
      tweetId: tweetId,
    },
  });

  if (!existingLike) {
    return { error: "You have not liked this tweet." };
  }

  // Delete like
  await prisma.like.delete({
    where: {
      id: existingLike.id,
    },
  });

  // Return response
  return { message: "Like removed successfully" };
});
