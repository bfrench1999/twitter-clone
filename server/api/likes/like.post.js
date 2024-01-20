import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  // Assuming the user is authenticated and their ID is in the context
  //   const userId = event.context?.auth?.user?.id;

  // Extract tweetId from the request
  const { tweetId, userId } = await useBody(event);
  console.log(tweetId, userId);

  // Validate tweetId and userId
  if (!tweetId || !userId) {
    return { error: "Invalid data provided." };
  }

  // Check if the tweet exists
  const tweet = await prisma.tweet.findUnique({
    where: { id: tweetId },
  });

  if (!tweet) {
    return { error: "Tweet not found." };
  }

  // Create like
  const like = await prisma.like.create({
    data: {
      user: { connect: { id: userId } },
      tweet: { connect: { id: tweetId } },
    },
  });

  // Return response
  return { message: "Like added successfully", like };
});
