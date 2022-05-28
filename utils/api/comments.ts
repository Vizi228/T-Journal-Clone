import { OutputData } from "@editorjs/editorjs";
import { AxiosInstance } from "axios";
import { ApiReturnType } from ".";
import { CommentItem } from "./types";

type CreateCommentDto = {
    postId: number,
    text: string,
}


export const CommentsApi = (instance: AxiosInstance) => ({
    async getPostsComments(postId: number) {
        const { data } = await instance.get<CommentItem[]>(`/comments`, { params: { postId } });
        return data
    },
    async create(dto: CreateCommentDto) {
        const { data } = await instance.post<CreateCommentDto, { data: CommentItem }>('/comments', dto);
        return data
    },
    async remove(id: number) {
        const { data } = await instance.delete(`/comments/${id}`);
        return data
    },
    async update(id: number, dto: CreateCommentDto) {
        const { data } = await instance.patch(`/comments/${id}`, dto);
        return data
    }
})
