import React, { useState } from 'react';
import '../App.css';
import TrueFalseQuestionBlock from '../components/TrueFalseQuestionBlock';
import Header from '../components/Header';
import Footer from '../components/Footer';
import OpenAI from "openai";
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { CareerOptionInterface } from '../types';
import { CareerOptionQuizPages } from '../components/CareerOptionQuizPages';


const openai = localStorage.getItem("MYKEY") !== null ? new OpenAI({apiKey: localStorage.getItem("MYKEY")?.substring(1, (localStorage.getItem("MYKEY") ?? "").length - 1) ?? undefined, dangerouslyAllowBrowser: true}) : null;

const basicQuestionsResults = localStorage.getItem("basic-questions-paragraph-report") ?? "";
const basicQuestionsResultsArray = basicQuestionsResults.split(/\d+\./);
basicQuestionsResultsArray.shift();

function parseCareerOption(optionString: string): CareerOptionInterface {
  const splitString = optionString.split(':'); // Split the string by ':'
  const title = splitString[0].trim().replace(/\*\*/g, ''); // Extract and clean up the title
  const description = splitString.slice(1).join(':').trim(); // Join the remaining parts and trim whitespace

  return {
    title,
    description
  };
}

let basicQuestionsResultsArrayFormatted: CareerOptionInterface[]= [];
basicQuestionsResultsArray.map((value) => basicQuestionsResultsArrayFormatted.push(parseCareerOption(value)));



async function generateResponse(prompt:string):Promise<string> {
    const response = await openai?.chat.completions.create({
        messages: [
            { role: "system", content: "You are a career advisor that uses answers to a career-based questionnaire to determine the best career choices for users." },
            { role: "user", content: "I am a user that took the questionaire and will provide my answers to the questionnaire for you to analyze and make 3 career recommendations." },
            { role: "user", content: prompt }
        ],
        model: "gpt-4-turbo",
    });
    return response?.choices[0].message.content ?? "Error generating message!";
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
    const [selectedAnswers, setSelectedAnswers] = useState<string[]>(Array(questions.length).fill(""));
    const [processing, setProcessing] = useState<boolean>(false);
    const [resultCreated, setResultCreated] = useState<boolean>(false);

    const handleQuizSubmit = () =>{
        if (!selectedAnswers.includes("")){
            setProcessing(true);
            const questionsAndAnswersString:string = questions.map((question:string, index:number):string => index + 1 + ". " + question + "\n" + selectedAnswers[index]).join("\n\n");
            console.log(questionsAndAnswersString);
            localStorage.setItem("basic-questions-answers", questionsAndAnswersString);
            const listPromptString:string = "Here are the answers to the career-based questionnaire:\n\n" + questionsAndAnswersString + "\n\nBased on these answers, as a numbered list with the most recommended career as the first one and without any explanations or other punctuation, what are the top 3 career recommendations for this user?";
            console.log(listPromptString);
            generateResponse(listPromptString).then((listPromptResponse) => {
                console.log(listPromptResponse);
                if (listPromptResponse !== "Error generating message!"){
                    localStorage.setItem("basic-questions-list-jobs", listPromptResponse);
                    const reportPromptString:string = "Here are the answers to the career-based questionnaire:\n\n" + questionsAndAnswersString + "\n\nBased on these answers, you have already provided these 3 career recommendations with the most recommended career as the first one:\n\n" + localStorage.getItem("basic-questions-list-jobs") + "\n\nFor each career recommendation, provide a one paragraph explanation, based on the questionnaire answers, of why this career is a good fit for the user.";
                    generateResponse(reportPromptString).then((reportPromptResponse) => {
                        console.log(reportPromptResponse);
                        if (reportPromptResponse !== "Error generating message!"){
                            localStorage.setItem("basic-questions-paragraph-report", reportPromptResponse);
                            setResultCreated(true);
                            localStorage.setItem("isSignedIn", "true");
                        }
                        setProcessing(false);
                    });
                } else {
                    setProcessing(false);
                }
            });



        }
    }

    console.log(setSelectedAnswers);
    return (
        <div>
            <div className="pb-3">
            <Header/>
            </div>
            <div>
                <div className="flex-container mw-75 mx-auto">
                    <TrueFalseQuestionBlock question={questions[0]} selectedAnswers={selectedAnswers} index={0}    />
                    <TrueFalseQuestionBlock question={questions[1]} selectedAnswers={selectedAnswers} index={1}    />
                    <TrueFalseQuestionBlock question={questions[2]} selectedAnswers={selectedAnswers} index={2}    />
                    <TrueFalseQuestionBlock question={questions[3]} selectedAnswers={selectedAnswers} index={3}    />
                    <TrueFalseQuestionBlock question={questions[4]} selectedAnswers={selectedAnswers} index={4}    />
                    <TrueFalseQuestionBlock question={questions[5]} selectedAnswers={selectedAnswers} index={5}    />
                    <TrueFalseQuestionBlock question={questions[6]} selectedAnswers={selectedAnswers} index={6}    />
                </div>
                <div className="mb-5">
                    <p className="text-center">
                        <Button className="mt-5" onClick={handleQuizSubmit} disabled={processing}>
                            {processing ? 
                            <Spinner></Spinner> :
                            "Submit Answers"}
                        </Button>
                    </p>
                    {resultCreated ?
                    <p className="mw-75 mx-auto border border-primary border-3 rounded p-3">
                        {basicQuestionsResultsArrayFormatted.map((option, index) => (
                            <CareerOptionQuizPages key={index} title={option.title} description={option.description} />
                        ))
                        }
                    </p> :
                    <p></p>
                    }
                </div>
            </div>
            <Footer />
        </div>
    );

}

export default BasicQuestionsPage;