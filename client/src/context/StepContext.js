import React, { createContext, useState, useContext } from 'react';

//creating a context for login check and exporting it
export const StepContext = createContext();


//this will serve as the AuthContext provider 

// we have to wrap this context in the App.js so that every component in our application can access the states
// defined in it

export function ContextProvider({ children }) {
  const [step1, setStep1] = useState(false);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);
  const [step4, setStep4] = useState(false);
  const [edit, setEdit] = useState(0);

  return (
    // passing the state as well as the setter functions 
    <StepContext.Provider value={{ step1, setStep1, step2, setStep2, step3, setStep3, step4, setStep4, edit, setEdit }}> 
      {children}
    </StepContext.Provider>
  );
}
