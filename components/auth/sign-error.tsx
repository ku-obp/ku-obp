export const SignError = (props: any) => {
  return (
    <div className="w-full pl-4 mb-5">
      <p className="text-sm text-rose-500 font-medium">{props.message}</p>
    </div>
  );
};
