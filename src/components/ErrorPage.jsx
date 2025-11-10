import erroricon from "/src/assets/images/icon-error.svg";
import retryicon from "/src/assets/images/icon-retry.svg";
import Button from "./Button";

const ErrorPage = () => {
    function handleRefresh(){
        window.location.reload();
    }
  return (
    <div className='mt-10 flex flex-col items-center justify-center gap-4'>
        <img className="w-10" src={erroricon} alt="error icon" />
        <h1 className="bricolage text-5xl mt-3">Something Went Wrong</h1>
        <p className="w-[400px] text-center text-gray-400">We couldn't connect to the server (API error). Please try again in a few moments</p>
        <div className="w-[100px]">
            <Button onClick={handleRefresh}>
            <img src={retryicon} alt="retry icon" />
            Retry
        </Button>
        </div>

    </div>
  )
}

export default ErrorPage