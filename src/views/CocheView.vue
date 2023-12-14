<script>
import axios from 'axios';

export default {
  data() {
    return {
      coche: null,
      id: null // Agrega una propiedad para almacenar el ID del coche deseado
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
          this.coche = response.data.find(vehicle => vehicle.id.toString() === this.id);
        })
        .catch(error => {
          console.error('Error al obtener datos del vehículo:', error);
        });
    }
  }
};
</script>
<template>
  <div class="coche-details">
    <h1>Detalles del Coche</h1>
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
/* Estilos para la vista específica del detalle del coche */

.coche-details {
  max-width: 90%; /* Para adaptarse al ancho del contenedor padre */
  margin: 20px auto; /* Centrar y agregar espacio alrededor */
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.coche-details h1 {
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
}

.details-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.details-table td {
  padding: 10px;
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
