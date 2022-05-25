import React from 'react';
import dynamic from 'next/dynamic'
import { Input } from '@material-ui/core';
import style from './WriteForm.module.scss'
import Head from 'next/dist/shared/lib/head';
import { Button } from '@material-ui/core';
import { useState } from 'react';

const Editor = dynamic(() => import('../Editor'), { ssr: false })



const WriteForm: React.FC = () => {
    const [title, setTitle] = useState('');
    const [blocks, setBlocks] = useState([]);
    return (

        <div>
            <Head>
                <title>Write Post</title>
            </Head>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} classes={{ root: style.titleField }} placeholder='Заголовок' defaultValue={title} />
            <div className={style.editor}>
                <Editor setBlocks={setBlocks} />
            </div>
            <Button style={{ height: 42 }} variant="contained" color="primary">
                Опубликовать
            </Button>
        </div>
    )
}
export default WriteForm