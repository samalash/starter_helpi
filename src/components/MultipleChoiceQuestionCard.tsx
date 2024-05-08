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
export default MultipleChoiceQuestionCard;