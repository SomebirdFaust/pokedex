<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
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

