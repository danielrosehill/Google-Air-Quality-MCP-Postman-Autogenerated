/**
 * Function to get current air quality conditions from the Google Maps Air Quality API.
 *
 * @param {Object} args - Arguments for the current conditions request.
 * @param {number} args.latitude - The latitude of the location for which to retrieve air quality data.
 * @param {number} args.longitude - The longitude of the location for which to retrieve air quality data.
 * @returns {Promise<Object>} - The result of the current conditions request.
 */
const executeFunction = async ({ latitude, longitude }) => {
  const baseUrl = 'https://airquality.googleapis.com/v1/currentConditions:lookup';
  const apiKey = process.env.GOOGLE_MAPS_PLATFORM_API_KEY;

  try {
    // Construct the request body
    const body = JSON.stringify({
      location: {
        latitude,
        longitude
      }
    });

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json'
    };

    // Perform the fetch request
    const response = await fetch(`${baseUrl}?key=${apiKey}`, {
      method: 'POST',
      headers,
      body
    });

    // Check if the response was successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData);
    }

    // Parse and return the response data
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching current air quality conditions:', error);
    return { error: 'An error occurred while fetching current air quality conditions.' };
  }
};

/**
 * Tool configuration for fetching current air quality conditions from Google Maps.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'current_conditions',
      description: 'Fetch current air quality conditions for a specified location.',
      parameters: {
        type: 'object',
        properties: {
          latitude: {
            type: 'number',
            description: 'The latitude of the location for which to retrieve air quality data.'
          },
          longitude: {
            type: 'number',
            description: 'The longitude of the location for which to retrieve air quality data.'
          }
        },
        required: ['latitude', 'longitude']
      }
    }
  }
};

export { apiTool };