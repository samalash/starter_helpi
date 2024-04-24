


function TrueFalseQuestionBlock({question, selectedAnswers, index}: {question: string, selectedAnswers: string[], index: number}) {
    return (
        <div className="ml-4 mw-20rem pt-10">
            <p>{question}</p>
            <div>
                <input className="form-check-input" type="radio" name={String(index)} onChange={() => {selectedAnswers[index] = "True";}} />
                <label className="form-check-label ml-2">
                    True
                </label>
                <input className="form-check-input ml-10" type="radio" name={String(index)} onChange={() => {selectedAnswers[index] = "False";}} />
                <label className="form-check-label ml-2">
                    False
                </label>
            </div>
        </div>
    )
}

export default TrueFalseQuestionBlock;