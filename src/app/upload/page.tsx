import { PinsForm } from "@/components";
import { getCurrentUserWithRoles } from "@/lib/getCurrentUser";
import { redirect } from "next/navigation";

export default async function uploadForm() {
  const user = await getCurrentUserWithRoles();
  const isAuthorized = user?.roles.includes("uploader");

  if (!user) {
    return redirect("/api/auth/login?returnTo=/");
  }

  if (!isAuthorized) {
    return (
      <>
        <p>No autoritzat</p>
        <a href="/auth/logout">Entrar</a>
      </>
    );
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div>
          <pre>Hola, {user?.name}</pre>
        </div>
        <PinsForm />
        <a
          className="hover:underline hover:underline-offset-4 flex justify-center"
          href="/auth/logout"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-[24px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
            />
          </svg>

          <span className="align-">Sortir</span>
        </a>
      </main>
    </div>
  );
}
