export type PropertyType = 'hotel' | 'apartment' | 'villa' | 'hostel' | 'resort';

export type Amenity =
  | 'wifi'
  | 'pool'
  | 'parking'
  | 'gym'
  | 'spa'
  | 'restaurant'
  | 'bar'
  | 'ac'
  | 'breakfast'
  | 'kitchen';

export type SortOption =
  | 'recommended'
  | 'price-asc'
  | 'price-desc'
  | 'rating-desc'
  | 'name-asc';

export interface Room {
  id: string;
  name: string;
  nameRu: string;
  nameKk: string;
  image: string;
  price: number;
  size: number;
  bedType: string;
  bedTypeRu: string;
  bedTypeKk: string;
  capacity: number;
  views: string;
  viewsRu: string;
  viewsKk: string;
  amenities: string[];
  status?: 'free-cancellation' | 'great-value' | 'last-room';
}

export interface Hotel {
  id: string;
  name: string;
  nameRu: string;
  nameKk: string;
  city: string;
  address: string;
  addressRu: string;
  addressKk: string;
  description: string;
  descriptionRu: string;
  descriptionKk: string;
  type: PropertyType;
  pricePerNight: number;
  rating: number;
  reviewCount: number;
  amenities: Amenity[];
  image: string;
  gallery: string[];
  featured: boolean;
  freeCancellation: boolean;
  instantBooking: boolean;
  rooms: Room[];
}

export interface HotelFilters {
  search: string;
  types: PropertyType[];
  priceMin: number;
  priceMax: number;
  stars: number[];
  amenities: Amenity[];
  freeCancellation: boolean;
  instantBooking: boolean;
  city: string;
}
