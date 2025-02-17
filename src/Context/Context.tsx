"use client";
import { ContextProvider,ContextChild,TimerObj } from "@/utils/type";
import { ChangeEvent, createContext, FormEvent, useContext, useState, useEffect } from "react";


// Create context
let CountDownContext = createContext<ContextProvider | null>(null);

function Context({ children }: ContextChild) {
  const [timer, setTimer] = useState({ date: 0, mins: 0, sec: 0, hour: 0 });
  const [timerObj, setTimerObj] = useState<TimerObj>({ year: "", month: "", dates: "", message: "" });
  const [targetDate, setTargetDate] = useState<Date | null>(null); // Store the selected target date
  const [timerStart,setTimerStart] = useState<boolean>(false);
  const [timerEnd,setTimerEnd] = useState<boolean>(false);
  const [err,setError] = useState<string>("");
  const [showMessage,setShowMessage] = useState<boolean>(false)
  //Month list
  const monthList:string[] = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"];
  // Destructure timerObj
  const { year, month, dates, message } = timerObj;

  // Handle multiple inputs
  const handleInp = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTimerObj((prev) => ({ ...prev, [name]: value }));
  };
  // Handle form submission
  const handleForm = (e: FormEvent<HTMLFormElement>) => {
    //remove the reload
    e.preventDefault();
    // Check for valid numbers
    const regexNum = /^\d+$/;

    // Current Date
    const currentDate = new Date();

    // Validate input
    if (!year.match(regexNum) || !month.match(regexNum) || !dates.match(regexNum) || message === "") {
      setShowMessage(true)
      setError("Please enter valid numbers for Year, Month, and Date, and a message.");
      setTimeout(() => {
        setShowMessage(false)
      }, 3000);
      return;
    }
    // if month is greater than 12
    if(+month>12){
      setShowMessage(true)
      setError("Enter a Month only (1-12)")
      setTimeout(() => {
        setShowMessage(false)
      }, 3000);
      return;
    };
    
    // Convert user input to numbers
    const inputYear = +year;
    const inputMonth = +month - 1; // Convert month to 0-based (1 = Jan -> 0, 9 = Sep -> 8)
    const inputDate = +dates;

    // find  Month
    const monthFind = monthList[inputMonth] ;
    
    // Create selected date
    const selectedDate = new Date(inputYear, inputMonth, inputDate);

    //if date is greater than 30 or 31
    const lastDateOfMonth = new Date(inputYear, inputMonth+1,0).getDate();
    if(inputDate > lastDateOfMonth){
      setShowMessage(true)
      setError(`Please Enter a valid date of ${monthFind}`);
      setTimeout(() => {
        setShowMessage(false)
      }, 3000);
      return;
    };
    // Check if the selected date is in the future
    if (selectedDate <= currentDate) {
      setShowMessage(true)
      setError("Selected year, month, or day has already passed. Please choose a future date.");
      setTimeout(() => {
        setShowMessage(false)
      }, 3000);
      return;
    }

    // Set the target date for countdown
    setTargetDate(selectedDate);
  };

  //Count Down Function
  const countDownFunc = (selectDate:Date,intervalTimer:NodeJS.Timeout | number) => {
    const nowDate = new Date().getTime(); //get the millisec of current time
      const targetTime = selectDate.getTime(); //get the millisec of selected time
      const timeDiff = targetTime - nowDate;

      //if millisec less than 0
      if (timeDiff <= 0) {
        clearInterval(intervalTimer); // Stop the countdown
        alert(message); // Show message
        setTimer({ date: 0, hour: 0, mins: 0, sec: 0 });
        setTimerEnd(true);
        return;
      }

      // Calculate days, hours, minutes, and seconds remaining
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      // Update the timer
      setTimer({ date: days, hour: hours, mins: minutes, sec: seconds });
      setTimerStart(true);
  }

  // useEffect to handle countdown
  useEffect(() => {
    if (!targetDate) return;

    // Set interval for countdown
    const intervalId = setInterval(() => {
      countDownFunc(targetDate,intervalId);
    }, 1000);

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, [targetDate, message]);

  return (
    <>
      <CountDownContext.Provider
        value={{ handleForm, handleInp, year, month, dates, message, timer,timerStart, timerEnd,err,showMessage}}
      >
        {children}
      </CountDownContext.Provider>
    </>
  );
}

export default Context;
export const useCustomHook = () => {
  const countContext = useContext(CountDownContext);
  if (!countContext) {
    throw new Error(
      "useCustomHook must be used within a CountDownContext.Provider"
    );
  };
  return countContext
};
