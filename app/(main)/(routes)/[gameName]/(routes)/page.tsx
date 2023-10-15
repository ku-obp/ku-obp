import { makeUpper } from "@/lib/utils";

const GameServer = (props: any) => {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <p className="text-3xl lg:text-5xl font-bold text-indigo-500">
        Welcome to {makeUpper(props.params.gameName)} Online!
      </p>
    </div>
  );
};

export default GameServer;
