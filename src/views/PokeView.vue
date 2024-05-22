<script>
import { ref } from 'vue';

export default {
  data() {
    return {
      pokemonData: null,
      searchQuery: '',
      isShiny: false
    };
  },
  mounted() {
    this.fetchPokemonData();
  },
  methods: {
    async fetchPokemonData() {
      try {
        const response = await fetch('https://tyradex.tech/api/v1/pokemon');
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
      return this.pokemonData.filter(pokemon => {
        const query = this.searchQuery.toLowerCase();
        return pokemon.name.fr.toLowerCase().includes(query) ||
               pokemon.name.en.toLowerCase().includes(query) ||
               pokemon.name.jp.toLowerCase().includes(query) ||
               pokemon.pokedex_id.toString().includes(query);
      });
    }
  }
};
</script>

<template>   
<div class="mx-8 lg:mx-16">   
<h1 class="text-2xl text-cyan-900 text-center font-medium">Pokémons</h1>
    
    <div class="flex flex-col items-center space-y-4">    
  <input type="text" class="bg-white border border-slate-800 rounded-md p-2" placeholder="Nom ou ID du pokémon" v-model="searchQuery"/>
  <div class="flex items-center">
    <input type="checkbox" id="shiny" name="pokemon" value="Shiny" v-model="isShiny"/>
    <label for="shiny">Shiny</label>
    </div>
  </div>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
    <div v-for="pokemon in filteredList()" :key="pokemon.id" class="border border-gray-300 p-4 rounded-lg shadow-lg bg-white">
        <h2 class="text-xl font-bold mb-2">Nom : {{ pokemon.name.fr }}</h2>
        <p class="mb-1">ID Pokédex : {{ pokemon.pokedex_id }}</p>
        <p class="mb-4">Autres langues : {{ pokemon.name.en }}, {{ pokemon.name.jp }}</p>
        <img v-if="isShiny" :src="pokemon.sprites.shiny" class="w-full h-auto rounded-lg">
        <img v-else :src="pokemon.sprites.regular" class="w-full h-auto rounded-lg">
        <router-link :to="{ name: 'pokemon-details', params: { id: pokemon.pokedex_id }}" class="border border-gray-300 p-2 rounded-lg bg-white hover:bg-slate-400 hover:border-transparent hover:text-white">En savoir plus</router-link>
    </div>
  </div>
</div>
</template>

