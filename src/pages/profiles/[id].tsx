import { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType, NextPage } from "next";
import { Head } from "next/document";
import { ssgHelper } from "~/server/ssgHelper";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api"
import ErorrPage from 'next/error'

const ProfilePage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ id, }) => {
    const { data: profile} = api.profile.getById.useQuery({ id })
    if (profile == null) return <ErorrPage statusCode={404}/>
    return <>
        <Head>
            <title>{`Only Devs - ${profile.name}`}</title>
        </Head>
        {profile.name}
    </>
};

export const getStaticPaths: GetStaticPaths = () => {
    return {
        paths: [],
        fallback: "blocking"
    }
}

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