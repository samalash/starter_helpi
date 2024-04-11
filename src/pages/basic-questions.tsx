import React, { useState } from 'react';
import '../App.css';
import TrueFalseQuestionBlock from '../components/TrueFalseQuestionBlock';
import Header from '../components/Header';
//import { Button, Form } from 'react-bootstrap';



function BasicQuestionsPage() {
    const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
    console.log(setSelectedAnswers);
    return (
        <div>
            <div className="pb-3">
            <Header/>
            </div>
            <div>
                <div className="flex-container mw-75 ml-90">
                    <TrueFalseQuestionBlock question="I prefer a structured work environment with clear guidelines." selectedAnswers={selectedAnswers} index={0}    />
                    <TrueFalseQuestionBlock question="I am more interested in practical, hands-on tasks than theoretical concepts." selectedAnswers={selectedAnswers} index={0}    />
                    <TrueFalseQuestionBlock question="I feel comfortable speaking in front of large groups of people." selectedAnswers={selectedAnswers} index={0}    />
                    <TrueFalseQuestionBlock question="I am passionate about making a positive impact on society through my work." selectedAnswers={selectedAnswers} index={0}    />
                    <TrueFalseQuestionBlock question="I prefer a fast-paced work environment with frequent changes and challenges." selectedAnswers={selectedAnswers} index={0}    />
                    <TrueFalseQuestionBlock question="I am naturally inclined towards leadership roles and enjoy taking charge of projects." selectedAnswers={selectedAnswers} index={0}    />
                    <TrueFalseQuestionBlock question="I value job security and stability over higher earning potential." selectedAnswers={selectedAnswers} index={0}    />
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