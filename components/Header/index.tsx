import React, { useEffect } from 'react';
import Link from 'next/link';
import nookies from 'nookies'
import { Paper, Button, IconButton, Avatar, List, ListItem } from '@material-ui/core';
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
import { Api } from '../../utils/api';

export const Header: React.FC = () => {
  const [authVisible, setAuthVisible] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const [posts, setPosts] = React.useState([]);
  const userData = useAppSelector(selectUserData);


  const openAuthDialog = () => {
    setAuthVisible(true);
  };
  const closeAuthDialog = () => {
    setAuthVisible(false);
  };
  const onChangeInput = async (e) => {
    setInputValue(e.target.value);
    try {
      const search = await Api().posts.search({ title: inputValue, limit: 5 });
      setPosts(search.items)
    } catch (error) {
      alert('Ошибка')
    }
  }

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
          <input value={inputValue} onChange={e => onChangeInput(e)} placeholder="Поиск" />
          {posts.length > 0 && (
            <Paper className={styles.searchBlockPopup}>
              <List>
                {posts.map((obj) => (
                  <Link key={obj.id} href={`/news/${obj.id}`}>
                    <a onClick={() => {
                      setInputValue('');
                      setPosts([]);
                    }}>
                      <ListItem button>{obj.title}</ListItem>
                    </a>
                  </Link>
                ))}
              </List>
            </Paper>
          )}
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
            <Link href={`/profile/${userData.id}`}>
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
