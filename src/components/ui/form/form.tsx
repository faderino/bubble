import React from "react";
import styles from "./form.styles";
import styled from "@emotion/styled";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {}

function Form({ children, ...props }: FormProps) {
  return <form {...props}>{children}</form>;
}

interface FormItemProps {
  children?: React.ReactNode;
  prepend?: React.ReactNode;
  append?: React.ReactNode;
  error?: string;
}

function FormItem({ children, prepend, append, error }: FormItemProps) {
  return (
    <div css={styles.formItem}>
      <div css={styles.formItemPrepend}>{prepend}</div>
      <div css={{ position: "relative", width: "100%" }}>
        {children}
        <p css={styles.error}>{error}</p>
      </div>
      <div css={styles.formItemPrepend}>{append}</div>
    </div>
  );
}

const FormItemGroup = styled.div({
  marginBottom: "2.5rem",
});

export { Form, FormItem, FormItemGroup };
