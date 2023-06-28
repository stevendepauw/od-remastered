import { profile } from "console";
import { z } from "zod";
import {
  createTRPCRouter,
  // publicProcedure,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const profileRouter = createTRPCRouter({
  getById: publicProcedure.input(z.object({ id: z.string()})).query(async ({
  input: {id}, ctx}) => {
    ctx.prisma.user.findUnique({ 
      where: { id },
      select: {
        name: true,
        image: true,
        _count: { select: { followers: true, follows: true, posts: true}},
        followers:
          currentUserId == null
            ? undefined
            : { where: { id: currentUserId }},
      },
    });
      if (profile == null) return

      return {
        name: profile.name,
        image: profile.image,
        followersCount: profile._count.followers,
        followsCount: profile._count.follows,
        postsCount: profile._count.posts,
        isFollowing: profile.followers.lengh>0,


      }
  })
});
