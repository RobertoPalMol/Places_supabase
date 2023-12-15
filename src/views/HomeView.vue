<script>
import axios from "axios";
import { defineComponent } from "vue";
import debounce from "lodash/debounce.js";
import { VaAlert, VaButton, VaInput, VaSwitch, VaIcon } from 'vuestic-ui'

export default defineComponent({
  components: { VaIcon, VaSwitch, VaAlert, VaButton, VaInput },
  data() {
    return {
      Deportivos: [],
      url: "https://ltxbhwabgxtxbbvqlkte.supabase.co/rest/v1/Deportivos?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0eGJod2FiZ3h0eGJidnFsa3RlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg5MjE0NjAsImV4cCI6MjAxNDQ5NzQ2MH0.p2asA2EMy8KovBVq3C0GTQPMqP7LlEPtWtJYlCTOKEY",
      input: "",
      filter: "",
      isDebounceInput: false,
      isCustomFilteringFn: false,
      filteredCount: 0,
      value: false,
      appBackgroundColor: '#5cc0bb'
    };
  },
  computed: {
    DeportivosSorted() {
      return this.Deportivos.slice().sort((a, b) => a.id - b.id);
    },
    filteredItems() {
      return this.DeportivosSorted.filter((Deportivo) =>
        this.customFilteringFn(Deportivo)
      );
    },
  },
  methods: {
    customFilteringFn(Deportivo) {
      if (this.filter === "") {
        return true;
      }
      return (
        Deportivo.Coche.toLowerCase().includes(this.filter.toLowerCase()) ||
        // Agrega más campos si es necesario para tu filtro
        Deportivo.Tienda.toLowerCase().includes(this.filter.toLowerCase()) ||
        Deportivo.Precio.includes(this.filter)
      );
    },
    updateFilter(filter) {
      this.filter = filter;
    },
    debouncedUpdateFilter: debounce(function (filter) {
      this.updateFilter(filter);
    }, 600),
    onFiltered(event) {
      this.filteredCount = event.items.length;
    },
    fetchData() {
      axios.get(this.url)
        .then((response) => {
          this.Deportivos = response.data;
          this.filteredCount = this.Deportivos.length;
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
    },changeBackground() {
      // Cambia el color de fondo cuando se cambia el interruptor
      this.appBackgroundColor = this.value ? '#ffffff' : '#5cc0bb';
    }
  },
  mounted() {
    this.fetchData();
  },
  watch: {
    input(newValue) {
      if (this.isDebounceInput) {
        this.debouncedUpdateFilter(newValue);
      } else {
        this.updateFilter(newValue);
      }
    },
  },
});

</script>

<template>
  <main :style="{backgroundColor: appBackgroundColor }">
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
    <div class="grid md:grid-cols-2 gap-6 mb-6">
      <VaInput
        v-model="input"
        placeholder="Filter..."
        class="w-full"
      />
    </div>
    <table>
      <thead>
      <tr>
        <th>Id</th>
        <th>Coche</th>
        <th>Imagen</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(Deportivo) in filteredItems" :key="Deportivo.id">
        <td>{{Deportivo.id}}</td>
        <router-link :to="{ name: 'Coche', params: { id: Deportivo.id.toString() } }">
          <VaButton round>
            <span>{{ Deportivo.Coche }}</span>
          </VaButton>
        </router-link>
        <td><img :src="Deportivo.Imagen"></td>
      </tr>
      </tbody>
    </table>
<!--    <VaAlert class="!mt-6" color="info" outline>-->
<!--      Number of filtered items:-->
<!--      <VaChip>{{ filteredCount }}</VaChip>-->
<!--    </VaAlert>-->
  </main>
</template>

<style>
#app {
  width: 100%;
  background-color: #5cc0bb;
}

#switch-container {
  position: absolute;
  top: 10px;
  right: 10px;
}

va-data-table {
  border: 4px solid #000000;
  background-color: #dfeff1;
  width: 100%;
  text-align: center;
  border-collapse: collapse;
}

table {
  border: 4px solid #000000;
  background-color: #dfeff1;
  width: 100%;
  text-align: center;
  border-collapse: collapse;
}
table th {
  font-size: 20px;
  font-weight: bold;
  padding-bottom: 60px;
}
table td{
  text-align: center;
  vertical-align: middle;
}

VaButton {
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
