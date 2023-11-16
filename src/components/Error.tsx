import React from "react";
import { WithChildren } from "../common/react-helpers";
import { Button } from "./ui/Button";

interface ErrorDisplayProps extends WithChildren {
  retryFunc: () => void;
}

export const ErrorDisplay = ({ children, retryFunc }: ErrorDisplayProps) => {
  return (
    <div>
      <p>{children}</p>
      <Button onClick={retryFunc}>Try Again</Button>
    </div>
  );
};
