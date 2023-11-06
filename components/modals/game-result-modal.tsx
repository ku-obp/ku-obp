"use client";

import axios from "axios";
import { useEffect } from "react";
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

export const GameResultModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const state = useAppSelector((state) => state.modalReducer);

  const router = useRouter();
  const params = useParams();

  const isModalOpen = state.isOpen && state.type === "gameResult";
  const { result }: any = state.data;

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            {result === "win" && "승리"}
            {result === "lose" && "패배"}
            {result === "draw" && "무승부"}
          </DialogTitle>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex items-center justify-center gap-2 w-full">
            <Button
              onClick={() => {
                dispatch(closeModal());
                router.push("/chess");
              }}
              variant={result === "win" ? "primary" : "warning"}
              size={"lg"}
            >
              확인
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
