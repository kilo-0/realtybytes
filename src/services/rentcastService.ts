import { RENTCAST_API_KEY } from '../config/secrets';
import type { Listing } from '../features/listings/types';

const BASE_URL = 'https://api.rentcast.io/v1';

interface RentCastProperty {
  id: string;
  formattedAddress: string;
  addressLine1: string;
  city: string;
  state: string;
  zipCode: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFootage: number;
  lotSize?: number;
  propertyType: string;
  yearBuilt?: number;
}

/**
 * Fetch properties from RentCast API by location
 * Free tier: 50 API calls per month
 * Coverage: US properties only
 */
export async function fetchPropertiesByLocation(
  city: string,
  state: string,
  limit: number = 20
): Promise<Listing[]> {
  // Check if API key is configured
  if (!RENTCAST_API_KEY || RENTCAST_API_KEY === 'YOUR_RENTCAST_API_KEY') {
    console.warn('RentCast API key not configured. Skipping API call.');
    return [];
  }

  try {
    const url = `${BASE_URL}/listings/sale?city=${encodeURIComponent(city)}&state=${encodeURIComponent(state)}&limit=${limit}`;

    const response = await fetch(url, {
      headers: {
        'X-Api-Key': RENTCAST_API_KEY,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      console.error(`RentCast API error: ${response.status} ${response.statusText}`);
      return [];
    }

    const properties: RentCastProperty[] = await response.json();
    return properties.map(transformToListing);
  } catch (error) {
    console.error('RentCast fetch failed:', error);
    return [];
  }
}

/**
 * Transform RentCast property data to our Listing format
 */
function transformToListing(property: RentCastProperty): Listing {
  return {
    id: property.id,
    title: `${property.propertyType} in ${property.city}`,
    location: `${property.addressLine1}, ${property.city}, ${property.state} ${property.zipCode}`,
    price: property.price,
    images: [
      // RentCast free tier may not include images, using placeholder
      "https://placehold.co/600x400/0077b6/ffffff/png?text=Property+Photo"
    ],
    url: `#property-${property.id}`,
    type: property.propertyType,
    area: property.squareFootage || 0
  };
}
