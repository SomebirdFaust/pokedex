<script>
 export default {
   data() {
     return {
       typeData: null,
       error: null,
     };
   },
   async beforeRouteEnter(to, from, next) {
     try {
       const typeData = await fetchTypeData(to.params.id);
       next((vm) => vm.setPost(typeData));
     } catch (err) {
       if (err.message === 'Not Found' || err.message === 'Cannot read properties of undefined') {
         next('/404');
       } else {
         console.error(err);
         next('/404');
       }
     }
   },
   async beforeRouteUpdate(to, from, next) {
     this.typeData = null;
     try {
       const typeData = await fetchTypeData(to.params.id);
       this.setPost(typeData);
       next();
     } catch (err) {
       if (err.message === 'Not Found' || err.message === 'Cannot read properties of undefined') {
         next('/404');
       } else {
         console.error(err);
         next('/404');
       }
     }
   },
   methods: {
     setPost(typeData) {
       this.typeData = typeData;
       console.log(typeData);
     },
     setError(err) {
       this.error = err.toString();
     },
   },
 };

 async function fetchTypeData(id) {
   try {
     const response = await fetch(`https://tyradex.tech/api/v1/types/${id}`);
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
    <div v-if="typeData" class="flex justify-center items-center text-center">
      <div class="max-w-md mx-auto">
        <h1 class="text-2xl text-cyan-900 text-center font-medium">{{ typeData.name.fr }}</h1>
        <div class="p-4">
          <p>ID : {{ typeData.id }}</p>
          <p>Autres langues : {{ typeData.name.en }}, {{ typeData.name.jp }}</p>
  
          <div class="flex justify-between border border-gray-300 p-4 rounded-lg shadow-lg bg-white">
            <div>
              <p>Image :</p>
              <img :src="typeData.sprites" class="w-full">
            </div>
          </div>
      </div>
    </div>
    </div>
  </template>
  