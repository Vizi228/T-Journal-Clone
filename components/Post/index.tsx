import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import Image from 'next/image';

import styles from './Post.module.scss';

export const Post: React.FC = () => {
  return (
    <Paper elevation={0} className="p-20" classes={{ root: styles.paper }}>
      <Typography variant="h5" className={styles.title}>
        <a href="#">
          Кот прилёг отдохнуть в английском парке миниатюр — и стал героем шуток и фотожаб о
          «гигантском пушистом захватчике»
        </a>
      </Typography>
      <Typography className="mt-10 mb-15">
        Пока одни не могли соотнести размеры животного и окружения, другие начали создавать
        апокалиптические сюжеты с котом в главной роли.
      </Typography>
    </Paper>
  );
};
