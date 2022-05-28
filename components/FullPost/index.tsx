import { Button, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { PostActions } from '../PostActions';
import MessageIcon from '@material-ui/icons/TextsmsOutlined';
import UserAddIcon from '@material-ui/icons/PersonAddOutlined';

import styles from './FullPost.module.scss';
import { OutputData } from '@editorjs/editorjs';
import { ResponseUser } from '../../utils/api/types';
import Link from 'next/link';

interface FullPostProps {
  body: OutputData['blocks'],
  createdAt: string,
  updatedAt: string,
  user: ResponseUser,
  views: number,
  title: string,
}

const FullPost: React.FC<FullPostProps> = ({ body, createdAt, updatedAt, user, views, title }) => {
  return (
    <Paper elevation={0} className={styles.paper}>
      <div className='container'>
        <Typography variant="h4" className={styles.title}>
          {title}
        </Typography>
        <div>
          {body && body.map(item => (
            <Typography key={item.id}>
              {item.data.text}
            </Typography>
          ))}
          <div style={{ width: 250, marginLeft: -14 }}>
            <PostActions />
          </div>
          <div className={styles.views}>Views:{views}</div>
          <div className="d-flex justify-between align-center mt-30 mb-30">
            <Link href={`/profile/${user.id}`}>
              <a >
                <div className={styles.userInfo}>
                  <img
                    src="https://leonardo.osnova.io/5ffeac9a-a0e5-5be6-98af-659bfaabd2a6/-/scale_crop/108x108/-/format/webp/"
                    alt="Avatar"
                  />
                  <b>{user.fullName}</b>
                  <span>+1685</span>
                </div>
              </a>
            </Link>

            <div>

              <Button variant="contained" className="mr-15">
                <MessageIcon />
              </Button>
              <Button variant="contained">
                <UserAddIcon />
                <b className="ml-10">Подписаться</b>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Paper>
  );
};
export default FullPost;