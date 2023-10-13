"use client";

import axios from "axios";
import { useState } from "react";
import { AxiosError } from "axios";

import { SignInput } from "@/components/auth/SignInput";
import { SignButton } from "@/components/auth/SignButton";
import { SignLink } from "@/components/auth/SignLink";
import { SignError } from "@/components/auth/SignError";

import { validateEmail, validatePW } from "@/lib/validate-input";
import { useInput } from "@/hooks/use-input";

const Login = () => {
  const email = useInput(validateEmail);
  const pw = useInput(validatePW);
  const [isValid, setIsValid] = useState(true);

  const submitHandler = async (event: any) => {
    event.preventDefault();
    const valid = email.isValid && pw.isValid;
    setIsValid(valid);

    if (valid) {
      const newValue = { email: email.value, pw: pw.value };
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
        placeholder="이메일 *"
        inputState={email}
        errorMessage="이메일 형식이 올바르지 않습니다."
      />
      <SignInput
        type="password"
        placeholder="비밀번호 *"
        inputState={pw}
        errorMessage="8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요."
      />
      {!isValid && (
        <SignError message="아이디 또는 비밀번호를 다시 입력해주세요." />
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
