import useApi from 'src/composables/UseApi'

export default function empleadosService() {
  const api = useApi()

  return {
    list: () => api.list('api/Empleado/Lista'),

    getById: (id) => api.getById('api/Empleado/Obtener', id),

    post: (data) => api.post('api/Empleado/Crear', data),

    update: (data) => api.update('api/Empleado/Editar', data),

    remove: (id) => api.remove('api/Empleado/Eliminar', id),
  }
}
