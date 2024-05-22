<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <head>
    <meta charset="UTF-8">
    <link rel="icon" href="/favicon.ico">
    <link href="./src/output.css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pokédex</title>
  </head>
  <header>
    <div class="bg-green-500 p-4">
      <nav class="flex justify-center space-x-4">
        <RouterLink to="/" class="px-4 py-2 rounded" active-class="bg-white text-green-500">Accueil</RouterLink>        
        <RouterLink to="/pokedex" class="px-4 py-2 rounded" active-class="bg-white text-green-500">Pokédex</RouterLink>
        <RouterLink to="/legendaires" class="px-4 py-2 rounded" active-class="bg-white text-green-500">Légendaires</RouterLink>
        <RouterLink to="/about" class="px-4 py-2 rounded" active-class="bg-white text-green-500">A propos</RouterLink>

      </nav>
    </div>
  </header>
  <RouterView />
</template>