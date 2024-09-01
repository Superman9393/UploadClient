<script>
    import { Menu, X } from 'lucide-svelte';
    let isOpen = false;
  
    function toggleMenu() {
      isOpen = !isOpen;
    }
  </script>
  
  <nav class="bg-gray-800 p-4">
    <div class="container mx-auto">
      <div class="flex justify-between items-center">
        <div class="text-white font-bold text-xl"><a href="/">StreamCube</a></div>
        
        <!-- Desktop menu -->
        <div class="hidden md:flex space-x-4">
          <a href="/upload" class="text-white hover:text-gray-300">Upload</a>
          <a href="/videos" class="text-white hover:text-gray-300">Videos</a>
          <a href="/live" class="text-white hover:text-gray-300">Live</a>
          <a href="/streaming" class="text-white hover:text-gray-300">Streaming</a>
        </div>
        
        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button on:click={toggleMenu} class="text-white">
            {#if isOpen}
              <X size={24} />
            {:else}
              <Menu size={24} />
            {/if}
          </button>
        </div>
      </div>
      
      <!-- Mobile menu -->
      {#if isOpen}
        <div class="mt-4 md:hidden">
          <a href="/upload" class="block text-white py-2 hover:text-gray-300">Upload</a>
          <a href="/videos" class="block text-white py-2 hover:text-gray-300">Videos</a>
          <a href="/live" class="block text-white py-2 hover:text-gray-300">Live</a>
        </div>
      {/if}
    </div>
  </nav>