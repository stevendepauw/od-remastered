import { createServerSideHelpers } from "@trpc/react-query/server"
import { } from "@trpc/react-query/server"
import { appRouter } from "./api/root"
import superjson from "superjson"
import { createInnerTRPCContext } from "./api/trpc"

export function ssgHelper() {
    return createServerSideHelpers({
        router: appRouter,
        ctx: createInnerTRPCContext({ session: null }),
        transformer: superjson
    })
}