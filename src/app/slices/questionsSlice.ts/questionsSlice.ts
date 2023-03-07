import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { question } from '../../../interfaces/Question'
import { questions } from '../../../interfaces/Questions'
import { nextModalActive, saveVideoUrl, updateQuestion } from '../../../interfaces/Updates'
import type { RootState } from '../../store'



const initialState = {
    questions: [],
    allAnswered: false
} as questions

export const questionsSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        addQuestion: (state, action: PayloadAction<question>) => {
            state.questions?.push(action.payload)
        },
        deleteQuestion: (state, action: PayloadAction<String>) => {
            const id: String = action.payload
            state.questions?.map((question, index) => {
                if (question.id === id) {
                    state.questions?.splice(index, 1)
                }
            })
        },
        editQuestion: (state, action: PayloadAction<updateQuestion>) => {
            const id: String = action.payload.id
            state.questions?.map((question) => {
                if (question.id === id) {
                    question.question = action.payload.updateQuestion
                }
            })
        },
        modalActive: (state, action: PayloadAction<String>) => {
            const id: String = action.payload
            state.questions?.map((question) => {
                if (question.id === id) {
                    question.modalActive = true
                } else {
                    question.modalActive = false
                }
            })
        },
        modalDeactivate: (state) => {
            state.questions?.map((question) => {
                question.modalActive = false
            })
        },
        nextOrPrevQuestionPending: (state, action: PayloadAction<nextModalActive>) => {
            var nextIndex: number = action.payload.nextIndexPending
            const currentIndex: number = action.payload.currentIndex
            state.questions?.map((question, index) => {
                if (index === nextIndex) {
                    question.modalActive = true
                }
                if (index === currentIndex) {
                    question.modalActive = false
                }
            })
        },
        saveVideo: (state, action: PayloadAction<saveVideoUrl>) => {
            const id: number = action.payload.index
            const videoUrl: Blob = action.payload.videoUrl

            if (state.questions && state.questions[id]) {
                state.questions[id].answered = true;
                state.questions[id].videoUrl = videoUrl;
            }
            var contador: number = 0
            state.questions?.map((question, index) => {
                if (question.answered === true) {
                    contador = contador + 1
                }
            })
            if (contador === state.questions?.length) {
                state.allAnswered = true
            }
        }
    },
})

export const { addQuestion, deleteQuestion, editQuestion, saveVideo, nextOrPrevQuestionPending, modalActive, modalDeactivate } = questionsSlice.actions

export const selectCount = (state: RootState) => state.questions

export default questionsSlice.reducer