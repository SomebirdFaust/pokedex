<template>
  <div class="flex flex-col items-center text-center p-4">
    <h1 class="text-2xl sm:text-3xl lg:text-4xl text-cyan-900 font-medium mb-6">
      Bienvenue sur un site Pokémon !
    </h1>
    
    <div class="flex justify-center mb-6">
      <RouterLink to="/pokemon/25">
        <img src="../assets/img/pikachu.webp" class="w-48 sm:w-64 md:w-80 lg:w-96">
      </RouterLink>
    </div>

    <RouterLink to="/pokedex">
      <button class="border border-gray-300 p-2 rounded-lg bg-white hover:bg-slate-400 hover:border-transparent hover:text-white">
        Voir le Pokédex
      </button>
    </RouterLink>
  </div>
</template>
