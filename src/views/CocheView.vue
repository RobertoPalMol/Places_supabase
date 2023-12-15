<script>
import axios from 'axios';
import { VaButton, VaSwitch } from 'vuestic-ui'

export default {
  components: { VaSwitch, VaButton },
  data() {
    return {
      coche: null,
      id: null, // Agrega una propiedad para almacenar el ID del coche deseado
      value: false,
      appBackgroundColor: '#5cc0bb'
    };
  },
  mounted() {
    // Obtén el ID del coche de los parámetros de la ruta
    this.id = this.$route.params.id;
    this.fetchCocheDetails();
  },
  methods: {
    fetchCocheDetails() {
      const apiUrl = `https://ltxbhwabgxtxbbvqlkte.supabase.co/rest/v1/Deportivos?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0eGJod2FiZ3h0eGJidnFsa3RlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg5MjE0NjAsImV4cCI6MjAxNDQ5NzQ2MH0.p2asA2EMy8KovBVq3C0GTQPMqP7LlEPtWtJYlCTOKEY`;

      axios.get(apiUrl)
        .then(response => {
          // Filtrar el vehículo deseado por ID
          this.coche = response.data.find(hola => hola.id.toString() === this.id);
        })
        .catch(error => {
          console.error('Error al obtener datos del vehículo:', error);
        });
    },changeBackground() {
      // Cambia el color de fondo cuando se cambia el interruptor
      this.appBackgroundColor = this.value ? '#ffffff' : '#5cc0bb';
    }
  }
};
</script>
<template>
  <div class="coche-details" :style="{backgroundColor: appBackgroundColor }">
   <div class="button-container">
      <VaButton color="info"
                gradient>
        <router-link to="/">
        Atras
        </router-link>
      </VaButton>
    </div>

    <h1>Detalles del Coche</h1>
    <div id="switch-container">
      <VaSwitch
        v-model="value"
        color="#5123a1"
        off-color="#ffd300"
        @change="changeBackground"
        style="--va-switch-checker-background-color: #252723;"
      >
        <template>
          <div class="va-text-center">
            <VaIcon :name="value ? 'dark_mode' : 'light_mode'" />
          </div>
        </template>
      </VaSwitch>
    </div>


    <table class="details-table">
      <tbody>
      <tr>
        <td>ID:</td>
        <td>{{ coche && coche.id }}</td>
      </tr>
      <tr>
        <td>Coche:</td>
        <td>{{ coche && coche.Coche }}</td>
      </tr>
      <tr>
        <td>Tienda:</td>
        <td>{{ coche && coche.Tienda }}</td>
      </tr>
      <tr>
        <td>Precio:</td>
        <td>{{ coche && coche.Precio }}</td>
      </tr>
      <tr>
        <td>Velocidad (km/h):</td>
        <td>{{ coche && coche['Velocidad (km/h)'] }}</td>
      </tr>
      </tbody>
    </table>
    <div class="coche-image">
      <img v-if="coche" :src="coche.Imagen" alt="Imagen del coche" />
    </div>
  </div>
</template>

<style>
body {
  height: 100%;
  margin: 0;
}
.button-container {
  width: 90%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
}
#switch-container {
  position: absolute;
  top: 10px;
  right: 10px;
}
.coche-details {
  height: 95vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
}
h1{
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
  align-self: center;
}

.coche-details h1 {
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
}

.details-table {
  width: 90%;
  font-size: 16px;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.details-table td {
  padding: 50px;
  border-bottom: 1px solid #ddd;
}

.details-table td:first-child {
  font-weight: bold;
  width: 40%;
}

.coche-image {
  text-align: center;
}

.coche-image img {
  max-width: 100%;
  height: auto;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}
</style>
