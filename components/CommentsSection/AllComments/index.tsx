import React, { useState } from 'react'
import { Comment } from '../Comment';
import { Divider, Paper, Tab, Tabs, Typography } from '@material-ui/core';
import WriteComment from '../WriteComment';
import { useComments } from '../../../hooks/Comment';

interface AllCommentsProps {
    postId: number
}

const AllComments: React.FC<AllCommentsProps> = ({ postId }) => {
    const [activeTab, setActiveTab] = useState(0);
    const { comments } = useComments(postId)

    return (
        <>
            <Paper elevation={0} className="mt-40 p-30">
                <Typography variant="h6" className="mb-20">
                    42 комментария
                </Typography>
                <Tabs className="mt-20" value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)} indicatorColor="primary" textColor="primary">
                    <Tab label="Популярные" />
                    <Tab label="По порядку" />
                </Tabs>
                <Divider />
                <div className="mb-20" />
                <WriteComment postId={+postId} />

                {comments && comments.map((item, i) => (
                    <Comment user={item.user} id={item.id} text={item.text} key={i} />
                ))}
            </Paper>
        </>
    )
}

export default AllComments