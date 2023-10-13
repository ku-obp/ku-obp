"use client";

import axios from "axios";
import { useState } from "react";
import { AxiosError } from "axios";

import { SignInput } from "@/components/auth/SignInput";
import { SignButton } from "@/components/auth/SignButton";
import { SignLink } from "@/components/auth/SignLink";

import { validateEmail, validatePW } from "@/lib/validate-input";
import { useInput } from "@/hooks/use-input";
import { SignError } from "@/components/auth/SignError";

// CSRF 토큰

const Login = () => {
  const {
    value: emailValue,
    isValid: emailIsValid,
    changeHandler: emailChangeHandler,
  } = useInput(validateEmail);
  const {
    value: pwValue,
    isValid: pwIsValid,
    changeHandler: pwChangeHandler,
  } = useInput(validatePW);
  const [isValid, setIsValid] = useState(true);

  const submitHandler = async (event: any) => {
    event.preventDefault();
    const valid = emailIsValid && pwIsValid;
    setIsValid(valid);

    if (valid) {
      // 상태가 바로 업데이트 되지 않기 때문에 새로운 값을 선언한다.
      const newValue = { email: emailValue, pw: pwValue };

      try {
        const response = await axios.post("/api/auth/login", newValue);
        console.log(response.data);
      } catch (error) {
        const axiosError = error as AxiosError;
        console.error(axiosError.response?.data || axiosError.message);
        setIsValid(false);
      }
    }
  };

  return (
    <form
      method="post"
      className="flex flex-col items-center w-full mt-8 bg-white rounded-md max-w-[480px] h-fit shadow-md p-5 mx-4"
      onSubmit={submitHandler}
    >
      <h1 className="flex justify-center text-black text-2xl sm:text-3xl font-semibold my-6">
        Open Board Game
      </h1>
      <SignInput
        type="text"
        label="Email"
        name="Email"
        placeholder="이메일"
        onChange={emailChangeHandler}
      />
      <SignInput
        type="password"
        label="PW"
        name="PW"
        placeholder="비밀번호"
        onChange={pwChangeHandler}
      />
      {!isValid && (
        <SignError text="아이디 또는 비밀번호를 다시 입력해주세요." />
      )}
      <SignButton type="submit" text="로그인" />
      <div className="mt-3 w-full flex justify-between">
        <SignLink text="아이디 찾기" />
        <SignLink text="비밀번호 찾기" />
        <SignLink text="회원가입" link="/register" />
      </div>
    </form>
  );
};

export default Login;
