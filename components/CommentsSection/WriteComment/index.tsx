import React, { useState } from 'react'
import Input from '@material-ui/core/Input';
import { Button } from "@material-ui/core";
import style from './WriteComment.module.scss'
import { Api } from '../../../utils/api';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { selectUserData } from '../../../redux/slices/user';
import { selectCommentsData, setCommentsData } from '../../../redux/slices/comment';

type WriteCommentProps = {
    postId: number,
}

const WriteComment: React.FC<WriteCommentProps> = ({ postId }) => {
    const [activeInput, setActiveInput] = useState(false);
    const [text, setText] = useState('');
    const user = useAppSelector(selectUserData);
    const comments = useAppSelector(selectCommentsData);
    const dispatch = useAppDispatch()

    const onAddComment = async () => {
        if (user) {
            try {
                const data = await Api().comments.create({ text, postId });
                dispatch(setCommentsData(comments.concat(data)))
            } catch (error) {
                alert('Не удалось отправить комментарий')
            }

        } else {
            alert('Войдите в личный кабинет')
        }
        setActiveInput(false);
        setText('');
    }

    return (
        <div className={style.form}>
            <Input onFocus={() => setActiveInput(true)} onChange={e => setText(e.target.value)} minRows={activeInput ? 5 : 1} value={text} classes={{ root: style.fieldRoot }} placeholder="Написать комментарий..." fullWidth multiline />
            {activeInput && <Button onClick={onAddComment} className={style.addButton} variant="contained" color="primary">
                Опубликовать
            </Button>}

        </div>
    )
}

export default WriteComment