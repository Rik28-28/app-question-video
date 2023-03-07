import React from 'react'
import { useAppDispatch } from '../../app/hooks'
import { modalActive } from '../../app/slices/questionsSlice.ts/questionsSlice'
import { question } from '../../interfaces/Question'

const CardShowQuestion = (props: question) => {
    const dispatch = useAppDispatch()

    return (
        <div
            onClick={() => dispatch(modalActive(props.id))}
            className="card h-[280px] w-[300px] cursor-pointer py-0" >
            <img src="..." className="card-img-top h-[200px] bg-black" alt="..." />
            <div className="card-body flex justify-center items-center">
                <p className="card-text text-center">
                    {props.question}
                </p>
            </div>
            {
                props.answered ?
                    <div
                        className=" absolute top-0 p-1 rounded-md bg-green-500"
                        role="alert">
                        Hecho
                    </div>
                    :
                    <div
                        className=" absolute top-0 p-1 rounded-md bg-yellow-500"
                        role="alert">
                        Pendiente
                    </div>
            }
        </div>
    )
}

export default CardShowQuestion