export const SignInput = (props: any) => {
  return (
    <div className="w-full mb-5">
      <input
        className="w-full h-12 rounded-lg border-none bg-[#fbfbfb] p-4 text-[#1f1f1f]"
        type={props.type}
        id={props.id}
        name={props.name}
        label={props.label}
        onChange={props.inputState?.changeHandler}
        {...(props.value && { value: props.value })}
        onBlur={props.inputState?.blurHandler}
        placeholder={props.placeholder}
      />
      {props.inputState?.hasError && (
        <p className="h-fit mt-2 mr-4 mb-0 text-sm text-rose-500 opacity-90">
          {props.errorMessage}
        </p>
      )}
    </div>
  );
};
