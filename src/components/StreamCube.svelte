<script>
    import { onMount } from 'svelte';
    let Cube;
  
    onMount(async () => {
      const module = await import('lucide-svelte');
      Cube = module.Cube;
    });
  </script>
  
  <section class="bg-gradient-to-br from-purple-600 to-blue-500 text-white content-center h-svh">
    <div class="container mx-auto px-4 py-24 flex flex-col md:flex-row items-center content-center">
      <div class="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
        <h1 class="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
          Welcome to
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-pink-500">
            Stream Cube
          </span>
        </h1>
        <p class="text-xl md:text-2xl mb-8 text-gray-200">
          Your ultimate destination for seamless streaming experiences
        </p>
        <div class="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
          <a href="#explore" class="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold transition duration-300 transform hover:scale-105">
            Explore Now
          </a>
          <a href="#learn-more" class="bg-transparent border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-3 rounded-full font-semibold transition duration-300">
            Learn More
          </a>
        </div>
      </div>
      <div class="md:w-1/2 flex justify-center items-center">
        <div class="relative">
          <div class="absolute inset-0 bg-white opacity-10 rounded-full blur-xl"></div>
          {#if Cube}
            <svelte:component this={Cube} size={240} class="text-white animate-float" />
          {:else}
            <div class="w-60 h-60 bg-white/20 rounded-lg animate-float"></div>
          {/if}
        </div>
      </div>
    </div>
  </section>
  
  <style>
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-20px); }
    }
    
    .animate-float {
      animation: float 3s ease-in-out infinite;
    }
  </style>