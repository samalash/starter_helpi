import React, { useState } from 'react';
import '../App.css';
import TrueFalseQuestionBlock from '../components/TrueFalseQuestionBlock';
import Header from '../components/Header';
import Footer from '../components/Footer';
import OpenAI from "openai";
import { Button } from 'react-bootstrap';


const openai = new OpenAI({apiKey: localStorage.getItem("MYKEY")?.substring(1, (localStorage.getItem("MYKEY") ?? "").length - 1) ?? undefined, dangerouslyAllowBrowser: true});

async function generateResponse(prompt:string):Promise<string> {
    const response = await openai.chat.completions.create({
        messages: [
            { role: "system", content: "You are a career advisor that uses answers to a career-based questionnaire to determine the best career choices for users." },
            { role: "user", content: "I am a user that took the questionaire and will provide my answers to the questionnaire for you to analyze and make 3 career recommendations." },
            { role: "user", content: prompt }
        ],
        model: "gpt-4-turbo",
    });
    return response.choices[0].message.content ?? "Error generating message!";
}

console.log(generateResponse("Who are you?"));

const questions:string[] = [
    "You prefer a structured and organized work environment with clear guidelines.", 
    "You're more interested in practical, hands-on tasks than theoretical concepts.",
    "You feel comfortable speaking in front of large groups of people.",
    "You are passionate about making a positive impact on society through your work.",
    "You may not prioritize a fast-paced environment with frequent changes.",
    "You might not gravitate naturally towards leadership roles, but you might still be open to them.",
    "Job security and stability seem important to you."
];

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
                    <TrueFalseQuestionBlock question={questions[0]} selectedAnswers={selectedAnswers} index={0}    />
                    <TrueFalseQuestionBlock question={questions[1]} selectedAnswers={selectedAnswers} index={1}    />
                    <TrueFalseQuestionBlock question={questions[2]} selectedAnswers={selectedAnswers} index={2}    />
                    <TrueFalseQuestionBlock question={questions[3]} selectedAnswers={selectedAnswers} index={3}    />
                    <TrueFalseQuestionBlock question={questions[4]} selectedAnswers={selectedAnswers} index={4}    />
                    <TrueFalseQuestionBlock question={questions[5]} selectedAnswers={selectedAnswers} index={5}    />
                    <TrueFalseQuestionBlock question={questions[6]} selectedAnswers={selectedAnswers} index={6}    />
                </div>
                <div className="mb-5">
                    <Button className="ml-90 mt-5" onClick={handleQuizSubmit}>Submit Answers</Button>
                </div>
            </div>
            <Footer />
        </div>
    );

}

export default BasicQuestionsPage;