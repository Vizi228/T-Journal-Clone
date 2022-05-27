import { NextPage } from 'next';

import React from 'react';
import { MainLayout } from '../../layouts/MainLayout';
import WriteForm from '../../components/WriteForm';
import { Api } from '../../utils/api';


interface WritePageProps {
}

const WritePage: NextPage<WritePageProps> = () => {
    return (
        <div>
            <MainLayout hideComments hideMenu className='main-layout-white'>
                <WriteForm />
            </MainLayout>
        </div>
    )
}

export default WritePage