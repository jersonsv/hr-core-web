<template>
  <q-page padding>
    <q-table title="Empleados" :rows="empleados" :columns="columns" row-key="nombre">
      <template v-slot:top>
        <span class="text-h4">Empleados</span>
        <q-space />
        <q-btn color="primary" label="Agregar" :to="{ name: 'formEmpleado' }" />
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="q-gutter-sm">
          <q-btn
            icon="edit"
            color="info"
            dense
            size="sm"
            @click="handleEditEmpleado(props.row.empleadoID)"
          />
          <q-btn
            icon="delete"
            color="negative"
            dense
            size="sm"
            @click="handleDeleteEmpleado(props.row.empleadoID)"
          />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import empleadosService from 'src/services/empleados'
import { useRouter } from 'vue-router'

const empleados = ref([])
const { list, remove } = empleadosService()
const columns = [
  { name: 'empleadoID', label: 'Id', field: 'empleadoID', sortable: true, align: 'left' },
  { name: 'nombre', label: 'Nombre', field: 'nombre', sortable: true, align: 'left' },
  {
    name: 'numeroDocumento',
    label: 'Documento',
    field: 'numeroDocumento',
    sortable: true,
    align: 'left',
  },
  { name: 'sueldo', label: 'Sueldo', field: 'sueldo', sortable: true, align: 'left' },
  { name: 'actions', label: 'Acciones', field: 'actions', align: 'right' },
]

const $q = useQuasar()
const router = useRouter()

onMounted(() => {
  getEmpleados()
})

const getEmpleados = async () => {
  try {
    const data = await list()
    empleados.value = data
  } catch (error) {
    console.error(error)
  }
}

const handleDeleteEmpleado = async (empleadoID) => {
  try {
    $q.dialog({
      title: 'Elminar',
      message: 'Desea eliminar el empleado?',
      cancel: true,
      persistent: true,
    }).onOk(async () => {
      await remove(empleadoID)
      $q.notify({ message: 'Elminado Satifactoriamente', icon: 'check', color: 'positive' })
      getEmpleados()
    })
  } catch (error) {
    $q.notify({ message: `Error al eliminar empleado: ${error}`, icon: 'times', color: 'negative' })
  }
}

const handleEditEmpleado = (id) => {
  router.push({ name: 'formEmpleado', params: { id } })
}
</script>
