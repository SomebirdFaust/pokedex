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
    }
  },
  computed: {
    filteredPokemon() {
      if (!this.pokemonData) return [];
      return this.pokemonData.filter(pokemon => pokemon.catch_rate <= 10);
    }
  }
};
</script>


<template>
    <div>
        <h1>Pokémons Légendaires</h1>
        <input type="checkbox" id="shiny" name="pokemon" value="Shiny" v-model="isShiny" />
      <label for="shiny">Shiny</label>
      <div class="item pokemon" v-for="pokemon in filteredPokemon" :key="pokemon.id">
        <div class="carte">
          <router-link :to="{ name: 'pokemon-details', params: { id: pokemon.pokedex_id }}">
            <h2>Nom : {{ pokemon.name.fr }}</h2>
            <p>ID : {{ pokemon.pokedex_id }}</p>
            <p>Autres langues : {{ pokemon.name.en }}, {{ pokemon.name.jp }}</p>
            <img v-if="isShiny" :src="pokemon.sprites.shiny">
          <img v-else :src="pokemon.sprites.regular">
          </router-link>
          <br>
        </div>
      </div>
    </div>
  </template>

