const AuthLayout = (props: any) => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      {props.children}
    </div>
  );
};

export default AuthLayout;
