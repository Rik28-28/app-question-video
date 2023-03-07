import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { modalDeactivate, saveVideo, nextOrPrevQuestionPending } from "../../app/slices/questionsSlice.ts/questionsSlice"
import { ModalQuestionInterface } from "../../interfaces/ModalQuestionInterface"
import { MyRecorted } from "../videos/MyRecorted.jsx"

const ModalQuestion = (props: ModalQuestionInterface) => {
  const questions = useAppSelector((state) => state.questions.questions) || []
  const allAnswered = useAppSelector((state) => state.questions.allAnswered)
  const dispatch = useAppDispatch()

  const handleNextQuestion = () => {
    const currentIndex: number = props.index
    var nextIndexPending: number = (currentIndex === questions.length - 1) ? 0 : currentIndex + 1

    if (allAnswered) {
      //Avanzo a la siguiente pregunta
      dispatch(nextOrPrevQuestionPending({ currentIndex, nextIndexPending }))
    } else {
      //Recorro todo el array buscando uno que aún este pendiente, en caso regrese hasta 
      //la pregunta final, sigo buscando desde el primero.
      for (let i = nextIndexPending; i < questions.length; i++) {
        if (questions[i].answered === false) {
          nextIndexPending = i
          break
        }
        if (i === questions.length) {
          i = 0
        }
      }
      dispatch(nextOrPrevQuestionPending({ currentIndex, nextIndexPending }))
    }

  }

  const handlePrevQuestion = () => {
    const currentIndex: number = props.index
    var prevIndexPending: number = (currentIndex !== 0) ? currentIndex - 1 : questions.length - 1

    if (allAnswered) {
      //Regreso a la anterior pregunta
      dispatch(nextOrPrevQuestionPending({ currentIndex, nextIndexPending: prevIndexPending }))
    } else {
      //Recorro todo el array buscando uno que aún este pendiente, en caso regrese hasta 
      //la pregunta inicial, sigo buscando desde el último.
      for (let i = prevIndexPending; i > -1; i--) {
        if (questions[i].answered === false) {
          prevIndexPending = i
          break
        }
        if (i === 0) {
          i = questions.length
        }
      }
      console.log(currentIndex, prevIndexPending)
      dispatch(nextOrPrevQuestionPending({ currentIndex, nextIndexPending: prevIndexPending }))
    }
  }

  return (
    <div
      style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
      className="absolute w-full h-full flex justify-center z-20">

      <div className="mt-4 w-[70vw] shadow-lg shadow-white h-[90vh]">
        <div className="card text-center h-full">
          <div
            className="card-header h-[60px] flex items-center 
              justify-center font-bold text-[20px]">
            {
              props.question.answered ?
                <div
                  className=" absolute top-2 left-0   p-1 rounded-md
                   bg-green-500 text-white"
                  role="alert">
                  Hecho
                </div>
                :
                <div
                  className=" absolute left-0 top-2 p-1 rounded-md
                   bg-yellow-500 text-white"
                  role="alert">
                  Pendiente
                </div>
            }
            {props.question.question}
            <button
              onClick={() => dispatch(modalDeactivate())}
              className="btn btn-danger absolute right-0 top-0 m-2">
              Volver
            </button>
          </div>
          <div className="card-body">
            <MyRecorted {...props} />
            
          </div>
          <div className="card-footer grid grid-cols-5  h-[60px]">
            <button
              onClick={() => handlePrevQuestion()}
              disabled={allAnswered && (props.index === 0) ? true : false}
              className="btn btn-secondary">
              Anterior
            </button>
            <div /><div /><div />
            {
              !allAnswered ?
                <button
                  onClick={() => handleNextQuestion()}
                  className="btn btn-primary">
                  Siguiente
                </button>
                :
                (props.index === questions.length - 1) ?
                  < button
                    onClick={() => dispatch(modalDeactivate())}
                    className="btn btn-primary">
                    Terminar
                  </button>
                  :
                  <button
                    onClick={() => handleNextQuestion()}
                    className="btn btn-primary">
                    Siguiente
                  </button>
            }
          </div>
        </div>

      </div>

    </div >
  )
}

export default ModalQuestion