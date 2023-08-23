import { ReactNode } from "react";

import Typography from "@/components/Typography";
import clsxm from "@/lib/clsxm";

type Props = {
  className?: string;
  children?: ReactNode;
};

export default function TextLine({className, children}: Props) {
  return (
    <div className={clsxm("w-full md:px-2 py-1 bg-white/80 rounded-lg", className)}>
      <Typography variant="p2" color="cyan" weight="medium">
        {children}
      </Typography>
    </div>
  );
}