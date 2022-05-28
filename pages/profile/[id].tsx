import Link from 'next/link';
import { Paper, Avatar, Typography, Button, Tabs, Tab } from '@material-ui/core';
import {
  SettingsOutlined as SettingsIcon,
  TextsmsOutlined as MessageIcon,
} from '@material-ui/icons';
import { NextPage } from 'next';
import { destroyCookie, setCookie } from 'nookies';

import { Post } from '../../components/Post';
import { MainLayout } from '../../layouts/MainLayout';

import { Api } from '../../utils/api';
import { ResponseUser, PostItem } from '../../utils/api/types';
import { useAppDispatch } from '../../redux/hooks';
import { setUserData } from '../../redux/slices/user';
import { useRouter } from 'next/router';

interface ProfileProps {
  userData: ResponseUser,
  isMe: boolean,
  posts: PostItem[],
}


const Profile: NextPage<ProfileProps> = ({ userData, isMe, posts }) => {
  posts = posts && posts.filter(item => item.user.id === userData.id);
  const dispatch = useAppDispatch();
  const router = useRouter()
  const logout = () => {
    dispatch(setUserData(null));
    destroyCookie(null, 'authToken');
    router.push('/');
  }


  return (
    <MainLayout contentFullWidth hideComments>
      <Paper className="pl-20 pr-20 pt-20 mb-30" elevation={0}>
        <div className="d-flex justify-between">
          <div>
            <Avatar
              style={{ width: 120, height: 120, borderRadius: 6 }}
              src="https://leonardo.osnova.io/5ffeac9a-a0e5-5be6-98af-659bfaabd2a6/-/scale_crop/108x108/-/format/webp/"
            />
            <Typography style={{ fontWeight: 'bold' }} className="mt-10" variant="h4">
              {userData.fullName}
            </Typography>
          </div>
          <div>
            {isMe &&
              <Link href="/profile/settings">
                <Button
                  style={{ height: 42, minWidth: 45, width: 45, marginRight: 10 }}
                  variant="contained">
                  <SettingsIcon />
                </Button>
              </Link>
            }
            <Button style={{ height: 42 }} variant="contained" color="primary">
              <MessageIcon className="mr-10" />
              Написать
            </Button>
            {isMe &&
              <Button onClick={logout} style={{ height: 42, marginLeft: 10 }} variant="contained" color="primary">
                Выйти
              </Button>
            }
          </div>
        </div>
        <div className="d-flex mb-10 mt-10">
          <Typography style={{ fontWeight: 'bold', color: '#35AB66' }} className="mr-15">
            +208
          </Typography>
          <Typography>2 подписчика</Typography>
        </div>
        <Typography>На проекте с {userData.createdAt.slice(0, 10)}</Typography>

        <Tabs className="mt-20" value={0} indicatorColor="primary" textColor="primary">
          <Tab label="Статьи" />
          <Tab label="Комментарии" />
          <Tab label="Закладки" />
        </Tabs>
      </Paper>
      <div className="d-flex align-start">
        <div className="mr-20 flex">
          {posts && posts.map(item => (
            <Post {...item} />
          ))}
        </div>
        <Paper style={{ width: 300 }} className="p-20 mb-20" elevation={0}>
          <b>Подписчики</b>
          <div className="d-flex mt-15">
            <Avatar
              className="mr-10"
              src="https://leonardo.osnova.io/2d20257c-fec5-4b3e-7f60-055c86f24a4d/-/scale_crop/108x108/-/format/webp/"
            />
            <Avatar
              className="mr-10"
              src="https://leonardo.osnova.io/2d20257c-fec5-4b3e-7f60-055c86f24a4d/-/scale_crop/108x108/-/format/webp/"
            />
          </div>
        </Paper>
      </div>
    </MainLayout>
  );
}

export const getServerSideProps = async (ctx) => {
  try {
    const id = ctx.params.id;
    const targetUser = await Api(ctx).user.getTargetUser(id);
    const posts = await Api().posts.getAllPosts();
    try {
      const currentUser = await Api(ctx).user.getUser();
      if (currentUser && (currentUser.id !== targetUser.id)) {
        return {
          props: {
            userData: targetUser,
            isMe: false,
            posts,
          }
        }
      } else {
        return {
          props: {
            userData: currentUser,
            isMe: true,
            posts,

          }
        }
      }
    } catch {
      return {
        props: {
          userData: targetUser,
          isMe: false,
          posts,

        }
      }
    }
  } catch (error) {
    console.log(error)
  }
  return {
    props: {
    }
  }
}


export default Profile