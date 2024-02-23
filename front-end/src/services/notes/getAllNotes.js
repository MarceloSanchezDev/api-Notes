const baseUrl = '/api/notes'

export const getAllNotes = () => {
    return fetch(baseUrl)
            .then((response)=> response.json())
            .then((json) => {return (json)})
}