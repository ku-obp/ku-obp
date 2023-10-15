"use client";

import { cn } from "@/lib/utils";

interface CellProps {
  squareId: string;
  type?: string;
  color?: string;
  selectable: boolean;
  selected: boolean;
  legalTo: boolean;
  lastMoveFrom: boolean;
  lastMoveTo: boolean;
  isDark: boolean;
  onClick?: () => void;
}

const svg: { [key: string]: string } = {
  "k-b": "/assets/chess-pieces/king-dark.svg",
  "k-w": "/assets/chess-pieces/king-light.svg",
  "q-b": "/assets/chess-pieces/queen-dark.svg",
  "q-w": "/assets/chess-pieces/queen-light.svg",
  "r-b": "/assets/chess-pieces/rook-dark.svg",
  "r-w": "/assets/chess-pieces/rook-light.svg",
  "n-b": "/assets/chess-pieces/knight-dark.svg",
  "n-w": "/assets/chess-pieces/knight-light.svg",
  "b-b": "/assets/chess-pieces/bishop-dark.svg",
  "b-w": "/assets/chess-pieces/bishop-light.svg",
  "p-b": "/assets/chess-pieces/pawn-dark.svg",
  "p-w": "/assets/chess-pieces/pawn-light.svg",
};

export const ChessSquare = ({
  squareId,
  type,
  color,
  isDark,
  selectable,
  selected,
  legalTo,
  lastMoveFrom,
  lastMoveTo,
  onClick,
}: CellProps) => {
  const pointer = legalTo || selectable;
  const capturable = legalTo && type;

  return (
    <div
      id={squareId}
      className={cn(
        "h-[40px] w-[40px] grid place-content-center group relative overflow-clip",
        pointer && "cursor-pointer",
        selected && (isDark ? "bg-selected-dark" : "bg-selected-light"),
        !selected && (isDark ? "bg-chess-dark" : "bg-chess-light"),
        lastMoveFrom && (isDark ? "bg-last-move-dark" : "bg-last-move-light"),
        lastMoveTo && (isDark ? "bg-last-move-dark" : "bg-last-move-light"),
        legalTo && (isDark ? "hover:bg-hover-dark" : "hover:bg-hover-light"),
        capturable && (isDark ? "bg-hover-dark" : "bg-hover-light")
      )}
      onClick={onClick}
    >
      {type && color && (
        <div
          style={{
            backgroundImage: `url(${svg[`${type}-${color}`]})`,
            backgroundSize: "80%",
          }}
          className={cn(
            "chess-piece h-[44px] w-[44px] bg-no-repeat bg-center rounded-full group-hover:bg-transparent",
            capturable && (isDark ? "bg-chess-dark" : "bg-chess-light")
          )}
        />
      )}
      {!type && legalTo && (
        <div
          className={cn(
            "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full group-hover:hidden",
            isDark ? "bg-legal-dark" : "bg-legal-light"
          )}
        />
      )}
    </div>
  );
};
