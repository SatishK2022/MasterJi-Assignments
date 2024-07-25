import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/logo.png";

function OtpForm() {
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  // always checking if opt is correct or not
  // useEffect(() => {
  //     if (otp.length < 4 ) return;

  //     const submitOtp = otp.join("");
  //     if (submitOtp.length === 4 && submitOtp === "1234") {
  //         setOtpVerified(true);
  //         setOtpError(false);
  //     } else {
  //         setOtpError(true);
  //         setOtpVerified(false);
  //     }
  // }, [otp])

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];

    // allow only one input
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // move to next input if current field is filled
    if (value && index < otp.length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeydown = (e, index) => {
    if (e.key == "Backspace" && index > 0 && !otp[index] && otp[index - 1]) {
      // move focus to the previous input field
      inputRefs.current[index - 1].focus();
    }

    // reset the border style and otpError and otpVerified state
    if (e.key == "Backspace" && otp[index]) {
      setOtpError(false);
      setOtpVerified(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (otp.length < 4) return;

    const submitOtp = otp.join("");
    console.log(submitOtp);
    if (submitOtp.length === 4 && submitOtp === "1234") {
      setOtpVerified(true);
      setOtpError(false);
    } else {
      setOtpError(true);
      setOtpVerified(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center flex-col gap-10 bg-[#3e73af] p-2 relative">
      <h1 className="font-bold text-5xl text-white">Chai aur Code</h1>
      <form
        onSubmit={onSubmit}
        className="w-full md:w-1/2 lg:w-2/5 flex items-center gap-5 flex-col bg-[#f8f6f7] shadow-lg py-5 px-10 rounded-xl"
      >
        <h2 className="text-2xl font-bold">Mobile Phone Verification</h2>
        <p className="text-base text-[#BFBFBF] text-center">
          Enter the 4-digit verification code that was sent to your phone number
        </p>
        <div className="w-3/4 flex flex-col gap-5">
          <div className="flex justify-center gap-4 w-full">
            {otp &&
              otp.map((value, index) => (
                <input
                  key={index}
                  type="text"
                  value={value}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  className={`${
                    otpError
                      ? "border-2 border-[#ea2d5a]"
                      : otpVerified
                      ? "border-2 border-[#23CF9B]"
                      : "border-2 border-[#dae3ef]"
                  } w-16 p-4 rounded bg-[#dae3ef] text-3xl font-semibold text-center outline-none`}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeydown(e, index)}
                />
              ))}
          </div>
          <button
            type="submit"
            className={`${
              otpError
                ? "bg-[#ea2d5a] cursor-not-allowed"
                : otpVerified
                ? "bg-[#23CF9B] hover:bg-[#1eb084] cursor-pointer"
                : "bg-[#112D4E] cursor-not-allowed"
            } w-full text-white px-4 py-3 rounded text-base transition-all ease-in-out duration-200 shadow-md`}
          >
            {otpVerified
              ? "Verified"
              : otpError
              ? "Verification Failed"
              : "Verify Account"}
          </button>
          <p
            className={`${
              otpVerified ? "invisible" : "block"
            } text-center text-[#BFBFBF]`}
          >
            Didn't receive code?{" "}
            <a href="#" className="text-[#112D4E] hover:underline">
              Resend
            </a>
          </p>
        </div>
      </form>
      <a
        href="https://chaicode.com/"
        target="_blank"
        className="w-24 absolute bottom-5 right-5"
      >
        <img src={logo} alt="Logo" className="rounded-md" />
      </a>
    </div>
  );
}

export default OtpForm;
