import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CommentItem } from '../../utils/api/types'
import { AppState } from '../store';

export interface CommentState {
    comments: CommentItem[] | null,
}

const initialState: CommentState = {
    comments: null,
}


export const commentSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        setCommentsData: (state, action: PayloadAction<CommentItem[]>) => {
            state.comments = action.payload;
        },
    },
})

export const { setCommentsData } = commentSlice.actions

export const selectCommentsData = (state: AppState) => state.comments.comments

export const commentReducer = commentSlice.reducer