import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const usePropertyStore = defineStore("property", () => {
  const properties = ref([
    {
      id: 1,
      name: "Modern Villa with Pool",
      type: "Villa",
      price: 850000,
      location: {
        address: "123 Luxury Lane",
        city: "Zagreb",
        country: "Croatia",
      },
      bedrooms: 4,
      bathrooms: 3,
      area: 280,
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227",
      featured: true,
    },
    {
      id: 2,
      name: "City Center Apartment",
      type: "Apartment",
      price: 320000,
      location: {
        address: "456 Urban Street",
        city: "Zagreb",
        country: "Croatia",
      },
      bedrooms: 2,
      bathrooms: 1,
      area: 85,
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      featured: true,
    },
    {
      id: 3,
      name: "Seaside Villa",
      type: "Villa",
      price: 1200000,
      location: {
        address: "789 Coastal Road",
        city: "Split",
        country: "Croatia",
      },
      bedrooms: 5,
      bathrooms: 4,
      area: 350,
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
      featured: true,
    },
    {
      id: 4,
      name: "Mountain View Chalet",
      type: "House",
      price: 450000,
      location: {
        address: "101 Mountain Path",
        city: "Zagreb",
        country: "Croatia",
      },
      bedrooms: 3,
      bathrooms: 2,
      area: 150,
      image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233",
      featured: false,
    },
    {
      id: 5,
      name: "Luxury Penthouse",
      type: "Apartment",
      price: 980000,
      location: {
        address: "202 Sky Tower",
        city: "Zagreb",
        country: "Croatia",
      },
      bedrooms: 4,
      bathrooms: 3,
      area: 200,
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00",
      featured: false,
    },
    {
      id: 6,
      name: "Historic Villa",
      type: "Villa",
      price: 1500000,
      location: {
        address: "303 Heritage Ave",
        city: "Dubrovnik",
        country: "Croatia",
      },
      bedrooms: 6,
      bathrooms: 4,
      area: 400,
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
      featured: false,
    },
    {
      id: 7,
      name: "Modern Studio",
      type: "Apartment",
      price: 150000,
      location: {
        address: "404 Downtown St",
        city: "Zagreb",
        country: "Croatia",
      },
      bedrooms: 1,
      bathrooms: 1,
      area: 45,
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
      featured: false,
    },
    {
      id: 8,
      name: "Garden House",
      type: "House",
      price: 420000,
      location: {
        address: "505 Green Valley",
        city: "Zagreb",
        country: "Croatia",
      },
      bedrooms: 3,
      bathrooms: 2,
      area: 160,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      featured: false,
    },
    {
      id: 9,
      name: "Beachfront Apartment",
      type: "Apartment",
      price: 550000,
      location: {
        address: "606 Beach Road",
        city: "Split",
        country: "Croatia",
      },
      bedrooms: 2,
      bathrooms: 2,
      area: 90,
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      featured: false,
    },
    {
      id: 10,
      name: "Family Villa",
      type: "Villa",
      price: 890000,
      location: {
        address: "707 Family Circle",
        city: "Zagreb",
        country: "Croatia",
      },
      bedrooms: 5,
      bathrooms: 3,
      area: 280,
      image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea",
      featured: false,
    },
    {
      id: 11,
      name: "Urban Loft",
      type: "Apartment",
      price: 380000,
      location: {
        address: "808 City View",
        city: "Zagreb",
        country: "Croatia",
      },
      bedrooms: 2,
      bathrooms: 2,
      area: 110,
      image: "https://images.unsplash.com/photo-1600607687644-c7171b42498b",
      featured: false,
    },
    {
      id: 12,
      name: "Riverside Villa",
      type: "Villa",
      price: 1100000,
      location: {
        address: "909 River Road",
        city: "Zagreb",
        country: "Croatia",
      },
      bedrooms: 4,
      bathrooms: 3,
      area: 300,
      image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      featured: false,
    },
  ]);

  const loading = ref(false);
  const error = ref(null);
  const favorites = ref([]);

  // Cache implementation
  const CACHE_KEY = "properties_cache";
  const CACHE_DURATION = 1000 * 60 * 5; // 5 minutes

  const fetchProperties = async () => {
    loading.value = true;
    try {
      // For now, we'll use the static data
      // In production, this would be an API call
      loading.value = false;
      return properties.value;
    } catch (err) {
      error.value = err;
      loading.value = false;
    }
  };

  // Initialize store
  const initializeStore = async () => {
    await fetchProperties();
  };

  // Call initialize when store is created
  initializeStore();

  const toggleFavorite = (propertyId) => {
    const index = favorites.value.indexOf(propertyId);
    if (index === -1) {
      favorites.value.push(propertyId);
    } else {
      favorites.value.splice(index, 1);
    }
    // Persist to localStorage
    localStorage.setItem("propertyFavorites", JSON.stringify(favorites.value));
  };

  const isFavorite = (propertyId) => favorites.value.includes(propertyId);

  const getFavoriteProperties = computed(() => {
    return properties.value.filter((property) =>
      favorites.value.includes(property.id)
    );
  });

  // Initialize favorites from localStorage
  const initializeFavorites = () => {
    const stored = localStorage.getItem("propertyFavorites");
    if (stored) {
      favorites.value = JSON.parse(stored);
    }
  };

  return {
    properties,
    loading,
    error,
    favorites,
    toggleFavorite,
    isFavorite,
    getFavoriteProperties,
    initializeFavorites,
    fetchProperties,
  };
});
