import { Login } from "@/icons";

const Header = () => {
  return (
    <header className="w-full row-start-3 flex gap-[24px] flex-wrap items-center justify-end">
      <a
        className="hover:underline hover:underline-offset-4 flex justify-center"
        href="/auth/login?returnTo=/upload"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Login className="mr-1 w-[24px]" />
        <span>Login</span>
      </a>
    </header>
  );
};

export default Header;
