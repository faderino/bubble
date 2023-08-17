import theme from "@/styles/theme";
import { css } from "@emotion/react";
import Image from "next/image";

const style = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  aspectRatio: 1,
  overflow: "hidden",
  borderRadius: theme.border.full,
});

interface AvatarProps {
  name: string;
  size?: number;
}

export default function Avatar({ name, size = 40 }: AvatarProps) {
  return (
    <div css={style}>
      <Image
        src={`${process.env.NEXT_PUBLIC_AVATAR}?name=${name}&size=${size}&font-size=0.4&background=random`}
        width={size}
        height={size}
        alt="avatar"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
