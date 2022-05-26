import React from 'react';
import dynamic from 'next/dynamic'
import { Input } from '@material-ui/core';
import style from './WriteForm.module.scss'
import Head from 'next/dist/shared/lib/head';
import { Button } from '@material-ui/core';
import { useState } from 'react';
import { Api } from '../../utils/api';
import { useRouter } from 'next/router'


const Editor = dynamic(() => import('../Editor'), { ssr: false })



const WriteForm: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState([]);
    const route = useRouter();
    const onAddPost = async () => {
        try {
            setIsLoading(true)
            const post = await Api().posts.create({
                title,
                body
            })
            setIsLoading(false)
            route.push('/');
        } catch (error) {
            console.warn(error)
            error('Произошла ошибка во время оправки статьи')
        }
    }

    return (

        <div>
            <Head>
                <title>Write Post</title>
            </Head>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} classes={{ root: style.titleField }} placeholder='Заголовок' defaultValue={title} />
            <div className={style.editor}>
                <Editor setBlocks={setBody} />
            </div>
            <Button disabled={isLoading} onClick={onAddPost} style={{ height: 42 }} variant="contained" color="primary">
                Опубликовать
            </Button>
        </div>
    )
}
export default WriteForm