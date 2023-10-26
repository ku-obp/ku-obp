"use client";

import { useEffect, useState } from "react";

import { CreateRoomModal } from "../modals/create-room-modal";

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
    </>
  );
};
