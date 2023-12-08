"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import { closeModal } from "@/redux/features/modal-slice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { v4 as uuidv4 } from "uuid";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const CreateRoomModal = () => {
  // 야매
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [player3, setPlayer3] = useState("");
  const [player4, setPlayer4] = useState("");

  const submitHandler = async () => {
    const value = { player1, player2, player3, player4 };
    await fetch("https://ws.fly.dev/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(value),
    });
  };
  // 야매

  const dispatch = useDispatch<AppDispatch>();
  const state = useAppSelector((state) => state.modalReducer);

  const router = useRouter();
  const params = useParams();

  const isModalOpen = state.isOpen && state.type === "createRoom";
  const { gameName, hostEmail }: any = state.data;

  const aiMode = () => {
    router.push(`/${gameName}/computer`);
    dispatch(closeModal());
  };

  const onlineMode = () => {
    const gameName = params.gameName;
    const roomId = uuidv4();
    const roomKey = `${gameName}:${roomId}`;

    try {
      router.push(`/${gameName}/${roomId}`);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(closeModal());
    }
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Create New Game
          </DialogTitle>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              margin: "0 auto 0 auto",
              gap: "1rem",
            }}
          >
            <div className="flex items-center justify-center gap-2 w-full">
              <Button onClick={aiMode} variant={"primary"} size={"lg"}>
                AI Mode
              </Button>
              <Button onClick={onlineMode} variant={"warning"} size={"lg"}>
                Play Online
              </Button>
            </div>
            {gameName === "two-worlds" && (
              <div className="flex flex-col gap-4 text-black">
                <div className="flex items-center gap-2">
                  <label className="text-xl font-semibold">플레이어 1</label>
                  <input
                    className="w-[360px] h-10 p-2  text-white"
                    onChange={(e) => setPlayer1(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-xl font-semibold">플레이어 2</label>
                  <input
                    className="w-[360px] h-10 p-2 text-white"
                    onChange={(e) => setPlayer2(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-xl font-semibold">플레이어 3</label>
                  <input
                    className="w-[360px] h-10 p-2 text-white"
                    onChange={(e) => setPlayer3(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-xl font-semibold">플레이어 4</label>
                  <input
                    className="w-[360px] h-10 p-2 text-white"
                    onChange={(e) => setPlayer4(e.target.value)}
                  />
                </div>
                <Button variant={"secondary"} onClick={submitHandler}>
                  Submit
                </Button>
              </div>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
