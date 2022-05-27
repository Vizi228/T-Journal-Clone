import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import Image from 'next/image';

import styles from './Post.module.scss';
import { OutputData } from '@editorjs/editorjs';
import { PostActions } from '../PostActions';

interface IPost {
  title: string,
  description: string,
  id: number,
  views?: number,
  updated?: string,
  created?: string,
  tags?: string,
}

export const Post: React.FC<IPost> = ({ title, id, description }) => {
  return (
    <Paper elevation={0} className="p-20" classes={{ root: styles.paper }}>
      <Typography variant="h5" className={styles.title}>
        <a href={`/news/${id}`}>
          {title}
        </a>
      </Typography>
      <Typography className="mt-10 mb-15">
        {description}
      </Typography>

      <img
        src="/images/image-1.jpg"
        height={500}
        width={600}
        alt={title}
      />
      <PostActions />
    </Paper>
  );
};
