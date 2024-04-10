import React, { useState } from 'react';
import '../App.css';
import TrueFalseQuestionBlock from '../components/TrueFalseQuestionBlock';
//import { Button, Form } from 'react-bootstrap';



function BasicQuestionsPage() {
    const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
    console.log(setSelectedAnswers);
    return (
        <div>
            <div className="pb-3">

            </div>
            <div>
                <div>
                    <TrueFalseQuestionBlock question="Hello?" selectedAnswers={selectedAnswers} index={0}    />
                </div>
                <div>

                </div>
                <div>

                </div>
            </div>
        </div>
    );

}

export default BasicQuestionsPage;