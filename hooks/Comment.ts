import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectCommentsData, setCommentsData } from "../redux/slices/comment";
import { Api } from "../utils/api";
import { CommentItem } from "../utils/api/types";

type UseCommentsProps = {
    comments: CommentItem[] | null;
};


export const useComments = (postId?: number): UseCommentsProps => {
    const comments = useAppSelector(selectCommentsData);
    const dispatch = useAppDispatch()

    useEffect(() => {
        (async function fetchData() {
            try {
                const data = await Api().comments.getPostsComments(postId);
                dispatch(setCommentsData(data))
            } catch (error) {
                alert('Прозошла ошибка при загрузке комментариев')
            }
        })()
    }, [])
    return { comments }
}