import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import OpenAI from "openai";
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { CareerOptionInterface } from '../types';
import { CareerOptionQuizPages } from '../components/CareerOptionQuizPages';
import { ProgressBar, Alert } from 'react-bootstrap';
import MultipleChoiceQuestionCard from '../components/MultipleChoiceQuestionCard';
import FadeIn from '../components/FadeIn';

const openai = localStorage.getItem("MYKEY") !== null ? new OpenAI({apiKey: localStorage.getItem("MYKEY")?.substring(1, (localStorage.getItem("MYKEY") ?? "").length - 1) ?? undefined, dangerouslyAllowBrowser: true}) : null;
const gptModel:string = "gpt-4o";
let openaiKeyValid:boolean = false;

async function testResponse():Promise<void> {
    if (!openai || localStorage.getItem("MYKEY") === null) {
        openaiKeyValid = false;
        console.log("OpenAI API key is invalid by openai check.");
        return;
    }
    try {await openai?.chat.completions.create({
        messages: [
            { role: "user", content: "ping" }
        ],
        model: gptModel,
        max_tokens: 5
    });
    } catch (error) {
        openaiKeyValid = false;
        console.log("OpenAI API key is invalid.");
        return;
    }
    openaiKeyValid = true;
    console.log("OpenAI API key is valid.");
}

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
        model: gptModel,
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

const possibleAnswers:string[][] = [
    ["Art and creativity", "Technology and innovation", "Nature and outdoor activities", "Helping others and social activities"],
    ["Analytical and problem-solving", "Creative and imaginative", "Communication and interpersonal", "Practical and hands-on"],
    ["Structured and organized", "Dynamic and flexible", "Collaborative and team-oriented", "Independent and autonomous"],
    ["Analyzing and strategizing", "Thinking creatively and innovatively", "Seeking support from colleagues", "Tackling issues head-on with practical solutions"],
    ["Formal education and training programs", "Hands-on experience and trial-and-error", "Mentorship and guidance from others", "Self-directed learning and exploration"],
    ["Face-to-face meetings and discussions", "Written communication (emails, reports)", "Phone calls or video conferences", "It depends on the situation"],
    ["Leader or coordinator", "Creative thinker or idea generator", "Team player or collaborator", "Observer or contributor as needed"]
];

function DetailedQuestionsPage({setReload, darkMode}: {setReload: (value: boolean) => void, darkMode: boolean}) {
    const [selectedAnswers, setSelectedAnswers] = useState<string[]>(Array(questions.length).fill(""));
    const [processing, setProcessing] = useState<boolean>(false);
    const [resultCreated, setResultCreated] = useState<boolean>(false);
    const [showKeyErrorMessage, setShowKeyErrorMessage] = useState<boolean>(false);
    const [showCompletionAlert, setShowCompletionAlert] = useState<boolean>(false);
    const [alertDismissed, setAlertDismissed] = useState<boolean>(false);

    useEffect(() => {
        // Check if all questions have been answered
        if (!selectedAnswers.includes("") && !showCompletionAlert) {
            setShowCompletionAlert(true);
        } else if (selectedAnswers.includes("") && showCompletionAlert) {
            setShowCompletionAlert(false);
        }
    }, [selectedAnswers, showCompletionAlert]);

    const handleAnswerChange = (index:number, answer:string) => {
        setSelectedAnswers((prev) => prev.map((value, i) => i === index ? answer : value));
    }
    
    const handleQuizSubmit = () =>{
        if (!selectedAnswers.includes("")){
            setProcessing(true);
            testResponse().then(() => {
                if (!openaiKeyValid) {
                    setShowKeyErrorMessage(true);
                    setProcessing(false);
                } else {
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
                                    detailedQuestionsResultsArrayFormatted = [];
                                    detailedQuestionsResultsArray.map((value) => detailedQuestionsResultsArrayFormatted.push(parseCareerOption(value)));
                                    localStorage.setItem("isSignedIn", "true");
                                    setReload(true);
                                    setAlertDismissed(true);
                                    setShowCompletionAlert(false);
                                }
                                setProcessing(false);
                            });
                        } else {
                            setProcessing(false);
                        }
                    });
                }
            });
        }
    }
    
    return (
        <>
            <div className="flex-container mw-75 mx-auto mb-24">
                <MultipleChoiceQuestionCard questions={questions} possibleAnswers={possibleAnswers} handleAnswerChange={handleAnswerChange} selectedAnswers={selectedAnswers} darkMode={darkMode} />
                <p className="text-center">
                    <FadeIn key={`${darkMode}${"DetailedProgressBar"}`}>
                        <ProgressBar className="w-1/2 mx-auto -mt-8" animated now={selectedAnswers.filter(answer => answer !== "").length / questions.length * 100} />
                    </FadeIn>    
                    <FadeIn key={`${darkMode}${"DetailedSubmitButton"}`}>
                        <Button className={`mt-3 mb-1 border-0 shadow-xl rounded-xl ${darkMode ? "bg-gradient-to-r from-[#0082C0] to-blue-700" : "bg-gradient-to-r from-[#00B4D8] to-[#0082C0]"} transition ease-in-out hover:-translate-y-1 hover:scale-125 duration-300 scale-110`} onClick={handleQuizSubmit} disabled={processing || selectedAnswers.includes("")}>
                            {processing ? 
                            <Spinner></Spinner> :
                            "Submit Answers"}
                        </Button>
                    </FadeIn>
                </p>
                {showKeyErrorMessage &&
                <div className="flex-container">
                    <p className="mx-auto my-auto">
                        <b>Error:</b> Please enter a valid OpenAI API key in the footer below and resubmit the quiz.
                    </p>
                </div>
                }
                <Alert className="w-1/2 mx-auto" variant="info" show={showCompletionAlert && !alertDismissed} onClose={() => {
                    setAlertDismissed(true);
                    setShowCompletionAlert(false);
                }} dismissible>
                    <Alert.Heading>All questions completed!</Alert.Heading>
                    <p>You have completed all the questions. Click on "Submit Answers" to proceed.</p>
                </Alert>
                {resultCreated &&
                <div className="mb-6">
                    {detailedQuestionsResultsArrayFormatted.map((option, index) => (
                        <CareerOptionQuizPages key={index} title={option.title} description={option.description} darkMode={darkMode} />
                    ))
                    }
                </div>
                }
            </div>
            <Footer />
        </>
    );

}

export default DetailedQuestionsPage;