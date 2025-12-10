import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, CartItem, Product, Order, Appointment, Gardener } from '../types';

interface GlobalContextType {
  user: User | null;
  cart: CartItem[];
  orders: Order[];
  appointments: Appointment[];
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
  updateUser: (updatedData: Partial<User>) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  placeOrder: () => void;
  bookAppointment: (gardener: Gardener, date: string, time: string, description: string) => void;
  notifications: { message: string; type: 'success' | 'error' } | null;
  showNotification: (message: string, type: 'success' | 'error') => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [notifications, setNotifications] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const login = (userData: User) => {
    setUser(userData);
    showNotification(`Welcome back, ${userData.name}!`, 'success');
  };

  const logout = () => {
    setUser(null);
    setCart([]);
    setOrders([]);
    setAppointments([]);
    showNotification('Logged out successfully', 'success');
  };

  const updateUser = (updatedData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updatedData });
      showNotification('Profile updated successfully', 'success');
    }
  };

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showNotification('Added to cart', 'success');
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearCart = () => setCart([]);

  const placeOrder = () => {
    if (!user) return;
    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      date: new Date().toLocaleDateString(),
      items: [...cart],
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      status: 'Processing',
    };
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    showNotification('Order placed successfully! Check your profile.', 'success');
  };

  const bookAppointment = (gardener: Gardener, date: string, time: string, description: string) => {
    if (!user) return;
    const newAppt: Appointment = {
      id: `APT-${Date.now()}`,
      gardenerName: gardener.name,
      gardenerId: gardener.id,
      date: date,
      time: time,
      description: description,
      status: 'Confirmed',
      pincode: gardener.pincode
    };
    setAppointments((prev) => [newAppt, ...prev]);
    showNotification(`Appointment confirmed with ${gardener.name}!`, 'success');
  };

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotifications({ message, type });
    setTimeout(() => setNotifications(null), 3000);
  };

  return (
    <GlobalContext.Provider
      value={{
        user,
        cart,
        orders,
        appointments,
        isAuthenticated: !!user,
        login,
        logout,
        updateUser,
        addToCart,
        removeFromCart,
        clearCart,
        placeOrder,
        bookAppointment,
        notifications,
        showNotification,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (!context) throw new Error('useGlobal must be used within a GlobalProvider');
  return context;
};