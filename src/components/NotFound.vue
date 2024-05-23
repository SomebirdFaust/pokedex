<template>
    <div class="flex flex-col items-center text-center">
      <h1 class="text-2xl text-cyan-900 font-medium">Erreur 404</h1>
      <p>Vous vous êtes perdu</p>
      <img src="/src/assets/img/sad.webp" class="p-6 mx-auto">
      <RouterLink to="/">
        <button class="border border-gray-300 p-2 rounded-lg bg-white hover:bg-slate-400 hover:border-transparent hover:text-white mt-4">
          Retourner à l'accueil
        </button>
      </RouterLink>
    </div>
  </template>
  