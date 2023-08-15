import React from "react";

interface FormContactProps extends React.FormHTMLAttributes<HTMLFormElement> {}

export default function FormContact({ children, ...props }: FormContactProps) {
  return <form {...props}>{children}</form>;
}
