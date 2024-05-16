import React, { useState } from 'react';
import { MDBFooter } from 'mdb-react-ui-kit';
import { Button, Form } from 'react-bootstrap';

let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}

//Footer component
function Footer(){
  const [key, setKey] = useState<string>(keyData); //for api key input

  //sets the local storage item to the api key the user inputed
  function handleSubmit() {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    window.location.reload(); //when making a mistake and changing the key again, I found that I have to reload the whole site before openai refreshes what it has stores for the local storage variable
  }

  //whenever there's a change it'll store the api key in a local state called key but it won't be set in the local storage until the user clicks the submit button
  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }

    return (
      <MDBFooter bgColor='light' className='text-left text-lg-left'>
        <div className='text-left p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', textAlign: 'left' }}>
        <Form>
        <Form.Label>API Key:</Form.Label>
        <Form.Control type="password" placeholder="Insert API Key Here" onChange={changeKey}></Form.Control>
        <br></br>
        <Button className="Submit-Button" onClick={handleSubmit}>Submit</Button>
      </Form>
          <div>
            <a href='#/'>
              Home
            </a>
          </div>
          <div>
            <a href='#/basic-questions'>
              Basic Questions
            </a>
          </div>
          <div>
            <a href='#/detailed-questions'>
              Detailed Questions
            </a>
          </div>
          &copy; {new Date().getFullYear()} Future Fit
        </div>
        
      </MDBFooter>
    );
}

export default Footer;