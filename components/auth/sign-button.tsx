import React from "react";

export const SignButton = (props: any) => {
  return (
    <button
      className="w-full h-12 text-base bg-[#9681eb] text-white bordenr-none px-6 py-2 rounded-md cursor-pointer shadow-sm font-medium hover:opacity-80 focus:outline-none disabled:bg-[#ccc] disabled:border-[#ccc] disabled:text-[#666666] disabled:cursor-not-allowed"
      type={props.type || "submit"}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.text}
    </button>
  );
};
