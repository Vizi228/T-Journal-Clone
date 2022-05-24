import React, { useEffect } from 'react';
import Link from 'next/link';
import nookies from 'nookies'
import { Paper, Button, IconButton, Avatar } from '@material-ui/core';
import {
  SearchOutlined as SearchIcon,
  SmsOutlined as MessageIcon,
  Menu as MenuIcon,
  ExpandMoreOutlined as ArrowBottom,
  NotificationsNoneOutlined as NotificationIcon,
  AccountCircleOutlined as UserIcon,
} from '@material-ui/icons';

import styles from './Header.module.scss';
import AuthDialogs from '../AuthDialogs/AuthDialogs';
import { selectUserData } from '../../redux/slices/user';

import { useAppSelector } from '../../redux/hooks'

export const Header: React.FC = () => {
  const [authVisible, setAuthVisible] = React.useState(false);
  const userData = useAppSelector(selectUserData);

  const openAuthDialog = () => {
    setAuthVisible(true);
  };

  const closeAuthDialog = () => {
    setAuthVisible(false);
  };


  return (
    <Paper classes={{ root: styles.root }} elevation={0}>
      <div className="d-flex align-center">
        <IconButton>
          <MenuIcon />
        </IconButton>
        <Link href="/">
          <a>
            <img height={35} className="mr-20" src="/static/logo.svg" alt="Logo" />
          </a>
        </Link>

        <div className={styles.searchBlock}>
          <SearchIcon />
          <input placeholder="Поиск" />
        </div>

        <Link href="/write">
          <a>
            <Button variant="contained" className={styles.penButton}>
              Новая запись
            </Button>
          </a>
        </Link>
      </div>
      <div className="d-flex align-center">
        <IconButton>
          <MessageIcon />
        </IconButton>
        <IconButton>
          <NotificationIcon />
        </IconButton>

        {userData ?
          <div className="">
            <Link href="/profile/1">
              <a className="d-flex align-center">
                <Avatar
                  className={styles.avatar}
                  alt="Remy Sharp"
                  src="https://leonardo.osnova.io/5ffeac9a-a0e5-5be6-98af-659bfaabd2a6/-/scale_crop/108x108/-/format/webp/" />
                <ArrowBottom />
              </a>
            </Link>
          </div>
          :
          <div className={styles.loginButton} onClick={openAuthDialog}>
            <UserIcon />
            Войти
          </div>
        }
      </div>
      <AuthDialogs onClose={closeAuthDialog} visible={authVisible} />
    </Paper>
  );
};
