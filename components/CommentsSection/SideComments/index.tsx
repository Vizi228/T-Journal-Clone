import React, { useState } from 'react';
import ArrowRightIcon from '@material-ui/icons/NavigateNextOutlined';

import styles from './SideComments.module.scss';

import data from '../../../data'

import CommentItem from './CommentItem';



export const SideComments = () => {
  const [visible, setVisible] = useState(true);

  return (
    <div className={styles.root}>
      <h3 onClick={() => setVisible(!visible)} className={!visible ? styles.activeButton : ''}>
        Комментарии <ArrowRightIcon />
      </h3>
      {visible && data.data && data.data.map((obj) => (
        <CommentItem key={obj.user.id} {...obj} />
      ))}
    </div>
  );
};
