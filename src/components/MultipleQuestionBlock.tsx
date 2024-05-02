


function MultipleChoiceQuestionBlock({question, possibleAnswers, handleAnswerChange, index}: {question: string, possibleAnswers: string[], handleAnswerChange:(index:number,answer:string) => void, index: number}) {


    return (
        <div className="ml-5 mw-20rem pt-10">
            <p>{question}</p>
            <div className="vstack gap-2 mw-100">

                <label className="form-check-label">
                    <input className="form-check-input mr-2" type="radio" name={String(index)} onChange={() => {handleAnswerChange(index,possibleAnswers[0]);}} />
                    {possibleAnswers[0]}
                </label>
                
                <label className="form-check-label">
                    <input className="form-check-input mr-2" type="radio" name={String(index)} onChange={() => {handleAnswerChange(index,possibleAnswers[1]);}} />
                    {possibleAnswers[1]}
                </label>
                
                <label className="form-check-label">
                    <input className="form-check-input mr-2" type="radio" name={String(index)} onChange={() => {handleAnswerChange(index,possibleAnswers[2]);}} />
                    {possibleAnswers[2]}
                </label>
                
                <label className="form-check-label">
                    <input className="form-check-input mr-2" type="radio" name={String(index)} onChange={() => {handleAnswerChange(index,possibleAnswers[3]);}} />
                    {possibleAnswers[3]}
                </label>
            </div>

        </div>
    )
}

export default MultipleChoiceQuestionBlock;