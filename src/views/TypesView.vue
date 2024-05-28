<script>
export default {
  data() {
    return {
      pokemonData: null,
      searchQuery: '',
    };
  },
  mounted() {
    this.fetchPokemonData();
  },
  methods: {
    async fetchPokemonData() {
      try {
        const response = await fetch('https://tyradex.tech/api/v1/types');
        if (!response.ok) {
          throw new Error('La requête a échoué');
        }
        const data = await response.json();
        this.pokemonData = data;
      } catch (error) {
        console.error('Erreur :', error);
      }
    },
    filteredList() {
      if (!this.pokemonData) return [];
      const query = this.searchQuery.toLowerCase();
      return this.pokemonData.filter(type => {
        return type.name.fr.toLowerCase().includes(query) ||
               type.name.en.toLowerCase().includes(query) ||
               type.name.jp.toLowerCase().includes(query);
      });
    }
  }
};
</script>

<template>   
  <div class="mx-8 lg:mx-16">   
    <h1 class="text-2xl text-cyan-900 text-center font-medium">Types</h1>
    
    <div class="flex flex-col items-center space-y-4">    
      <input type="text" class="bg-white border border-slate-800 rounded-md p-2" placeholder="Nom du type" v-model="searchQuery"/>
    </div>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      <div v-for="type in filteredList()" :key="type.id" class="border border-gray-300 p-4 rounded-lg shadow-lg bg-white">
        <h2 class="text-xl font-bold mb-2">Nom : {{ type.name.fr }}</h2>
        <p class="mb-4">Autres langues : {{ type.name.en }}, {{ type.name.jp }}</p>
        <img :src="type.sprites" class="w-40 h-auto rounded-lg"><br>
        <router-link :to="{ name: 'type-detail', params: { id: type.id }}" class="border border-gray-300 p-2 rounded-lg bg-white hover:bg-slate-400 hover:border-transparent hover:text-white mt-6">En savoir plus</router-link>
      </div>
    </div>
  </div>
</template>


