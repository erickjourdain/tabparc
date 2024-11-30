/* eslint-disable @typescript-eslint/no-explicit-any */
const invoke = async (channel: string, ...args: any[]) => {
  try {
    const response = await window.electron.ipcRenderer.invoke(channel, args)
    if (isRejectedPromise(response)) throw response
    else return response
  } catch (error: any) {
    return new Promise((_, reject) => reject(error.error))
  }
}

const isRejectedPromise = (response_from_ipc_main) => {
  if (response_from_ipc_main === undefined) return false
  else if (response_from_ipc_main.handle_as_rejected_promise) return true
  else return false
}

export default {
  invoke
}
