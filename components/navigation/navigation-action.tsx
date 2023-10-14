"use client";

import { Home } from "lucide-react";
import { useRouter } from "next/navigation"; // next/navigation

import { ActionTooltip } from "@/components/action-tooltip";
import { useState, useEffect } from "react";

export const NavigationAction = () => {
  const [isClicked, setIsClicked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isClicked) {
      router.push("/chess");
    }
  }, [isClicked, router]);

  return (
    <div>
      <ActionTooltip side="right" align="center" label="Return Home">
        <button
          // redirect 함수가 비동기적으로 동작하기 때문에
          // 직접적으로 onClick 이벤트 핸들러에서 호출하면 문제가 발생할 수 있다.
          // React에서 onClick 같은 이벤트 핸들러는 동기적으로 처리된다.
          // onClick 내부의 코드가 완전히 실행된 후에 React는 해당 이벤트를 청소한다.
          // Next.js의 라우팅 메소드(router.push(), router.replace() 등)는
          // Promise 기반 API로 해당 메소드들은 비동기적으로 작동한다.
          onClick={() => setIsClicked(true)}
          className="group flex items-center"
        >
          <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-emerald-500">
            <Home className="group-hover:text-white transition text-emerald-500 size={25}" />
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
};
