<script>
    import { onMount, onDestroy } from 'svelte';
    import io from 'socket.io-client';
    import { Play, Pause, VolumeX, Volume2, Settings, Maximize } from 'lucide-svelte';
  
    let videoRef;
    let peerConnection;
    let socket;
    let isPlaying = false;
    let isMuted = false;
    let volume = 100;
    let currentTime = 0;
    let duration = 0;
    let showControls = true;
    let timeoutId;
    let viewerCount = 0;
  
    onMount(async () => {
      socket = io('http://localhost:3000');
  
      socket.on('offer', async (offer) => {
        peerConnection = new RTCPeerConnection({
          iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
        });
  
        peerConnection.ontrack = (event) => {
          if (videoRef) videoRef.srcObject = event.streams[0];
        };
  
        await peerConnection.setRemoteDescription(offer);
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        socket.emit('answer', answer);
      });
  
      socket.on('ice-candidate', (candidate) => {
        peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
      });
  
      socket.on('viewerCount', (count) => {
        viewerCount = count;
      });
  
      return () => {
        if (socket) socket.disconnect();
        if (peerConnection) peerConnection.close();
      };
    });
  
    function togglePlay() {
      if (videoRef.paused) {
        videoRef.play();
        isPlaying = true;
      } else {
        videoRef.pause();
        isPlaying = false;
      }
    }
  
    function toggleMute() {
      videoRef.muted = !videoRef.muted;
      isMuted = videoRef.muted;
    }
  
    function handleVolumeChange() {
      videoRef.volume = volume / 100;
      isMuted = volume === 0;
    }
  
    function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = Math.floor(seconds % 60);
      return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
  
    function handleTimeUpdate() {
      currentTime = videoRef.currentTime;
      duration = videoRef.duration;
    }
  
    function handleMouseMove() {
      showControls = true;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        showControls = false;
      }, 3000);
    }
  
    onDestroy(() => {
      clearTimeout(timeoutId);
    });
  </script>
  
  <div 
    class="relative bg-black w-full aspect-video"
    on:mousemove={handleMouseMove}
    on:mouseleave={() => showControls = false}
  >
    <video
      bind:this={videoRef}
      on:timeupdate={handleTimeUpdate}
      class="w-full h-full"
    ></video>
  
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
              <Pause size={24} />
            {:else}
              <Play size={24} />
            {/if}
          </button>
  
          <!-- Volume control -->
          <div class="flex items-center space-x-2">
            <button on:click={toggleMute} class="hover:text-blue-500 transition">
              {#if isMuted || volume === 0}
                <VolumeX size={24} />
              {:else}
                <Volume2 size={24} />
              {/if}
            </button>
            <input 
              type="range" 
              min="0" 
              max="100" 
              bind:value={volume}
              on:input={handleVolumeChange}
              class="w-20 h-1 bg-gray-400 rounded-full appearance-none cursor-pointer"
              style="--range-progress: {volume}%"
            >
          </div>
  
          <!-- Time display -->
          <div class="text-sm">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
  
          <!-- Viewer count -->
          <div class="text-sm bg-red-500 px-2 py-1 rounded">
            {viewerCount} viewers
          </div>
        </div>
  
        <div class="flex items-center space-x-4">
          <!-- Settings button -->
          <button class="hover:text-blue-500 transition">
            <Settings size={24} />
          </button>
  
          <!-- Fullscreen button -->
          <button class="hover:text-blue-500 transition">
            <Maximize size={24} />
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