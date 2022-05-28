import React from 'react';
import { Typography, IconButton, MenuItem, Menu } from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreHorizOutlined';

import styles from './Comment.module.scss';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { selectUserData } from '../../../redux/slices/user';
import { Api } from '../../../utils/api';
import { selectCommentsData, setCommentsData } from '../../../redux/slices/comment';

interface CommentPostProps {
  user: {
    fullName: string,
    id: number,
  };
  id: number,
  text: string;
}

export const Comment: React.FC<CommentPostProps> = ({ user, text, id }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const myUser = useAppSelector(selectUserData)
  const comments = useAppSelector(selectCommentsData);
  const dispatch = useAppDispatch();


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteComment = async () => {
    try {
      const remove = await Api().comments.remove(id);
      dispatch(setCommentsData(comments.filter(item => item.id !== id)))
    } catch (error) {
      alert('Произошла ошибка при удалении')
    } finally {
      handleClose()
    }
  }
  // const updateComment = async () => {
  //   try {
  //     const remove = await Api().comments.remove(id);
  //     dispatch(setCommentsData(comments.filter(item => item.id !== id)))
  //   } catch (error) {
  //     alert('Произошла ошибка при удалении')
  //   } finally {
  //     handleClose()
  //   }
  // }

  return (
    <div className={styles.comment}>
      <div className={styles.userInfo}>
        <img
          src="https://leonardo.osnova.io/104b03b4-5173-fd9f-2af9-b458dddc4a23/-/scale_crop/108x108/-/format/webp/"
          alt="Avatar"
        />
        <b>{user.fullName}</b>
        <span>5 часов</span>
      </div>
      <Typography className={styles.text}>
        {text}
      </Typography>
      <span className={styles.replyBtn}>Ответить</span>
      {
        myUser.id === user.id ?
          <IconButton onClick={handleClick}>
            <MoreIcon />
          </IconButton> :
          ''
      }

      <Menu
        anchorEl={anchorEl}
        elevation={2}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        keepMounted>
        <MenuItem onClick={deleteComment}>Удалить</MenuItem>
        <MenuItem onClick={handleClose}>Редактировать</MenuItem>
      </Menu>
    </div>
  );
};
