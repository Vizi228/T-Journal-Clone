import { OutputData } from "@editorjs/editorjs";
import { AxiosInstance } from "axios";
import { PostItem, ResponseSearch } from "./types"

type CreatePostDto = {
    title: string,
    body: OutputData['blocks']
}
type SearchPostDto = {
    title?: string;
    body?: string;
    views?: 'DESC' | 'ASC';
    limit?: number;
    take?: number;
    tag?: string;
}


export const PostsApi = (instance: AxiosInstance) => ({
    async getAllPosts() {
        const { data } = await instance.get<PostItem>('/posts');
        return data
    },
    async getOne(id: number) {
        const { data } = await instance.get<PostItem>(`/posts/${id}`);
        return data
    },
    async create(dto: CreatePostDto) {
        const { data } = await instance.post<CreatePostDto, { data: PostItem }>('/posts', dto);
        return data
    },
    async update(dto: CreatePostDto, id: number) {
        const { data } = await instance.patch<CreatePostDto, { data: PostItem }>(`/posts/${id}`, dto);
        return data
    },
    async search(dto: SearchPostDto) {
        const { data } = await instance.get<ResponseSearch>(`/posts/search`, { params: dto });
        return data
    }
})
