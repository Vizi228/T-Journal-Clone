import React, { useState } from 'react'
import Input from '@material-ui/core/Input';
import { Button } from "@material-ui/core";
import style from './WriteComment.module.scss'

type Props = {}

const WriteComment: React.FC = (props: Props) => {
    const [activeInput, setActiveInput] = useState(false);
    const [text, setText] = useState('');

    const onAddComment = () => {
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