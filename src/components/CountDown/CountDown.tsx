import { useCustomHook } from "@/Context/Context";

function CountDown() {
  const {timerStart,timer,timerEnd,message} = useCustomHook() ;
  if(timerStart === false) return null;
    return (
      <>
       {timer && !timerEnd && (<div className="count-down">
        <h2>REMAINING DAYS</h2>
        <h3>{timer.date} Days, {timer.hour} Hours, {timer.mins} Mins, {timer.sec} Sec,</h3>
        </div> )}
        {timerEnd && (<div className="count-down-end">
          <h5>{message}</h5>
        </div>)}
      </>
    )
};
export default CountDown;