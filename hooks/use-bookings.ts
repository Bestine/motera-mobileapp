import { useState } from "react";

export interface Booking {
  id: string;
  service: string;
  mechanicName: string;
  mechanicId: string;
  date: string;
  time: string;
  location: string;
  price: number;
  status: "pending" | "confirmed" | "in-progress" | "completed" | "cancelled";
  createdAt: string;
  notes?: string;
}

const mockCurrentBookings: Booking[] = [
  {
    id: "1",
    service: "Oil Change",
    mechanicName: "Mike Rodriguez",
    mechanicId: "1",
    date: "Today",
    time: "2:30 PM",
    location: "123 Main St, San Francisco",
    price: 45,
    status: "confirmed",
    createdAt: "2024-01-15T10:00:00Z",
    notes: "Synthetic oil requested",
  },
  {
    id: "2",
    service: "Brake Inspection",
    mechanicName: "Sarah Johnson",
    mechanicId: "2",
    date: "Tomorrow",
    time: "10:00 AM",
    location: "456 Oak Ave, San Francisco",
    price: 60,
    status: "pending",
    createdAt: "2024-01-15T14:30:00Z",
  },
  {
    id: "3",
    service: "Engine Diagnostics",
    mechanicName: "Carlos Martinez",
    mechanicId: "3",
    date: "Jan 18",
    time: "9:00 AM",
    location: "789 Pine St, San Francisco",
    price: 80,
    status: "in-progress",
    createdAt: "2024-01-15T09:15:00Z",
    notes: "Check engine light issue",
  },
];

const mockPastBookings: Booking[] = [
  {
    id: "4",
    service: "Tire Rotation",
    mechanicName: "Jennifer Chen",
    mechanicId: "4",
    date: "Jan 10",
    time: "3:00 PM",
    location: "321 Elm St, San Francisco",
    price: 45,
    status: "completed",
    createdAt: "2024-01-10T15:00:00Z",
  },
  {
    id: "5",
    service: "Battery Replacement",
    mechanicName: "David Thompson",
    mechanicId: "5",
    date: "Jan 5",
    time: "11:30 AM",
    location: "654 Maple Dr, San Francisco",
    price: 120,
    status: "completed",
    createdAt: "2024-01-05T11:30:00Z",
  },
  {
    id: "6",
    service: "AC Repair",
    mechanicName: "Mike Rodriguez",
    mechanicId: "1",
    date: "Dec 28",
    time: "1:00 PM",
    location: "987 Cedar Ln, San Francisco",
    price: 150,
    status: "completed",
    createdAt: "2023-12-28T13:00:00Z",
    notes: "Refrigerant leak fixed",
  },
  {
    id: "7",
    service: "Oil Change",
    mechanicName: "Sarah Johnson",
    mechanicId: "2",
    date: "Dec 15",
    time: "4:30 PM",
    location: "147 Birch St, San Francisco",
    price: 35,
    status: "cancelled",
    createdAt: "2023-12-15T16:30:00Z",
  },
];

export function useBookings() {
  const [currentBookings] = useState<Booking[]>(mockCurrentBookings);
  const [pastBookings] = useState<Booking[]>(mockPastBookings);

  const getBookingById = (id: string) => {
    const allBookings = [...currentBookings, ...pastBookings];
    return allBookings.find(booking => booking.id === id);
  };

  const getBookingsByMechanic = (mechanicId: string) => {
    const allBookings = [...currentBookings, ...pastBookings];
    return allBookings.filter(booking => booking.mechanicId === mechanicId);
  };

  const getBookingsByStatus = (status: Booking["status"]) => {
    const allBookings = [...currentBookings, ...pastBookings];
    return allBookings.filter(booking => booking.status === status);
  };

  const upcomingBookings = currentBookings.filter(booking => 
    ["pending", "confirmed"].includes(booking.status)
  );

  const activeBookings = currentBookings.filter(booking => 
    booking.status === "in-progress"
  );

  return {
    currentBookings,
    pastBookings,
    upcomingBookings,
    activeBookings,
    getBookingById,
    getBookingsByMechanic,
    getBookingsByStatus,
  };
}