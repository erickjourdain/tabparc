/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AdminImport } from './routes/admin'
import { Route as IndexImport } from './routes/index'
import { Route as NouveauIndexImport } from './routes/nouveau/index'
import { Route as DemandeIndexImport } from './routes/demande/index'
import { Route as AdminIndexImport } from './routes/admin/index'
import { Route as AdminUsersIndexImport } from './routes/admin/users/index'
import { Route as AdminLieuxIndexImport } from './routes/admin/lieux/index'
import { Route as AdminGrandeursIndexImport } from './routes/admin/grandeurs/index'
import { Route as AdminFamilleInstrumentsIndexImport } from './routes/admin/famille-instruments/index'
import { Route as AdminContactsIndexImport } from './routes/admin/contacts/index'
import { Route as AdminAccreditationsIndexImport } from './routes/admin/accreditations/index'
import { Route as AdminUsersNewImport } from './routes/admin/users/new'
import { Route as AdminUsersIdImport } from './routes/admin/users/$id'
import { Route as AdminLieuxNewImport } from './routes/admin/lieux/new'
import { Route as AdminLieuxIdImport } from './routes/admin/lieux/$id'
import { Route as AdminGrandeursNewImport } from './routes/admin/grandeurs/new'
import { Route as AdminGrandeursIdImport } from './routes/admin/grandeurs/$id'
import { Route as AdminFamilleInstrumentsNewImport } from './routes/admin/famille-instruments/new'
import { Route as AdminFamilleInstrumentsIdImport } from './routes/admin/famille-instruments/$id'
import { Route as AdminContactsNewImport } from './routes/admin/contacts/new'
import { Route as AdminContactsIdImport } from './routes/admin/contacts/$id'
import { Route as AdminAccreditationsNewImport } from './routes/admin/accreditations/new'
import { Route as AdminAccreditationsIdImport } from './routes/admin/accreditations/$id'

// Create/Update Routes

const AdminRoute = AdminImport.update({
  path: '/admin',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const NouveauIndexRoute = NouveauIndexImport.update({
  path: '/nouveau/',
  getParentRoute: () => rootRoute,
} as any)

const DemandeIndexRoute = DemandeIndexImport.update({
  path: '/demande/',
  getParentRoute: () => rootRoute,
} as any)

const AdminIndexRoute = AdminIndexImport.update({
  path: '/',
  getParentRoute: () => AdminRoute,
} as any)

const AdminUsersIndexRoute = AdminUsersIndexImport.update({
  path: '/users/',
  getParentRoute: () => AdminRoute,
} as any)

const AdminLieuxIndexRoute = AdminLieuxIndexImport.update({
  path: '/lieux/',
  getParentRoute: () => AdminRoute,
} as any)

const AdminGrandeursIndexRoute = AdminGrandeursIndexImport.update({
  path: '/grandeurs/',
  getParentRoute: () => AdminRoute,
} as any)

const AdminFamilleInstrumentsIndexRoute =
  AdminFamilleInstrumentsIndexImport.update({
    path: '/famille-instruments/',
    getParentRoute: () => AdminRoute,
  } as any)

const AdminContactsIndexRoute = AdminContactsIndexImport.update({
  path: '/contacts/',
  getParentRoute: () => AdminRoute,
} as any)

const AdminAccreditationsIndexRoute = AdminAccreditationsIndexImport.update({
  path: '/accreditations/',
  getParentRoute: () => AdminRoute,
} as any)

const AdminUsersNewRoute = AdminUsersNewImport.update({
  path: '/users/new',
  getParentRoute: () => AdminRoute,
} as any)

const AdminUsersIdRoute = AdminUsersIdImport.update({
  path: '/users/$id',
  getParentRoute: () => AdminRoute,
} as any)

const AdminLieuxNewRoute = AdminLieuxNewImport.update({
  path: '/lieux/new',
  getParentRoute: () => AdminRoute,
} as any)

const AdminLieuxIdRoute = AdminLieuxIdImport.update({
  path: '/lieux/$id',
  getParentRoute: () => AdminRoute,
} as any)

const AdminGrandeursNewRoute = AdminGrandeursNewImport.update({
  path: '/grandeurs/new',
  getParentRoute: () => AdminRoute,
} as any)

const AdminGrandeursIdRoute = AdminGrandeursIdImport.update({
  path: '/grandeurs/$id',
  getParentRoute: () => AdminRoute,
} as any)

const AdminFamilleInstrumentsNewRoute = AdminFamilleInstrumentsNewImport.update(
  {
    path: '/famille-instruments/new',
    getParentRoute: () => AdminRoute,
  } as any,
)

const AdminFamilleInstrumentsIdRoute = AdminFamilleInstrumentsIdImport.update({
  path: '/famille-instruments/$id',
  getParentRoute: () => AdminRoute,
} as any)

const AdminContactsNewRoute = AdminContactsNewImport.update({
  path: '/contacts/new',
  getParentRoute: () => AdminRoute,
} as any)

const AdminContactsIdRoute = AdminContactsIdImport.update({
  path: '/contacts/$id',
  getParentRoute: () => AdminRoute,
} as any)

const AdminAccreditationsNewRoute = AdminAccreditationsNewImport.update({
  path: '/accreditations/new',
  getParentRoute: () => AdminRoute,
} as any)

const AdminAccreditationsIdRoute = AdminAccreditationsIdImport.update({
  path: '/accreditations/$id',
  getParentRoute: () => AdminRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/admin': {
      id: '/admin'
      path: '/admin'
      fullPath: '/admin'
      preLoaderRoute: typeof AdminImport
      parentRoute: typeof rootRoute
    }
    '/admin/': {
      id: '/admin/'
      path: '/'
      fullPath: '/admin/'
      preLoaderRoute: typeof AdminIndexImport
      parentRoute: typeof AdminImport
    }
    '/demande/': {
      id: '/demande/'
      path: '/demande'
      fullPath: '/demande'
      preLoaderRoute: typeof DemandeIndexImport
      parentRoute: typeof rootRoute
    }
    '/nouveau/': {
      id: '/nouveau/'
      path: '/nouveau'
      fullPath: '/nouveau'
      preLoaderRoute: typeof NouveauIndexImport
      parentRoute: typeof rootRoute
    }
    '/admin/accreditations/$id': {
      id: '/admin/accreditations/$id'
      path: '/accreditations/$id'
      fullPath: '/admin/accreditations/$id'
      preLoaderRoute: typeof AdminAccreditationsIdImport
      parentRoute: typeof AdminImport
    }
    '/admin/accreditations/new': {
      id: '/admin/accreditations/new'
      path: '/accreditations/new'
      fullPath: '/admin/accreditations/new'
      preLoaderRoute: typeof AdminAccreditationsNewImport
      parentRoute: typeof AdminImport
    }
    '/admin/contacts/$id': {
      id: '/admin/contacts/$id'
      path: '/contacts/$id'
      fullPath: '/admin/contacts/$id'
      preLoaderRoute: typeof AdminContactsIdImport
      parentRoute: typeof AdminImport
    }
    '/admin/contacts/new': {
      id: '/admin/contacts/new'
      path: '/contacts/new'
      fullPath: '/admin/contacts/new'
      preLoaderRoute: typeof AdminContactsNewImport
      parentRoute: typeof AdminImport
    }
    '/admin/famille-instruments/$id': {
      id: '/admin/famille-instruments/$id'
      path: '/famille-instruments/$id'
      fullPath: '/admin/famille-instruments/$id'
      preLoaderRoute: typeof AdminFamilleInstrumentsIdImport
      parentRoute: typeof AdminImport
    }
    '/admin/famille-instruments/new': {
      id: '/admin/famille-instruments/new'
      path: '/famille-instruments/new'
      fullPath: '/admin/famille-instruments/new'
      preLoaderRoute: typeof AdminFamilleInstrumentsNewImport
      parentRoute: typeof AdminImport
    }
    '/admin/grandeurs/$id': {
      id: '/admin/grandeurs/$id'
      path: '/grandeurs/$id'
      fullPath: '/admin/grandeurs/$id'
      preLoaderRoute: typeof AdminGrandeursIdImport
      parentRoute: typeof AdminImport
    }
    '/admin/grandeurs/new': {
      id: '/admin/grandeurs/new'
      path: '/grandeurs/new'
      fullPath: '/admin/grandeurs/new'
      preLoaderRoute: typeof AdminGrandeursNewImport
      parentRoute: typeof AdminImport
    }
    '/admin/lieux/$id': {
      id: '/admin/lieux/$id'
      path: '/lieux/$id'
      fullPath: '/admin/lieux/$id'
      preLoaderRoute: typeof AdminLieuxIdImport
      parentRoute: typeof AdminImport
    }
    '/admin/lieux/new': {
      id: '/admin/lieux/new'
      path: '/lieux/new'
      fullPath: '/admin/lieux/new'
      preLoaderRoute: typeof AdminLieuxNewImport
      parentRoute: typeof AdminImport
    }
    '/admin/users/$id': {
      id: '/admin/users/$id'
      path: '/users/$id'
      fullPath: '/admin/users/$id'
      preLoaderRoute: typeof AdminUsersIdImport
      parentRoute: typeof AdminImport
    }
    '/admin/users/new': {
      id: '/admin/users/new'
      path: '/users/new'
      fullPath: '/admin/users/new'
      preLoaderRoute: typeof AdminUsersNewImport
      parentRoute: typeof AdminImport
    }
    '/admin/accreditations/': {
      id: '/admin/accreditations/'
      path: '/accreditations'
      fullPath: '/admin/accreditations'
      preLoaderRoute: typeof AdminAccreditationsIndexImport
      parentRoute: typeof AdminImport
    }
    '/admin/contacts/': {
      id: '/admin/contacts/'
      path: '/contacts'
      fullPath: '/admin/contacts'
      preLoaderRoute: typeof AdminContactsIndexImport
      parentRoute: typeof AdminImport
    }
    '/admin/famille-instruments/': {
      id: '/admin/famille-instruments/'
      path: '/famille-instruments'
      fullPath: '/admin/famille-instruments'
      preLoaderRoute: typeof AdminFamilleInstrumentsIndexImport
      parentRoute: typeof AdminImport
    }
    '/admin/grandeurs/': {
      id: '/admin/grandeurs/'
      path: '/grandeurs'
      fullPath: '/admin/grandeurs'
      preLoaderRoute: typeof AdminGrandeursIndexImport
      parentRoute: typeof AdminImport
    }
    '/admin/lieux/': {
      id: '/admin/lieux/'
      path: '/lieux'
      fullPath: '/admin/lieux'
      preLoaderRoute: typeof AdminLieuxIndexImport
      parentRoute: typeof AdminImport
    }
    '/admin/users/': {
      id: '/admin/users/'
      path: '/users'
      fullPath: '/admin/users'
      preLoaderRoute: typeof AdminUsersIndexImport
      parentRoute: typeof AdminImport
    }
  }
}

// Create and export the route tree

interface AdminRouteChildren {
  AdminIndexRoute: typeof AdminIndexRoute
  AdminAccreditationsIdRoute: typeof AdminAccreditationsIdRoute
  AdminAccreditationsNewRoute: typeof AdminAccreditationsNewRoute
  AdminContactsIdRoute: typeof AdminContactsIdRoute
  AdminContactsNewRoute: typeof AdminContactsNewRoute
  AdminFamilleInstrumentsIdRoute: typeof AdminFamilleInstrumentsIdRoute
  AdminFamilleInstrumentsNewRoute: typeof AdminFamilleInstrumentsNewRoute
  AdminGrandeursIdRoute: typeof AdminGrandeursIdRoute
  AdminGrandeursNewRoute: typeof AdminGrandeursNewRoute
  AdminLieuxIdRoute: typeof AdminLieuxIdRoute
  AdminLieuxNewRoute: typeof AdminLieuxNewRoute
  AdminUsersIdRoute: typeof AdminUsersIdRoute
  AdminUsersNewRoute: typeof AdminUsersNewRoute
  AdminAccreditationsIndexRoute: typeof AdminAccreditationsIndexRoute
  AdminContactsIndexRoute: typeof AdminContactsIndexRoute
  AdminFamilleInstrumentsIndexRoute: typeof AdminFamilleInstrumentsIndexRoute
  AdminGrandeursIndexRoute: typeof AdminGrandeursIndexRoute
  AdminLieuxIndexRoute: typeof AdminLieuxIndexRoute
  AdminUsersIndexRoute: typeof AdminUsersIndexRoute
}

const AdminRouteChildren: AdminRouteChildren = {
  AdminIndexRoute: AdminIndexRoute,
  AdminAccreditationsIdRoute: AdminAccreditationsIdRoute,
  AdminAccreditationsNewRoute: AdminAccreditationsNewRoute,
  AdminContactsIdRoute: AdminContactsIdRoute,
  AdminContactsNewRoute: AdminContactsNewRoute,
  AdminFamilleInstrumentsIdRoute: AdminFamilleInstrumentsIdRoute,
  AdminFamilleInstrumentsNewRoute: AdminFamilleInstrumentsNewRoute,
  AdminGrandeursIdRoute: AdminGrandeursIdRoute,
  AdminGrandeursNewRoute: AdminGrandeursNewRoute,
  AdminLieuxIdRoute: AdminLieuxIdRoute,
  AdminLieuxNewRoute: AdminLieuxNewRoute,
  AdminUsersIdRoute: AdminUsersIdRoute,
  AdminUsersNewRoute: AdminUsersNewRoute,
  AdminAccreditationsIndexRoute: AdminAccreditationsIndexRoute,
  AdminContactsIndexRoute: AdminContactsIndexRoute,
  AdminFamilleInstrumentsIndexRoute: AdminFamilleInstrumentsIndexRoute,
  AdminGrandeursIndexRoute: AdminGrandeursIndexRoute,
  AdminLieuxIndexRoute: AdminLieuxIndexRoute,
  AdminUsersIndexRoute: AdminUsersIndexRoute,
}

const AdminRouteWithChildren = AdminRoute._addFileChildren(AdminRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/admin': typeof AdminRouteWithChildren
  '/admin/': typeof AdminIndexRoute
  '/demande': typeof DemandeIndexRoute
  '/nouveau': typeof NouveauIndexRoute
  '/admin/accreditations/$id': typeof AdminAccreditationsIdRoute
  '/admin/accreditations/new': typeof AdminAccreditationsNewRoute
  '/admin/contacts/$id': typeof AdminContactsIdRoute
  '/admin/contacts/new': typeof AdminContactsNewRoute
  '/admin/famille-instruments/$id': typeof AdminFamilleInstrumentsIdRoute
  '/admin/famille-instruments/new': typeof AdminFamilleInstrumentsNewRoute
  '/admin/grandeurs/$id': typeof AdminGrandeursIdRoute
  '/admin/grandeurs/new': typeof AdminGrandeursNewRoute
  '/admin/lieux/$id': typeof AdminLieuxIdRoute
  '/admin/lieux/new': typeof AdminLieuxNewRoute
  '/admin/users/$id': typeof AdminUsersIdRoute
  '/admin/users/new': typeof AdminUsersNewRoute
  '/admin/accreditations': typeof AdminAccreditationsIndexRoute
  '/admin/contacts': typeof AdminContactsIndexRoute
  '/admin/famille-instruments': typeof AdminFamilleInstrumentsIndexRoute
  '/admin/grandeurs': typeof AdminGrandeursIndexRoute
  '/admin/lieux': typeof AdminLieuxIndexRoute
  '/admin/users': typeof AdminUsersIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/admin': typeof AdminIndexRoute
  '/demande': typeof DemandeIndexRoute
  '/nouveau': typeof NouveauIndexRoute
  '/admin/accreditations/$id': typeof AdminAccreditationsIdRoute
  '/admin/accreditations/new': typeof AdminAccreditationsNewRoute
  '/admin/contacts/$id': typeof AdminContactsIdRoute
  '/admin/contacts/new': typeof AdminContactsNewRoute
  '/admin/famille-instruments/$id': typeof AdminFamilleInstrumentsIdRoute
  '/admin/famille-instruments/new': typeof AdminFamilleInstrumentsNewRoute
  '/admin/grandeurs/$id': typeof AdminGrandeursIdRoute
  '/admin/grandeurs/new': typeof AdminGrandeursNewRoute
  '/admin/lieux/$id': typeof AdminLieuxIdRoute
  '/admin/lieux/new': typeof AdminLieuxNewRoute
  '/admin/users/$id': typeof AdminUsersIdRoute
  '/admin/users/new': typeof AdminUsersNewRoute
  '/admin/accreditations': typeof AdminAccreditationsIndexRoute
  '/admin/contacts': typeof AdminContactsIndexRoute
  '/admin/famille-instruments': typeof AdminFamilleInstrumentsIndexRoute
  '/admin/grandeurs': typeof AdminGrandeursIndexRoute
  '/admin/lieux': typeof AdminLieuxIndexRoute
  '/admin/users': typeof AdminUsersIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/admin': typeof AdminRouteWithChildren
  '/admin/': typeof AdminIndexRoute
  '/demande/': typeof DemandeIndexRoute
  '/nouveau/': typeof NouveauIndexRoute
  '/admin/accreditations/$id': typeof AdminAccreditationsIdRoute
  '/admin/accreditations/new': typeof AdminAccreditationsNewRoute
  '/admin/contacts/$id': typeof AdminContactsIdRoute
  '/admin/contacts/new': typeof AdminContactsNewRoute
  '/admin/famille-instruments/$id': typeof AdminFamilleInstrumentsIdRoute
  '/admin/famille-instruments/new': typeof AdminFamilleInstrumentsNewRoute
  '/admin/grandeurs/$id': typeof AdminGrandeursIdRoute
  '/admin/grandeurs/new': typeof AdminGrandeursNewRoute
  '/admin/lieux/$id': typeof AdminLieuxIdRoute
  '/admin/lieux/new': typeof AdminLieuxNewRoute
  '/admin/users/$id': typeof AdminUsersIdRoute
  '/admin/users/new': typeof AdminUsersNewRoute
  '/admin/accreditations/': typeof AdminAccreditationsIndexRoute
  '/admin/contacts/': typeof AdminContactsIndexRoute
  '/admin/famille-instruments/': typeof AdminFamilleInstrumentsIndexRoute
  '/admin/grandeurs/': typeof AdminGrandeursIndexRoute
  '/admin/lieux/': typeof AdminLieuxIndexRoute
  '/admin/users/': typeof AdminUsersIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/admin'
    | '/admin/'
    | '/demande'
    | '/nouveau'
    | '/admin/accreditations/$id'
    | '/admin/accreditations/new'
    | '/admin/contacts/$id'
    | '/admin/contacts/new'
    | '/admin/famille-instruments/$id'
    | '/admin/famille-instruments/new'
    | '/admin/grandeurs/$id'
    | '/admin/grandeurs/new'
    | '/admin/lieux/$id'
    | '/admin/lieux/new'
    | '/admin/users/$id'
    | '/admin/users/new'
    | '/admin/accreditations'
    | '/admin/contacts'
    | '/admin/famille-instruments'
    | '/admin/grandeurs'
    | '/admin/lieux'
    | '/admin/users'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/admin'
    | '/demande'
    | '/nouveau'
    | '/admin/accreditations/$id'
    | '/admin/accreditations/new'
    | '/admin/contacts/$id'
    | '/admin/contacts/new'
    | '/admin/famille-instruments/$id'
    | '/admin/famille-instruments/new'
    | '/admin/grandeurs/$id'
    | '/admin/grandeurs/new'
    | '/admin/lieux/$id'
    | '/admin/lieux/new'
    | '/admin/users/$id'
    | '/admin/users/new'
    | '/admin/accreditations'
    | '/admin/contacts'
    | '/admin/famille-instruments'
    | '/admin/grandeurs'
    | '/admin/lieux'
    | '/admin/users'
  id:
    | '__root__'
    | '/'
    | '/admin'
    | '/admin/'
    | '/demande/'
    | '/nouveau/'
    | '/admin/accreditations/$id'
    | '/admin/accreditations/new'
    | '/admin/contacts/$id'
    | '/admin/contacts/new'
    | '/admin/famille-instruments/$id'
    | '/admin/famille-instruments/new'
    | '/admin/grandeurs/$id'
    | '/admin/grandeurs/new'
    | '/admin/lieux/$id'
    | '/admin/lieux/new'
    | '/admin/users/$id'
    | '/admin/users/new'
    | '/admin/accreditations/'
    | '/admin/contacts/'
    | '/admin/famille-instruments/'
    | '/admin/grandeurs/'
    | '/admin/lieux/'
    | '/admin/users/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AdminRoute: typeof AdminRouteWithChildren
  DemandeIndexRoute: typeof DemandeIndexRoute
  NouveauIndexRoute: typeof NouveauIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AdminRoute: AdminRouteWithChildren,
  DemandeIndexRoute: DemandeIndexRoute,
  NouveauIndexRoute: NouveauIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/admin",
        "/demande/",
        "/nouveau/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/admin": {
      "filePath": "admin.tsx",
      "children": [
        "/admin/",
        "/admin/accreditations/$id",
        "/admin/accreditations/new",
        "/admin/contacts/$id",
        "/admin/contacts/new",
        "/admin/famille-instruments/$id",
        "/admin/famille-instruments/new",
        "/admin/grandeurs/$id",
        "/admin/grandeurs/new",
        "/admin/lieux/$id",
        "/admin/lieux/new",
        "/admin/users/$id",
        "/admin/users/new",
        "/admin/accreditations/",
        "/admin/contacts/",
        "/admin/famille-instruments/",
        "/admin/grandeurs/",
        "/admin/lieux/",
        "/admin/users/"
      ]
    },
    "/admin/": {
      "filePath": "admin/index.tsx",
      "parent": "/admin"
    },
    "/demande/": {
      "filePath": "demande/index.tsx"
    },
    "/nouveau/": {
      "filePath": "nouveau/index.tsx"
    },
    "/admin/accreditations/$id": {
      "filePath": "admin/accreditations/$id.tsx",
      "parent": "/admin"
    },
    "/admin/accreditations/new": {
      "filePath": "admin/accreditations/new.tsx",
      "parent": "/admin"
    },
    "/admin/contacts/$id": {
      "filePath": "admin/contacts/$id.tsx",
      "parent": "/admin"
    },
    "/admin/contacts/new": {
      "filePath": "admin/contacts/new.tsx",
      "parent": "/admin"
    },
    "/admin/famille-instruments/$id": {
      "filePath": "admin/famille-instruments/$id.tsx",
      "parent": "/admin"
    },
    "/admin/famille-instruments/new": {
      "filePath": "admin/famille-instruments/new.tsx",
      "parent": "/admin"
    },
    "/admin/grandeurs/$id": {
      "filePath": "admin/grandeurs/$id.tsx",
      "parent": "/admin"
    },
    "/admin/grandeurs/new": {
      "filePath": "admin/grandeurs/new.tsx",
      "parent": "/admin"
    },
    "/admin/lieux/$id": {
      "filePath": "admin/lieux/$id.tsx",
      "parent": "/admin"
    },
    "/admin/lieux/new": {
      "filePath": "admin/lieux/new.tsx",
      "parent": "/admin"
    },
    "/admin/users/$id": {
      "filePath": "admin/users/$id.tsx",
      "parent": "/admin"
    },
    "/admin/users/new": {
      "filePath": "admin/users/new.tsx",
      "parent": "/admin"
    },
    "/admin/accreditations/": {
      "filePath": "admin/accreditations/index.tsx",
      "parent": "/admin"
    },
    "/admin/contacts/": {
      "filePath": "admin/contacts/index.tsx",
      "parent": "/admin"
    },
    "/admin/famille-instruments/": {
      "filePath": "admin/famille-instruments/index.tsx",
      "parent": "/admin"
    },
    "/admin/grandeurs/": {
      "filePath": "admin/grandeurs/index.tsx",
      "parent": "/admin"
    },
    "/admin/lieux/": {
      "filePath": "admin/lieux/index.tsx",
      "parent": "/admin"
    },
    "/admin/users/": {
      "filePath": "admin/users/index.tsx",
      "parent": "/admin"
    }
  }
}
ROUTE_MANIFEST_END */
