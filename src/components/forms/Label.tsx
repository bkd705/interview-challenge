import React from "react";
import { WithChildren } from "../../lib/react-helpers";

interface LabelProps
  extends WithChildren,
    React.DetailedHTMLProps<
      React.LabelHTMLAttributes<HTMLLabelElement>,
      HTMLLabelElement
    > {}

export const Label = ({ children, ...props }: LabelProps) => {
  return (
    <label
      {...props}
      className="block text-sm font-medium leading-6 text-gray-900"
    >
      {children}
    </label>
  );
};
