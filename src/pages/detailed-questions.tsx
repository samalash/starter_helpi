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

const openai = localStorage.getItem("MYKEY") !== null ? new OpenAI({apiKey: localStorage.getItem("MYKEY")?.substring(1, (localStorage.getItem("MYKEY") ?? "").length - 1) ?? undefined, dangerouslyAllowBrowser: true}) : null;

const detailedQuestionsResults = localStorage.getItem("detailed-questions-paragraph-report") ?? "";
const detailedQuestionsResultsArray = detailedQuestionsResults.split(/\d+\./);
detailedQuestionsResultsArray.shift();

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
detailedQuestionsResultsArray.map((value) => detailedQuestionsResultsArrayFormatted.push(parseCareerOption(value)));



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

function DetailedQuestionsPage() {
    const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
    console.log(setSelectedAnswers);
    return (
        <div>
            <div className="pb-3">
            <Header/>
            </div>
            <div>
                <div className="flex-container mw-75 ml-60">
                    <MultipleChoiceQuestionBlock 
                        question="What are your primary interests and hobbies?" 
                        possibleAnswers={["Art and creativity", "Technology and innovation", "Nature and outdoor activities", "Helping others and social activities"]}
                        selectedAnswers={selectedAnswers}
                        index={0}
                    />
                    <MultipleChoiceQuestionBlock 
                        question="Which of the following would you say are your strongest skills or talents?" 
                        possibleAnswers={["Analytical and problem-solving", "Creative and imaginative", "Communication and interpersonal", "Practical and hands-on"]}
                        selectedAnswers={selectedAnswers}
                        index={1}
                    />
                    <MultipleChoiceQuestionBlock 
                        question="What type of work environment do you thrive in?" 
                        possibleAnswers={["Structured and organized", "Dynamic and flexible", "Collaborative and team-oriented", "Independent and autonomous"]}
                        selectedAnswers={selectedAnswers}
                        index={2}
                    />
                    <MultipleChoiceQuestionBlock 
                        question="How do you handle challenges or setbacks in the workplace?" 
                        possibleAnswers={["Analyzing and strategizing", "Thinking creatively and innovatively", "Seeking support from colleagues", "Tackling issues head-on with practical solutions"]}
                        selectedAnswers={selectedAnswers}
                        index={3}
                    />
                    <MultipleChoiceQuestionBlock 
                        question="What are your preferred methods of learning and development?" 
                        possibleAnswers={["Formal education and training programs", "Hands-on experience and trial-and-error", "Mentorship and guidance from others", "Self-directed learning and exploration"]}
                        selectedAnswers={selectedAnswers}
                        index={4}
                    />
                    <MultipleChoiceQuestionBlock 
                        question="How do you prefer to communicate with colleagues or clients?" 
                        possibleAnswers={["Face-to-face meetings and discussions", "Written communication (emails, reports)", "Phone calls or video conferences", "It depends on the situation"]}
                        selectedAnswers={selectedAnswers}
                        index={5}
                    />
                    <MultipleChoiceQuestionBlock 
                        question="What role do you typically take in group settings?" 
                        possibleAnswers={["Leader or coordinator", "Creative thinker or idea generator", "Team player or collaborator", "Observer or contributor as needed"]}
                        selectedAnswers={selectedAnswers} 
                        index={6}
                    />

                </div>
                <div>

                </div>
                <div>

                </div>
            </div>
            <Footer />
        </div>
    );

}

export default DetailedQuestionsPage;