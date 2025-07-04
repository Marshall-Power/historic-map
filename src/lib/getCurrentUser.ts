import { auth0 } from "@/lib/auth0";
import { getRolesFromToken } from "@/utils/jwt";

export async function getCurrentUserWithRoles() {
    const session = await auth0.getSession()
  if (!session) return null

  const roles = getRolesFromToken(session.tokenSet?.idToken || '')
  return {
    ...session.user,
    roles,
  }
}