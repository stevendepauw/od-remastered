import { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType, NextPage } from "next";
import { Head } from "next/document";
import { ssgHelper } from "~/server/ssgHelper";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api"
import ErorrPage from 'next/error'
import Link from "next/link";
import { ProfileImage } from "~/components/ProfileImage";
import { AllPostings } from "~/components/AllPostings";

const ProfilePage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ id, }) => {
    const { data: profile} = api.profile.getById.useQuery({ id })
    if (profile == null || profile.name == null) return <ErorrPage statusCode={404}/>
    return <>
        <Head>
            <title>{`Only Devs - ${profile.name}`}</title>
        </Head>
        <header>
            <Link href=".." className="mr-2">
                {/* <IconHoverEffect>
                    <VscArrowLeft className="h-6 w-6"/>
                </IconHoverEffect> */}
            </Link>
            <ProfileImage src={profile.image} className="flex-shrink-0"/>
            <div className="ml-2 flex-grow">
                <h1 className="text-lg font-bold">{profile.name}</h1>
                <div className="text-gray-500">
                    {profile.postsCount}{" "}
                    {getPlural(profile.postsCount, "Post", "Posts")} -{" "}

                    {profile.followersCount}{" "}
                    {getPlural(profile.followersCount, "Follower", "Followers")} -{" "}

                    {profile.followsCount} Following

                </div>
                {/* <FollowButton isFollowing={profile.isFollowing} userId={ id }
                    onClick = {() => null}/> */}
            </div>
            <main>
                {/* <AllPostings /> */}
            </main>
        </header>
    </>
};

function FollowButton() {
    return <h1>Follow</h1>
}

const pluralRules = new Intl.PluralRules();

function getPlural(number: number, singular: string, plural: string) {
    return pluralRules.select(number) === "one" ? singular : plural
}

export const getStaticPaths: GetStaticPaths = () => {
    return {
        paths: [],
        fallback: "blocking"
    }
};

export async function getStaticProps(context:GetStaticPropsContext <{ id: string}>
    ) {
    const id= context.params?.id

    if(id == null) {
        return {
            redirect: {
                destination: "/"
            }
        }
    }

    const ssg = ssgHelper()
    await ssg.profile.getById.prefetch({ id })

    return {
        props: {
            trpcState: ssg.dehydrate(),
            id,
        }
    }
}

export default ProfilePage;