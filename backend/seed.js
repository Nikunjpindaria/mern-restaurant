const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const dns = require('dns');
require('dotenv').config();

try {
  dns.setServers(['8.8.8.8', '8.8.4.4']);
} catch (e) {}

const schemaProduct = mongoose.Schema({
  name: String,
  category: String,
  image: String,
  price: String,
  description: String,
});
const productModel = mongoose.model('product', schemaProduct);

function getImageBase64(filename) {
  const filePath = path.join(__dirname, '..', 'frontend', 'src', 'assest', filename);
  if (!fs.existsSync(filePath)) return '';
  const ext = path.extname(filename).replace('.', '');
  const mimeType = ext === 'jpg' ? 'image/jpeg' : ext === 'webp' ? 'image/webp' : ext === 'avif' ? 'image/avif' : 'image/png';
  const buffer = fs.readFileSync(filePath);
  return 'data:' + mimeType + ';base64,' + buffer.toString('base64');
}

const sampleProducts = [
  {
    name: 'Fresh Veg Pizza',
    category: 'pizza',
    image: getImageBase64('Pizza.jpg'),
    price: '299',
    description: 'Delicious oven-baked pizza loaded with fresh veggies, cheese, and Italian herbs.',
  },
  {
    name: 'Cheese Burger',
    category: 'burger',
    image: getImageBase64('burger-king-whopper-with-cheese-png-image-purepng-20.png'),
    price: '149',
    description: 'Juicy burger with melted cheese slice, crisp lettuce, and signature sauce.',
  },
  {
    name: 'Masala Dosa',
    category: 'dosa',
    image: getImageBase64('dosa-masala.png'),
    price: '120',
    description: 'Crispy South Indian dosa served with spiced potato filling, coconut chutney, and sambar.',
  },
  {
    name: 'Paneer Butter Masala',
    category: 'panner',
    image: getImageBase64('paneer-butter-masala-1.webp'),
    price: '240',
    description: 'Rich and creamy cottage cheese curry cooked in a buttery tomato gravy.',
  },
  {
    name: 'Paneer Tikka',
    category: 'panner',
    image: getImageBase64('paneer-tikka.png'),
    price: '210',
    description: 'Tandoor-grilled marinated paneer cubes seasoned with chat masala.',
  },
  {
    name: 'Special Veg Fried Rice',
    category: 'rice',
    image: getImageBase64('fried rice.webp'),
    price: '180',
    description: 'Aromatic basmati rice stir-fried with garden vegetables and oriental spices.',
  },
  {
    name: 'Grilled Club Sandwich',
    category: 'sandwich',
    image: getImageBase64('Sandwich1.png'),
    price: '110',
    description: 'Triple-decker toasted sandwich packed with fresh veggies, cheese, and green chutney.',
  },
  {
    name: 'Ice Cream Cup',
    category: 'icream',
    image: getImageBase64('Ice-Cream-Cup.png'),
    price: '80',
    description: 'Creamy and refreshing ice cream scoop in a crispy cup.',
  },
  {
    name: 'Chocolate Birthday Cake',
    category: 'cake',
    image: getImageBase64('Birthday-cake-with-flowers.png'),
    price: '499',
    description: 'Decadent chocolate sponge layered with rich ganache and floral frosting.',
  },
  {
    name: 'Fresh Tomatoes',
    category: 'vegetable',
    image: getImageBase64('carrot red per kg - vegetables.jpg'),
    price: '40',
    description: 'Farm-fresh, organically grown red carrots rich in nutrients.',
  },
  {
    name: 'Crisp Cabbage',
    category: 'vegetable',
    image: getImageBase64('cabbage per pc - vegetables.jpg'),
    price: '30',
    description: 'Crunchy green cabbage freshly sourced from local organic farms.',
  },
  {
    name: 'Cauliflower',
    category: 'vegetable',
    image: getImageBase64('cauliflower 1 pc - vegetables.jpg'),
    price: '45',
    description: 'Pure white fresh cauliflower head, clean and chemical-free.',
  },
  {
    name: 'Green Peas',
    category: 'vegetable',
    image: getImageBase64('green peas - vegetables.jpg'),
    price: '60',
    description: 'Sweet and tender green garden peas.',
  },
  {
    name: 'Green Capsicum',
    category: 'vegetable',
    image: getImageBase64('green capsicum 500.jpg'),
    price: '50',
    description: 'Crisp green bell peppers ideal for salads, cooking, and pizzas.',
  },
  {
    name: 'Fresh Banana',
    category: 'fruits',
    image: getImageBase64('fresh-yellow-banana-fruit-free.png'),
    price: '60',
    description: 'Ripe, sweet yellow bananas packed with potassium and natural energy.',
  },
  {
    name: 'Sweet Mango',
    category: 'fruits',
    image: getImageBase64('mango-png-image-mongo-clipart-ripening-of-mango.png'),
    price: '150',
    description: 'Juicy, naturally ripened Alphonso mangoes.',
  },
  {
    name: 'Red Watermelon',
    category: 'fruits',
    image: getImageBase64('watermelon - fruits.jpg'),
    price: '90',
    description: 'Crisp, sweet and hydrating whole watermelon.',
  }
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URL);
  console.log('Connected to MongoDB Atlas...');
  await productModel.deleteMany({});
  console.log('Cleared existing products.');
  const inserted = await productModel.insertMany(sampleProducts);
  console.log('Successfully inserted ' + inserted.length + ' sample products with images!');
  process.exit(0);
}

seed().catch(err => {
  console.error('Seed error:', err);
  process.exit(1);
});
