export const SignInput = (props: any) => {
  return (
    <div className="w-full mb-5">
      <input
        className="w-full h-12 rounded-lg border-none bg-[#fbfbfb] p-4 text-[#1f1f1f]"
        type={props.type}
        id={props.id}
        name={props.name}
        label={props.label}
        onChange={props.onChange}
        {...(props.value && { value: props.value })}
        onBlur={props.onBlur}
        placeholder={props.placeholder}
      />
      {props.error && (
        <p className="h-fit mt-2 mr-4 mb-0 pl-4 text-sm text-rose-500 font-medium">
          {props.errorMessage}
        </p>
      )}
    </div>
  );
};
