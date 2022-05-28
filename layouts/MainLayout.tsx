import React from 'react';
import clsx from 'clsx';
import { LeftMenu } from '../components/LeftMenu';
import SideComments from '../components/CommentsSection/SideComments';

interface MainLayoutProps {
    hideComments?: boolean;
    hideMenu?: boolean;
    contentFullWidth?: boolean;
    className?: string;
    postId?: number,
}

export const MainLayout: React.FC<MainLayoutProps> = ({
    children,
    contentFullWidth,
    hideComments,
    hideMenu,
    className,
    postId,
}) => {
    return (
        <div className={clsx('wrapper', className)}>

            {!hideMenu &&
                <div className="leftSide">
                    <LeftMenu />
                </div>
            }
            <div className={clsx('content', { 'content--full': contentFullWidth })}>{children}</div>
            {!hideComments && (
                <div className="rightSide">
                    <SideComments postId={postId && postId} />
                </div>
            )}
        </div>
    );
};

export const getServerSideProps = (ctx) => {
    const id = ctx.params.id
    return {
        props: {
            postId: id
        }
    }
}