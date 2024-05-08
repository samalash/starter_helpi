import FadeIn from './FadeIn';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';


function MultipleChoiceQuestionCard({questions, possibleAnswers, handleAnswerChange, selectedAnswers, darkMode}: {questions: string[], possibleAnswers: string[][], handleAnswerChange:(index:number,answer:string) => void, selectedAnswers: string[], darkMode: boolean}) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        if (currentIndex < questions.length-1){
            setCurrentIndex(currentIndex+1);
        }
    }

    const handlePrevious = () => {
        if (currentIndex > 0){
            setCurrentIndex(currentIndex-1);
        }
    }

    return (
        <>
            <div className='flex justify-center'>
                <div className="pt-36 pb-8 w-1/2">
                    <FadeIn key={`${darkMode}`}>
                        <div className={`p-3 shadow-xl rounded-xl ${darkMode ? "bg-gradient-to-r from-[#0082C0] to-blue-700" : "bg-gradient-to-r from-[#00B4D8] to-[#0082C0]"} text-white text-center`}>
                            <h4 className="mt-5 pb-32 h-5">{questions[currentIndex]}</h4>
                            <div className="pb-10 min-h-48 grid grid-cols-2 mx-auto w-3/4">
                                <label className="form-check-label">
                                    {selectedAnswers[currentIndex] === possibleAnswers[currentIndex][0] ?
                                    <input className="form-check-input mr-2" type="radio" name={"MultipleChoice"} key={currentIndex} onChange={() => {handleAnswerChange(currentIndex,possibleAnswers[currentIndex][0]);}} checked /> :
                                    <input className="form-check-input mr-2" type="radio" name={"MultipleChoice"} key={currentIndex} onChange={() => {handleAnswerChange(currentIndex,possibleAnswers[currentIndex][0]);}} />
                                    }
                                    {possibleAnswers[currentIndex][0]}
                                </label>
                                
                                <label className="form-check-label ml-10">
                                    {selectedAnswers[currentIndex] === possibleAnswers[currentIndex][1] ?
                                    <input className="form-check-input mr-2" type="radio" name={"MultipleChoice"} key={currentIndex} onChange={() => {handleAnswerChange(currentIndex,possibleAnswers[currentIndex][1]);}} checked /> :
                                    <input className="form-check-input mr-2" type="radio" name={"MultipleChoice"} key={currentIndex} onChange={() => {handleAnswerChange(currentIndex,possibleAnswers[currentIndex][1]);}} />
                                    }
                                    {possibleAnswers[currentIndex][1]}
                                </label>

                                <label className="form-check-label mt-10">
                                    {selectedAnswers[currentIndex] === possibleAnswers[currentIndex][2] ?
                                    <input className="form-check-input mr-2" type="radio" name={"MultipleChoice"} key={currentIndex} onChange={() => {handleAnswerChange(currentIndex,possibleAnswers[currentIndex][2]);}} checked /> :
                                    <input className="form-check-input mr-2" type="radio" name={"MultipleChoice"} key={currentIndex} onChange={() => {handleAnswerChange(currentIndex,possibleAnswers[currentIndex][2]);}} />
                                    }
                                    {possibleAnswers[currentIndex][2]}
                                </label>

                                <label className="form-check-label ml-10 mt-10">
                                    {selectedAnswers[currentIndex] === possibleAnswers[currentIndex][3] ?
                                    <input className="form-check-input mr-2" type="radio" name={"MultipleChoice"} key={currentIndex} onChange={() => {handleAnswerChange(currentIndex,possibleAnswers[currentIndex][3]);}} checked /> :
                                    <input className="form-check-input mr-2" type="radio" name={"MultipleChoice"} key={currentIndex} onChange={() => {handleAnswerChange(currentIndex,possibleAnswers[currentIndex][3]);}} />
                                    }
                                    {possibleAnswers[currentIndex][3]}
                                </label>
                            </div>
                            <div className="grid grid-cols-2 mx-auto w-1/2">
                                <Button variant={`${darkMode ? "dark" : "light"}`} className="mr-5" onClick={handlePrevious} disabled={currentIndex === 0}>Previous</Button>
                                <Button variant={`${darkMode ? "dark" : "light"}`} className="ml-5" onClick={handleNext} disabled={currentIndex === questions.length-1}>Next</Button>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </>
    )
}

export default MultipleChoiceQuestionCard;