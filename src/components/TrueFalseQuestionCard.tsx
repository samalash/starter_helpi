import FadeIn from './FadeIn';
import Button from 'react-bootstrap/Button';

function TrueFalseQuestionCard({darkMode}: {darkMode: boolean}){
    return (
        <>
            <div className='flex justify-center'>
                    <div className="pt-20 pb-8 w-2/3">
                        <FadeIn key={`${darkMode}`}>
                            <div className={`p-3 shadow-xl rounded-xl ${darkMode ? "bg-[rgb(0,130,192)]" : "bg-gradient-to-r from-[#00B4D8] to-blue-500"} text-white text-center`}>
                                <h4>Job security and stability seem important to you.</h4>
                                <div className="mb-2">
                                    <label className="form-check-label">
                                        <input className="form-check-input mr-2" type="radio" />
                                        True
                                    </label>
                                    
                                    <label className="form-check-label">
                                        <input className="form-check-input ml-10 mr-2" type="radio" />
                                        False
                                    </label>
                                </div>
                                <div>
                                    <Button variant={`${darkMode ? "dark" : "light"}`} className="mr-5">Previous</Button>
                                    <Button variant={`${darkMode ? "dark" : "light"}`} className="ml-5">Next</Button>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
        </>
    )
}

export default TrueFalseQuestionCard;