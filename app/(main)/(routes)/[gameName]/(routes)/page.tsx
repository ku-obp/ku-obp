"use client";

import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";

import { AppDispatch } from "@/redux/store";
import { openModal } from "@/redux/features/modal-slice";

import { Button } from "@/components/ui/button";
import { makeUpper } from "@/lib/utils";

const GameServer = (props: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();
  const user = useSession();
  const gameName = params.gameName;
  const hostEmail = user.data?.user?.email;

  return (
    <div className="h-full w-full flex flex-col gap-8 justify-center items-center">
      <p className="text-3xl lg:text-5xl font-bold text-rose-600">
        Welcome to {makeUpper(props.params.gameName)} Online!
      </p>
      <Button
        onClick={() =>
          dispatch(
            openModal({
              type: "createRoom",
              data: { gameName, hostEmail },
            })
          )
        }
        variant={"warning"}
        size={"lg"}
      >
        New Game
      </Button>
    </div>
  );
};

export default GameServer;
