<script>
  import { onMount } from 'svelte';
  export let data
  let Play, Pause, VolumeX, Volume2, Settings, Maximize, SkipBack, SkipForward;

  onMount(async () => {
    const module = await import('lucide-svelte');
    Play = module.Play;
    Pause = module.Pause;
    VolumeX = module.VolumeX;
    Volume2 = module.Volume2;
    Settings = module.Settings;
    Maximize = module.Maximize;
    SkipBack = module.SkipBack;
    SkipForward = module.SkipForward;
  });

  let isPlaying = false;
  let isMuted = false;
  let volume = 100;
  let currentTime = 0;
  let duration = 360; // 6 minutes in seconds
  let showControls = true;
  let timeoutId;

  function togglePlay() {
    isPlaying = !isPlaying;
  }

  function toggleMute() {
    isMuted = !isMuted;
    if (isMuted) {
      volume = 0;
    } else {
      volume = 100;
    }
  }

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  function handleMouseMove() {
    showControls = true;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      showControls = false;
    }, 3000);
  }

  function skip(seconds) {
    currentTime = Math.max(0, Math.min(currentTime + seconds, duration));
  }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div 
  class="relative bg-black w-full aspect-video"
  on:mousemove={handleMouseMove}
  on:mouseleave={() => showControls = false}
>
  <!-- Video placeholder -->
  <div class="absolute inset-0 flex items-center justify-center text-white text-2xl">
    Video Content
  </div>

  <!-- Player controls -->
  <div class="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300"
       class:opacity-0={!showControls}
       class:opacity-100={showControls}>
    <!-- Progress bar -->
    <div class="mb-4">
      <input 
        type="range" 
        min="0" 
        max={duration} 
        bind:value={currentTime}
        class="w-full h-1 bg-gray-400 rounded-full appearance-none cursor-pointer"
        style="--range-progress: {(currentTime / duration) * 100}%"
      >
    </div>

    <div class="flex items-center justify-between text-white">
      <div class="flex items-center space-x-4">
        <!-- Play/Pause button -->
        <button on:click={togglePlay} class="hover:text-blue-500 transition">
          {#if isPlaying}
            <svelte:component this={Pause} size={24} />
          {:else}
            <svelte:component this={Play} size={24} />
          {/if}
        </button>

        <!-- Skip buttons -->
        <button on:click={() => skip(-10)} class="hover:text-blue-500 transition">
          <svelte:component this={SkipBack} size={24} />
        </button>
        <button on:click={() => skip(10)} class="hover:text-blue-500 transition">
          <svelte:component this={SkipForward} size={24} />
        </button>

        <!-- Volume control -->
        <div class="flex items-center space-x-2">
          <button on:click={toggleMute} class="hover:text-blue-500 transition">
            {#if isMuted || volume === 0}
              <svelte:component this={VolumeX} size={24} />
            {:else}
              <svelte:component this={Volume2} size={24} />
            {/if}
          </button>
          <input 
            type="range" 
            min="0" 
            max="100" 
            bind:value={volume}
            class="w-20 h-1 bg-gray-400 rounded-full appearance-none cursor-pointer"
            style="--range-progress: {volume}%"
          >
        </div>

        <!-- Time display -->
        <div class="text-sm">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>

      <div class="flex items-center space-x-4">
        <!-- Settings button -->
        <button class="hover:text-blue-500 transition">
          <svelte:component this={Settings} size={24} />
        </button>

        <!-- Fullscreen button -->
        <button class="hover:text-blue-500 transition">
          <svelte:component this={Maximize} size={24} />
        </button>
      </div>
    </div>
  </div>
</div>

<style>
  input[type="range"] {
    -webkit-appearance: none;
    background: linear-gradient(to right, #3b82f6 var(--range-progress), #9ca3af var(--range-progress));
  }

  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 12px;
    height: 12px;
    background: white;
    border-radius: 50%;
    cursor: pointer;
  }

  input[type="range"]::-moz-range-thumb {
    width: 12px;
    height: 12px;
    background: white;
    border-radius: 50%;
    cursor: pointer;
  }
</style>