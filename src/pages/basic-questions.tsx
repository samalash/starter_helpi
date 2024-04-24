import React, { useState } from 'react';
import '../App.css';
import TrueFalseQuestionBlock from '../components/TrueFalseQuestionBlock';
import Header from '../components/Header';
import Footer from '../components/Footer';
import OpenAI from "openai";


const openai = new OpenAI({apiKey: localStorage.getItem("MYKEY")?.substring(1, (localStorage.getItem("MYKEY") ?? "").length - 1) ?? undefined, dangerouslyAllowBrowser: true});

async function createChat() {
    return await openai.chat.completions.create({
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: "Who are you?" }
        ],
        model: "gpt-4-turbo",
    });
}

console.log(createChat());

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
                    <TrueFalseQuestionBlock question="You prefer a structured and organized work environment with clear guidelines." selectedAnswers={selectedAnswers} index={0}    />
                    <TrueFalseQuestionBlock question="You're more interested in practical, hands-on tasks than theoretical concepts." selectedAnswers={selectedAnswers} index={1}    />
                    <TrueFalseQuestionBlock question="You feel comfortable speaking in front of large groups of people." selectedAnswers={selectedAnswers} index={2}    />
                    <TrueFalseQuestionBlock question="You are passionate about making a positive impact on society through your work." selectedAnswers={selectedAnswers} index={3}    />
                    <TrueFalseQuestionBlock question="You may not prioritize a fast-paced environment with frequent changes." selectedAnswers={selectedAnswers} index={4}    />
                    <TrueFalseQuestionBlock question="You might not gravitate naturally towards leadership roles, but you might still be open to them." selectedAnswers={selectedAnswers} index={5}    />
                    <TrueFalseQuestionBlock question="Job security and stability seem important to you." selectedAnswers={selectedAnswers} index={6}    />
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

export default BasicQuestionsPage;