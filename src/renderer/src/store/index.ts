import { User } from '@renderer/type'
import { atom } from 'jotai'

const routeAtom = atom<string>('HOME')
const userAtom = atom<User | null>(null)

export { routeAtom, userAtom }
