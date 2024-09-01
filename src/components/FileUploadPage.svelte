<script>
  import { Upload, File, X } from 'lucide-svelte';
  import axios from 'axios';
  
  let file = null;
  let dragover = false;
  let uploadProgress = 0;
  let uploadError = null;
  let uploadSuccess = false;
  let isUploading = false;
  
  function handleFileSelected(event) {
    const fileList = event.target.files || event.dataTransfer.files;
    if (fileList.length > 0) {
      file = fileList[0];
    }
  }
  
  function removeFile() {
    file = null;
  }
  
  function handleDragOver(event) {
    event.preventDefault();
    dragover = true;
  }
  
  function handleDragLeave() {
    dragover = false;
  }
  
  function handleDrop(event) {
    event.preventDefault();
    dragover = false;
    handleFileSelected(event);
  }
  
  async function handleSubmit(event) {
    event.preventDefault();
    uploadError = null;
    uploadSuccess = false;
    
    if (!file) {
      uploadError = "Please select a file to upload.";
      return;
    }
  
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      isUploading = true;
      const response = await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          uploadProgress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        }
      });
  
      console.log('Upload successful:', response.data);
      uploadSuccess = true;
      file = null;
      uploadProgress = 0;
    } catch (error) {
      console.error('Upload failed:', error);
      uploadError = "An error occurred while uploading the file. Please try again.";
    } finally {
      isUploading = false;
    }
  }
</script>

<div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
  <div class="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full">
    <h1 class="text-3xl font-bold text-center mb-8">Upload File</h1>
    
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      class="border-dashed border-2 border-gray-400 rounded-lg p-8 text-center {dragover ? 'bg-blue-50 border-blue-500' : ''}"
      on:dragover={handleDragOver}
      on:dragleave={handleDragLeave}
      on:drop={handleDrop}
    >
      <input
        type="file"
        id="fileInput"
        class="hidden"
        on:change={handleFileSelected}
      />
      <label
        for="fileInput"
        class="cursor-pointer inline-flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
      >
        <Upload class="mr-2" size={20} />
        Select File
      </label>
      <p class="mt-2 text-gray-500">or drag and drop your file here</p>
    </div>

    {#if file}
      <div class="mt-8">
        <h2 class="text-xl font-semibold mb-4">Selected File:</h2>
        <div class="flex items-center justify-between bg-gray-50 p-2 rounded">
          <div class="flex items-center">
            <File size={20} class="text-gray-500 mr-2" />
            <span class="truncate">{file.name}</span>
          </div>
          <button
            on:click={removeFile}
            class="text-red-500 hover:text-red-700"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    {/if}

    {#if uploadProgress > 0 && isUploading}
      <div class="mt-4">
        <div class="bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div class="bg-blue-600 h-2.5 rounded-full" style="width: {uploadProgress}%"></div>
        </div>
        <p class="text-center mt-2">{uploadProgress}% Uploaded</p>
      </div>
    {/if}

    {#if uploadError}
      <div class="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
        {uploadError}
      </div>
    {/if}

    {#if uploadSuccess}
      <div class="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
        File uploaded successfully!
      </div>
    {/if}

    <button
      on:click={handleSubmit}
      class="mt-8 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={isUploading}
    >
      {isUploading ? 'Uploading...' : 'Upload File'}
    </button>
  </div>
</div>