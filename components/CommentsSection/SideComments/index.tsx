import React, { useEffect, useState } from 'react';
import ArrowRightIcon from '@material-ui/icons/NavigateNextOutlined';

import styles from './SideComments.module.scss';

import SideCommentItem from './CommentItem';
import { useComments } from '../../../hooks/Comment';

interface SideCommentsProps {
  postId: number
}

const SideComments: React.FC<SideCommentsProps> = ({ postId }) => {
  const [visible, setVisible] = useState(true);
  const { comments } = useComments(postId);
  return (
    <div className={styles.root}>
      <h3 onClick={() => setVisible(!visible)} className={!visible ? styles.activeButton : ''}>
        Комментарии <ArrowRightIcon />
      </h3>
      {visible && comments && comments.map((obj) => (
        <SideCommentItem key={obj.user.id} {...obj} />
      ))}
    </div>
  );
};
export default SideComments