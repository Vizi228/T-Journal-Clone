import React from 'react';
import dynamic from 'next/dynamic'
import { Input } from '@material-ui/core';
import style from './WriteForm.module.scss'
import Head from 'next/dist/shared/lib/head';
import { Button } from '@material-ui/core';
import { useState } from 'react';
import { Api } from '../../utils/api';
import { useRouter } from 'next/router'
import { PostItem } from '../../utils/api/types';


const Editor = dynamic(() => import('../Editor'), { ssr: false })

interface WriteFormProps {
    data?: PostItem
}

const WriteForm: React.FC<WriteFormProps> = ({ data }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState(data?.title || '');
    const [body, setBody] = useState(data?.body || []);
    const route = useRouter();
    const onAddPost = async () => {
        try {
            setIsLoading(true);
            const postDto = { title, body }
            if (data) {
                const post = await Api().posts.update(postDto, data.id)
            } else {
                const post = await Api().posts.create(postDto)
                route.push('/');
            }
            setIsLoading(false);
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
                <Editor initialValue={data?.body || []} setBlocks={setBody} />
            </div>
            <Button disabled={isLoading} onClick={onAddPost} style={{ height: 42 }} variant="contained" color="primary">
                {data ? 'Сохранить' : 'Опубликовать'}
            </Button>
        </div>
    )
}
export default WriteForm