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
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Accueil</RouterLink>
        <RouterLink to="/about">A propos</RouterLink>
        <RouterLink to="/pokedex">Pokédex</RouterLink>
        <RouterLink to="/legendaires">Légendaires</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

