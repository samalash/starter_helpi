import React, { useState } from 'react';
import '../App.css';
import MultipleChoiceQuestionBlock from '../components/MultipleQuestionBlock';
import Header from '../components/Header';

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
        </div>
    );

}

export default DetailedQuestionsPage;