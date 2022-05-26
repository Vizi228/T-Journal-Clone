import Cookies, { parseCookies } from 'nookies';
import axios from 'axios';
import { GetServerSidePropsContext, NextPageContext } from 'next';
import { UserApi } from './user';
import { PostsApi } from './posts';
export type ApiReturnType = {
    user: ReturnType<typeof UserApi>;
    posts: ReturnType<typeof PostsApi>;
};

export const Api = (ctx?: NextPageContext | GetServerSidePropsContext): ApiReturnType => {
    const cookies = ctx ? Cookies.get(ctx) : parseCookies();
    const token = cookies.authToken;
    const instance = axios.create({
        baseURL: 'http://localhost:7777',
        headers: {
            Authorization: 'Bearer ' + token,
        },
    });

    const apis = {
        user: UserApi,
        posts: PostsApi
    };
    const result = Object.entries(apis).reduce((prev, [key, f]) => {
        return {
            ...prev,
            [key]: f(instance),
        };
    }, {} as ApiReturnType);

    return result;
};
