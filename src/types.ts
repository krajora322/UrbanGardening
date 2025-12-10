export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  rating: number;
}

export interface Gardener {
  id: string;
  name: string;
  image: string;
  pincode: string;
  experience: number;
  rating: number;
  ratePerHour: number;
  expertise: string[];
  bio: string;
  availability: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered';
}

export interface Appointment {
  id: string;
  gardenerName: string;
  gardenerId: string;
  date: string;
  time: string;
  description: string;
  status: 'Confirmed' | 'Completed' | 'Cancelled';
  pincode: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  pincode?: string;
  profileImage?: string;
}