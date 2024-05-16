import FadeIn from './FadeIn';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

function TrueFalseQuestionCard({questions, handleAnswerChange, selectedAnswers, darkMode}: {questions: string[], handleAnswerChange:(index:number,answer:string) => void, selectedAnswers: string[], darkMode: boolean}){
    const [currentIndex, setCurrentIndex] = useState(0); //State variable to keep track of the current question index

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
        <div className='flex justify-center'>
            <div className="pt-36 pb-8 w-1/2">
                <FadeIn key={`${darkMode}${"TrueFalseQuizCard"}`}>
                    <div className={`p-3 shadow-xl rounded-xl ${darkMode ? "bg-gradient-to-r from-[#0082C0] to-blue-700" : "bg-gradient-to-r from-[#00B4D8] to-[#0082C0]"} text-white text-center`}>
                        <h4 className="mt-5 mb-32 h-5">{questions[currentIndex]}</h4>
                        <div className="mb-10 grid grid-cols-2 mx-auto w-1/2">
                            <label className="form-check-label">
                                {selectedAnswers[currentIndex] === "True" ?
                                <input className="form-check-input mr-2" type="radio" name={"TrueFalseChoice"} key={currentIndex} onChange={() => {handleAnswerChange(currentIndex,"True");}} checked /> :
                                <input className="form-check-input mr-2" type="radio" name={"TrueFalseChoice"} key={currentIndex} onChange={() => {handleAnswerChange(currentIndex,"True");}} />
                                }
                                True
                            </label>
                            
                            <label className="form-check-label ml-10">
                                {selectedAnswers[currentIndex] === "False" ?
                                <input className="form-check-input mr-2" type="radio" name={"TrueFalseChoice"} key={currentIndex} onChange={() => {handleAnswerChange(currentIndex,"False");}} checked /> :
                                <input className="form-check-input mr-2" type="radio" name={"TrueFalseChoice"} key={currentIndex} onChange={() => {handleAnswerChange(currentIndex,"False");}} />
                                }
                                False
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
    )
}

export default TrueFalseQuestionCard;