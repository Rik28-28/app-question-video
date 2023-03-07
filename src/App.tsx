import { Routes, Route } from "react-router-dom"
import BankOfQuestions from "./pages/BankOfQuestions";
import GenerateQuestions from "./pages/GenerateQuestions";

function App() {
  return (
    <div className="App bg-black">
      <Routes>
        <Route index element={<GenerateQuestions />} />
        <Route path="bank-of-questions" element={<BankOfQuestions />} />
      </Routes>
    </div>
  );
}

export default App;
