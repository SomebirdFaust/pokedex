<!-- <script> 
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
Ancien code-->

 <script>
 export default {
   data() {
     return {
       pokemonData: null,
       error: null,
     };
   },
   async beforeRouteEnter(to, from, next) {
     try {
       const pokemonData = await fetchPokemonData(to.params.id);
       next((vm) => vm.setPost(pokemonData));
     } catch (err) {
       if (err.message === 'Not Found' || err.message === 'Cannot read properties of undefined') {
         next('/404');
       } else {
         console.error(err);
         next('/404');
       }
     }
   },
  //  before update pour éviter que le site charge sans données
   async beforeRouteUpdate(to, from, next) {
     this.pokemonData = null;
     try {
       const pokemonData = await fetchPokemonData(to.params.id);
       this.setPost(pokemonData);
       next();
     } catch (err) {
       if (err.message === 'Not Found' || err.message === 'Cannot read properties of undefined') {
         next('/404'); //renvoie à la page d'erreur 404 si il y a des pbs de lecture de l'api (notament à cause d'un ID invalide)
       } else {
         next('/404');
       }
     }
   },
   methods: {
     setPost(pokemonData) {
       this.pokemonData = pokemonData;
       //console.log(pokemonData); (renvoie les données récupérées dans la console pour le débug)
     },
     setError(err) {
       this.error = err.toString();
     },
   },
 };
 
 async function fetchPokemonData(id) { //récupère l'id dans l'url pour ensuite aller chercher dans l'api avec cet id en question
   try {
     const response = await fetch(`https://tyradex.tech/api/v1/pokemon/${id}`);
     if (response.status === 404) {
       throw new Error('Not Found');
     }
     if (!response.ok) {
       throw new Error('Echec de la requête');
     }
     const data = await response.json();
     if (!data) {
       throw new Error('Aucune donnée trouvée.');
     }
     if (!data.name) {
       throw new Error('Cannot read properties of undefined');
     }
     return data;
   } catch (err) {
     throw err;
   }
 }
 </script>
 
 

<template>
  <div v-if="pokemonData" class="flex justify-center items-center text-center">
    <div class="max-w-md mx-auto">
      <h1 class="text-2xl text-cyan-900 text-center font-medium">{{ pokemonData.name.fr }}</h1>
      <div class="p-4">
        <p>ID : {{ pokemonData.pokedex_id }}</p>
        <p>Autres langues : {{ pokemonData.name.en }}, {{ pokemonData.name.jp }}</p>

        <div class="flex justify-between border border-gray-300 p-4 rounded-lg shadow-lg bg-white">
          <div>
            <p>Apparence normale : </p>
            <img :src="pokemonData.sprites.regular" class="w-full">
          </div>
          <div>
            <p>Apparence shiny : </p>
            <img :src="pokemonData.sprites.shiny" class="w-full">
          </div>
        </div>

        <div class="flex justify-center">
          <div class="p-5">
            
            <div class="p-4">
              <p>Génération : {{ pokemonData.generation }}</p>
              <p>Catégorie : {{ pokemonData.category }}</p>
              <h2>Types : </h2>
              <div class="flex justify-center">
                <div v-for="(TypesPokemon, index) in pokemonData.types" :key="index">
                  <p>{{ TypesPokemon.name }}</p>
                  <div>
                    <img :src="TypesPokemon.image" class="p-2">
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="p-4">
            <div class="bg-white shadow-md rounded-lg overflow-hidden">
              <div class="px-4 py-3 border-b border-black">
                <h2 class="text-lg font-semibold text-gray-800">Stats</h2>
              </div>
              <div class="px-6 py-3">
                <table class="w-full border">
                  <tbody class="p-6">
                    <tr>
                      <td class="px-6 py-4 border border-black">PVs :</td>
                      <td class="px-6 py-4 border border-black">{{ pokemonData.stats.hp }}</td>
                    </tr>
                    <tr>
                      <td class="px-6 py-4 border border-black">Attaque :</td>
                      <td class="px-6 py-4 border border-black">{{ pokemonData.stats.atk }}</td>
                    </tr>
                    <tr>
                      <td class="px-6 py-4 border border-black">Défense :</td>
                      <td class="px-6 py-4 border border-black">{{ pokemonData.stats.def }}</td>
                    </tr>
                    <tr>
                      <td class="px-6 py-4 border border-black">Attaque Spéciale :</td>
                      <td class="px-6 py-4 border border-black">{{ pokemonData.stats.spe_atk }}</td>
                    </tr>
                    <tr>
                      <td class="px-6 py-4 border border-black">Défense Spéciale :</td>
                      <td class="px-6 py-4 border border-black">{{ pokemonData.stats.spe_def }}</td>
                    </tr>
                    <tr>
                      <td class="px-6 py-4 border border-black">Vitesse :</td>
                      <td class="px-6 py-4 border border-black">{{ pokemonData.stats.vit }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        
        <div class="p-5">
          <!-- Si le pokémon a des évolutions, montrer cette partie -->
            <template v-if="pokemonData.evolution && pokemonData.evolution">
              <h2 class="p-2 text-xl">Evolutions : </h2>
              <!-- Si le pokémon a des formes avant la sienne, montrer cette partie -->
              <div v-if="pokemonData.evolution.pre" class="border border-gray-300 p-4 rounded-lg shadow-lg bg-white">
                <p>Précédente(s) : </p>
                <div v-for="(preEvolution, index) in pokemonData.evolution.pre" :key="index">
                  <p>Nom : {{ preEvolution.name }}</p>
                  <p>ID Pokédex : {{ preEvolution.pokedex_id }}</p>
                  <button class="border border-gray-300 p-2 rounded-lg bg-white hover:bg-slate-400 hover:border-transparent hover:text-white mt-4">Voir</button>
                </div>
              </div>
              <br>
              <!-- si le pokémon a des évolutions à suivre, montrer cette partie -->
              <div v-if="pokemonData.evolution.next" class="border border-gray-300 p-4 rounded-lg shadow-lg bg-white">
              <p>Suivante(s) :</p>
              <div v-for="(postEvolution, index) in pokemonData.evolution.next" :key="index">
                <p>Nom : {{ postEvolution.name }}</p>
                <p>ID Pokédex : {{ postEvolution.pokedex_id }}</p>
                <p>Condition d'évolution : <br>{{ postEvolution.condition }}</p>
                  <button class="border border-gray-300 p-2 rounded-lg bg-white hover:bg-slate-400 hover:border-transparent hover:text-white mt-4">Voir</button>
              </div>
              <br>
            </div>
            </template>
           </div>

      </div>
    </div>
  </div>
  <!-- Cas rare où le pokémon n'a pas de données (missingn°), mais que l'api ne renvoie pas d'erreur parce que les champs sont null et pas vides -->
  <div v-else  class="flex flex-col items-center text-center">
      <h2 class="text-2xl text-cyan-900 font-medium py-4">Ce pokémon n'a pas de données...</h2>
      <RouterLink to="/pokedex">
        <button class="border border-gray-300 p-2 rounded-lg bg-white hover:bg-slate-400 hover:border-transparent hover:text-white mt-4">
          Retourner au pokédex
        </button>
      </RouterLink>
  </div>
</template>