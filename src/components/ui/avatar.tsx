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

export default function Avatar({ name, size = 32 }: AvatarProps) {
  return (
    <div css={style}>
      <Image
        src={`https://ui-avatars.com/api/?name=${name}&font-size=0.4&background=random`}
        width={size}
        height={size}
        alt="avatar"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
