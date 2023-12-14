<script>
import axios from "axios";
import {RouterLink} from "vue-router";
import {VaButton} from "vuestic-ui";


export default {
  // eslint-disable-next-line vue/no-unused-components
  components: {VaButton, RouterLink},
  data(){
    return{
      Deportivos:[],
      //url de la api
      url : "https://ltxbhwabgxtxbbvqlkte.supabase.co/rest/v1/Deportivos?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0eGJod2FiZ3h0eGJidnFsa3RlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg5MjE0NjAsImV4cCI6MjAxNDQ5NzQ2MH0.p2asA2EMy8KovBVq3C0GTQPMqP7LlEPtWtJYlCTOKEY",
    };
  },
  computed: {
    DeportivosSorted() {
      return this.Deportivos.slice().sort((a, b) => a.id - b.id);
    },
  },
  mounted() {
    axios.get(this.url)
        .then((response)=>{
          this.Deportivos= response.data;
        });
  }
}
</script>

<template>
  <main>
    <table>
      <thead>
      <tr>
        <th>Id</th>
        <th>Coche</th>
        <th>Imagen</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(Deportivo) in DeportivosSorted" :key="Deportivo.id">
        <td><router-link to="/about">{{Deportivo.id}}</router-link></td>
          <router-link to="{ name: '/about/${Deportivo.Coche}', params: {Deportivos: Deportivos.Coche}}"><VaButton round>
            <td>{{Deportivo.Coche}}</td>
          </VaButton></router-link>
        <td><img :src="Deportivo.Imagen"></td>

      </tr>
      </tbody>
    </table>
  </main>
</template>
<style>
#app{
  width: 100%;
  background-color: #55f3ed;
}
table {
  border: 4px solid #000000;
  background-color: #dfeff1;
  width: 100%;
  text-align: center;
  border-collapse: collapse;
}
VaButton{
  float: left;
  margin: 100px;
  text-align: center;
}

div img {
  width: 300px;
  height: auto;
  margin-bottom: 10px;
}
</style>
