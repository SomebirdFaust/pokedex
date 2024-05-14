<script>
export default {
  props: ['id'],
  data() {
    return {
      pokemonData: null
    };
  },
  mounted() {
    this.fetchPokemonData();
  },
  methods: {
    async fetchPokemonData() {
      try {
        const response = await fetch(`https://tyradex.tech/api/v1/pokemon/${this.id}`);
        if (!response.ok) {
          throw new Error('La requête a échoué');
        }
        const data = await response.json();
        this.pokemonData = data;
        console.log(this.pokemonData);
      } catch (error) {
        console.error('Erreur :', error);
      }
    }
  }
};
</script>

<template>
  <div v-if="pokemonData">
    <h1>{{ pokemonData.name.fr }}</h1>
    <div class="item pokemon">
      <div class="carte">
        <p>ID : {{ pokemonData.pokedex_id }}</p>
        <p>Autres langues : {{ pokemonData.name.en }}, {{ pokemonData.name.jp }}</p>
        <p>Apparence normale : </p>
        <img :src="pokemonData.sprites.regular">
        <p>Apparence shiny : </p>
        <img :src="pokemonData.sprites.shiny">
        <p>Génération : {{ pokemonData.generation }}</p>
        <p>Catégorie : {{ pokemonData.category }}</p>
        <h2>Types : </h2>
        <div v-for="(TypesPokemon, index) in pokemonData.types">
        <p :key="index">{{ TypesPokemon.name }}</p>
        <img :src="TypesPokemon.image">
        </div>
        <template v-if="pokemonData.evolution && pokemonData.evolution">
          <h2>Evolutions : </h2>
          <p>Précédente(s)</p>
          <div v-for="(preEvolution, index) in pokemonData.evolution.pre">
            <p :key="index">Nom : {{ preEvolution.name }}</p>
            <p :key="index">ID Pokédex : {{ preEvolution.pokedex_id }}</p>
            <br>
          </div>
          <p>Suivante(s) :</p>
          <div v-for="(postEvolution, index) in pokemonData.evolution.next">
            <p :key="index">Nom : {{ postEvolution.name }}</p>
            <p :key="index">ID Pokédex : {{ postEvolution.pokedex_id }}</p>
            <p :key="index">Condition d'évolution : {{ postEvolution.condition }}</p>
            <br>
          </div>
        </template>
      </div>
  </div>
</div>

        </template>
        <br>
      </div>
    </div>
  </div>
</template>