import { User } from '@renderer/type'
import { atom } from 'jotai'

const userAtom = atom<User | null>(null)

export { userAtom }
