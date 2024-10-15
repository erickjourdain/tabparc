import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import React from 'react'
import ReactDOM from 'react-dom/client'

// Import the generated route tree
import Alerte from '@renderer/components/Alerte'
import { routeTree } from '@renderer/routeTree.gen'
import { createMemoryHistory, createRouter, RouterProvider } from '@tanstack/react-router'

// Create a memory history instance to initialize the router so it doesn't break when compiled:
const memoryHistory = createMemoryHistory({
  initialEntries: ['/'] // Pass your initial url
})

// Create a new router instance
const router = createRouter({ routeTree, history: memoryHistory, defaultPreload: 'intent' })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Alerte />
    <RouterProvider router={router} />
  </React.StrictMode>
)
