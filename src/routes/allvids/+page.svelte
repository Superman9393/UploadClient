<script>
    import { onMount } from 'svelte';
  
    export let data;
    let videos = [];
    let loading = true;
    let error = null;
  
    onMount(() => {
      if (data && data.videos) {
        videos = data.videos;
        loading = false;
      } else {
        error = "No video data available";
        loading = false;
      }
      console.log(`videos on allvids`, videos);
    });
  </script>
  
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Video Library</h1>
  
    {#if loading}
      <p>Loading videos...</p>
    {:else if error}
      <p class="text-red-500">{error}</p>
    {:else}
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {#each videos as video}
        <div class="bg-white rounded-lg shadow overflow-hidden">
            <!-- svelte-ignore a11y-media-has-caption -->
            <video
            id="my-video"
            class="video-js"
            controls
            preload="auto"
            width="640"
            height="264"
          >
            <source src={video.url} type="video/mp4" />
              To view this video please enable JavaScript, and consider upgrading to a
              web browser that
              <!-- svelte-ignore a11y-missing-content -->
          </video>
          </div>
        {/each}
      </div>
    {/if}
  </div>