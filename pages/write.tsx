import { NextPage } from 'next';

import React from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { Header } from '../components/Header';
import WriteForm from '../components/WriteForm';


interface WritePageProps { }

const WritePage: NextPage = ({ }: WritePageProps) => {
    return (
        <div>
            <Header />
            <MainLayout hideComments hideMenu className='main-layout-white'>
                <WriteForm />
            </MainLayout>
        </div>
    )
}

export default WritePage