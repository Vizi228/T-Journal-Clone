import { NextPage } from 'next';

import React from 'react';
import { MainLayout } from '../../layouts/MainLayout';
import WriteForm from '../../components/WriteForm';
import { Api } from '../../utils/api';


interface WritePageProps {
    post: any,
}

const WritePage: NextPage<WritePageProps> = ({ post }) => {
    return (
        <div>
            <MainLayout hideComments hideMenu className='main-layout-white'>
                <WriteForm data={post} />
            </MainLayout>
        </div>
    )
}

export const getServerSideProps = async (ctx) => {
    try {
        const id = ctx.params.id;
        const post = await Api(ctx).posts.getOne(+id);
        const user = await Api(ctx).user.getUser();
        if (user.id !== post.user.id) {
            return {
                props: {},
                redirect: {
                    destination: '/',
                    permanent: false,
                }
            }
        }
        return {
            props: {
                post,
            }
        }
    } catch (error) {
        console.log(error)
        return {
            props: {},
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }
}


export default WritePage