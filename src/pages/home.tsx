import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Button } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CareerOptionInterface } from '../types';
import { CareerOption } from '../components/CareerOption';

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

const detailedQuestionsResults = localStorage.getItem("detailed-questions-paragraph-report") ?? "";
const detailedQuestionsResultsArray = detailedQuestionsResults.split(/\d+\./);
detailedQuestionsResultsArray.shift();
const detailedQuestionsResultsArrayFormatted: CareerOptionInterface[]= [];
detailedQuestionsResultsArray.map((value) => detailedQuestionsResultsArrayFormatted.push(parseCareerOption(value)));

function Home() {
  const [basicQuestionsResultsArrayFormatted, setBasicQuestionsResultsArrayFormatted] = useState<CareerOptionInterface[]>([]);
  useEffect(() => {
    basicQuestionsResultsArrayFormatted.length = 0;
    const basicQuestionsResults = localStorage.getItem("basic-questions-paragraph-report") ?? "";
    const basicQuestionsResultsArray = basicQuestionsResults.split(/\d+\./);
    basicQuestionsResultsArray.shift();
    basicQuestionsResultsArray.map((value) => setBasicQuestionsResultsArrayFormatted((prev) => [...prev, parseCareerOption(value)]));
    // setBasicQuestionsResultsArrayFormatted(basicQuestionsResultsArrayFormatted);
    console.log(basicQuestionsResultsArrayFormatted);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Intentionally left empty to only run once

  return (
    <div className="App">
      <Header />
      <div className="min-vh-100 pt-30">
        { !isSignedIn ? (
        <div>
          <h1 className="pb-3">Career Helpi</h1>
          <div className="w-50 mx-auto">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sed ligula nec ante vehicula dignissim vel nec ex. Sed condimentum metus vitae elit condimentum, sed hendrerit libero sodales. Integer eget arcu id ligula fringilla ullamcorper. Sed in magna nec metus viverra accumsan. Integer in augue a ligula congue eleifend non sed nulla. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla facilisi. Nullam ut lorem sapien. Nunc accumsan purus id tortor gravida, ut consequat quam feugiat. Sed consectetur, lorem vitae condimentum congue, nisl nulla suscipit urna, non fermentum mauris sapien non nisi. Curabitur bibendum ipsum vitae lectus sollicitudin, nec ultrices elit sodales. Nunc id elit eget tortor malesuada malesuada. Sed euismod purus nec justo vulputate, ut lacinia dui dignissim. Etiam in velit nec est scelerisque ultrices. Sed dignissim velit non tincidunt posuere.</p>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="pb-3">Welcome Back!</h1>
          <h2>Here is your latest report from your Basic Questions Assessment:</h2>
          <ol>
            <div className='w-75 mx-auto'>
          {basicQuestionsResultsArrayFormatted.map((option, index) => (
            <li>
              <CareerOption key={index} title={option.title} description={option.description} />
            </li>
          ))}
            </div>
          </ol>
          <div className='pt-25'>
            <h2>Here is your latest report from your Detailed Questions Assessment:</h2>
          </div>
          <ol>
            <div className='w-75 mx-auto'>
          {detailedQuestionsResultsArrayFormatted.map((option, index) => (
            <li>
              <CareerOption key={index} title={option.title} description={option.description} />
            </li>
          ))}
            </div>
          </ol>
          <h2 className="mb--10 pb-3 pt-30">Take the quiz again:</h2>
        </div>
      )}
        <div className="pt-10">
          <Button href="#/basic-questions">Basic Questions</Button>
          <Button href="#/detailed-questions" className="ml-4">Detailed Questions</Button>
        </div>
      </div>
      <div className='pt-25'>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
