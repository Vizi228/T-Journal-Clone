import { NextPage } from 'next';
import { Post } from '../components/Post';
import { MainLayout } from '../layouts/MainLayout';
import { Api } from '../utils/api';
import { PostItem } from '../utils/api/types';

interface HomeProps {
  posts: PostItem[],
}

const Home: NextPage<HomeProps> = ({ posts }) => {
  console.log(posts)
  return (
    <MainLayout>
      {posts && posts.map((item) => (
        <Post title={item.title} id={item.id} description={item.description} key={item.id} />
      ))}
    </MainLayout>
  );
}

export default Home

export const getServerSideProps = async (ctx) => {
  try {
    const posts = await Api().posts.getAllPosts();
    return {
      props: {
        posts
      }
    }
  } catch (error) {
    console.log(error)
  }
  return {
    props: {
      posts: null,
    }
  }
}