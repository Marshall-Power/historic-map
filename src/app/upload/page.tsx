import { PinsForm } from "@/components";
import { getCurrentUserWithRoles } from "@/lib/getCurrentUser";
import { redirect } from "next/navigation";
import { AUTH } from "@/utils";

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
        <h2>Com obtenir la latitud i longitud des de Google Maps</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>
            Obre{" "}
            <a
              href="https://maps.google.com"
              target="_blank"
              className="text-blue-600 underline"
            >
              Google Maps
            </a>
            .
          </li>
          <li>
            Escriu l’adreça que vols buscar (per exemple:{" "}
            <em>Carrer Francesc Mateu, 4, Girona</em>).
          </li>
          <li>
            Fes <strong>clic dret</strong> sobre el punt exacte al mapa (pot ser
            el marcador vermell o qualsevol altre punt).
          </li>
          <li>
            Selecciona l’opció <strong>amb les coordenades</strong> del menú
            contextual.
          </li>
          <li>
            Un cop copiades les coordenades les haurem de separar en un fitxer
            de text per exemple.
            <ul className="list-disc pl-6 mt-2">
              <li>
                El primer número és la <strong>latitud</strong> (ex:{" "}
                <code>41.3933</code>).
              </li>
              <li>
                El segon número és la <strong>longitud</strong> (ex:{" "}
                <code>2.1581</code>).
              </li>
            </ul>
          </li>
          <li>
            Selecciona i copia cada valor per separat per enganxar-lo al
            formulari.
          </li>
          <li>
            Emplena la resta de dades, són importants per a poder fer cerques
            més endavant.
          </li>
        </ol>
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
