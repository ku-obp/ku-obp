import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const AuthLayout = async (props: any) => {
  const session = await getServerSession();
  if (session) {
    redirect("/");
  }

  return (
    <div
      style={{
        // https://pxhere.com/en/photo/1396599
        backgroundImage: "url('/assets/images/auth-background.jpg')",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="flex justify-center items-center w-full h-full bg-[#E3E5E8] dark:bg-[#313338]"
    >
      {props.children}
    </div>
  );
};

export default AuthLayout;
