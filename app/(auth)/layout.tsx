const AuthLayout = (props: any) => {
  return (
    <div className="flex justify-center items-center w-full h-full bg-slate-300">
      {props.children}
    </div>
  );
};

export default AuthLayout;
