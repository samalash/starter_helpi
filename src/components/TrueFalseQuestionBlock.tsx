


function TrueFalseQuestionBlock({question, handleAnswerChange, index}: {question: string, handleAnswerChange:(index:number,answer:string) => void, index: number}) {
    return (
        <div className="ml-4 mw-20rem pt-10">
            <p>{question}</p>
            <div>
                <input className="form-check-input" type="radio" name={String(index)} onChange={() => {handleAnswerChange(index,"True");}} />
                <label className="form-check-label ml-2">
                    True
                </label>
                <input className="form-check-input ml-10" type="radio" name={String(index)} onChange={() => {handleAnswerChange(index,"False");}} />
                <label className="form-check-label ml-2">
                    False
                </label>
            </div>
        </div>
    )
}

export default TrueFalseQuestionBlock;