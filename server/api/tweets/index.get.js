import { getTweets } from "~~/server/db/tweets";
import { tweetTransformer } from "~~/server/transformers/tweet";
import { prisma } from "../../db";

export default defineEventHandler(async (event) => {
  const { query } = useQuery(event);
  const userId = event.context?.auth?.user?.id; // User ID if authenticated

  let primsaQuery = {
    include: {
      author: true,
      mediaFiles: true,
      replies: {
        include: {
          author: true,
        },
      },
      replyTo: {
        include: {
          author: true,
        },
      },
      _count: {
        select: {
          likes: true,
        },
      },
    },
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
  };

  if (query) {
    primsaQuery = {
      ...primsaQuery,
      where: {
        text: {
          contains: query,
        },
      },
    };
  }

  let tweets = await getTweets(primsaQuery);

  // Check if the user liked each tweet, only if the user is authenticated
  tweets = await Promise.all(
    tweets.map(async (tweet) => {
      let likedByUser = false;
      if (userId) {
        const userLike = await prisma.like.findFirst({
          where: {
            userId: userId,
            tweetId: tweet.id,
          },
        });
        likedByUser = userLike != null;
      }
      return tweetTransformer({
        ...tweet,
        likedByUser: likedByUser,
      });
    })
  );

  return {
    tweets: tweets,
  };
});
