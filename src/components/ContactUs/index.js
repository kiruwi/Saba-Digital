import emailjs from "emailjs-com";
import React, { useState } from "react";




import {
  Container,
  Form,
  FormButton,
  FormContent,
  FormH1,
  FormWrap,
  Icon,
  FormInput,
  FormLabel,
} from "./ContactElements";

import{ init } from 'emailjs-com';
init("user_bnH34jSZHmD6H4Xw9PyyF");

// export default function contactUs() {
  const Result =() =>{
    return(
      <p>Your Message has been sent</p>
    )
  }

function ContactUs() {
  const [result, showResult] = useState(false);
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "smpt",
        "72.sabaEmail.19",
        e.target,
        "user_bnH34jSZHmD6H4Xw9PyyF"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
    showResult(true);

  };
setTimeout(() =>{
  showResult(false)
}, 5000)

  return (
    <>
      <Container>
        <FormWrap>
          <Icon src={require("../../images/logo.png").default}></Icon>
          <FormContent>
            <Form onSubmit={sendEmail}>
              <FormH1>
                Got a project you’d like to team up on? Drop your info or reach
                out directly and let’s start the conversation!
              </FormH1>
              <FormInput
                type="text"
                required
                placeholder="Subject"
                name="Subject"
              ></FormInput>
              <FormInput
                type="text"
                required
                placeholder="Name"
                name="Name"
              ></FormInput>
              <FormInput
                type="email"
                required
                placeholder="Email"
                name="Email"
              ></FormInput>
              <FormInput
                type="text"
                required
                placeholder="Message"
                name="Message"
              ></FormInput>
              <FormButton type="submit">Continue</FormButton>
              <FormLabel className='row'>{result ? <Result/> : null}</FormLabel>
            </Form>
          </FormContent>
        </FormWrap>
      </Container>
    </>
  );
}

export default ContactUs;
// }
