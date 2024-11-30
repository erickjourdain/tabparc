import { User } from '@apptypes/index'
import { Alerte } from '@renderer/type'
import { atom } from 'jotai'

const userAtom = atom<User | null>(null)
const alertAtom = atom<Alerte | null>(null)
const drawerAtom = atom<boolean>(false)

export { alertAtom, drawerAtom, userAtom }
