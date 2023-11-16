import React from "react";
import { WithChildren } from "../common/react-helpers";

interface ErrorDisplayProps extends WithChildren {
  retryFunc: () => void;
}

export const ErrorDisplay = ({ children, retryFunc }: ErrorDisplayProps) => {
  return (
    <div>
      {children}
      <button onClick={retryFunc}>Try Again</button>
    </div>
  );
};
