import { Login } from "@/icons";

const Footer = () => {
  return (
    <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      <a
        className="hover:underline hover:underline-offset-4 flex justify-center"
        href="/auth/login?returnTo=/upload"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Login className="mr-1 w-[24px]" />
        <span>Login</span>
      </a>
    </footer>
  );
};

export default Footer;
