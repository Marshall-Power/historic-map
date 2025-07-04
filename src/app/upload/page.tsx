import PinForm from "@/components/PinsForm";
import { getCurrentUserWithRoles } from "@/lib/getCurrentUser";

export default async function uploadForm() {
  const user = await getCurrentUserWithRoles();
  const isAuthorized = user?.roles.includes("uploader");

  if (!user) {
    return (
      <>
        <div>Not authenticated</div>
        <a href="/auth/login?returnTo=/upload">Login</a>
        <a href="/auth/logout">Logout</a>
      </>
    );
  }

  if (!isAuthorized) {
    return (
      <>
        <div>Not authorized</div>
        <a href="/auth/login?returnTo=/upload">Login</a>
        <a href="/auth/logout">Logout</a>
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
        <a href="/auth/logout">Logout</a>
      </main>
    </div>
  );
}
