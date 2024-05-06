


function TrueFalseQuestionBlock({question, handleAnswerChange, index}: {question: string, handleAnswerChange:(index:number,answer:string) => void, index: number}) {
    return (
        <div className="ml-4 mw-20rem pt-10">
            <p>{question}</p>
            <div>
                <label className="form-check-label">
                    <input className="form-check-input mr-2" type="radio" name={String(index)} onChange={() => {handleAnswerChange(index,"True");}} />
                    True
                </label>
                
                <label className="form-check-label">
                    <input className="form-check-input ml-10 mr-2" type="radio" name={String(index)} onChange={() => {handleAnswerChange(index,"False");}} />
                    False
                </label>
            </div>
        </div>
    )
}

export default TrueFalseQuestionBlock;