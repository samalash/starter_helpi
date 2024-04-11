


function MultipleChoiceQuestionBlock({question, possibleAnswers, selectedAnswers, index}: {question: string, possibleAnswers: string[], selectedAnswers: string[], index: number}) {


    return (
        <div className="ml-5 mw-20rem pt-10">
            <p>{question}</p>
            <div className="vstack gap-2 mw-100">

                <label className="form-check-label">
                    <input className="form-check-input mr-2" type="radio" />
                    {possibleAnswers[0]}
                </label>
                
                <label className="form-check-label">
                    <input className="form-check-input mr-2" type="radio" />
                    {possibleAnswers[1]}
                </label>
                
                <label className="form-check-label">
                    <input className="form-check-input mr-2" type="radio" />
                    {possibleAnswers[2]}
                </label>
                
                <label className="form-check-label">
                    <input className="form-check-input mr-2" type="radio" />
                    {possibleAnswers[3]}
                </label>
            </div>

        </div>
    )
}

export default MultipleChoiceQuestionBlock;