import { Product, Gardener } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Heavy Duty Pruning Shears',
    category: 'Tools',
    price: 450,
    image: 'https://i.pinimg.com/1200x/75/f0/f7/75f0f7aa1f1faf0ef82e8048a1e1a57d.jpg',
    description: 'Sharp, durable carbon steel blades for precise cutting.',
    rating: 4.8
  },
  {
    id: 'p2',
    name: 'Brass Watering Can',
    category: 'Tools',
    price: 1200,
    image: 'https://i.pinimg.com/1200x/95/4d/bc/954dbcff7e6f8d186444ec7a7819ff46.jpg',
    description: 'Elegant vintage-style brass watering can for indoor plants.',
    rating: 4.9
  },
  {
    id: 'p3',
    name: 'Garden Trowel Set',
    category: 'Tools',
    price: 350,
    image: 'https://i.pinimg.com/736x/3f/86/6f/3f866f44df33839d34aa344d684d0bc1.jpg',
    description: 'Essential hand tools for digging, planting, and weeding.',
    rating: 4.6
  },
  {
    id: 'p4',
    name: 'Gardening Gloves',
    category: 'Tools',
    price: 200,
    image: 'https://i.pinimg.com/736x/a9/46/ef/a946efb1a0061f99ca6db661daaba067.jpg',
    description: 'Protective and breathable gloves for safe gardening.',
    rating: 4.5
  },
  {
    id: 'p5',
    name: 'Hand Rake',
    category: 'Tools',
    price: 150,
    image: 'https://i.pinimg.com/1200x/20/b5/06/20b506a753418d16cca0f5a0e3c0b26d.jpg',
    description: 'Perfect for loosening soil and removing weeds.',
    rating: 4.4
  },
  {
    id: 'p6',
    name: 'Terracotta Pot Set',
    category: 'Pots',
    price: 500,
    image: 'https://i.pinimg.com/1200x/69/4e/18/694e18f34126ba937aa41b6ad240bf9d.jpg',
    description: 'Classic breathable clay pots, set of 3 sizes.',
    rating: 4.7
  },
  {
    id: 'p7',
    name: 'Hanging Planter',
    category: 'Pots',
    price: 300,
    image: 'https://i.pinimg.com/1200x/e5/c0/14/e5c01409db735ab978425f21cbfeb521.jpg',
    description: 'Beautiful macrame hanging planter for balconies.',
    rating: 4.8
  },
  {
    id: 'p8',
    name: 'Ceramic Tabletop Pot',
    category: 'Pots',
    price: 400,
    image: 'https://i.pinimg.com/736x/f8/4e/c7/f84ec766b733ad49cc4996837803a637.jpg',
    description: 'Stylish glazed ceramic pot for indoor succulents.',
    rating: 4.6
  },
  {
    id: 'p9',
    name: 'Holy Basil (Tulsi) Seeds',
    category: 'Seeds',
    price: 50,
    image: 'https://i.pinimg.com/1200x/fb/48/1e/fb481e91971f21e94dbaed17fbef4bb4.jpg',
    description: 'High-quality seeds for growing sacred Tulsi at home.',
    rating: 4.9
  },
  {
    id: 'p10',
    name: 'Monstera Deliciosa',
    category: 'Plants',
    price: 850,
    image: 'https://i.pinimg.com/1200x/cb/68/a2/cb68a20cdb904bd8a4efac04e52d77de.jpg',
    description: 'The trendy Swiss Cheese Plant, perfect for indoors.',
    rating: 4.9
  },
  {
    id: 'p11',
    name: 'Snake Plant (Sansevieria)',
    category: 'Plants',
    price: 450,
    image: 'https://i.pinimg.com/736x/60/38/18/603818614b4a758c0b023a45bf243621.jpg',
    description: 'Hardy air-purifying plant that thrives in low light.',
    rating: 4.8
  },
  {
    id: 'p12',
    name: 'Areca Palm',
    category: 'Plants',
    price: 600,
    image: 'https://i.pinimg.com/1200x/c7/25/91/c725910b5b918a4139cf1a821fe4723b.jpg',
    description: 'Lush green palm for a tropical vibe in your living room.',
    rating: 4.7
  },
  {
    id: 'p13',
    name: 'Organic Vermicompost',
    category: 'Fertilizer',
    price: 350,
    image: 'https://i.pinimg.com/1200x/bb/a4/4e/bba44e26e21a5280c2b035667949876e.jpg',
    description: 'Nutrient-rich organic compost for healthy plant growth.',
    rating: 4.8
  },
  {
    id: 'p14',
    name: 'Potting Mix with Cocopeat',
    category: 'Soil',
    price: 299,
    image: 'https://i.pinimg.com/736x/7b/4e/93/7b4e93a7ed057c45ccc70e887373cb83.jpg',
    description: 'Premium soil mix with cocopeat for better water retention.',
    rating: 4.7
  },
  {
    id: 'p15',
    name: 'Neem Oil Spray',
    category: 'Care',
    price: 250,
    image: 'https://i.pinimg.com/736x/97/7d/6b/977d6b6b363b95c8c853bc781ad6b950.jpg',
    description: 'Natural pest repellent to keep your plants healthy.',
    rating: 4.6
  }
];

export const MOCK_GARDENERS: Gardener[] = [
  {
    id: 'g1',
    name: 'Rajesh Kumar',
    image: 'https://picsum.photos/200/200?random=10',
    pincode: '110001',
    experience: 10,
    rating: 4.9,
    ratePerHour: 300,
    expertise: ['Landscaping', 'Design'],
    bio: 'Expert in urban vegetable farming with over 10 years of experience.',
    availability: 'Mon-Fri'
  },
  {
    id: 'g2',
    name: 'Vikram Singh',
    image: 'https://picsum.photos/200/200?random=11',
    pincode: '400001',
    experience: 5,
    rating: 4.7,
    ratePerHour: 250,
    expertise: ['Lawn Care', 'Health'],
    bio: 'Specialist in Bonsai care and plant recovery.',
    availability: 'Weekends'
  },
  {
    id: 'g3',
    name: 'Anjali Desai',
    image: 'https://picsum.photos/200/200?random=12',
    pincode: '560001',
    experience: 8,
    rating: 5.0,
    ratePerHour: 400,
    expertise: ['Indoor Plants'],
    bio: 'Turning concrete balconies into lush green paradises.',
    availability: 'Tue-Thu'
  },
  {
    id: 'g4',
    name: 'Ramesh Gupta',
    image: 'https://picsum.photos/200/200?random=13',
    pincode: '110001',
    experience: 12,
    rating: 4.8,
    ratePerHour: 350,
    expertise: ['Vegetable Gardens'],
    bio: 'Professional landscape artist and lawn maintenance expert.',
    availability: 'Mon-Sat'
  }
];