<script lang="ts">
  import { onMount } from 'svelte';
  import { getAllPlanets } from '$lib/planetary-facts';

  let selectedPlanet = 'earth';
  let fact = '';
  let loading = false;
  let error = '';
  let currentDay = 0;
  
  const planets = getAllPlanets();

  async function fetchFact(planet: string) {
    loading = true;
    error = '';
    
    try {
      const response = await fetch(`/api/fact?planet=${encodeURIComponent(planet)}`);
      const data = await response.json();
      
      if (response.ok) {
        fact = data.fact;
        currentDay = data.day;
      } else {
        error = data.error;
        fact = '';
      }
    } catch (e) {
      error = 'Failed to fetch fact';
      fact = '';
    } finally {
      loading = false;
    }
  }

  onMount(() => {
    fetchFact(selectedPlanet);
  });

  $: if (selectedPlanet) {
    fetchFact(selectedPlanet);
  }
</script>

<main>
  <h1>Planetary Facts</h1>
  <p>Get a daily fact about planets and the sun based on the current day of the month (EST)!</p>
  
  <div class="controls">
    <label for="planet-select">Choose a planet or the sun:</label>
    <select id="planet-select" bind:value={selectedPlanet}>
      {#each planets as planet}
        <option value={planet}>{planet.charAt(0).toUpperCase() + planet.slice(1)}</option>
      {/each}
    </select>
  </div>

  <div class="fact-container">
    {#if loading}
      <p class="loading">Loading fact...</p>
    {:else if error}
      <p class="error">{error}</p>
    {:else if fact}
      <div class="fact-card">
        <h2>{selectedPlanet.charAt(0).toUpperCase() + selectedPlanet.slice(1)} - Day {currentDay}</h2>
        <p class="fact">{fact}</p>
      </div>
    {/if}
  </div>

  <div class="api-info">
    <h3>API Usage</h3>
    <p>You can also fetch facts directly using the API:</p>
    <code>GET /api/fact?planet={selectedPlanet}</code>
    <p>Available planets: {planets.join(', ')}</p>
  </div>
</main>

<style>
  main {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    font-family: Arial, sans-serif;
  }

  h1 {
    color: #333;
    text-align: center;
    margin-bottom: 1rem;
  }

  .controls {
    margin: 2rem 0;
    text-align: center;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
  }

  select {
    padding: 0.5rem;
    font-size: 1rem;
    border: 2px solid #ddd;
    border-radius: 4px;
    background: white;
    cursor: pointer;
  }

  select:focus {
    outline: none;
    border-color: #4CAF50;
  }

  .fact-container {
    min-height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .fact-card {
    background: #f8f9fa;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    padding: 2rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    text-align: center;
  }

  .fact-card h2 {
    color: #495057;
    margin-bottom: 1rem;
  }

  .fact {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #333;
  }

  .loading {
    color: #666;
    font-style: italic;
  }

  .error {
    color: #dc3545;
    background: #f8d7da;
    border: 1px solid #f5c6cb;
    border-radius: 4px;
    padding: 1rem;
  }

  .api-info {
    margin-top: 3rem;
    padding: 1.5rem;
    background: #e7f3ff;
    border-radius: 8px;
    border-left: 4px solid #0066cc;
  }

  .api-info h3 {
    margin-top: 0;
    color: #0066cc;
  }

  code {
    background: #f1f3f4;
    padding: 0.2rem 0.4rem;
    border-radius: 3px;
    font-family: 'Courier New', monospace;
  }
</style>
