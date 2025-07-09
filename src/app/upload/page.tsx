import PinForm from "@/components/PinsForm";
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
        <PinForm />
        <a
          className="hover:underline hover:underline-offset-4"
          href="/auth/logout"
        >
          Sortir
        </a>
      </main>
    </div>
  );
}
