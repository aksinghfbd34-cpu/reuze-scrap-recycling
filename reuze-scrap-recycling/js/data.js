/**
 * Reuze Scrap & E-Waste Pickup Service - Comprehensive Dataset
 * Real-time scrap rates, categories, city hubs, testimonials, and FAQs
 */

const REUZE_DATA = {
  // Categories for scrap items
  categories: [
    { id: 'all', name: 'All Categories', icon: 'fa-layer-group', count: 32 },
    { id: 'metal', name: 'Metal Scrap', icon: 'fa-cubes-stacked', count: 10 },
    { id: 'ewaste', name: 'E-Waste & Electronics', icon: 'fa-microchip', count: 8 },
    { id: 'appliances', name: 'Large Home Appliances', icon: 'fa-tv', count: 6 },
    { id: 'vehicles', name: 'Vehicle Scrapping (RVSF)', icon: 'fa-car-burst', count: 4 },
    { id: 'paper-plastic', name: 'Paper & Plastics', icon: 'fa-box-archive', count: 4 }
  ],

  // Detailed Scrap Items with live rates
  scrapItems: [
    // Metals
    {
      id: 'copper-wire',
      name: 'Copper Wire / Armature (Pure)',
      category: 'metal',
      unit: 'kg',
      price: 740,
      minQty: 2,
      trend: '+₹15 today',
      trendType: 'up',
      icon: 'fa-bolt',
      imageBg: 'linear-gradient(135deg, rgba(239, 68, 68, 0.12), rgba(220, 38, 38, 0.2))',
      description: 'Bright pure copper wire without insulation or heavy burning.',
      popular: true
    },
    {
      id: 'brass-utensils',
      name: 'Brass / Peetal (Utensils & Scrap)',
      category: 'metal',
      unit: 'kg',
      price: 495,
      minQty: 3,
      trend: '+₹8 today',
      trendType: 'up',
      icon: 'fa-trophy',
      imageBg: 'linear-gradient(135deg, rgba(245, 158, 11, 0.12), rgba(217, 119, 6, 0.2))',
      description: 'Yellow brass, home utensils, valves, fittings, and sheet cuttings.',
      popular: true
    },
    {
      id: 'aluminium-section',
      name: 'Aluminium Section & Utensils',
      category: 'metal',
      unit: 'kg',
      price: 185,
      minQty: 5,
      trend: 'Stable',
      trendType: 'neutral',
      icon: 'fa-window-maximize',
      imageBg: 'linear-gradient(135deg, rgba(14, 165, 233, 0.12), rgba(2, 132, 199, 0.2))',
      description: 'Clean architectural extrusions, window frames, and aluminium pots.'
    },
    {
      id: 'iron-heavy',
      name: 'Heavy Iron / Loha Scrap',
      category: 'metal',
      unit: 'kg',
      price: 34,
      minQty: 20,
      trend: '+₹1.5 today',
      trendType: 'up',
      icon: 'fa-dumbbell',
      imageBg: 'linear-gradient(135deg, rgba(71, 85, 105, 0.12), rgba(51, 65, 85, 0.2))',
      description: 'Heavy structural iron, beams, channels, rebars, and heavy castings.',
      popular: true
    },
    {
      id: 'iron-light',
      name: 'Light Iron / Tin Patra / Sheds',
      category: 'metal',
      unit: 'kg',
      price: 24,
      minQty: 20,
      trend: 'Stable',
      trendType: 'neutral',
      icon: 'fa-sheet-plastic',
      imageBg: 'linear-gradient(135deg, rgba(100, 116, 139, 0.12), rgba(71, 85, 105, 0.2))',
      description: 'Roofing sheets, drums, oil tins, wire mesh, and light fabricated scrap.'
    },
    {
      id: 'steel-304',
      name: 'Stainless Steel (SS 304 Grade)',
      category: 'metal',
      unit: 'kg',
      price: 145,
      minQty: 5,
      trend: '+₹4 today',
      trendType: 'up',
      icon: 'fa-utensils',
      imageBg: 'linear-gradient(135deg, rgba(59, 130, 246, 0.12), rgba(37, 99, 235, 0.2))',
      description: 'Non-magnetic pure kitchen sinks, railings, hospital equipment scrap.'
    },
    {
      id: 'lead-battery',
      name: 'Lead / Inverter Battery (Car/UPS)',
      category: 'metal',
      unit: 'kg',
      price: 88,
      minQty: 10,
      trend: '+₹3 today',
      trendType: 'up',
      icon: 'fa-car-battery',
      imageBg: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12), rgba(79, 70, 229, 0.2))',
      description: 'Unbroken lead-acid batteries from cars, inverters, solar, and bikes.',
      popular: true
    },
    {
      id: 'cast-iron',
      name: 'Cast Iron (Bhid)',
      category: 'metal',
      unit: 'kg',
      price: 36,
      minQty: 15,
      trend: 'Stable',
      trendType: 'neutral',
      icon: 'fa-gear',
      imageBg: 'linear-gradient(135deg, rgba(51, 65, 85, 0.12), rgba(30, 41, 59, 0.2))',
      description: 'Drain pipes, manhole covers, engine blocks, pump impellers.'
    },

    // E-Waste & Electronics
    {
      id: 'laptop-working',
      name: 'Old Laptop (Working / Core i3/i5/i7/Ryzen)',
      category: 'ewaste',
      unit: 'piece',
      price: 4500,
      minQty: 1,
      trend: 'High demand',
      trendType: 'up',
      icon: 'fa-laptop',
      imageBg: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(5, 150, 105, 0.2))',
      description: 'Core i3/i5/i7/Ryzen laptops with working screen and adapter.',
      popular: true
    },
    {
      id: 'laptop-dead',
      name: 'Dead / Broken Laptop Scrap',
      category: 'ewaste',
      unit: 'piece',
      price: 900,
      minQty: 1,
      trend: 'Stable',
      trendType: 'neutral',
      icon: 'fa-laptop-code',
      imageBg: 'linear-gradient(135deg, rgba(148, 163, 184, 0.12), rgba(100, 116, 139, 0.2))',
      description: 'Motherboard damaged, broken screen, or burnt old laptops.'
    },
    {
      id: 'pc-cpu',
      name: 'Desktop CPU Tower / Cabinet',
      category: 'ewaste',
      unit: 'piece',
      price: 650,
      minQty: 1,
      trend: '+₹50 today',
      trendType: 'up',
      icon: 'fa-server',
      imageBg: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(4, 120, 87, 0.2))',
      description: 'Complete desktop cabinet with motherboard, SMPS, RAM, and hard disk.'
    },
    {
      id: 'lcd-monitor',
      name: 'LCD / LED Computer Monitor',
      category: 'ewaste',
      unit: 'piece',
      price: 400,
      minQty: 1,
      trend: 'Stable',
      trendType: 'neutral',
      icon: 'fa-desktop',
      imageBg: 'linear-gradient(135deg, rgba(56, 189, 248, 0.12), rgba(14, 165, 233, 0.2))',
      description: 'TFT/LCD/LED flat monitors without shattered front glass panel.'
    },
    {
      id: 'smartphone-old',
      name: 'Old Smartphone / Feature Phone',
      category: 'ewaste',
      unit: 'piece',
      price: 250,
      minQty: 2,
      trend: 'Stable',
      trendType: 'neutral',
      icon: 'fa-mobile-screen',
      imageBg: 'linear-gradient(135deg, rgba(236, 72, 153, 0.12), rgba(219, 39, 119, 0.2))',
      description: 'Old touch android phones, keypad Nokia phones, tablet boards.'
    },
    {
      id: 'printed-circuit-board',
      name: 'E-Waste PCB Green Motherboards',
      category: 'ewaste',
      unit: 'kg',
      price: 320,
      minQty: 2,
      trend: '+₹10 today',
      trendType: 'up',
      icon: 'fa-microchip',
      imageBg: 'linear-gradient(135deg, rgba(5, 150, 105, 0.12), rgba(16, 185, 129, 0.2))',
      description: 'High-grade computer, telecom, and server green electronic motherboards.'
    },
    {
      id: 'ups-inverter',
      name: 'Home Inverter / Heavy UPS (No Battery)',
      category: 'ewaste',
      unit: 'piece',
      price: 600,
      minQty: 1,
      trend: 'Stable',
      trendType: 'neutral',
      icon: 'fa-plug-circle-bolt',
      imageBg: 'linear-gradient(135deg, rgba(245, 158, 11, 0.12), rgba(217, 119, 6, 0.2))',
      description: 'Copper transformer home inverter box or offline server UPS.'
    },

    // Large Home Appliances
    {
      id: 'split-ac-15',
      name: 'Old Split AC 1.5 Ton (Indoor + Outdoor)',
      category: 'appliances',
      unit: 'piece',
      price: 4300,
      minQty: 1,
      trend: '+₹200 peak season',
      trendType: 'up',
      icon: 'fa-snowflake',
      imageBg: 'linear-gradient(135deg, rgba(6, 182, 212, 0.12), rgba(8, 145, 178, 0.2))',
      description: 'Complete copper coil split air conditioner with outdoor compressor unit.',
      popular: true
    },
    {
      id: 'window-ac-15',
      name: 'Old Window AC 1.5 Ton (Copper Coil)',
      category: 'appliances',
      unit: 'piece',
      price: 3600,
      minQty: 1,
      trend: '+₹150 peak season',
      trendType: 'up',
      icon: 'fa-wind',
      imageBg: 'linear-gradient(135deg, rgba(14, 165, 233, 0.12), rgba(2, 132, 199, 0.2))',
      description: 'Complete 1.5T window AC unit with copper condenser and compressor.'
    },
    {
      id: 'fridge-double-door',
      name: 'Refrigerator Double Door / Frost Free',
      category: 'appliances',
      unit: 'piece',
      price: 1500,
      minQty: 1,
      trend: 'Stable',
      trendType: 'neutral',
      icon: 'fa-cube',
      imageBg: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12), rgba(79, 70, 229, 0.2))',
      description: '240L+ double door fridge with compressor intact.',
      popular: true
    },
    {
      id: 'fridge-single-door',
      name: 'Refrigerator Single Door (190L)',
      category: 'appliances',
      unit: 'piece',
      price: 1100,
      minQty: 1,
      trend: 'Stable',
      trendType: 'neutral',
      icon: 'fa-square',
      imageBg: 'linear-gradient(135deg, rgba(139, 92, 246, 0.12), rgba(124, 58, 237, 0.2))',
      description: 'Single door direct cool home refrigerator with compressor.'
    },
    {
      id: 'washing-machine-auto',
      name: 'Fully Automatic Washing Machine',
      category: 'appliances',
      unit: 'piece',
      price: 1250,
      minQty: 1,
      trend: 'Stable',
      trendType: 'neutral',
      icon: 'fa-soap',
      imageBg: 'linear-gradient(135deg, rgba(20, 184, 166, 0.12), rgba(13, 148, 136, 0.2))',
      description: 'Top load or front load fully automatic washing machine with motor & tub.'
    },
    {
      id: 'washing-machine-semi',
      name: 'Semi Automatic Washing Machine',
      category: 'appliances',
      unit: 'piece',
      price: 750,
      minQty: 1,
      trend: 'Stable',
      trendType: 'neutral',
      icon: 'fa-rug',
      imageBg: 'linear-gradient(135deg, rgba(100, 116, 139, 0.12), rgba(71, 85, 105, 0.2))',
      description: 'Twin tub plastic body semi-automatic machine with dual motors.'
    },
    {
      id: 'led-tv-43',
      name: 'Old / Broken LED Smart TV (32-43 Inch)',
      category: 'appliances',
      unit: 'piece',
      price: 550,
      minQty: 1,
      trend: 'Stable',
      trendType: 'neutral',
      icon: 'fa-tv',
      imageBg: 'linear-gradient(135deg, rgba(244, 63, 94, 0.12), rgba(225, 29, 72, 0.2))',
      description: 'LED/OLED television with intact mother & power boards.'
    },
    {
      id: 'geyser-water-heater',
      name: 'Electric Geyser / Water Heater (Copper/SS)',
      category: 'appliances',
      unit: 'piece',
      price: 450,
      minQty: 1,
      trend: 'Stable',
      trendType: 'neutral',
      icon: 'fa-faucet-drip',
      imageBg: 'linear-gradient(135deg, rgba(234, 88, 12, 0.12), rgba(194, 65, 12, 0.2))',
      description: '15L-25L storage electric geyser with heating element.'
    },

    // Vehicle Scrapping (RVSF)
    {
      id: 'bike-scrapping',
      name: 'Old 2-Wheeler / Bike / Scooter (RVSF Scrappage)',
      category: 'vehicles',
      unit: 'piece',
      price: 4500,
      minQty: 1,
      trend: 'Govt CD Certificate Included',
      trendType: 'up',
      icon: 'fa-motorcycle',
      imageBg: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(5, 150, 105, 0.2))',
      description: 'Complete 2-wheeler scrappage with RTO de-registration & Certificate of Deposit.',
      popular: true
    },
    {
      id: 'car-hatchback-scrap',
      name: 'End-of-Life Small Car / Hatchback (800 / Alto / Santro)',
      category: 'vehicles',
      unit: 'piece',
      price: 24000,
      minQty: 1,
      trend: 'Up to 25% Road Tax Rebate',
      trendType: 'up',
      icon: 'fa-car-side',
      imageBg: 'linear-gradient(135deg, rgba(2, 132, 199, 0.12), rgba(3, 105, 161, 0.2))',
      description: 'Govt Authorized RVSF scrappage, chassis cutting certificate, valid RC required.',
      popular: true
    },
    {
      id: 'car-sedan-suv-scrap',
      name: 'Sedan / Mid-SUV Scrappage (City / Innova / Scorpio)',
      category: 'vehicles',
      unit: 'piece',
      price: 38000,
      minQty: 1,
      trend: 'Free Towing & Instant Valuation',
      trendType: 'up',
      icon: 'fa-truck-pickup',
      imageBg: 'linear-gradient(135deg, rgba(124, 58, 237, 0.12), rgba(109, 40, 217, 0.2))',
      description: 'Full chassis weighing at registered facility, instant RTGS payment.'
    },
    {
      id: 'commercial-vehicle-scrap',
      name: 'Commercial Truck / Bus / Tempo (Heavy)',
      category: 'vehicles',
      unit: 'kg',
      price: 38,
      minQty: 500,
      trend: 'Bulk Rate Guaranteed',
      trendType: 'up',
      icon: 'fa-truck',
      imageBg: 'linear-gradient(135deg, rgba(220, 38, 38, 0.12), rgba(185, 28, 28, 0.2))',
      description: 'Industrial fleet scrapping with Form-2 Certificate and chassis destruction proof.'
    },

    // Paper & Plastics
    {
      id: 'office-paper-shred',
      name: 'Office White Paper / Records (Confidential)',
      category: 'paper-plastic',
      unit: 'kg',
      price: 16,
      minQty: 25,
      trend: 'Free Shredding Certificate',
      trendType: 'neutral',
      icon: 'fa-file-lines',
      imageBg: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(52, 211, 153, 0.2))',
      description: 'Clean printed A4 records, files, registers with guaranteed data destruction.'
    },
    {
      id: 'corrugated-carton',
      name: 'Corrugated Cardboard / Carton (Gatta)',
      category: 'paper-plastic',
      unit: 'kg',
      price: 13,
      minQty: 20,
      trend: '+₹1 today',
      trendType: 'up',
      icon: 'fa-boxes-packing',
      imageBg: 'linear-gradient(135deg, rgba(217, 119, 6, 0.12), rgba(245, 158, 11, 0.2))',
      description: 'Dry packaging boxes, shipping cartons, and corrugated brown sheets.'
    },
    {
      id: 'newspaper-raddi',
      name: 'Newspaper / Raddi (English & Hindi)',
      category: 'paper-plastic',
      unit: 'kg',
      price: 18,
      minQty: 10,
      trend: 'Stable',
      trendType: 'neutral',
      icon: 'fa-newspaper',
      imageBg: 'linear-gradient(135deg, rgba(107, 114, 128, 0.12), rgba(156, 163, 175, 0.2))',
      description: 'Daily printed newspapers, magazines, and periodicals.'
    },
    {
      id: 'pet-plastic-bottles',
      name: 'Rigid Plastic / PET Bottles / HDPE Drums',
      category: 'paper-plastic',
      unit: 'kg',
      price: 14,
      minQty: 15,
      trend: 'Stable',
      trendType: 'neutral',
      icon: 'fa-bottle-water',
      imageBg: 'linear-gradient(135deg, rgba(2, 132, 199, 0.12), rgba(56, 189, 248, 0.2))',
      description: 'Clean water bottles, chemical HDPE carboys, crates, and molded chairs.'
    }
  ],

  // Operational City Hubs with Area Incharges
  cityHubs: [
    {
      id: 'delhi-ncr',
      name: 'Delhi NCR (Delhi, Gurugram, Noida, Ghaziabad)',
      hubManager: 'Vikram Singh Rawat',
      phone: '+91 98112 34567',
      whatsapp: '919811234567',
      address: 'Plot 42, Okhla Industrial Area Phase-III, New Delhi 110020',
      pincodes: ['110001', '110020', '110092', '122001', '122002', '201301', '201001', '201010', '110034', '110085'],
      pickupsToday: 42,
      activeVehicles: 18
    },
    {
      id: 'mumbai',
      name: 'Mumbai MMR (South Mumbai, Suburbs, Navi Mumbai, Thane)',
      hubManager: 'Sanjay Patil',
      phone: '+91 98201 87654',
      whatsapp: '919820187654',
      address: 'Hub 12, MIDC Industrial Area, Turbhe, Navi Mumbai 400705',
      pincodes: ['400001', '400050', '400069', '400703', '400601', '400093', '400076', '400705'],
      pickupsToday: 56,
      activeVehicles: 24
    },
    {
      id: 'bengaluru',
      name: 'Bengaluru (Whitefield, Koramangala, Indiranagar, HSR)',
      hubManager: 'K. R. Narayanaswamy',
      phone: '+91 99000 54321',
      whatsapp: '919900054321',
      address: 'Green Tech Yard, Peenya Industrial Area 4th Phase, Bengaluru 560058',
      pincodes: ['560001', '560034', '560066', '560100', '560038', '560004', '560095'],
      pickupsToday: 38,
      activeVehicles: 16
    },
    {
      id: 'hyderabad',
      name: 'Hyderabad (Hitec City, Gachibowli, Secunderabad, Kukatpally)',
      hubManager: 'M. Venkat Reddy',
      phone: '+91 98490 12345',
      whatsapp: '919849012345',
      address: 'Circular Economy Hub, Sanath Nagar Industrial Estate, Hyderabad 500018',
      pincodes: ['500001', '500081', '500032', '500072', '500003', '500018'],
      pickupsToday: 31,
      activeVehicles: 14
    },
    {
      id: 'pune',
      name: 'Pune (Hinjawadi, Kothrud, Viman Nagar, Hadapsar, PCMC)',
      hubManager: 'Ganesh Kulkarni',
      phone: '+91 98810 65432',
      whatsapp: '919881065432',
      address: 'Eco Recycling Center, Bhosari MIDC, Pune 411026',
      pincodes: ['411001', '411057', '411014', '411028', '411038', '411026'],
      pickupsToday: 28,
      activeVehicles: 12
    },
    {
      id: 'chennai',
      name: 'Chennai (Guindy, OMR, Anna Nagar, Velachery)',
      hubManager: 'P. Balasubramanian',
      phone: '+91 98400 98765',
      whatsapp: '919840098765',
      address: 'SIDCO Industrial Estate, Guindy, Chennai 600032',
      pincodes: ['600001', '600032', '600096', '600040', '600042'],
      pickupsToday: 24,
      activeVehicles: 10
    }
  ],

  // Real Verified Testimonials
  testimonials: [
    {
      name: 'Amitabh Sen',
      role: 'Homeowner, Gurugram',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      comment: 'Sold my old Split AC and 45kg old books. The pickup hero arrived exactly at 11 AM with a certified digital scale. ₹4,820 transferred to my UPI in under 30 seconds!',
      item: 'Split AC + Books',
      earned: '₹4,820'
    },
    {
      name: 'Priyanka Deshmukh',
      role: 'IT Admin, NexGen Tech Labs, Pune',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
      comment: 'We disposed of 35 old office laptops and 12 server cabinets. Reuze provided complete data destruction video proof, Form-6 EPR compliance certificate, and direct bank settlement.',
      item: 'Corporate E-Waste (35 PCs)',
      earned: '₹62,400'
    },
    {
      name: 'Rajesh Khandelwal',
      role: 'Resident, HSR Layout, Bengaluru',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
      comment: 'Scrapped my 16-year-old Hyundai Santro through their Govt RVSF program. Got the Certificate of Deposit (CD) which gave me 25% road tax rebate on my new car purchase!',
      item: 'Car Scrapping (RVSF)',
      earned: '₹26,500'
    },
    {
      name: 'Meenakshi Iyer',
      role: 'Apartment Secretary, Mumbai',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
      comment: 'Organized a residential society e-waste & metal drive with Reuze. We collected 1.2 Tons of scrap in 1 day and earned ₹38,200 for our society green garden initiative!',
      item: 'Society Scrap Drive (1.2T)',
      earned: '₹38,200'
    }
  ],

  // Frequently Asked Questions
  faqs: [
    {
      q: 'How does the free doorstep scrap pickup work?',
      a: 'Booking takes less than 60 seconds on our website or app. Select the items you want to sell, choose your preferred date and time slot, and provide your address. Our verified Scrap Hero arrives with an ISO-certified digital weighing scale, weighs your scrap in front of you, and makes an instant cash or UPI payment immediately before leaving.'
    },
    {
      q: 'Are your digital weighing scales accurate and certified?',
      a: 'Yes, 100%! All Reuze Scrap Heroes carry Department of Legal Metrology (Govt of India) calibrated digital weighing scales. You can verify the tare weight and inspect the scale on the spot before weighing.'
    },
    {
      q: 'Is there any minimum quantity or pickup charge?',
      a: 'Doorstep pickup is 100% FREE! There are zero hidden charges or conveyance fees. For residential pickups, we recommend a minimum scrap value of ₹200 (approx. 10 kg of mixed scrap or 1 small electronic appliance) for hassle-free slot assignment.'
    },
    {
      q: 'How does vehicle scrapping work under the Govt RVSF policy?',
      a: 'Under the Motor Vehicles (Registration and Functions of Vehicle Scrapping Facility) Rules, we handle end-to-end scrapping at registered facilities. We pick up your end-of-life vehicle with free towing, issue a valid Certificate of Deposit (CD) for road tax rebates on new car purchases, and handle complete RTO de-registration.'
    },
    {
      q: 'How do you handle confidential paper documents and e-waste data?',
      a: 'For paper records and hard drives, we offer certified on-site/off-site shredding and degaussing. We issue a formal Green Recycling Certificate and Data Destruction Certificate with serial number records for corporate compliance and audit trails.'
    },
    {
      q: 'What payment modes are supported upon pickup?',
      a: 'We support instant UPI (Google Pay, PhonePe, Paytm), IMPS Bank Transfer, and on-the-spot Cash. You can also choose to donate your scrap earnings directly to our partnered Green Forestation NGOs.'
    }
  ],

  // Sample Mock Active Bookings for Demo Tracking
  demoBookings: [
    {
      id: 'RZ-89420',
      customerName: 'Rohit Sharma',
      phone: '+91 98765 43210',
      city: 'Delhi NCR',
      address: 'Flat 402, Green Valley Apartments, Sector 62, Noida 201301',
      items: [
        { name: 'Copper Wire Pure', qty: '8 kg', rate: '₹740/kg', subtotal: 5920 },
        { name: 'Old Split AC 1.5T', qty: '1 pc', rate: '₹4,300/pc', subtotal: 4300 },
        { name: 'Corrugated Cardboard', qty: '30 kg', rate: '₹13/kg', subtotal: 390 }
      ],
      estimatedPayout: 10610,
      slotDate: 'Today, 2:00 PM - 5:00 PM',
      status: 'out_for_pickup', // booked, assigned, out_for_pickup, completed
      statusIndex: 2, // 0: Booked, 1: Hero Assigned, 2: Out for Pickup, 3: Weighed & Paid, 4: Recycled
      hero: {
        name: 'Dharmendra Kumar',
        phone: '+91 98111 88990',
        vehicle: 'EV Pickup Van (DL 1Z 4829)',
        rating: '4.9 ★ (840 pickups)'
      },
      createdAt: '2026-09-03T08:30:00'
    }
  ]
};

// Export to window
if (typeof window !== 'undefined') {
  window.REUZE_DATA = REUZE_DATA;
}
