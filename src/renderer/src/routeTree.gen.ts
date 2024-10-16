/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AdminImport } from './routes/admin'
import { Route as IndexImport } from './routes/index'
import { Route as AdminIndexImport } from './routes/admin/index'
import { Route as AdminContactsImport } from './routes/admin/contacts'
import { Route as AdminUsersIndexImport } from './routes/admin/users/index'
import { Route as AdminUsersNewImport } from './routes/admin/users/new'
import { Route as AdminUsersIdImport } from './routes/admin/users/$id'

// Create/Update Routes

const AdminRoute = AdminImport.update({
  path: '/admin',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AdminIndexRoute = AdminIndexImport.update({
  path: '/',
  getParentRoute: () => AdminRoute,
} as any)

const AdminContactsRoute = AdminContactsImport.update({
  path: '/contacts',
  getParentRoute: () => AdminRoute,
} as any)

const AdminUsersIndexRoute = AdminUsersIndexImport.update({
  path: '/users/',
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
    '/admin/contacts': {
      id: '/admin/contacts'
      path: '/contacts'
      fullPath: '/admin/contacts'
      preLoaderRoute: typeof AdminContactsImport
      parentRoute: typeof AdminImport
    }
    '/admin/': {
      id: '/admin/'
      path: '/'
      fullPath: '/admin/'
      preLoaderRoute: typeof AdminIndexImport
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
  AdminContactsRoute: typeof AdminContactsRoute
  AdminIndexRoute: typeof AdminIndexRoute
  AdminUsersIdRoute: typeof AdminUsersIdRoute
  AdminUsersNewRoute: typeof AdminUsersNewRoute
  AdminUsersIndexRoute: typeof AdminUsersIndexRoute
}

const AdminRouteChildren: AdminRouteChildren = {
  AdminContactsRoute: AdminContactsRoute,
  AdminIndexRoute: AdminIndexRoute,
  AdminUsersIdRoute: AdminUsersIdRoute,
  AdminUsersNewRoute: AdminUsersNewRoute,
  AdminUsersIndexRoute: AdminUsersIndexRoute,
}

const AdminRouteWithChildren = AdminRoute._addFileChildren(AdminRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/admin': typeof AdminRouteWithChildren
  '/admin/contacts': typeof AdminContactsRoute
  '/admin/': typeof AdminIndexRoute
  '/admin/users/$id': typeof AdminUsersIdRoute
  '/admin/users/new': typeof AdminUsersNewRoute
  '/admin/users': typeof AdminUsersIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/admin/contacts': typeof AdminContactsRoute
  '/admin': typeof AdminIndexRoute
  '/admin/users/$id': typeof AdminUsersIdRoute
  '/admin/users/new': typeof AdminUsersNewRoute
  '/admin/users': typeof AdminUsersIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/admin': typeof AdminRouteWithChildren
  '/admin/contacts': typeof AdminContactsRoute
  '/admin/': typeof AdminIndexRoute
  '/admin/users/$id': typeof AdminUsersIdRoute
  '/admin/users/new': typeof AdminUsersNewRoute
  '/admin/users/': typeof AdminUsersIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/admin'
    | '/admin/contacts'
    | '/admin/'
    | '/admin/users/$id'
    | '/admin/users/new'
    | '/admin/users'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/admin/contacts'
    | '/admin'
    | '/admin/users/$id'
    | '/admin/users/new'
    | '/admin/users'
  id:
    | '__root__'
    | '/'
    | '/admin'
    | '/admin/contacts'
    | '/admin/'
    | '/admin/users/$id'
    | '/admin/users/new'
    | '/admin/users/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AdminRoute: typeof AdminRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AdminRoute: AdminRouteWithChildren,
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
        "/admin"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/admin": {
      "filePath": "admin.tsx",
      "children": [
        "/admin/contacts",
        "/admin/",
        "/admin/users/$id",
        "/admin/users/new",
        "/admin/users/"
      ]
    },
    "/admin/contacts": {
      "filePath": "admin/contacts.tsx",
      "parent": "/admin"
    },
    "/admin/": {
      "filePath": "admin/index.tsx",
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
    "/admin/users/": {
      "filePath": "admin/users/index.tsx",
      "parent": "/admin"
    }
  }
}
ROUTE_MANIFEST_END */
