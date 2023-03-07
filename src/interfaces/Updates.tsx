export interface updateQuestion {
    id: String,
    updateQuestion: String,
}

export interface nextModalActive{
    nextIndexPending: number,
    currentIndex: number
}

export interface saveVideoUrl{
    index: number,
    videoUrl: Blob
}