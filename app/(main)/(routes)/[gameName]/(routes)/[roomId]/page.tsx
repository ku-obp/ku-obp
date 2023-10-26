"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";

import { makeUpper } from "@/lib/utils";

const OnlineRoom = (props: any) => {
  const router = useRouter();
  const params = useParams();
  const gameName = params.gameName;
  const roomId = params.roomId;
  const user = useSession();
  const userEmail = user.data?.user?.email;

  // 2번 렌더링 되는데 이유를 모르곘음.
  useEffect(() => {
    if (!user) {
      return;
    }
    (async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/game/${gameName}/room/enter`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userEmail, roomId }),
          }
        );

        const data = await response.json();
        console.log(data);
        if (data.status === "failed") {
          router.push(`/${gameName}`);
          alert("2");
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [gameName, roomId, userEmail, router]);

  return (
    <div className="h-full w-full flex flex-col gap-8 justify-center items-center">
      <p className="text-3xl lg:text-5xl font-bold text-rose-600">
        Welcome to {makeUpper(props.params.gameName)} Online!
      </p>
    </div>
  );
};

export default OnlineRoom;
