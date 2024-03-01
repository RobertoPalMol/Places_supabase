
<script>
import axios from "axios";
import { defineComponent } from "vue";
import debounce from "lodash/debounce.js";
import { VaInput, VaSwitch, VaIcon } from 'vuestic-ui'

export default defineComponent({
  components: { VaIcon, VaSwitch, VaInput },
  data() {
    return {
      Lugares: [],
      url: "https://uutmknblwzuolbfjqnpi.supabase.co/rest/v1/worldPlaces?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1dG1rbmJsd3p1b2xiZmpxbnBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ5Njg2NzUsImV4cCI6MjAyMDU0NDY3NX0.pcNvaCeueBVCT3wQOC-p2t-g6oqC3CV3ipFYpeTQQoQ",
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
    LugaresSorted() {
      return this.Lugares.slice().sort((a, b) => a.id - b.id);
    },
    filteredItems() {
      return this.LugaresSorted.filter((Lugar) =>
        this.customFilteringFn(Lugar)
      );
    },
  },
  methods: {
    customFilteringFn(Lugar) {
      if (this.filter === "") {
        return true;
      }
      return (
        Lugar.site_name.toLowerCase().includes(this.filter.toLowerCase()) ||
        Lugar.site_photo.includes(this.filter)
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
          this.Lugares = response.data;
          this.filteredCount = this.Lugares.length;
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
    },
    changeBackground() {
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

    <va-button
      color="green"
      gradient
      class="link-container">
      <router-link to="/list" class="centered-link" style="font-weight: bold">+ Añadir nuevo lugar</router-link>
    </va-button>

    <table>
      <thead>
      <tr>
        <th>Id</th>
        <th>Site Name</th>
        <th>Site Description</th>
        <th>Site Photo</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(Site) in filteredItems" :key="Site.id">
        <td>{{Site.id}}</td>

        <td>{{ Site.site_name }}</td>

        <td>{{Site.site_description }}</td>

        <td><img :src="Site.site_photo"></td>
      </tr>
      </tbody>
    </table>
  </main>
</template>

<style>
#app {
  width: 100%;
  background-color: #5cc0bb;
}
main {
  min-height: 100vh; /* Ocupa al menos el 100% de la altura de la ventana */
  background-color: #5cc0bb; /* Color de fondo */
  display: flex; /* Usa flexbox para centrar elementos verticalmente */
  justify-content: center; /* Centra horizontalmente */
  align-items: center; /* Centra verticalmente */
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
  padding: 20px;
}
table td{
  text-align: center;
  vertical-align: middle;
  padding: 20px;
}

VaButton {
  margin: 100px;
  text-align: center;
}

div img {
  width: 300px;
  height: auto;
  margin-bottom: 10px;
}
.link-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
}



</style>
