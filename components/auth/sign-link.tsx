export const SignLink = ({ text, link }: { text: string; link?: string }) => {
  return (
    <a
      className="w-full h-12 flex justify-center items-center text-sm text-black opacity-50 cursor-pointer hover:underline underline-offset-auto"
      href={link}
    >
      {text}
    </a>
  );
};
