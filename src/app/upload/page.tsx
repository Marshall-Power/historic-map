import { PinsForm } from "@/components";
import { getCurrentUserWithRoles } from "@/lib/getCurrentUser";
import { redirect } from "next/navigation";
import { AUTH, FORM_STEPS } from "@/utils";

export default async function uploadForm() {
  const user = await getCurrentUserWithRoles();
  const isAuthorized = user?.roles.includes("uploader");

  if (!user) {
    return redirect("/api/auth/login?returnTo=/");
  }

  if (!isAuthorized) {
    return (
      <>
        <p>{AUTH.NO_AUTH}</p>
        <a href="/auth/logout">{AUTH.LOGOUT}</a>
      </>
    );
  }

  return (
    <main className="flex flex-col md:flex-row justify-center align-middle min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] row-start-2">
      <div className="prose max-w-none self-center">
        <h2>{FORM_STEPS.TITLE}</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>
            {FORM_STEPS.OPEN}
            <a
              href="https://www.google.es/maps?hl=ca"
              target="_blank"
              className="text-blue-600 underline"
            >
              {FORM_STEPS.GOOGLE_MAPS}
            </a>
          </li>
          <li>
            {FORM_STEPS.WRITE_ADDRESS}
            <em>{FORM_STEPS.ADDRESS}</em>
          </li>
          <li>
            {FORM_STEPS.DO} <strong>{FORM_STEPS.RIGHT_CLICK}</strong>
            {FORM_STEPS.EXACT_MARKER}
          </li>
          <li>
            {FORM_STEPS.SELECT_COORD}
            <strong>
              <code>{FORM_STEPS.COORDS}</code>
            </strong>
            {FORM_STEPS.FROM_MENU}
          </li>
        </ol>
        <p className="mt-4">{FORM_STEPS.FORMAT}</p>
        <ul className="list-disc pl-6">
          <li>
            {FORM_STEPS.FIRST_NUM} <strong>{FORM_STEPS.LAT}</strong> (ex:{" "}
            <code>41.3933</code>).
          </li>
          <li>
            {FORM_STEPS.SECOND_NUM}
            <strong>{FORM_STEPS.LONG}</strong> (ex: <code>2.1581</code>).
          </li>
        </ul>
        <p className="mt-4">{FORM_STEPS.COPY_COORD}</p>
        <p className="mt-4">{FORM_STEPS.FILL_REST}</p>
      </div>

      <div className="flex flex-col self-center">
        <span className="mb-2">
          {AUTH.HI}, {user?.name}
        </span>
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

          <span className="align-">{AUTH.LOGOUT}</span>
        </a>
      </div>
    </main>
  );
}
