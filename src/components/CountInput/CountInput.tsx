import { useCustomHook } from "@/Context/Context";

function CountInput() {
  const {handleInp,handleForm} = useCustomHook();
  return (
    <>
    <h1 className='timer-head'>count down timer</h1>
      <form action="" className='count-down-form' onSubmit={(e) =>  handleForm(e)}>
        <div className="count-inp">
        <input type="number" name="year" id="" placeholder='Enter a Year' onChange={(e) => handleInp(e)}/>
        <input type="number" name="month" id="" placeholder='Enter a Month' onChange={(e) => handleInp(e)}/>
        <input type="number" name="dates" id="date" placeholder='Enter a Day' onChange={(e) => handleInp(e)}/>
        </div>
        {/* <input type="text" name="message" id="" placeholder='Enter a Message for the timer will end'/> */}
        <textarea name="message" id="message" rows={6} onChange={(e) => handleInp(e)} placeholder='Enter a Message for the timer will end'></textarea>
        <button>Start Timer</button>
      </form>
    </>
  )
}

export default CountInput
