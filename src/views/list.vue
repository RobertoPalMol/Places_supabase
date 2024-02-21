<script>
import axios from "axios";
export default {
  data() {
    return {
      newItem: {
        site_name: "",
        site_description: "",
        site_photo: "",
      },
      url: "https://uutmknblwzuolbfjqnpi.supabase.co/rest/v1/worldPlaces",
      apiKey: "?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1dG1rbmJsd3p1b2xiZmpxbnBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ5Njg2NzUsImV4cCI6MjAyMDU0NDY3NX0.pcNvaCeueBVCT3wQOC-p2t-g6oqC3CV3ipFYpeTQQoQ",
    };
  },
  methods: {
    submitForm() {
      const headers = {
        "Content-Type": "application/json",
        "apikey": this.apiKey,
        "Authorization": `Bearer ${this.apiKey}`,
      };
      axios.post(this.url, this.newItem, { headers: headers })
        .then(response => {
          alert("Elemento añadido con éxito");
          this.resetForm();
        })
        .catch(error => {
          console.error("Hubo un error al añadir el elemento: ", error);
        });
    },
    resetForm() {
      this.newItem = {
        site_name: "",
        site_description: "",
        site_photo: "",
      };
    },
  },
};
</script>

<template>
  <div class="form-container">
    <form @submit.prevent="submitForm">
      <label for="siteName">Site name:</label>
      <input id="siteName" v-model="newItem.site_name" type="text" required>

      <label for="siteDescription">Site description:</label>
      <input id="siteDescription" v-model="newItem.site_description" type="text" required>

      <label for="sitePhoto">Site URL:</label>
      <input id="sitePhoto" v-model="newItem.site_photo" type="text" required>

      <button type="submit">Add new site</button>
    </form>
  </div>
</template>

<style>.form-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 20px;
  background-color: #f5f5f5;
}

form {
  display: flex;
  flex-direction: column;
  max-width: 600px;
  width: 100%;
  padding: 40px;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

form label {
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
}

form input {
  font-size: 16px; /* Aumenta el tamaño de la fuente */
  padding: 10px; /* Añade más padding */
  border: 1px solid #ccc; /* Borde sutil */
  border-radius: 4px; /* Bordes redondeados */
}

form button {
  margin-top: 30px;
  padding: 15px 20px;
  font-size: 18px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

form button:hover {
  background-color: #0056b3;
}

</style>
