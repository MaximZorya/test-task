const appDomain = `${import.meta.env.VITE_API_URL}`
export const api = {
    users() {
        return fetch(`${appDomain}/users`, {
            method: 'GET',
        })
    },
    user({id}) {
        return fetch(`${appDomain}/users/${id}`, {
            method: 'GET',
        })
    }
}
