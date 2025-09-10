import { useState, useMemo } from "react";

export interface Mechanic {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  distance: string;
  availability: string;
  services: string[];
  startingPrice: number;
  location: {
    latitude: number;
    longitude: number;
  };
  phone: string;
  specialties: string[];
}

const mockMechanics: Mechanic[] = [
  {
    id: "1",
    name: "Mike Rodriguez",
    rating: 4.9,
    reviews: 127,
    distance: "0.8 km",
    availability: "Available now",
    services: ["Engine Repair", "Oil Change", "Brake Service", "Tire Service"],
    startingPrice: 45,
    location: { latitude: 37.7749, longitude: -122.4194 },
    phone: "+1 (555) 123-4567",
    specialties: ["European Cars", "Diagnostics"],
  },
  {
    id: "2",
    name: "Sarah Johnson",
    rating: 4.8,
    reviews: 89,
    distance: "1.2 km",
    availability: "Available in 30 min",
    services: ["AC Repair", "Battery Service", "General Maintenance"],
    startingPrice: 50,
    location: { latitude: 37.7849, longitude: -122.4094 },
    phone: "+1 (555) 234-5678",
    specialties: ["Electrical Systems", "AC Systems"],
  },
  {
    id: "3",
    name: "Carlos Martinez",
    rating: 4.7,
    reviews: 156,
    distance: "2.1 km",
    availability: "Available in 1 hour",
    services: ["Transmission", "Engine Repair", "Brake Service"],
    startingPrice: 60,
    location: { latitude: 37.7649, longitude: -122.4294 },
    phone: "+1 (555) 345-6789",
    specialties: ["Transmission", "Heavy Duty"],
  },
  {
    id: "4",
    name: "Jennifer Chen",
    rating: 4.9,
    reviews: 203,
    distance: "1.5 km",
    availability: "Available now",
    services: ["Oil Change", "Tire Service", "General Maintenance", "Battery Service"],
    startingPrice: 40,
    location: { latitude: 37.7549, longitude: -122.4394 },
    phone: "+1 (555) 456-7890",
    specialties: ["Quick Service", "Preventive Care"],
  },
  {
    id: "5",
    name: "David Thompson",
    rating: 4.6,
    reviews: 78,
    distance: "3.2 km",
    availability: "Available in 45 min",
    services: ["Engine Repair", "Transmission", "Brake Service"],
    startingPrice: 55,
    location: { latitude: 37.7449, longitude: -122.4494 },
    phone: "+1 (555) 567-8901",
    specialties: ["Performance Tuning", "Classic Cars"],
  },
];

export function useMechanics() {
  const [mechanics] = useState<Mechanic[]>(mockMechanics);

  const nearbyMechanics = useMemo(() => {
    return mechanics
      .sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
      .slice(0, 10);
  }, [mechanics]);

  const availableMechanics = useMemo(() => {
    return mechanics.filter(mechanic => 
      mechanic.availability.includes("Available now")
    );
  }, [mechanics]);

  const getMechanicById = (id: string) => {
    return mechanics.find(mechanic => mechanic.id === id);
  };

  const getMechanicsByService = (service: string) => {
    return mechanics.filter(mechanic =>
      mechanic.services.some(s => 
        s.toLowerCase().includes(service.toLowerCase())
      )
    );
  };

  return {
    mechanics,
    nearbyMechanics,
    availableMechanics,
    getMechanicById,
    getMechanicsByService,
  };
}