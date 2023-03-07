import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { addQuestion } from '../app/slices/questionsSlice.ts/questionsSlice'
import { question } from '../interfaces/Question'
import { v4 as uuidv4 } from 'uuid';
import CardQuestionCreate from '../components/cards/CardQuestionCreate';
import { Link } from 'react-router-dom';

const GenerateQuestions = () => {
    const questions = useAppSelector((state) => state.questions.questions)
    const dispatch = useAppDispatch()

    const [inputQuestion, setInputQuestion] = useState<string>("")

    const handleAddQuestion = () => {
        const myUniqueId = uuidv4();
        const newQuestion: question = {
            id: myUniqueId,
            question: inputQuestion,
            modalActive: false,
            answered: false,
            videoUrl: new Blob() // Proporcionar un valor de tipo Blob para videoUrl
        };
        dispatch(addQuestion(newQuestion));
        setInputQuestion("");
    };

    return (
        <div
            className=' flex flex-col p-3 items-center min-h-[100vh]'>
            <div className='w-[500px] mb-3 border-1 p-3 rounded-md bg-white'>
                <div className="mb-3">
                    <label
                        className="form-label w-full">
                        <h2 className='text-center font-bold py-3'>
                            Agregar preguntas
                        </h2>
                    </label>
                    <input
                        type="text"
                        onChange={(e) => setInputQuestion(e.target.value)}
                        value={inputQuestion}
                        className="form-control"
                        placeholder="Escriba la pregunta"
                    />
                </div>
                <button
                    type="button"
                    disabled={inputQuestion ? false : true}
                    onClick={() => handleAddQuestion()}
                    className="btn btn-success bg-green-500">
                    Añadir pregunta
                </button>
            </div>
            <Link to="/bank-of-questions">
                <button
                    type="button"
                    disabled={questions?.length !== 0 ? false : true}
                    className="btn btn-primary bg-blue-600 my-3 mb-4">
                    Continuar
                </button>
            </Link>
            <div
                className="card w-[500px]">
                <h2 className='text-center font-bold py-3'>Banco de preguntas</h2>
                <ul className="list-group list-group-flush">
                    {questions?.length !== 0 ?
                        questions?.map((question, index) => (
                            <li key={question.id.toString()} className="list-group-item">
                                <CardQuestionCreate {...question} />
                            </li>
                        ))
                        :
                        <li className="list-group-item text-center py-5 text-gray-500 text-[20px]">
                            No hay preguntas, agregue las preguntas que necesite para continuar.
                        </li>
                    }
                </ul>
            </div>


        </div>
    )
}

export default GenerateQuestions