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
  "k-b": "assets/images/king-dark.svg",
  "k-w": "assets/images/king-light.svg",
  "q-b": "assets/images/queen-dark.svg",
  "q-w": "assets/images/queen-light.svg",
  "r-b": "assets/images/rook-dark.svg",
  "r-w": "assets/images/rook-light.svg",
  "n-b": "assets/images/knight-dark.svg",
  "n-w": "assets/images/knight-light.svg",
  "b-b": "assets/images/bishop-dark.svg",
  "b-w": "assets/images/bishop-light.svg",
  "p-b": "assets/images/pawn-dark.svg",
  "p-w": "assets/images/pawn-light.svg",
};

export const Square = ({
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
        "h-[100px] w-[100px] grid place-content-center group relative overflow-clip",
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
            "chess-piece h-[110px] w-[110px] bg-no-repeat bg-center rounded-full group-hover:bg-transparent",
            capturable && (isDark ? "bg-chess-dark" : "bg-chess-light")
          )}
        />
      )}
      {!type && legalTo && (
        <div
          className={cn(
            "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full group-hover:hidden",
            isDark ? "bg-legal-dark" : "bg-legal-light"
          )}
        />
      )}
    </div>
  );
};
