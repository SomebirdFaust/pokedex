<template>
    <div class="text-center">
      <h1 class="text-2xl text-cyan-900 text-center font-medium p-6">Bienvenue sur un site Pokémon !</h1>
      
      <div class="flex justify-center">
      <RouterLink to="/pokemon/25">
      <img src="../assets/img/pikachu.webp">
    </RouterLink>
      </div>
    <RouterLink to="/pokedex" class="border border-gray-300 p-2 rounded-lg bg-white hover:bg-slate-400 hover:border-transparent hover:text-white">Voir le Pokédex</RouterLink>
    </div>
</template>
