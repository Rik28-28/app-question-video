import { useAppSelector } from "../app/hooks"
import CardShowQuestion from "../components/cards/CardShowQuestion"
import ModalQuestion from "../components/modals/ModalQuestion"

const BankOfQuestions = () => {
  const questions = useAppSelector((state) => state.questions.questions)
  const allAnswered = useAppSelector((state) => state.questions.allAnswered)

  return (
    <div className="grid justify-items-center">
      <p className="text-white pt-5 px-5 text-center">
        Se verá en consola los objetos de todas las preguntas con los videos guardados al presionar el boton enviar,
        estará activo solo si responde todas las preguntas.
      </p>
      <button
        onClick={() => console.log(questions)}
        disabled={allAnswered === true ? false : true}
        className="btn w-[200px] btn-succes mt-4 bg-green-500">
        Enviar
      </button>
      <div
        className="min-h-[100vh] relative grid grid-cols-3 gap-5 
      justify-items-center p-5">
        {
          questions?.map((question, index) => (
            <>
              <CardShowQuestion {...question} />
              {
                question.modalActive && <ModalQuestion question={question} index={index} />
              }
            </>
          ))
        }
      </div>

    </div>
  )
}

export default BankOfQuestions