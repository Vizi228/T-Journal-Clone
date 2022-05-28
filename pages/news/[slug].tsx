import { MainLayout } from '../../layouts/MainLayout';
import FullPost from '../../components/FullPost';
import React from 'react';
import AllComments from '../../components/CommentsSection/AllComments';
import { Api } from '../../utils/api';
import { NextPage } from 'next';
import { PostItem } from '../../utils/api/types';

interface IFullPostPage {
  postInfo: PostItem
}

const FullPostPage: NextPage<IFullPostPage> = ({ postInfo }) => {
  return (
    <MainLayout postId={postInfo.id} className="mb-50" contentFullWidth>
      <FullPost {...postInfo} />
      <AllComments postId={postInfo.id} />
    </MainLayout>
  );
}

export default FullPostPage

export const getServerSideProps = async (ctx) => {
  try {
    const id = ctx.params.slug;
    const postInfo = await Api().posts.getOne(id);
    return {
      props: {
        postInfo
      }
    }
  } catch (error) {
    console.log(error)
  }
  return {
    props: {
      postInfo: null,
    }
  }
}