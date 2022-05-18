import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import {
  WhatshotOutlined as FireIcon,
  SmsOutlined as MessageIcon,
  TrendingUpOutlined as TrendingIcon,
  FormatListBulletedOutlined as ListIcon,
} from '@material-ui/icons';
import Link from 'next/dist/client/link';


import styles from './LeftMenu.module.scss';
import { useRouter } from 'next/dist/client/router';

const menu = [
  { text: 'Лента', icon: <FireIcon />, path: '/' },
  { text: 'Сообщения', icon: <MessageIcon />, path: '/messages' },
  { text: 'Рейтинг RJ', icon: <TrendingIcon />, path: '/rating' },
  { text: 'Подписки', icon: <ListIcon />, path: '/subscribes' },
];

export const LeftMenu: React.FC = () => {
  const router = useRouter();
  return (
    <div className={styles.menu}>
      <ul>
        {menu.map((obj, i) => (
          <li key={obj.path}>
            <Link href={obj.path}>
              <a >
                <Button variant={router.pathname === obj.path ? 'contained' : 'text'}>
                  {obj.icon}
                  {obj.text}
                </Button>
              </a>

            </Link>

          </li>
        ))}
      </ul>
    </div>
  );
};
