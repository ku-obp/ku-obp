import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const AuthLayout = async (props: any) => {
  const session = await getServerSession();
  if (session) {
    redirect("/");
  }

  return (
    <div className="flex justify-center items-center w-full h-full bg-slate-300">
      {props.children}
    </div>
  );
};

export default AuthLayout;
