// lib/jwt.ts
export function decodeJwtPayload(token: string): Record<string, any> {
    if (!token) return {}

    const base64Url = token.split('.')[1]
    if (!base64Url) return {}

    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = Buffer.from(base64, 'base64').toString('utf8')
    return JSON.parse(jsonPayload)
}

export function getRolesFromToken(token: string): string[] {
    const payload = decodeJwtPayload(token)
    return payload['https://historic-map.com/claims/roles'] ?? []
}