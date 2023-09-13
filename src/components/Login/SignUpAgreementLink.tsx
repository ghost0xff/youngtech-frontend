import { Link } from "@mui/material";

type Props = {
  text: string;
  href: string;
};

export default function SignUpAgreementLink({ text, href }: Props) {
  return (
    <>
      <Link href={href} underline="hover" color="secondary" sx={{ p: 0 }}>
        {text}
      </Link>
    </>
  );
}
