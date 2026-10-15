
export type Property = {
  slug: string;
  name: string;
  location: string;
  category: "residential" | "apartment";
  type: string;
  area: string;
  areaSqFt?: number;
  bedrooms: number;
  bathrooms: number;
  price: string;
  priceAmount?: number;
  description: string;
  image: string;
  featured?: boolean;
  createdAt?: string;
};

export const properties: Property[] = [
  {
    slug: "the-obsidian-house",
    name: "The Obsidian House",
    location: "Gulshan, Dhaka",
    category: "residential",
    type: "Private Residence",
    area: "4,850 SQ FT",
    areaSqFt: 4850,
    bedrooms: 5,
    bathrooms: 5,
    price: "Price on request",
    description:
      "A contemporary residential concept shaped by clean lines, natural light and thoughtful proportions.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85",
    featured: true,
  },
  {
    slug: "the-limestone",
    name: "The Limestone",
    location: "Banani, Dhaka",
    category: "apartment",
    type: "Signature Apartment",
    area: "2,450 SQ FT",
    areaSqFt: 2450,
    bedrooms: 3,
    bathrooms: 3,
    price: "Price on request",
    description:
      "An understated apartment concept combining warm materials, functional planning and elegant interiors.",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85",
    featured: true,
  },
  {
    slug: "the-stillwater",
    name: "The Stillwater",
    location: "Bashundhara, Dhaka",
    category: "residential",
    type: "Garden Residence",
    area: "3,600 SQ FT",
    areaSqFt: 3600,
    bedrooms: 4,
    bathrooms: 4,
    price: "Price on request",
    description:
      "A peaceful residence concept where greenery, open spaces and modern architecture work together.",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=85",
    featured: false,
  },
];
