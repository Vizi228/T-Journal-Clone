import { OutputData } from "@editorjs/editorjs";

export type LoginDto = {
    email: string,
    password: string
};
export type CreateUserDto = {
    fullName: string,
} & LoginDto;
export type ResponseUser = {
    createdAt: string,
    email: string,
    fullName: string,
    id: number,
    token: string,
    updatedAt: string
}
export type PostItem = {
    title: string,
    body: OutputData['blocks'],
    description: string,
    tags: null | string,
    id: number,
    views: number,
    user: ResponseUser,
    createdAt: string,
    updatedAt: string
}
type CommentPostResponse = {
    id: number,
    title: string
}
export type CommentItem = {
    text: string,
    id: number,
    user: ResponseUser,
    createdAt: string,
    updatedAt: string,
    post: CommentPostResponse,
}
export type ResponseSearch = {
    items: PostItem[],
}