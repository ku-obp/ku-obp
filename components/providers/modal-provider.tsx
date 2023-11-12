"use client";

import { useEffect, useState } from "react";

import { CreateRoomModal } from "@/components/modals/create-room-modal";
import { GameResultModal } from "@/components/modals/game-result-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateRoomModal />
      <GameResultModal />
    </>
  );
};
