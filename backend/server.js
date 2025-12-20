const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const bcrypt = require('bcrypt');
const path = require('path');

const app = express();
const PORT = 5001;

app.use(cors());
app.use(bodyParser.json());


app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

const USERS_FILE = './users.json';


app.post('/api/register', async (req, res) => {
    const { fullName, email, password } = req.body;

    // 1. Backend Doğrulaması
    if (!fullName || !email || !password) {
        return res.status(400).json({ error: "All fields are required!" });
    }
    if (password.length < 6) {
        return res.status(400).json({ error: "Password must be at least 6 characters." });
    }

    // 2. Mevcut kullanıcıları oku
    let users = [];
    if (fs.existsSync(USERS_FILE)) {
        const data = fs.readFileSync(USERS_FILE);
        users = JSON.parse(data);
    }

    // 3. Email kontrolü (Aynı email ile tekrar kayıt olunamaz)
    const userExists = users.find(user => user.email === email);
    if (userExists) {
        return res.status(400).json({ error: "Email already exists!" });
    }

    try {
        // 4. GÜVENLİK: Şifreyi Hash'le (Asla plain-text kaydetme!)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 5. Yeni kullanıcıyı oluştur
        const newUser = {
            id: Date.now(),
            fullName,
            email,
            password: hashedPassword, // Hashlenmiş şifre kaydedilir
            createdAt: new Date()
        };

        // 6. Veritabanına yaz
        users.push(newUser);
        fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

        console.log("New user registered:", email);
        res.status(201).json({ message: "Registration successful!" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error during registration." });
    }
});


// --- LOGIN ENDPOINT ---
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    // 1. Basit doğrulama
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required!" });
    }

    // 2. Kullanıcıları dosradan oku
    let users = [];
    if (fs.existsSync(USERS_FILE)) {
        const data = fs.readFileSync(USERS_FILE);
        users = JSON.parse(data);
    }

    // 3. Kullanıcıyı bul
    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(400).json({ error: "Invalid email or password." });
    }

    try {
        // 4. Şifreyi Doğrula (Hash kontrolü)
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ error: "Invalid email or password." });
        }

        // 5. Giriş Başarılı! (Burada normalde JWT token döneriz ama şimdilik basit tutalım)
        res.json({
            message: "Login successful!",
            user: { fullName: user.fullName, email: user.email }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error." });
    }
});


// --- ID'YE GÖRE SIRALANMIŞ ÜRÜN LİSTESİ ---
const products = [
    { id: 1, img: "http://localhost:5001/images/newProducts1.jpeg", name: "Brown Suede Jacket", price: "$99.99" },
    { id: 2, img: "http://localhost:5001/images/newProducts2.jpeg", name: "Cream Belted Cape", price: "$89.99" },
    { id: 3, img: "http://localhost:5001/images/newProducts3.jpeg", name: "Beige Corduroy Puffer", price: "$109.99" },
    { id: 4, img: "http://localhost:5001/images/newProducts4.png", name: "Light Grey Puffer", price: "$84.99" },
    { id: 5, img: "http://localhost:5001/images/newProducts5.png", name: "Brown Chelsea Boots", price: "$109.99" },
    { id: 6, img: "http://localhost:5001/images/newProducts6.png", name: "Dark Brown Leather Bag", price: "$79.99" },
    { id: 7, img: "http://localhost:5001/images/newProducts7.jpeg", name: "Cream Puffer Jacket", price: "$114.99" },
    { id: 8, img: "http://localhost:5001/images/newProducts8.jpeg", name: "Brown Half-Zip Set", price: "$64.99" },
    { id: 9, img: "http://localhost:5001/images/newProducts10.jpeg", name: "Grey Off-Shoulder Dress", price: "$69.99" },
    { id: 10, img: "http://localhost:5001/images/newProducts9.jpeg", name: "Burgundy Leather Gloves", price: "$119.99" },
    { id: 11, img: "http://localhost:5001/images/newProducts12.jpeg", name: "Brown Slim Glasses", price: "$69.99" },
    { id: 12, img: "http://localhost:5001/images/newProducts13.jpeg", name: "Burgundy Faux Fur Coat", price: "$109.99" },
    { id: 13, img: "http://localhost:5001/images/newProducts11.jpeg", name: "Navy Blue Shirt", price: "$54.99" },
    { id: 14, img: "http://localhost:5001/images/newProducts15.jpeg", name: "Black Knee-High Boots", price: "119.99" },
    { id: 15, img: "http://localhost:5001/images/newProducts14.jpeg", name: "Black Long Coat", price: "$134.99" },
    { id: 16, img: "http://localhost:5001/images/newProducts17.jpeg", name: "Beige Beret", price: "$29.99" },
    { id: 17, img: "http://localhost:5001/images/newProducts16.jpeg", name: "Dark Brown Wide-Leg Trousers", price: "$79.99" },
    { id: 18, img: "http://localhost:5001/images/wpants2.jpeg", name: "Grey Pleated Trousers", price: "$69.99" },
    { id: 19, img: "http://localhost:5001/images/newProducts19.jpeg", name: "Green Knit Sweater", price: "$84.99" },
    { id: 20, img: "http://localhost:5001/images/newProducts21.jpeg", name: "Olive Maxi Skirt", price: "$74.99" },

    { id: 21, img: "http://localhost:5001/images/Sales1.jpeg", name: "White Floral Mini Dress", price: "$79.99", oldprice: "$99.99" },
    { id: 22, img: "http://localhost:5001/images/Sales2.jpeg", name: "Beige Shorts and Shirt Set", price: "$89.99", oldprice: "$119.99" },
    { id: 23, img: "http://localhost:5001/images/Sales3.jpeg", name: "Denim Short Jumpsuit", price: "$49.99", oldprice: "$69.99" },
    { id: 24, img: "http://localhost:5001/images/Sales4.jpeg", name: "Green Sandals", price: "$64.99", oldprice: "$84.99" },
    { id: 25, img: "http://localhost:5001/images/Sales5.jpeg", name: "Beige Fabric Pants", price: "$44.99", oldprice: "$59.99" },
    { id: 26, img: "http://localhost:5001/images/Sales6.jpeg", name: "Yellow Floral Long Skirt", price: "$64.99", oldprice: "$79.99" },
    { id: 27, img: "http://localhost:5001/images/Sales7.jpeg", name: "Straw Hat", price: "$49.99", oldprice: "$64.99" },
    { id: 28, img: "http://localhost:5001/images/Sales8.jpeg", name: "Brown Frame Oval Glasses", price: "$89.99", oldprice: "$119.99" },
    { id: 29, img: "http://localhost:5001/images/Sales9.jpeg", name: "Butter Yellow Strappy Dress", price: "$94.99", oldprice: "$129.99" },
    { id: 30, img: "http://localhost:5001/images/Sales10.jpeg", name: "Green Halter Top", price: "$79.99", oldprice: "$99.99" },
    { id: 31, img: "http://localhost:5001/images/Sales11.jpeg", name: "Light Blue Knit T-Shirt", price: "$59.99", oldprice: "$74.99" },
    { id: 32, img: "http://localhost:5001/images/Sales12.jpeg", name: "Brown Draped Mini Skirt", price: "$54.99", oldprice: "$69.99" },
    { id: 33, img: "http://localhost:5001/images/Sales13.jpeg", name: "Cream Shorts", price: "$44.99", oldprice: "$59.99" },
    { id: 34, img: "http://localhost:5001/images/Sales14.jpeg", name: "Gray Loose Sweatpants", price: "$69.99", oldprice: "$89.99" },
    { id: 35, img: "http://localhost:5001/images/Sales15.jpeg", name: "Silver Chain Connected Rings", price: "$39.99", oldprice: "$49.99" },
    { id: 36, img: "http://localhost:5001/images/Sales16.jpeg", name: "Woven Straw Bag", price: "$79.99", oldprice: "$99.99" },
    { id: 37, img: "http://localhost:5001/images/Sales17.jpeg", name: "White Belted Blouse", price: "$99.99", oldprice: "$129.99" },
    { id: 38, img: "http://localhost:5001/images/Sales18.jpeg", name: "Black Ballet Flats", price: "$49.99", oldprice: "$64.99" },
    { id: 39, img: "http://localhost:5001/images/Sales19.jpeg", name: "White Sleeveless Blouse", price: "$84.99", oldprice: "$109.99" },
    { id: 40, img: "http://localhost:5001/images/Sales20.jpeg", name: "Cream Raincoat", price: "$109.99", oldprice: "$149.99" },

    { id: 41, img: "http://localhost:5001/images/dress5.jpeg", name: "Slit-Front Cobalt Satin Dress", price: "$109.99" },
    { id: 42, img: "http://localhost:5001/images/dress6.jpeg", name: "Thick-Strap Brown Maxi Dress", price: "$84.99" },
    { id: 43, img: "http://localhost:5001/images/dress7.jpeg", name: "Pink Floral Ruffled Dress", price: "$84.99" },
    { id: 44, img: "http://localhost:5001/images/dress8.jpeg", name: "White Cherry Patterned Dress", price: "$69.99" },
    { id: 45, img: "http://localhost:5001/images/dress9.jpeg", name: "Light Pink Tulle Mini Dress", price: "$89.99" },
    { id: 46, img: "http://localhost:5001/images/dress10.jpeg", name: "Cream Satin Dress ", price: "$129.99" },
    { id: 47, img: "http://localhost:5001/images/dress11.jpeg", name: "Green Dress with Gathered", price: "$109.99" },
    { id: 48, img: "http://localhost:5001/images/dress12.jpeg", name: "White Dress with Gold Buttons", price: "$99.99" },
    { id: 49, img: "http://localhost:5001/images/dress13.jpeg", name: "Baby Blue Off-Shoulder Dress", price: "$79.99" },
    { id: 50, img: "http://localhost:5001/images/dress14.jpeg", name: "Brown Shoulder Detailed Dress", price: "$104.99" },
    { id: 51, img: "http://localhost:5001/images/dress15.jpeg", name: "White V-Neck Knit Dress", price: "$114.99" },
    { id: 52, img: "http://localhost:5001/images/dress16.jpeg", name: "Red White Gingham Button Dress", price: "$69.99" },
    { id: 53, img: "http://localhost:5001/images/dress17.jpeg", name: "Sleeveless Green Dress", price: "$129.99" },
    { id: 54, img: "http://localhost:5001/images/dress18.jpeg", name: "Baby Blue Tulle Dress", price: "$149.99" },
    { id: 55, img: "http://localhost:5001/images/dress19.jpeg", name: "White Mini Dress ", price: "$124.99" },
    { id: 56, img: "http://localhost:5001/images/dress20.jpeg", name: "Brown Suede Long Dress ", price: "$109.99" },


    { id: 57, img: "http://localhost:5001/images/Shoe4.jpeg", name: "Burgundy Platform Mary Jane", price: "$89.99" },
    { id: 58, img: "http://localhost:5001/images/Shoe5.jpeg", name: "Black Pointy Sock Boot", price: "$109.99" },
    { id: 59, img: "http://localhost:5001/images/Shoe6.jpeg", name: "Brown Suede Lace-Up Shoes", price: "$84.99" },
    { id: 60, img: "http://localhost:5001/images/Shoe7.jpeg", name: "Black Pointed Toe Heels", price: "$84.99" },
    { id: 61, img: "http://localhost:5001/images/Shoe8.jpeg", name: "Burgundy Square Toe Sandals", price: "$69.99" },
    { id: 62, img: "http://localhost:5001/images/Shoe9.jpeg", name: "Leopard Stiletto Pump", price: "$89.99" },
    { id: 63, img: "http://localhost:5001/images/Shoe10.jpeg", name: "Retro High-Top Sneaker", price: "$129.99" },
    { id: 64, img: "http://localhost:5001/images/Shoe11.jpeg", name: "Black Ankle Strap Sandal", price: "$109.99" },
    { id: 65, img: "http://localhost:5001/images/Shoe12.jpeg", name: "Floral Print Flats", price: "$99.99" },
    { id: 66, img: "http://localhost:5001/images/Shoe13.jpeg", name: "Rose Lace-Up Heels", price: "$79.99" },
    { id: 67, img: "http://localhost:5001/images/Shoe14.jpeg", name: "White Sneaker", price: "$104.99" },
    { id: 68, img: "http://localhost:5001/images/Shoe15.jpeg", name: "Black Single Strap Stiletto", price: "$114.99" },
    { id: 69, img: "http://localhost:5001/images/Shoe16.jpeg", name: "Pink Pastel Heart Sneaker", price: "$69.99" },
    { id: 70, img: "http://localhost:5001/images/Shoe17.jpeg", name: "Brown Square Toe Block Heel", price: "$129.99" },
    { id: 71, img: "http://localhost:5001/images/Shoe18.jpeg", name: "Wine Tall Boot", price: "$149.99" },
    { id: 72, img: "http://localhost:5001/images/Shoe19.jpeg", name: "Metallic Stiletto", price: "$124.99" },
    { id: 73, img: "http://localhost:5001/images/Shoe20.jpeg", name: "White Glitter Sneaker", price: "$109.99" },


    { id: 74, img: "http://localhost:5001/images/skirt4.jpeg", name: "Gray High Slit Wool Skirt", price: "$89.99" },
    { id: 75, img: "http://localhost:5001/images/skirt5.jpeg", name: "Pink Pleated Mini Skirt", price: "$59.99" },
    { id: 76, img: "http://localhost:5001/images/skirt6.jpeg", name: "Polka Dot Tiered Maxi Skirt", price: "$104.99" },
    { id: 77, img: "http://localhost:5001/images/skirt7.jpeg", name: "Buckle Detail Mini Skirt", price: "$74.99" },
    { id: 78, img: "http://localhost:5001/images/skirt8.jpeg", name: "Cargo Pocket Pleated Mini Skirt", price: "$69.99" },
    { id: 79, img: "http://localhost:5001/images/skirt9.jpeg", name: "White Lace Maxi Skirt", price: "44.99" },
    { id: 80, img: "http://localhost:5001/images/skirt10.jpeg", name: "High-Waist Leopard Maxi Skirt", price: "$79.99" },
    { id: 81, img: "http://localhost:5001/images/skirt11.jpeg", name: "Tiered Ruffle Maxi Skirt", price: "$64.99" },
    { id: 82, img: "http://localhost:5001/images/skirt12.jpeg", name: "Fringe Suede Maxi Skirt", price: "$59.99" },
    { id: 83, img: "http://localhost:5001/images/skirt13.jpeg", name: "Pink Sparkle Mini Skirt", price: "$99.99" },
    { id: 84, img: "http://localhost:5001/images/skirt14.jpeg", name: "Black Tulle Layered Skirt", price: "$84.99" },
    { id: 85, img: "http://localhost:5001/images/skirt15.jpeg", name: "Lilac Satin Bias Cut Skirt", price: "$74.99" },
    { id: 86, img: "http://localhost:5001/images/skirt16.jpeg", name: "High-Low Denim Maxi Skirt", price: "$64.99" },
    { id: 87, img: "http://localhost:5001/images/skirt17.jpeg", name: "Cream Ribbed Knit Maxi Skirt", price: "$99.99" }, // Sales listesindeki 87 ile çakışıyordu, burası Skirt kategorisinde
    { id: 88, img: "http://localhost:5001/images/skirt18.jpeg", name: "High-Waist Camel Mini Skirt", price: "$49.99" },
    { id: 89, img: "http://localhost:5001/images/skirt19.jpeg", name: "Voluminous Tulle Long Skirt", price: "$84.99" }, // Sales listesindeki 89 ile çakışıyordu
    { id: 90, img: "http://localhost:5001/images/skirt20.jpeg", name: "Cream A-Line Skirt", price: "$59.99" },


    { id: 91, img: "http://localhost:5001/images/Blouse4.jpeg", name: "Dark Brown Wrap Shirt", price: "$89.99" },
    { id: 92, img: "http://localhost:5001/images/Blouse5.jpeg", name: "Sage Green Cape Blouse", price: "$79.99" },
    { id: 93, img: "http://localhost:5001/images/Blouse6.jpeg", name: "Grey Strapless Top", price: "$74.99" },
    { id: 94, img: "http://localhost:5001/images/Blouse7.jpeg", name: "Checkered Ribbon Top", price: "$54.99" },
    { id: 95, img: "http://localhost:5001/images/Blouse8.jpeg", name: "Black Rose Detail Top", price: "$79.99" },
    { id: 96, img: "http://localhost:5001/images/Blouse9.jpeg", name: "Green Satin Top", price: "84.99" },
    { id: 97, img: "http://localhost:5001/images/Blouse10.jpeg", name: "Cream Satin Shirt", price: "$79.99" },
    { id: 98, img: "http://localhost:5001/images/Blouse11.jpeg", name: "Dark Brown Ruched Top", price: "$54.99" },
    { id: 99, img: "http://localhost:5001/images/Blouse12.jpeg", name: "Cream Corset Blouse", price: "$79.99" },
    { id: 100, img: "http://localhost:5001/images/Blouse13.jpeg", name: "Beige Ribbed Knit Top", price: "$69.99" },
    { id: 101, img: "http://localhost:5001/images/Blouse14.jpeg", name: "Light Blue Satin Shirt", price: "$84.99" },
    { id: 102, img: "http://localhost:5001/images/Blouse15.jpeg", name: "Cream Off-Shoulder Top", price: "$104.99" },
    { id: 103, img: "http://localhost:5001/images/Blouse16.jpeg", name: "Dark Brown Turtleneck", price: "$84.99" },
    { id: 104, img: "http://localhost:5001/images/Blouse17.jpeg", name: "Blue Tie-Front Blouse", price: "$74.99" },
    { id: 105, img: "http://localhost:5001/images/Blouse18.jpeg", name: "Red Striped Halter Top", price: "$59.99" },
    { id: 106, img: "http://localhost:5001/images/Blouse19.jpeg", name: "White Asymmetric Top", price: "$89.99" },
    { id: 107, img: "http://localhost:5001/images/Blouse20.jpeg", name: "Dark Grey Collared Sweatshirt", price: "$84.99" },


    { id: 109, img: "http://localhost:5001/images/wpants3.jpeg", name: "Green Corduroy Pants", price: "$74.99" },
    { id: 110, img: "http://localhost:5001/images/wpants4.jpeg", name: "Blue Wide-Leg Jeans", price: "$69.99" },
    { id: 111, img: "http://localhost:5001/images/wpants5.jpeg", name: "Grey Asymmetric Trousers", price: "$94.99" },
    { id: 112, img: "http://localhost:5001/images/wpants6.jpeg", name: "Khaki Parachute Pants", price: "$74.99" },
    { id: 113, img: "http://localhost:5001/images/wpants7.jpeg", name: "Cream Flared Trousers", price: "$54.99" },
    { id: 114, img: "http://localhost:5001/images/wpants8.jpeg", name: "Pink Utility Cargo Pants", price: "$89.99" },
    { id: 115, img: "http://localhost:5001/images/wpants9.jpeg", name: "Tan Wide-Leg Jeans", price: "64.99" },
    { id: 116, img: "http://localhost:5001/images/wpants10.jpeg", name: "Burgundy Tailored Trousers", price: "$69.99" },
    { id: 117, img: "http://localhost:5001/images/wpants11.jpeg", name: "Black Lace-Trim Pants", price: "$104.99" },
    { id: 118, img: "http://localhost:5001/images/wpants12.jpeg", name: "Grey Acid-Wash Cargo Jeans", price: "69.99" },
    { id: 119, img: "http://localhost:5001/images/wpants13.jpeg", name: "Dark Blue Flare Jeans", price: "$54.99" },
    { id: 120, img: "http://localhost:5001/images/wpants14.jpeg", name: "Black Striped Sweatpants", price: "$54.99" },
    { id: 121, img: "http://localhost:5001/images/wpants15.jpeg", name: "Burgundy Leather Trousers", price: "$79.99" },
    { id: 122, img: "http://localhost:5001/images/wpants16.jpeg", name: "Silver Sequin Wide-Leg Pants", price: "$109.99" },
    { id: 123, img: "http://localhost:5001/images/wpants17.jpeg", name: "Brown Drawstring Sweatpants", price: "$49.99" },
    { id: 124, img: "http://localhost:5001/images/wpants18.jpeg", name: "Grey Striped Palazzo Pants", price: "$79.99" },
    { id: 125, img: "http://localhost:5001/images/wpants19.jpeg", name: "Black Sheer Ruffle Trousers", price: "$84.99" },
    { id: 126, img: "http://localhost:5001/images/wpants20.jpeg", name: "Abstract Print Wide-Leg Jeans", price: "$74.99" },


    { id: 127, img: "http://localhost:5001/images/wouterwear5.jpeg", name: "Brown Cropped Trench Jacket", price: "$129.99" },
    { id: 128, img: "http://localhost:5001/images/wouterwear6.jpeg", name: "White Colorblock Racer Jacket", price: "$99.99" },
    { id: 129, img: "http://localhost:5001/images/wouterwear7.jpeg", name: "Camel Corduroy Jacket", price: "$84.99" },
    { id: 130, img: "http://localhost:5001/images/wouterwear8.jpeg", name: "Black Shearling Biker Jacket", price: "$109.99" },
    { id: 131, img: "http://localhost:5001/images/wouterwear9.jpeg", name: "Blue Hooded Puffer Coat", price: "104.99" },
    { id: 132, img: "http://localhost:5001/images/wouterwear10.jpeg", name: "Beige Belted Trench Coat", price: "99.99" },
    { id: 133, img: "http://localhost:5001/images/wouterwear11.jpeg", name: "Burgundy Leather Jacket", price: "$94.99" },
    { id: 134, img: "http://localhost:5001/images/wouterwear12.jpeg", name: "Dark Brown Zip-Up Hoodie", price: "$59.99" },
    { id: 135, img: "http://localhost:5001/images/wouterwear13.jpeg", name: "Dark Blue Belted Denim Jacket", price: "$79.99" },
    { id: 136, img: "http://localhost:5001/images/wouterwear14.jpeg", name: "Brown Shearling Aviator Jacket", price: "$94.99" },
    { id: 137, img: "http://localhost:5001/images/wouterwear15.jpeg", name: "Brown Suede Belted Jacket", price: "$84.99" },
    { id: 138, img: "http://localhost:5001/images/wouterwear16.jpeg", name: "Burgundy Leather Trench Coat", price: "139.99" },
    { id: 139, img: "http://localhost:5001/images/wouterwear17.jpeg", name: "Beige Long Trench Coat", price: "$119.99" },
    { id: 140, img: "http://localhost:5001/images/wouterwear18.jpeg", name: "Cream Belted Puffer Coat", price: "$114.99" },
    { id: 141, img: "http://localhost:5001/images/wouterwear19.jpeg", name: "Grey Wrap Blazer Jacket", price: "$84.99" },
    { id: 142, img: "http://localhost:5001/images/wouterwear20.jpeg", name: "Navy Blue Cape Coat", price: "$74.99" },


    { id: 143, img: "http://localhost:5001/images/bag3.jpeg", name: "Tan Leather Crescent Bag", price: "$74.99" },
    { id: 144, img: "http://localhost:5001/images/bag4.jpeg", name: "Red Rectangular Bag", price: "$59.99" },
    { id: 145, img: "http://localhost:5001/images/bag5.jpeg", name: "Brown Suede Tote Bag", price: "$89.99" },
    { id: 146, img: "http://localhost:5001/images/bag6.jpeg", name: "Dark Brown Top-Handle Bag", price: "$99.99" },
    { id: 147, img: "http://localhost:5001/images/bag7.jpeg", name: "Olive Green Crossbody Bag", price: "$64.99" },
    { id: 148, img: "http://localhost:5001/images/bag8.jpeg", name: "Beige Canvas Bucket Bag", price: "$79.99" },
    { id: 149, img: "http://localhost:5001/images/bag9.jpeg", name: "Brown Leather Belt Bag", price: "54.99" },
    { id: 150, img: "http://localhost:5001/images/bag10.jpeg", name: "Pink Nylon Duffle Bag", price: "$104.99" },
    { id: 151, img: "http://localhost:5001/images/bag11.jpeg", name: "Burgundy Multi-Pocket Bag", price: "$84.99" },
    { id: 152, img: "http://localhost:5001/images/bag12.jpeg", name: "Olive Green Chain Hobo Bag", price: "$79.99" },
    { id: 153, img: "http://localhost:5001/images/bag13.jpeg", name: "Black Geometric Tote Bag", price: "$69.99" },
    { id: 154, img: "http://localhost:5001/images/bag14.jpeg", name: "Cream Leather Bag", price: "$64.99" },
    { id: 155, img: "http://localhost:5001/images/bag15.jpeg", name: "Beige Faux Fur Bag", price: "$84.99" },
    { id: 156, img: "http://localhost:5001/images/bag16.jpeg", name: "Black & Pink Star Bag", price: "$79.99" },
    { id: 157, img: "http://localhost:5001/images/bag17.jpeg", name: "Leopard Print Bag", price: "$89.99" },
    { id: 158, img: "http://localhost:5001/images/bag18.jpeg", name: "Red Tapestry Flap Bag", price: "$74.99" },
    { id: 159, img: "http://localhost:5001/images/bag19.jpeg", name: "Brown Fringe Suede Bag", price: "$79.99" },
    { id: 160, img: "http://localhost:5001/images/bag20.jpeg", name: "Blue Denim Ruffle Tote", price: "$74.99" },


    { id: 161, img: "http://localhost:5001/images/waccessories6.jpeg", name: "Gold & Green Watch", price: "$99.99" },
    { id: 162, img: "http://localhost:5001/images/waccessories7.jpeg", name: "Beige Fur Earmuffs", price: "$64.99" },
    { id: 163, img: "http://localhost:5001/images/waccessories8.jpeg", name: "Cream Knit Scarf", price: "$69.99" },
    { id: 164, img: "http://localhost:5001/images/waccessories9.jpeg", name: "Gold Spiral Arm Cuff", price: "44.99" },
    { id: 165, img: "http://localhost:5001/images/waccessories10.jpeg", name: "Brown Knit Hood", price: "$49.99" },
    { id: 166, img: "http://localhost:5001/images/waccessories11.jpeg", name: "Silver Layered Chain Belt", price: "$44.99" },
    { id: 167, img: "http://localhost:5001/images/waccessories12.jpeg", name: "Burgundy Gold Flower Necklace", price: "$89.99" },
    { id: 168, img: "http://localhost:5001/images/waccessories13.jpeg", name: "Gold Oval Retro Sunglasses", price: "$69.99" },
    { id: 169, img: "http://localhost:5001/images/waccessories14.jpeg", name: "Gold Pave Heart Ring", price: "$34.99" },
    { id: 170, img: "http://localhost:5001/images/waccessories15.jpeg", name: "Green Tie-Dye Satin Headscarf", price: "$34.99" },
    { id: 171, img: "http://localhost:5001/images/waccessories16.jpeg", name: "Beige Baseball Cap", price: "$39.99" },
    { id: 172, img: "http://localhost:5001/images/waccessories17.jpeg", name: "Brown Suede Belt", price: "$49.99" },
    { id: 173, img: "http://localhost:5001/images/waccessories18.jpeg", name: "Sunburst Pendant Necklace", price: "$54.99" },
    { id: 174, img: "http://localhost:5001/images/waccessories19.jpeg", name: "Gold Circle Hair Clip", price: "$34.99" },
    { id: 175, img: "http://localhost:5001/images/waccessories20.jpeg", name: "Gold Wire-Frame Glasses", price: "$69.99" },
    { id: 176, img: "http://localhost:5001/images/waccessories4.jpeg", name: "Gold Dragonfly Hair Pins", price: "$24.99" },


    { id: 177, img: "http://localhost:5001/images/mostPopular2.jpeg", name: "Black Bomber Jacket", price: "$79.99" }, // ID 177 (Mükerrerdi, düzeltildi)
    { id: 178, img: "http://localhost:5001/images/mostPopular3.jpeg", name: "Brown Coat", price: "$129.99" },
    { id: 179, img: "http://localhost:5001/images/mostPopular4.jpeg", name: "Dark Grey Loose Suit", price: "$144.99" },
    { id: 180, img: "http://localhost:5001/images/mostPopular5.jpeg", name: "Black Leather Blazer", price: "$74.99" },
    { id: 181, img: "http://localhost:5001/images/mostPopular6.jpeg", name: "Beige Trench Coat", price: "$104.99" },
    { id: 183, img: "http://localhost:5001/images/mostPopular8.jpeg", name: "Brown Platform Boots", price: "$84.99" },
    { id: 184, img: "http://localhost:5001/images/mostPopular9.jpeg", name: "Brown Suede Jacket", price: "$94.99" },
    { id: 185, img: "http://localhost:5001/images/mostPopular10.jpeg", name: "Brown Square Watch", price: "$119.99" },
    { id: 186, img: "http://localhost:5001/images/mostPopular11.jpeg", name: "Cream Fuzzy Sweater", price: "$79.99" },


    { id: 187, img: "http://localhost:5001/images/wshorts1.jpeg", name: "Olive Green Belted Shorts", price: "69.99" },
    { id: 188, img: "http://localhost:5001/images/wshorts2.jpeg", name: "Frayed Denim Shorts", price: "$59.99" },
    { id: 189, img: "http://localhost:5001/images/wshorts3.jpeg", name: "Purple Colorblock Sweat Shorts", price: "$39.99" },
    { id: 190, img: "http://localhost:5001/images/wshorts4.jpeg", name: "Beige Buttoned Skort", price: "$89.99" },
    { id: 191, img: "http://localhost:5001/images/wshorts5.jpeg", name: "Dark Green Lace-Up Shorts", price: "$64.99" },
    { id: 192, img: "http://localhost:5001/images/wshorts6.jpeg", name: "Burgundy Cargo Skort", price: "$44.99" },
    { id: 193, img: "http://localhost:5001/images/wshorts7.jpeg", name: "Dark Grey Pleated Skort", price: "$69.99" },
    { id: 194, img: "http://localhost:5001/images/wshorts8.jpeg", name: "Sage Green Overlay Shorts", price: "$64.99" },
    { id: 195, img: "http://localhost:5001/images/wshorts9.jpeg", name: "Navy Buttoned Shorts", price: "$54.99" },
    { id: 196, img: "http://localhost:5001/images/wshorts10.jpeg", name: "Black Studded Leather Skort", price: "$99.99" },
    { id: 197, img: "http://localhost:5001/images/wshorts11.jpeg", name: "Hot Pink Athletic Shorts", price: "$59.99" },
    { id: 198, img: "http://localhost:5001/images/wshorts12.jpeg", name: "Royal Blue Tailored Shorts", price: "$54.99" },
    { id: 199, img: "http://localhost:5001/images/wshorts13.jpeg", name: "Lilac High-Waist Shorts", price: "$44.99" },
    { id: 200, img: "http://localhost:5001/images/wshorts14.jpeg", name: "Mauve Pleated Shorts", price: "$59.99" },
    { id: 201, img: "http://localhost:5001/images/wshorts15.jpeg", name: "Black Leather Shorts", price: "$89.99" },
    { id: 202, img: "http://localhost:5001/images/wshorts16.jpeg", name: "Yellow Roll-Hem Denim Shorts", price: "$69.99" },
    { id: 203, img: "http://localhost:5001/images/wshorts17.jpeg", name: "Brown Cut-Out Cargo Shorts", price: "$89.99" },
    { id: 204, img: "http://localhost:5001/images/wshorts18.jpeg", name: "Lace-Up Denim Shorts", price: "$79.99" },
    { id: 205, img: "http://localhost:5001/images/wshorts19.jpeg", name: "Pink Corduroy Shorts", price: "$74.99" },
    { id: 206, img: "http://localhost:5001/images/wshorts20.jpeg", name: "Lace-Trim Denim Skort", price: "$99.99" },


    { id: 207, img: "http://localhost:5001/images/manTshirt4.jpeg", name: "Taupe Crewneck Sweatshirt", price: "69.99" },
    { id: 208, img: "http://localhost:5001/images/manTshirt5.jpeg", name: "Olive Green Oversized T-Shirt", price: "$59.99" },
    { id: 209, img: "http://localhost:5001/images/manTshirt6.jpeg", name: "Beige Crewneck Knit Sweater", price: "$89.99" },
    { id: 210, img: "http://localhost:5001/images/manTshirt7.jpeg", name: "White Back-Print T-Shirt", price: "$49.99" },
    { id: 211, img: "http://localhost:5001/images/manTshirt8.jpeg", name: "Light Blue Button-Up Shirt", price: "$64.99" },
    { id: 212, img: "http://localhost:5001/images/manTshirt9.jpeg", name: "Checkerboard Sweater", price: "$94.99" },
    { id: 213, img: "http://localhost:5001/images/manTshirt10.jpeg", name: "White Text Graphic T-Shirt", price: "$54.99" },
    { id: 214, img: "http://localhost:5001/images/manTshirt11.jpeg", name: "Grey Long-Sleeve Polo Sweater", price: "$69.99" },
    { id: 215, img: "http://localhost:5001/images/manTshirt12.jpeg", name: "Burgundy Short-Sleeve Shirt", price: "$54.99" },
    { id: 216, img: "http://localhost:5001/images/manTshirt13.jpeg", name: "Charcoal Corduroy Shirt", price: "$69.99" },
    { id: 217, img: "http://localhost:5001/images/manTshirt14.jpeg", name: "Cream Cable Knit Sweater", price: "$99.99" },
    { id: 218, img: "http://localhost:5001/images/manTshirt15.jpeg", name: "Beige Textured Knit Polo", price: "$74.99" },
    { id: 219, img: "http://localhost:5001/images/manTshirt16.jpeg", name: "Blue Striped Short-Sleeve Shirt", price: "$64.99" },
    { id: 220, img: "http://localhost:5001/images/manTshirt17.jpeg", name: "Navy Striped Crewneck Sweater", price: "$69.99" },
    { id: 221, img: "http://localhost:5001/images/manTshirt18.jpeg", name: "Rust Striped Knit Polo", price: "$79.99" },
    { id: 222, img: "http://localhost:5001/images/manTshirt19.jpeg", name: "Gray Polo Sweater", price: "$69.99" },
    { id: 223, img: "http://localhost:5001/images/manTshirt20.jpeg", name: "Quarter-Zip Sweatshirt", price: "$79.99" },



    { id: 224, img: "http://localhost:5001/images/bottoms6.jpeg", name: "Dark Grey Straight-Leg Jeans", price: "$79.99" },
    { id: 225, img: "http://localhost:5001/images/bottoms7.jpeg", name: "Brown Side-Button Pants", price: "$74.99" },
    { id: 226, img: "http://localhost:5001/images/bottoms8.jpeg", name: "Black Grid Check Pants", price: "$49.99" },
    { id: 227, img: "http://localhost:5001/images/bottoms9.jpeg", name: "White Utility Cargo Pants", price: "74.99" },
    { id: 228, img: "http://localhost:5001/images/bottoms10.jpeg", name: "Brown Side-Stripe Track Pants", price: "$59.99" },
    { id: 229, img: "http://localhost:5001/images/bottoms11.jpeg", name: "Dark Grey Belted Trousers", price: "$84.99" },
    { id: 230, img: "http://localhost:5001/images/bottoms12.jpeg", name: "Beige Star Print Pants", price: "$89.99" },
    { id: 231, img: "http://localhost:5001/images/bottoms13.jpeg", name: "Charcoal Sweat Shorts", price: "$49.99" },
    { id: 232, img: "http://localhost:5001/images/bottoms14.jpeg", name: "Olive Green Wide-Leg Trousers", price: "$74.99" },
    { id: 233, img: "http://localhost:5001/images/bottoms15.jpeg", name: "Light Wash Wide-Leg Jeans", price: "$64.99" },
    { id: 234, img: "http://localhost:5001/images/bottoms16.jpeg", name: "Brown Plaid Trousers", price: "$84.99" },
    { id: 235, img: "http://localhost:5001/images/bottoms17.jpeg", name: "Dark Grey Tailored Trousers", price: "$79.99" },
    { id: 236, img: "http://localhost:5001/images/bottoms18.jpeg", name: "Butterfly Print Wide-Leg Jeans", price: "$104.99" },
    { id: 237, img: "http://localhost:5001/images/bottoms19.jpeg", name: "Beige & Brown Sweatpants", price: "$84.99" },
    { id: 238, img: "http://localhost:5001/images/bottoms20.jpeg", name: "Green Acid Wash Wide-Leg Jeans", price: "$79.99" },
    { id: 239, img: "http://localhost:5001/images/bottoms5.jpeg", name: "Camel Corduroy Pants", price: "$64.99" },


    { id: 240, img: "http://localhost:5001/images/manouterwear4.jpeg", name: "Cream Shearling Jacket", price: "89.99" },
    { id: 241, img: "http://localhost:5001/images/manouterwear5.jpeg", name: "Rust Corduroy Jacket", price: "$99.99" },
    { id: 242, img: "http://localhost:5001/images/manouterwear6.jpeg", name: "Light Beige Trench Coat", price: "$119.99" },
    { id: 243, img: "http://localhost:5001/images/manouterwear7.jpeg", name: "Shearling Biker Jacket", price: "$104.99" },
    { id: 244, img: "http://localhost:5001/images/manouterwear8.jpeg", name: "Blue-Grey Puffer Jacket", price: "$124.99" },
    { id: 245, img: "http://localhost:5001/images/manouterwear9.jpeg", name: "Beige Wool-Blend Jacket", price: "$94.99" },
    { id: 246, img: "http://localhost:5001/images/manouterwear10.jpeg", name: "Dark Green Puffer Vest", price: "$89.99" },
    { id: 247, img: "http://localhost:5001/images/manouterwear11.jpeg", name: "Sage Green Windbreaker", price: "$99.99" },
    { id: 248, img: "http://localhost:5001/images/manouterwear12.jpeg", name: "Brown Long Overcoat", price: "$124.99" },
    { id: 249, img: "http://localhost:5001/images/manouterwear13.jpeg", name: "Dark Brown Knit Cardigan", price: "$79.99" },
    { id: 250, img: "http://localhost:5001/images/manouterwear14.jpeg", name: "Grey Zip-Up Wool Jacket", price: "$79.99" },
    { id: 251, img: "http://localhost:5001/images/manouterwear15.jpeg", name: "Navy Blue Pea Coat", price: "$104.99" },
    { id: 252, img: "http://localhost:5001/images/manouterwear16.jpeg", name: "Dark Brown Leather Jacket", price: "$109.99" },
    { id: 253, img: "http://localhost:5001/images/manouterwear17.jpeg", name: "Charcoal Canvas Work Jacket", price: "$89.99" },
    { id: 254, img: "http://localhost:5001/images/manouterwear18.jpeg", name: "Cream Varsity Jacket", price: "$79.99" },
    { id: 255, img: "http://localhost:5001/images/manouterwear19.jpeg", name: "Black Leather Bomber Jacket", price: "$104.99" },
    { id: 256, img: "http://localhost:5001/images/manouterwear20.jpeg", name: "Brown Shearling Coat", price: "$129.99" },



    { id: 257, img: "http://localhost:5001/images/manShoes2.jpeg", name: "Black High-Top Sneakers", price: "$89.99" },
    { id: 258, img: "http://localhost:5001/images/manShoes3.jpeg", name: "White Lace-Up Sneakers", price: "$79.99" },
    { id: 259, img: "http://localhost:5001/images/manShoes4.jpeg", name: "White & Orange Sneakers", price: "$74.99" },
    { id: 260, img: "http://localhost:5001/images/manShoes5.jpeg", name: "Brown Suede Chelsea Boots", price: "$114.99" },
    { id: 261, img: "http://localhost:5001/images/manShoes6.jpeg", name: "Black & Cream Sneakers", price: "$84.99" },
    { id: 262, img: "http://localhost:5001/images/manShoes7.jpeg", name: "Dark Brown Chunky Boots", price: "$109.99" },
    { id: 263, img: "http://localhost:5001/images/manShoes8.jpeg", name: "Black Pointed Leather Boots", price: "$114.99" },
    { id: 264, img: "http://localhost:5001/images/manShoes9.jpeg", name: "Brown Leather Sneakers", price: "$144.99" },
    { id: 265, img: "http://localhost:5001/images/manShoes10.jpeg", name: "Green & Cream Sneakers", price: "$89.99" },
    { id: 266, img: "http://localhost:5001/images/manShoes11.jpeg", name: "Brown & White Sneakers", price: "$89.99" },
    { id: 267, img: "http://localhost:5001/images/manShoes12.jpeg", name: "Grey & White Chunky Sneakers", price: "$94.99" },
    { id: 268, img: "http://localhost:5001/images/manShoes13.jpeg", name: "Black Chunky Chelsea Boots", price: "$104.99" },
    { id: 269, img: "http://localhost:5001/images/manShoes14.jpeg", name: "Beige Lace-Up Hiking Boots", price: "$119.99" },
    { id: 270, img: "http://localhost:5001/images/manShoes15.jpeg", name: "Black & Cream Sneakers", price: "$89.99" },
    { id: 271, img: "http://localhost:5001/images/manShoes16.jpeg", name: "Black & White Sneakers", price: "$99.99" },
    { id: 272, img: "http://localhost:5001/images/manShoes17.jpeg", name: "Green & Navy Star Sneakers", price: "$99.99" },
    { id: 273, img: "http://localhost:5001/images/manShoes18.jpeg", name: "Grey Double-Strap Sandals", price: "$69.99" },
    { id: 274, img: "http://localhost:5001/images/manShoes19.jpeg", name: "Beige & Black Sneakers", price: "$74.99" },
    { id: 275, img: "http://localhost:5001/images/manShoes20.jpeg", name: "Light Blue & White Sneakers", price: "$99.99" },




    { id: 276, img: "http://localhost:5001/images/manAccessories2.jpeg", name: "Brown Square Watch", price: "$119.99" },
    { id: 277, img: "http://localhost:5001/images/manAccessories3.jpeg", name: "Silver Thorn Ring", price: "$49.99" },
    { id: 278, img: "http://localhost:5001/images/manAccessories4.jpeg", name: "Black Silver Sunglasses", price: "$84.99" },
    { id: 279, img: "http://localhost:5001/images/manAccessories5.jpeg", name: "Mustard Yellow Beanie", price: "$44.99" },
    { id: 280, img: "http://localhost:5001/images/manAccessories6.jpeg", name: "Faded Orange Cap", price: "34.99" },
    { id: 281, img: "http://localhost:5001/images/manAccessories7.jpeg", name: "Green Leather Cardholder", price: "$69.99" },
    { id: 282, img: "http://localhost:5001/images/manAccessories8.jpeg", name: "Blue Patterned Tie", price: "$44.99" },
    { id: 283, img: "http://localhost:5001/images/manAccessories9.jpeg", name: "Dark Grey Scarf", price: "$64.99" },
    { id: 284, img: "http://localhost:5001/images/manAccessories10.jpeg", name: "Gold Lapel Chain", price: "$39.99" },
    { id: 285, img: "http://localhost:5001/images/manAccessories11.jpeg", name: "Black Arrow Necklace", price: "$29.99" },
    { id: 286, img: "http://localhost:5001/images/manAccessories12.jpeg", name: "Black & Gold Bracelet", price: "$44.99" },
    { id: 287, img: "http://localhost:5001/images/manAccessories13.jpeg", name: "Brown Knit Neck Warmer", price: "$54.99" },
    { id: 288, img: "http://localhost:5001/images/manAccessories14.jpeg", name: "Brown Fingerless Gloves", price: "$69.99" },
    { id: 289, img: "http://localhost:5001/images/manAccessories15.jpeg", name: "Green Corduroy Cap", price: "$49.99" },
    { id: 290, img: "http://localhost:5001/images/manAccessories16.jpeg", name: "Black Square Sunglasses", price: "$79.99" },
    { id: 291, img: "http://localhost:5001/images/manAccessories17.jpeg", name: "Blue Patterned Neckerchief", price: "$39.99" },
    { id: 292, img: "http://localhost:5001/images/manAccessories18.jpeg", name: "Black Leather Belt", price: "$69.99" },
    { id: 293, img: "http://localhost:5001/images/manAccessories19.jpeg", name: "Silver Star Bracelet", price: "$44.99" },
    { id: 294, img: "http://localhost:5001/images/manAccessories20.jpeg", name: "Brown Flat Cap", price: "$64.99" },


];

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.listen(PORT, () => {
    console.log(`Backend sunucusu http://localhost:${PORT} adresinde çalışıyor.`);
});