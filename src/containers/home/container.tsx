import { PropsWithChildren } from "react";

export function Container(props: PropsWithChildren) {
  const { children } = props;
  return (
    <div className="w-[100dvw] min-h-[100dvh]">
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-black pointer-events-none"></div>
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-black pointer-events-none"></div>
      <div className="relative w-full">
        {children}
      </div>
    </div>
  );

}