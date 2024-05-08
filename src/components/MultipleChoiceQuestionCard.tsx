import FadeIn from './FadeIn';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';


function MultipleChoiceQuestionCard({questions, possibleAnswers, handleAnswerChange, selectedAnswers, darkMode}: {questions: string[], possibleAnswers: string[], handleAnswerChange:(index:number,answer:string) => void, selectedAnswers: string[], darkMode: boolean}) {
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
                <div className="pt-20 pb-8 w-2/3">
                    <FadeIn key={`${darkMode}`}>
                        <div className={`p-3 shadow-xl rounded-xl ${darkMode ? "bg-[rgb(0,130,192)]" : "bg-gradient-to-r from-[#00B4D8] to-blue-500"} text-white text-center`}>
                            <h4 className="mt-5 mb-16 h-5">{questions[currentIndex]}</h4>
                            <div className="mb-10 grid grid-cols-2 mx-auto w-1/4">
                                <label className="form-check-label">
                                    {selectedAnswers[currentIndex] === possibleAnswers[0] ?
                                    <input className="form-check-input mr-2" type="radio" name={"MultipleChoice"} key={currentIndex} onChange={() => {handleAnswerChange(currentIndex,possibleAnswers[0]);}} checked /> :
                                    <input className="form-check-input mr-2" type="radio" name={"MultipleChoice"} key={currentIndex} onChange={() => {handleAnswerChange(currentIndex,possibleAnswers[0]);}} />
                                    }
                                    {possibleAnswers[0]}
                                </label>
                                
                                <label className="form-check-label ml-10">
                                    {selectedAnswers[currentIndex] === possibleAnswers[1] ?
                                    <input className="form-check-input mr-2" type="radio" name={"MultipleChoice"} key={currentIndex} onChange={() => {handleAnswerChange(currentIndex,possibleAnswers[1]);}} checked /> :
                                    <input className="form-check-input mr-2" type="radio" name={"MultipleChoice"} key={currentIndex} onChange={() => {handleAnswerChange(currentIndex,possibleAnswers[1]);}} />
                                    }
                                    {possibleAnswers[1]}
                                </label>
                            </div>
                            <div className="grid grid-cols-2 mx-auto w-1/4">
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