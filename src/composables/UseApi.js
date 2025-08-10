import { api } from 'boot/axios'

export default function useApi() {
  const list = async (url) => {
    try {
      const { data } = await api.get(url)
      return data
    } catch (error) {
      throw new Error(error)
    }
  }

  const getById = async (url, id) => {
    try {
      const { data } = await api.get(`${url}/${id}`)
      return data
    } catch (error) {
      throw new Error(error)
    }
  }

  const post = async (url, form) => {
    try {
      const { data } = await api.post(url, form)
      return data
    } catch (error) {
      throw new Error(error)
    }
  }

  const update = async (url, form) => {
    try {
      const { data } = await api.put(url, form)
      return data
    } catch (error) {
      throw new Error(error)
    }
  }

  const remove = async (url, id) => {
    try {
      const { data } = await api.delete(`${url}?id=${id}`)
      return data
    } catch (error) {
      throw new Error(error)
    }
  }

  return {
    list,
    getById,
    post,
    update,
    remove,
  }
}
