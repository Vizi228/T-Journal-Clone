import Link from 'next/link';
import React from 'react'
import styles from './SideComments.module.scss';
import { CommentItem } from '../../../utils/api/types';
const SideCommentItem: React.FC<CommentItem> = ({ user, text }) => {
    return (
        <div className={styles.commentItem}>
            <div className={styles.userInfo}>
                <Link href={`/profile/${user.id}`}>
                    <a>
                        <b>{user.fullName}</b>
                    </a>
                </Link>

            </div>
            <p className={styles.text}>{text}</p>
        </div>
    );
};

export default SideCommentItem