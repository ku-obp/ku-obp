"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import { SignInput } from "@/components/auth/sign-input";
import { SignButton } from "@/components/auth/sign-button";
import { SignLink } from "@/components/auth/sign-link";
import { SignError } from "@/components/auth/sign-error";

import { validateEmail, validatePW } from "@/lib/validate-input";
import { useInput } from "@/hooks/use-input";

export const LoginForm = () => {
  const email = useInput(validateEmail);
  const pw = useInput(validatePW);
  const [isValid, setIsValid] = useState(true);
  const router = useRouter();

  const submitHandler = async (event: any) => {
    event.preventDefault();
    const valid = email.isValid && pw.isValid;
    setIsValid(valid);

    if (valid) {
      const response = await signIn("credentials", {
        email: email.value,
        password: pw.value,
        redirect: false,
      });
      console.log("Login Failed.");

      if (!response?.error) {
        router.push("/");
        router.refresh(); // refresh the cache
      } else {
        setIsValid(false);
      }
    }
  };

  return (
    <form
      method="post"
      className="flex flex-col items-center w-full mt-8 bg-white text-black rounded-md max-w-[480px] h-fit shadow-md p-5 mx-4"
      onSubmit={submitHandler}
    >
      <h1 className="flex justify-center text-2xl sm:text-3xl font-semibold my-6">
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
