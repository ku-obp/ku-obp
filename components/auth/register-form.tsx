"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { SignInput } from "@/components/auth/sign-input";
import { SignButton } from "@/components/auth/sign-button";
import { SignLink } from "@/components/auth/sign-link";
import { SignError } from "@/components/auth/sign-error";

import { validateEmail, validatePW } from "@/lib/validate-input";
import { validateConfirm, validateNickname } from "@/lib/validate-input";
import { useInput } from "@/hooks/use-input";

export const RegisterForm = () => {
  const email = useInput(validateEmail);
  const name = useInput(validateNickname);
  const pw = useInput(validatePW);
  const confirm = useInput((value: string) => validateConfirm(value, pw.value));
  const [isValid, setIsValid] = useState(true);
  const [isDuplicated, setIsDuplicated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const submitHandler = async (event: any) => {
    event.preventDefault();
    const valid =
      email.isValid && pw.isValid && confirm.isValid && name.isValid;
    setIsValid(valid);
    setIsDuplicated(false);

    if (valid) {
      const newValue = {
        email: email.value,
        password: pw.value,
        name: name.value,
      };
      const response = await axios.post("/api/auth/register", newValue);
      if (response.data.message === "success") {
        router.push("/login");
      } else {
        if (response.data.errorCode === "email")
          setErrorMessage("이미 존재하는 이메일입니다.");
        if (response.data.errorCode === "name")
          setErrorMessage("이미 존재하는 이름입니다.");
        setIsDuplicated(true);
        setIsValid(false);
      }
      // console.log(response.data.message);
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
      <SignInput
        type="password"
        placeholder="비밀번호 확인 *"
        inputState={confirm}
        errorMessage="비밀번호가 일치하지 않습니다."
      />
      <SignInput
        type="text"
        placeholder="닉네임 *"
        inputState={name}
        errorMessage="2~16자의 영문 대/소문자, 숫자를 사용해 주세요."
      />
      {!isValid && <SignError message="입력값을 다시 확인해주세요." />}
      {/* 중복이 발생한 input 바로 아래에 출력하는 건 skip */}
      {isDuplicated && <SignError message={errorMessage} />}
      <SignButton type="submit" text="회원가입" />
      <div className="mt-3 w-full flex justify-between">
        <SignLink text="아이디 찾기" />
        <SignLink text="비밀번호 찾기" />
        <SignLink text="로그인" link="/login" />
      </div>
    </form>
  );
};
