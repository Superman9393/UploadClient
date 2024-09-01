<script>
    import { Search, Home, Film, Heart, Clock, Menu } from 'lucide-svelte';
	  import { onMount } from 'svelte';
    export let data
    let sidebarOpen = false;
    let searchQuery = '';
  
    const toggleSidebar = () => {
      sidebarOpen = !sidebarOpen;
    };
    const videos = []
    onMount(async()=> await fetch('localhost:3000/videos').then((data)=>videos.push(data)));
   
    const handleSearch = () => {
      console.log('Searching for:', searchQuery);
      // Implement search functionality here
    };
  

  </script>
  
  <div class="min-h-screen bg-gray-100">
    <!-- Header with Search Bar -->
    <header class="bg-white shadow-md p-4">
      <div class="container mx-auto flex items-center justify-between">
        <button class="md:hidden" on:click={toggleSidebar}>
          <Menu size={24} />
        </button>
        <div class="flex-grow max-w-2xl mx-4">
          <div class="relative">
            <input
              type="text"
              placeholder="Search..."
              bind:value={searchQuery}
              class="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div class="absolute left-3 top-2.5 text-gray-400">
              <Search size={20} />
            </div>
          </div>
        </div>
        <button
          on:click={handleSearch}
          class="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300"
        >
          Search
        </button>
      </div>
    </header>
  
    <div class="container mx-auto mt-4 flex">
      <!-- Sidebar -->
      <aside class="{sidebarOpen ? 'block' : 'hidden'} md:block w-84 bg-white rounded-lg h-svh shadow-md p-4 mr-4">
        <nav>
          <ul class="space-y-2">
            <li>
              <a href="#home" class="flex items-center text-gray-700 hover:text-blue-500">
                <Home size={20} class="mr-2" />
                Home
              </a>
            </li>
            <li>
              <a href="#genres" class="flex items-center text-gray-700 hover:text-blue-500">
                <Film size={20} class="mr-2" />
                Genres
              </a>
            </li>
            <li>
              <a href="#favorites" class="flex items-center text-gray-700 hover:text-blue-500">
                <Heart size={20} class="mr-2" />
                Favorites
              </a>
            </li>
            <li>
              <a href="#history" class="flex items-center text-gray-700 hover:text-blue-500">
                <Clock size={20} class="mr-2" />
                History
              </a>
            </li>
          </ul>
        </nav>
      </aside>
  
      <!-- Main Content -->
      <main class="flex-grow">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {#each data.videos as video}
            <div class="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={video.url} alt={video.title} class="w-full h-48 object-cover" />
              <div class="p-4">
                <h2 class="text-xl font-semibold mb-2">{video.title}</h2>
                <p class="text-gray-600 mb-4">{video.description}</p>
                <a
                  href={video.link}
                  class="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                >
                  Watch Now
                </a>
              </div>
            </div>
          {/each}
        </div>
      </main>
    </div>
  </div>