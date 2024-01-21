import { getTweetById } from "~~/server/db/tweets";
import { tweetTransformer } from "~~/server/transformers/tweet";
import { prisma } from "../../db"; // Assuming prisma is your database client

export default defineEventHandler(async (event) => {
  const { id } = event.context.params;
  const userId = event.context?.auth?.user?.id; // User ID if authenticated

  let tweet = await getTweetById(id, {
    include: {
      author: true,
      mediaFiles: true,
      replyTo: {
        include: {
          author: true,
        },
      },
      replies: {
        include: {
          mediaFiles: true,
          author: true,
          replyTo: {
            include: {
              author: true,
            },
          },
        },
      },
      _count: {
        select: {
          likes: true,
        },
      },
    },
  });

  // Check if the user liked the tweet, only if the user is authenticated
  let likedByUser = false;
  if (userId) {
    const userLike = await prisma.like.findFirst({
      where: {
        userId: userId,
        tweetId: id,
      },
    });
    likedByUser = userLike != null;
  }

  // Transform the tweet data and add the likedByUser field
  tweet = tweetTransformer({
    ...tweet,
    likedByUser: likedByUser,
  });

  return {
    tweet: tweet,
  };
});
