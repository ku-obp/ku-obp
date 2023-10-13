"use client";

import axios from "axios";
import { useState } from "react";
import { AxiosError } from "axios";

import { SignInput } from "@/components/auth/SignInput";
import { SignButton } from "@/components/auth/SignButton";
import { SignLink } from "@/components/auth/SignLink";
import { SignError } from "@/components/auth/SignError";

import {
  validateEmail,
  validatePW,
  validateConfirmation,
  validateNickname,
} from "@/lib/validate-input";
import { useInput } from "@/hooks/use-input";

const Register = () => {
  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailInputError,
    changeHandler: emailChangeHandler,
    blurHandler: emailBlurHandler,
  } = useInput(validateEmail);
  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameInputError,
    changeHandler: nameChangeHandler,
    blurHandler: nameBlurHandler,
  } = useInput(validateNickname);
  const {
    value: pwValue,
    isValid: pwIsValid,
    hasError: pwInputError,
    changeHandler: pwChangeHandler,
    blurHandler: pwBlurHandler,
  } = useInput(validatePW);
  const {
    isValid: pwConfirmIsValid,
    hasError: pwConfirmError,
    changeHandler: pwConfirmChangeHandler,
    blurHandler: pwConfirmBlurHandler,
  } = useInput((value: string) => validateConfirmation(value, pwValue));
  const [isValid, setIsValid] = useState(true);

  const submitHandler = async (event: any) => {
    event.preventDefault();
    const valid = emailIsValid && pwIsValid && pwConfirmIsValid && nameIsValid;
    setIsValid(valid);

    if (valid) {
      // 상태가 바로 업데이트 되지 않기 때문에 새로운 값을 선언한다.
      const newValue = { email: emailValue, pw: pwValue, name: nameValue };

      try {
        const response = await axios.post("/api/auth/signup", newValue);
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
        onChange={emailChangeHandler}
        onBlur={emailBlurHandler}
        error={emailInputError}
        errorMessage="이메일 형식이 올바르지 않습니다."
      />
      <SignInput
        type="password"
        placeholder="비밀번호 *"
        onChange={pwChangeHandler}
        onBlur={pwBlurHandler}
        error={pwInputError}
        errorMessage="8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요."
      />
      <SignInput
        type="password"
        placeholder="비밀번호 확인 *"
        onChange={pwConfirmChangeHandler}
        onBlur={pwConfirmBlurHandler}
        error={pwConfirmError}
        errorMessage="비밀번호가 일치하지 않습니다."
      />
      <SignInput
        type="text"
        placeholder="닉네임 *"
        onChange={nameChangeHandler}
        onBlur={nameBlurHandler}
        error={nameInputError}
        errorMessage="2~16자의 영문 대/소문자, 숫자를 사용해 주세요."
      />
      {!isValid && <SignError text="입력값을 다시 확인해주세요." />}
      <SignButton type="submit" text="회원가입" />
      <div className="mt-3 w-full flex justify-between">
        <SignLink text="아이디 찾기" />
        <SignLink text="비밀번호 찾기" />
        <SignLink text="로그인" link="/login" />
      </div>
    </form>
  );
};

export default Register;
