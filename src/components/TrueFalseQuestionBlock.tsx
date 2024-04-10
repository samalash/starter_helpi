


function TrueFalseQuestionBlock({question, selectedAnswers, index}: {question: string, selectedAnswers: string[], index: number}) {


    return (
        <div>
            <p>{question}</p>
            <div>
                <input className="form-check-input" type="radio" />
                <label className="form-check-label">
                    True
                </label>
                <input className="form-check-input" type="radio" />
                <label className="form-check-label">
                    False
                </label>
            </div>

        </div>
    )
}

export default TrueFalseQuestionBlock;