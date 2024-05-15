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
  <div>
    <input type="text" placeholder="Nom ou ID du pokémon" v-model="searchQuery">
    
    <div>
      <input type="checkbox" id="shiny" name="pokemon" value="Shiny" v-model="isShiny" />
      <label for="shiny">Shiny</label>
    </div>

    <h1>Pokémons</h1>
    <div class="item pokemon" v-for="pokemon in filteredList()" :key="pokemon.id">
        <div class="carte">
          <router-link :to="{ name: 'pokemon-details', params: { id: pokemon.pokedex_id }}">
          <h2>Nom : {{ pokemon.name.fr }}</h2>
          <p>ID Pokédex : {{ pokemon.pokedex_id }}</p>
          <p>Autres langues : {{ pokemon.name.en }}, {{ pokemon.name.jp }}</p>
          <img v-if="isShiny" :src="pokemon.sprites.shiny">
          <img v-else :src="pokemon.sprites.regular">
        </router-link>
          <br>
        </div>
    </div>
  </div>
</template>

