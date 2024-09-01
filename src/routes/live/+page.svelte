<script>
    import { onMount } from 'svelte';
    let ThumbsUp, ThumbsDown, Share, MoreVertical, Send;
    export let data
  
    onMount(async () => {
      const module = await import('lucide-svelte');
      ThumbsUp = module.ThumbsUp;
      ThumbsDown = module.ThumbsDown;
      Share = module.Share;
      MoreVertical = module.MoreVertical;
      Send = module.Send;
    });
  
    let chatMessages = [
      { user: 'User1', message: 'Great stream!' },
      { user: 'User2', message: 'How long have you been streaming?' },
      { user: 'User3', message: 'Love the content!' },
    ];
  
    let newMessage = '';
  
    function sendMessage() {
      if (newMessage.trim()) {
        chatMessages = [...chatMessages, { user: 'You', message: newMessage.trim() }];
        newMessage = '';
      }
    }
  
    let recommendedStreams = data.videos
    console.log(data)
  </script>
  
  <div class="bg-gray-100 min-h-screen">
    <div class="container mx-auto p-4">
      <div class="flex flex-col lg:flex-row gap-4">
        <!-- Main content area -->
        <div class="lg:w-3/4">
          <!-- Video player -->
          <div class="bg-black aspect-video mb-4">
            <!-- Replace with actual video player -->
            <div class="w-full h-full flex items-center justify-center text-white text-2xl">
              Video Player
            </div>
          </div>
  
          <!-- Stream info -->
          <div class="bg-white rounded-lg shadow p-4 mb-4">
            <h1 class="text-2xl font-bold mb-2">Live Stream Title</h1>
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="w-10 h-10 bg-gray-300 rounded-full mr-2"></div>
                <div>
                  <p class="font-semibold">Streamer Name</p>
                  <p class="text-sm text-gray-500">1.2K viewers</p>
                </div>
              </div>
              <div class="flex space-x-4">
                {#if ThumbsUp && ThumbsDown && Share && MoreVertical}
                  <button class="flex items-center space-x-1 text-gray-700 hover:text-blue-500">
                    <svelte:component this={ThumbsUp} size={20} />
                    <span>10K</span>
                  </button>
                  <button class="flex items-center space-x-1 text-gray-700 hover:text-blue-500">
                    <svelte:component this={ThumbsDown} size={20} />
                    <span>Dislike</span>
                  </button>
                  <button class="flex items-center space-x-1 text-gray-700 hover:text-blue-500">
                    <svelte:component this={Share} size={20} />
                    <span>Share</span>
                  </button>
                  <button class="text-gray-700 hover:text-blue-500">
                    <svelte:component this={MoreVertical} size={20} />
                  </button>
                {/if}
              </div>
            </div>
          </div>
  
          <!-- Stream description -->
          <div class="bg-white rounded-lg shadow p-4 mb-4">
            <p class="text-gray-700">
              Welcome to our live stream! We'll be discussing the latest trends in technology and answering your questions.
            </p>
          </div>
        </div>
  
        <!-- Chat section -->
        <div class="lg:w-1/4">
          <div class="bg-white rounded-lg shadow h-[calc(100vh-2rem)] flex flex-col">
            <div class="p-4 border-b">
              <h2 class="text-lg font-semibold">Live Chat</h2>
            </div>
            <div class="flex-grow overflow-y-auto p-4 space-y-2">
              {#each chatMessages as message}
                <div class="bg-gray-100 rounded p-2">
                  <span class="font-semibold">{message.user}:</span> {message.message}
                </div>
              {/each}
            </div>
            <div class="p-4 border-t">
              <div class="flex items-center">
                <input
                  type="text"
                  bind:value={newMessage}
                  placeholder="Type a message..."
                  class="flex-grow border rounded-l-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  on:keypress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button
                  on:click={sendMessage}
                  class="bg-blue-500 text-white rounded-r-full py-2 px-4 hover:bg-blue-600 transition duration-300"
                >
                  {#if Send}
                    <svelte:component this={Send} size={20} />
                  {:else}
                    Send
                  {/if}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Recommended streams -->
      <div class="mt-8">
        <h2 class="text-2xl font-bold mb-4">Recommended Live Streams</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {#each recommendedStreams as stream}
            <div class="bg-white rounded-lg shadow overflow-hidden">
              <video src={stream.url} autoplay muted controls/>
              <div class="p-4">
                <h3 class="font-semibold mb-1">{stream.title}</h3>
                <p class="text-sm text-gray-600">{stream.description}</p>
                <p class="text-sm text-gray-500">{stream.url} viewers</p>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>