import type { Access, FieldAccess } from 'payload'

type User = { role?: 'admin' | 'editor' | 'viewer' }

export const isAdmin: Access = ({ req: { user } }) =>
  (user as User)?.role === 'admin'

export const isAdminOrEditor: Access = ({ req: { user } }) =>
  ['admin', 'editor'].includes((user as User)?.role ?? '')

export const isLoggedIn: Access = ({ req: { user } }) => !!user

export const isAdminOrSelf: Access = ({ req: { user } }) => {
  if ((user as User)?.role === 'admin') return true
  if (user) return { id: { equals: user.id } }
  return false
}

export const isAdminFieldAccess: FieldAccess = ({ req: { user } }) =>
  (user as User)?.role === 'admin'
