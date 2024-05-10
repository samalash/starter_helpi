import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Footer from '../components/Footer';
import { CareerOptionInterface } from '../types';
import { CareerOption } from '../components/CareerOption';
import FadeIn from '../components/FadeIn';

// Check if the user is signed in
const isSignedIn = localStorage.getItem("isSignedIn") === "true";

const parseCareerOption = (optionString: string): CareerOptionInterface => {
  const splitString = optionString.split(':'); // Split the string by ':'
  const title = splitString[0].trim().replace(/\*\*/g, ''); // Extract and clean up the title
  const description = splitString.slice(1).join(':').trim(); // Join the remaining parts and trim whitespace

  return {
    title,
    description
  };
}


function Home({ reload, darkMode}: { reload: boolean, darkMode: boolean}) {
  // Performs a reload to properly refresh the page and get around hash router limitations
  reload && window.location.reload();

  // Location to store the results of both questions assessments
  const [basicQuestionsResultsArrayFormatted, setBasicQuestionsResultsArrayFormatted] = useState<CareerOptionInterface[]>([]);
  const [detailedQuestionsResultsArrayFormatted, setDetailedQuestionsResultsArrayFormatted] = useState<CareerOptionInterface[]>([]);

  useEffect(() => {
    // Clear the arrays to avoid duplicates
    setBasicQuestionsResultsArrayFormatted([]);
    setDetailedQuestionsResultsArrayFormatted([]);

    // Retrieve the results from localStorage and parse them
    const basicQuestionsResults = localStorage.getItem("basic-questions-paragraph-report") ?? "";
    const basicQuestionsResultsArray = basicQuestionsResults.split(/\d+\./);
    basicQuestionsResultsArray.shift();
    basicQuestionsResultsArray.map((value) => setBasicQuestionsResultsArrayFormatted((prev) => [...prev, parseCareerOption(value)]));

    const detailedQuestionsResults = localStorage.getItem("detailed-questions-paragraph-report") ?? "";
    const detailedQuestionsResultsArray = detailedQuestionsResults.split(/\d+\./);
    detailedQuestionsResultsArray.shift();
    detailedQuestionsResultsArray.map((value) => setDetailedQuestionsResultsArrayFormatted((prev) => [...prev, parseCareerOption(value)]));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Intentionally left empty to only run once

  return (
    <>
      <div className="size-full pt-30 pb-20">
        { !isSignedIn ? (
        <div className='pt-56 pb-56'>
          <FadeIn key={`${darkMode}${"HomeTitleAndDescription"}`}>
            <h1 className="pb-3 text-center">Future Fit</h1>
            <div className="w-50 mx-auto">
              <p>This application is specially designed to help you find your next career prospect. Utilizing artificial intelligence, Future Fit takes in your responses and generates a report of what occupations would best suit you, including job listings so you can find your next career quickly. There are two different quiz types. The basic questions page contains true or false questions and can be completed quickly and with minimal effort. The detailed questions page contains multiple choice questions that can lead to a more accurate result.</p>
            </div>
          </FadeIn>
        </div>
      ) : (
        <div className='flex justify-center'>
        <div className="pt-20 w-2/3">
          <FadeIn key={`${darkMode}${"SignedInHomeTitleAndBasicReportText"}`}>
            <h1 className="text-center pb-10">Welcome Back!</h1>
            {basicQuestionsResultsArrayFormatted.length > 1 && <h2 className='text-center w-full'>Here is your latest report from your Basic Questions Assessment:</h2>}
          </FadeIn>
          {basicQuestionsResultsArrayFormatted.length > 1 && <div className="pt-8 pb-8">
            <ol>
              <div>
            {basicQuestionsResultsArrayFormatted.map((option, index) => (
              <li>
                <CareerOption key={index} title={option.title} description={option.description} darkMode={darkMode} />
              </li>
            ))}
              </div>
            </ol>
          {basicQuestionsResultsArrayFormatted.length > 1 && detailedQuestionsResultsArrayFormatted.length > 1 && <div className="py-8"></div>}
          </div>}
          <div className="pb-8">
            <FadeIn key={`${darkMode}${"SignedInDetailedReportText"}`}>
              {detailedQuestionsResultsArrayFormatted.length > 1 && (<h2 className='text-center w-full'>Here is your latest report from your Detailed Questions Assessment:</h2>)}
            </FadeIn>
            <div className='pt-8 pb-8'>
              <ol>
                <div>
              {detailedQuestionsResultsArrayFormatted.map((option, index) => (
                <li>
                  <CareerOption key={index} title={option.title} description={option.description} darkMode={darkMode} />
                </li>
              ))}
                </div>
              </ol>
            </div>
            <FadeIn key={`${darkMode}${"SignedInHomeTakeQuizAgainText"}`}>
              <h2 className="pt-32 text-center">Take the quiz again:</h2>
            </FadeIn>
          </div>
        </div>
        </div>
      )}
      <FadeIn key={`${darkMode}${"SignedInHomeTakeQuizAgainButtons"}`}>
        <div className="pt-2 flex justify-center">
          <Button href="#/basic-questions" variant="dark" style={{backgroundColor: `${darkMode ? "rgb(0,130,192)" : "rgb(0,180,216)"}`, borderStyle: `none`}} className="transition ease-in-out hover:-translate-y-1 hover:scale-125 duration-300 scale-110">Basic Questions</Button>
          <Button href="#/detailed-questions" variant="dark" style={{backgroundColor: `${darkMode ? "rgb(0,130,192)" : "rgb(0,180,216)"}`, borderStyle: `none`}} className="ml-8 transition ease-in-out hover:-translate-y-1 hover:scale-125 duration-300 scale-110">Detailed Questions</Button>
        </div>
      </FadeIn>
      </div>
      <div className='pt-25'>
        <Footer />
      </div>
    </>
  );
}

export default Home;
