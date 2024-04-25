import React, { useState } from 'react';
import '../App.css';
import MultipleChoiceQuestionBlock from '../components/MultipleQuestionBlock';
import Header from '../components/Header';
import Footer from '../components/Footer';
import OpenAI from "openai";
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { CareerOptionInterface } from '../types';
import { CareerOptionQuizPages } from '../components/CareerOptionQuizPages';
import { ProgressBar } from 'react-bootstrap';

const openai = localStorage.getItem("MYKEY") !== null ? new OpenAI({apiKey: localStorage.getItem("MYKEY")?.substring(1, (localStorage.getItem("MYKEY") ?? "").length - 1) ?? undefined, dangerouslyAllowBrowser: true}) : null;

let detailedQuestionsResults = "";
let detailedQuestionsResultsArray:string[] = [];


function parseCareerOption(optionString: string): CareerOptionInterface {
  const splitString = optionString.split(':'); // Split the string by ':'
  const title = splitString[0].trim().replace(/\*\*/g, ''); // Extract and clean up the title
  const description = splitString.slice(1).join(':').trim(); // Join the remaining parts and trim whitespace

  return {
    title,
    description
  };
}

let detailedQuestionsResultsArrayFormatted: CareerOptionInterface[]= [];




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

const questions:string[] = [
    "What are your primary interests and hobbies?", 
    "Which of the following would you say are your strongest skills or talents?",
    "What type of work environment do you thrive in?",
    "How do you handle challenges or setbacks in the workplace?",
    "What are your preferred methods of learning and development?",
    "How do you prefer to communicate with colleagues or clients?",
    "What role do you typically take in group settings?"
];

function DetailedQuestionsPage() {
    const [selectedAnswers, setSelectedAnswers] = useState<string[]>(Array(questions.length).fill(""));
    console.log(setSelectedAnswers);
    const [processing, setProcessing] = useState<boolean>(false);
    const [resultCreated, setResultCreated] = useState<boolean>(false);
    
    const handleQuizSubmit = () =>{
        if (!selectedAnswers.includes("")){
            setProcessing(true);
            const questionsAndAnswersString:string = questions.map((question:string, index:number):string => index + 1 + ". " + question + "\n" + selectedAnswers[index]).join("\n\n");
            console.log(questionsAndAnswersString);
            localStorage.setItem("detailed-questions-answers", questionsAndAnswersString);
            const listPromptString:string = "Here are the answers to the career-based questionnaire:\n\n" + questionsAndAnswersString + "\n\nBased on these answers, as a numbered list with the most recommended career as the first one and without any explanations or other punctuation, what are the top 3 career recommendations for this user?";
            console.log(listPromptString);
            generateResponse(listPromptString).then((listPromptResponse) => {
                console.log(listPromptResponse);
                if (listPromptResponse !== "Error generating message!"){
                    localStorage.setItem("detailed-questions-list-jobs", listPromptResponse);
                    const reportPromptString:string = "Here are the answers to the career-based questionnaire:\n\n" + questionsAndAnswersString + "\n\nBased on these answers, you have already provided these 3 career recommendations with the most recommended career as the first one:\n\n" + localStorage.getItem("detailed-questions-list-jobs") + "\n\nFor each career recommendation, surround it with two asterisks on each side and follow it with a \":\" symbol (For example: \"1. **Technician**:\") and then provide a one paragraph explanation, based on the questionnaire answers, of why this career is a good fit for the user.";
                    generateResponse(reportPromptString).then((reportPromptResponse) => {
                        console.log(reportPromptResponse);
                        if (reportPromptResponse !== "Error generating message!"){
                            localStorage.setItem("detailed-questions-paragraph-report", reportPromptResponse);
                            setResultCreated(true);
                            detailedQuestionsResults = localStorage.getItem("detailed-questions-paragraph-report") ?? "";
                            detailedQuestionsResultsArray = detailedQuestionsResults.split(/\d+\./);
                            detailedQuestionsResultsArray.shift();
                            detailedQuestionsResultsArray.map((value) => detailedQuestionsResultsArrayFormatted.push(parseCareerOption(value)));
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
    
    return (
        <div>
            <div className="pb-3">
            <Header/>
            </div>
            <div>
                <div className="flex-container mw-75 ml-60">
                    <MultipleChoiceQuestionBlock 
                        question={questions[0]}
                        possibleAnswers={["Art and creativity", "Technology and innovation", "Nature and outdoor activities", "Helping others and social activities"]}
                        selectedAnswers={selectedAnswers}
                        index={0}
                    />
                    <MultipleChoiceQuestionBlock 
                        question={questions[1]}
                        possibleAnswers={["Analytical and problem-solving", "Creative and imaginative", "Communication and interpersonal", "Practical and hands-on"]}
                        selectedAnswers={selectedAnswers}
                        index={1}
                    />
                    <MultipleChoiceQuestionBlock 
                        question={questions[2]}
                        possibleAnswers={["Structured and organized", "Dynamic and flexible", "Collaborative and team-oriented", "Independent and autonomous"]}
                        selectedAnswers={selectedAnswers}
                        index={2}
                    />
                    <MultipleChoiceQuestionBlock 
                        question={questions[3]}
                        possibleAnswers={["Analyzing and strategizing", "Thinking creatively and innovatively", "Seeking support from colleagues", "Tackling issues head-on with practical solutions"]}
                        selectedAnswers={selectedAnswers}
                        index={3}
                    />
                    <MultipleChoiceQuestionBlock 
                        question={questions[4]}
                        possibleAnswers={["Formal education and training programs", "Hands-on experience and trial-and-error", "Mentorship and guidance from others", "Self-directed learning and exploration"]}
                        selectedAnswers={selectedAnswers}
                        index={4}
                    />
                    <MultipleChoiceQuestionBlock 
                        question={questions[5]}
                        possibleAnswers={["Face-to-face meetings and discussions", "Written communication (emails, reports)", "Phone calls or video conferences", "It depends on the situation"]}
                        selectedAnswers={selectedAnswers}
                        index={5}
                    />
                    <MultipleChoiceQuestionBlock 
                        question={questions[6]}
                        possibleAnswers={["Leader or coordinator", "Creative thinker or idea generator", "Team player or collaborator", "Observer or contributor as needed"]}
                        selectedAnswers={selectedAnswers} 
                        index={6}
                    />

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
                        {detailedQuestionsResultsArrayFormatted.map((option, index) => (
                            <CareerOptionQuizPages key={index} title={option.title} description={option.description} />
                        ))
                        }
                    </p> :
                    <p></p>
                    }
                </div>
            </div>
            <ProgressBar animated now={42} />
            <Footer />
        </div>
    );

}

export default DetailedQuestionsPage;