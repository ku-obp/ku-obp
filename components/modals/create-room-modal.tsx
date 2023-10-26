"use client";

import axios from "axios";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import { closeModal } from "@/redux/features/modal-slice";
import { AppDispatch, useAppSelector } from "@/redux/store";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const CreateRoomModal = () => {
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

  const onlineMode = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/game/${gameName}/room/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ gameName, hostEmail }),
        }
      );
      const data = await response.json();
      if (data.message === "Room Created Successfully") {
        router.push(`/${gameName}/${data.roomStatus.roomId}`);
      } else {
        alert("Failed to Create Room");
      }
      console.log(data);
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
          <div className="flex items-center justify-center gap-2 w-full">
            <Button onClick={aiMode} variant={"primary"} size={"lg"}>
              AI Mode
            </Button>
            <Button onClick={onlineMode} variant={"warning"} size={"lg"}>
              Play Online
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
