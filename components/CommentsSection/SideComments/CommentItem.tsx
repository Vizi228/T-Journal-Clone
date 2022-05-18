import Link from 'next/link';
import React from 'react'
import styles from './SideComments.module.scss';
interface CommentItemProps {
    user: {
        id: number,
        fullname: string;
    };
    text: string;
    post: {
        title: string;
    };
}
const CommentItem: React.FC<CommentItemProps> = ({ user, text, post }) => {

    return (
        <div className={styles.commentItem}>
            <div className={styles.userInfo}>
                <Link href={`/profile/${user.id}`}>
                    <a>
                        <b>{user.fullname}</b>
                    </a>
                </Link>

            </div>
            <p className={styles.text}>{text}</p>
            <Link href={`/news/${user.id}`}>
                <a>
                    <span className={styles.postTitle}>{post.title}</span>
                </a>
            </Link>

        </div>
    );
};

export default CommentItem