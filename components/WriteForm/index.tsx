import React from 'react';
import dynamic from 'next/dynamic'
import { Input } from '@material-ui/core';
import style from './WriteForm.module.scss'
import Head from 'next/dist/shared/lib/head';
import { Button } from '@material-ui/core';


const Editor = dynamic(() => import('../Editor'), { ssr: false })

interface WriteFormProps {
    title?: string,
}

const WriteForm: React.FC<WriteFormProps> = ({ title }) => {

    return (

        <div>
            <Head>
                <title>Write Post</title>
            </Head>
            <Input classes={{ root: style.titleField }} placeholder='Заголовок' defaultValue={title} />
            <div className={style.editor}>
                <Editor />
            </div>
            <Button style={{ height: 42 }} variant="contained" color="primary">
                Опубликовать
            </Button>
        </div>
    )
}
export default WriteForm