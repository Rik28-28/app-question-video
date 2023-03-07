import { useState } from 'react'
import { useAppDispatch } from "../../app/hooks"
import { deleteQuestion, editQuestion } from "../../app/slices/questionsSlice.ts/questionsSlice"
import { question } from "../../interfaces/Question"
import { updateQuestion } from '../../interfaces/Updates'

const CardQuestionCreate = (props: question) => {
    const dispatch = useAppDispatch()
    const [inputQuestion, setInputQuestion] = useState<string>(props.question.toString())

    const handleDeleteQuestion = () => {
        dispatch(deleteQuestion(props.id))
    }

    const handleEditQuestion = () => {
        const update: updateQuestion = {
            id: props.id,
            updateQuestion: inputQuestion.toString()
        }
        dispatch(editQuestion(update))
    }


    return (
        <div className="card text-dark bg-light mb-3">
            <div className="card-header text-center">{props.question}</div>
            <div className="card-body">
                <div
                    className="btn-group gap-3 flex">
                    <button
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target={"#" + props.question}
                        className="btn btn-warning bg-yellow-400 text-white">
                        Editar
                    </button>
                    <button
                        type="button"
                        onClick={() => handleDeleteQuestion()}
                        className="btn text-red-500 btn-danger">
                        Eliminar
                    </button>
                </div>
            </div>
            <div
                className="modal fade"
                id={props.question.toString()}
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="false">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body">
                            <input
                                type="text"
                                onChange={(e) => setInputQuestion(e.target.value)}
                                value={inputQuestion}
                                className="form-control"
                                placeholder="Escriba la pregunta"
                            />
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary text-gray-500"
                                data-bs-dismiss="modal">
                                Close
                            </button>
                            <button
                                type="button"
                                onClick={() => handleEditQuestion()}
                                data-bs-dismiss="modal"
                                className="btn btn-primary bg-green-500">
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardQuestionCreate