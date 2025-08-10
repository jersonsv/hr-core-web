<template>
  <q-page padding>
    <q-form @submit="onSubmit" class="row q-col-gutter-sm">
      <q-input
        outlined
        v-model="form.nombre"
        label="Nombre *"
        lazy-rules
        class="col-lg-6 col-xs-12"
        :rules="[(val) => !!val || 'Campo obligatorio']"
      />
      <q-input
        outlined
        v-model="form.numeroDocumento"
        label="Numero Documento"
        lazy-rules
        class="col-lg-6 col-xs-12"
        :rules="[(val) => !!val || 'Campo obligatorio']"
      />
      <q-input
        outlined
        v-model="form.sueldo"
        label="Sueldo"
        lazy-rules
        class="col-lg-6 col-xs-12"
        :rules="[(val) => !!val || 'Campo obligatorio']"
      />

      <div class="col-12 q-gutter-sm">
        <q-btn label="Guardar" color="primary" class="float-right" icon="save" type="submit" />
        <q-btn
          label="Cancelar"
          color="white"
          class="float-right"
          text-color="primary"
          :to="{ name: 'home' }"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import empleadosService from 'src/services/empleados'
import { useQuasar } from 'quasar'
import { useRouter, useRoute } from 'vue-router'

const { post, getById, update } = empleadosService()
const $q = useQuasar()
const router = useRouter()
const route = useRoute()
const form = ref({
  nombre: '',
  numeroDocumento: '',
  sueldo: '',
})

onMounted(async () => {
  if (route.params.id) {
    getEmpleado(route.params.id)
  }
})

const getEmpleado = async (id) => {
  try {
    const response = await getById(id)
    form.value = response
  } catch (error) {
    console.error(error)
  }
}

const onSubmit = async () => {
  try {
    if (form.value.empleadoID) {
      await update(form.value)
    } else {
      await post(form.value)
    }

    $q.notify({ message: 'Guardado Satifactoriamente', icon: 'check', color: 'positive' })
    router.push({ name: 'home' })
  } catch (error) {
    console.error(error)
  }
}
</script>
