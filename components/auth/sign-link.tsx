import { useRouter } from "next/navigation";

export const SignLink = ({ text, link }: { text: string; link?: string }) => {
  const router = useRouter();

  const handleClick = () => {
    if (link) {
      router.push(link);
    } else {
      alert("아직 구현 중입니다.");
    }
  };

  return (
    <div
      className="w-full h-12 flex justify-center items-center text-sm text-black opacity-50 cursor-pointer hover:underline underline-offset-auto"
      onClick={handleClick}
    >
      {text}
    </div>
  );
};
