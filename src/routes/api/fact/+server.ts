import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { getFactForPlanet, getAllPlanets } from '$lib/planetary-facts';

export const GET: RequestHandler = async ({ url }) => {
  const planet = url.searchParams.get('planet');
  
  if (!planet) {
    return json(
      { 
        error: 'Planet parameter is required',
        availablePlanets: getAllPlanets()
      }, 
      { status: 400 }
    );
  }

  // Get current day in EST
  const now = new Date();
  const estDate = new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" }));
  const currentDay = estDate.getDate();

  // Get fact for the specified planet and current day
  const fact = getFactForPlanet(planet, currentDay);
  
  if (!fact) {
    return json(
      { 
        error: `Planet '${planet}' not found or no fact available for day ${currentDay}`,
        availablePlanets: getAllPlanets(),
        currentDay: currentDay
      }, 
      { status: 404 }
    );
  }

  return json({
    planet: planet.toLowerCase(),
    day: currentDay,
    fact: fact,
    timestamp: estDate.toISOString()
  });
};
