import { useState, useMemo } from "react";

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  startingPrice: number;
  icon: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  category: string;
}

const mockServiceCategories: ServiceCategory[] = [
  {
    id: "1",
    name: "Engine Repair",
    description: "Complete engine diagnostics and repair",
    startingPrice: 80,
    icon: "car",
  },
  {
    id: "2",
    name: "Brake Service",
    description: "Brake inspection, pad replacement, fluid change",
    startingPrice: 60,
    icon: "shield",
  },
  {
    id: "3",
    name: "Oil Change",
    description: "Quick oil and filter change service",
    startingPrice: 35,
    icon: "fuel",
  },
  {
    id: "4",
    name: "Tire Service",
    description: "Tire rotation, balancing, and replacement",
    startingPrice: 45,
    icon: "settings",
  },
  {
    id: "5",
    name: "Battery Service",
    description: "Battery testing, charging, and replacement",
    startingPrice: 25,
    icon: "zap",
  },
  {
    id: "6",
    name: "AC Repair",
    description: "Air conditioning system repair and maintenance",
    startingPrice: 70,
    icon: "wind",
  },
  {
    id: "7",
    name: "Transmission",
    description: "Transmission diagnostics and repair",
    startingPrice: 120,
    icon: "gauge",
  },
  {
    id: "8",
    name: "General Maintenance",
    description: "Routine maintenance and inspections",
    startingPrice: 50,
    icon: "wrench",
  },
];

const mockServices: Service[] = [
  // Engine Repair
  {
    id: "e1",
    name: "Engine Diagnostics",
    description: "Complete computer diagnostics to identify engine issues",
    price: 80,
    duration: "1-2 hours",
    category: "Engine Repair",
  },
  {
    id: "e2",
    name: "Engine Tune-up",
    description: "Replace spark plugs, filters, and fluids",
    price: 150,
    duration: "2-3 hours",
    category: "Engine Repair",
  },
  {
    id: "e3",
    name: "Engine Overhaul",
    description: "Complete engine rebuild and restoration",
    price: 2500,
    duration: "3-5 days",
    category: "Engine Repair",
  },
  
  // Brake Service
  {
    id: "b1",
    name: "Brake Inspection",
    description: "Complete brake system inspection and report",
    price: 60,
    duration: "30-45 minutes",
    category: "Brake Service",
  },
  {
    id: "b2",
    name: "Brake Pad Replacement",
    description: "Replace worn brake pads with quality parts",
    price: 120,
    duration: "1-2 hours",
    category: "Brake Service",
  },
  {
    id: "b3",
    name: "Brake Fluid Change",
    description: "Flush and replace brake fluid system-wide",
    price: 80,
    duration: "45 minutes",
    category: "Brake Service",
  },

  // Oil Change
  {
    id: "o1",
    name: "Standard Oil Change",
    description: "Conventional oil and filter replacement",
    price: 35,
    duration: "20-30 minutes",
    category: "Oil Change",
  },
  {
    id: "o2",
    name: "Synthetic Oil Change",
    description: "Premium synthetic oil and filter replacement",
    price: 55,
    duration: "20-30 minutes",
    category: "Oil Change",
  },
  {
    id: "o3",
    name: "Full Service Oil Change",
    description: "Oil change plus 21-point inspection",
    price: 65,
    duration: "45 minutes",
    category: "Oil Change",
  },

  // Tire Service
  {
    id: "t1",
    name: "Tire Rotation",
    description: "Rotate tires for even wear patterns",
    price: 45,
    duration: "30 minutes",
    category: "Tire Service",
  },
  {
    id: "t2",
    name: "Tire Balancing",
    description: "Balance wheels for smooth driving",
    price: 60,
    duration: "45 minutes",
    category: "Tire Service",
  },
  {
    id: "t3",
    name: "Tire Replacement",
    description: "Install new tires with proper alignment",
    price: 200,
    duration: "1-2 hours",
    category: "Tire Service",
  },
];

export function useServices() {
  const [serviceCategories] = useState<ServiceCategory[]>(mockServiceCategories);
  const [services] = useState<Service[]>(mockServices);

  const getServicesByCategory = (categoryName: string) => {
    return services.filter(service => service.category === categoryName);
  };

  const getServiceById = (id: string) => {
    return services.find(service => service.id === id);
  };

  const popularServices = useMemo(() => {
    return services
      .filter(service => 
        ["Standard Oil Change", "Brake Inspection", "Tire Rotation", "Engine Diagnostics"]
          .includes(service.name)
      );
  }, [services]);

  return {
    serviceCategories,
    services,
    popularServices,
    getServicesByCategory,
    getServiceById,
  };
}