import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function LoginLayout({ children }: Props) {
  return <>{children}</>;
}
