import { ChangeEvent, FormEvent, ReactNode } from "react";

export interface ContextChild {
  children: ReactNode;
}
export interface TimerObj {
  year: string;
  month: string;
  dates: string;
  message: string;
}
export interface ContextProvider {
  year: string;
  month: string;
  dates: string;
  message: string;
  handleInp: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
  handleForm: (e: FormEvent<HTMLFormElement>) => void;
  timer:TimerCount;
  timerStart:boolean;
  timerEnd:boolean;
  err:string;
  showMessage:boolean;
}
export interface TimerCount {
  date: number;
  mins: number;
  sec: number;
  hour: number;
}
