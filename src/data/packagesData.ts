import { SoundPackage, SoundAddOn, CustomerReview } from '../types';

export const SOUND_PACKAGES: SoundPackage[] = [
  {
    id: 'simple',
    name: 'Simple Package',
    tagline: 'Crystal clear Dolby audio for Birthday Parties, Anniversaries, Marriage Events & Family Gatherings',
    price: 14999,
    originalPrice: 18500,
    recommendedFor: 'Birthday Parties, Anniversaries, Marriage Events, Engagement Ceremonies & Intimate Gatherings',
    suitableEvents: [
      '🎂 Birthday Parties & Cake Cutting Celebrations',
      '💍 Marriage Events & Wedding Receptions',
      '🥂 Wedding Anniversaries & Jubilees',
      '✨ Engagement & Ring Ceremonies',
      '🌼 Haldi & Mehendi Functions',
      '🎤 Intimate Seminars & House Gatherings'
    ],
    crowdCapacity: 'Up to 250 Guests',
    wattageRMS: '3,500 Watts RMS',
    badge: 'Starter Dolby Sound',
    isPopular: false,
    image: '/sound1.jpg',
    specs: {
      lineArrayTops: '2x LLOYD LEE Active 15" High-Definition Mid-Tops',
      subwoofers: '2x 18" Front-Firing Bass Bins (Deep Punch)',
      amplification: 'Crown XLS Series 4000W Class-D Amplifiers',
      mixerConsole: 'Soundcraft 12-Channel Analog Mixer with Lexicon FX',
      microphones: '2x UHF Wireless Cordless Microphones (Shure/AKG)',
      stageMonitors: '1x 12" Stage Floor Wedge Monitor',
      lightingAndTruss: '4x RGB LED High-Beam Stage Focus Lights',
      soundCrew: '1x Certified Audio Technician + Setup Crew',
      dolbyCalibration: 'Stereo Hi-Fi 2.1 Calibrated Tuning'
    },
    features: [
      'Tailored for Birthday Parties, Anniversaries & Marriage Events',
      '2x 15" LLOYD LEE High-Throw Sound Tops',
      '2x 18" Heavy Bass Subwoofers for rich musical warmth',
      '2x Cordless Wireless Microphones included',
      'Crystal clean speech & vocal clarity',
      'Plug-and-play Bluetooth / Laptop / DJ link',
      'Free transportation within 15 km',
      'Setup & Sound check 3 hours before event'
    ]
  },
  {
    id: 'silver',
    name: 'Silver Package',
    tagline: 'High-power LLOYD LEE line array with chest-thumping bass for Gavdev Sohala, Varat, Miravnuk & Grand Weddings',
    price: 34999,
    originalPrice: 42000,
    recommendedFor: 'Gavdev Sohala, Varat Processions, Miravnuk Rallies, Grand Weddings, Sangeet Nights & DJ Parties',
    suitableEvents: [
      '🚩 Gavdev Sohala & Village Devasthan Utsav',
      '🥁 Varat (Baarat) & Grand Wedding Processions',
      '🔥 Miravnuk & Palkhi Rallies',
      '👰 Grand Wedding Ceremonies & Sangeet Nights',
      '🎧 Open-Air DJ Nights & Dance Parties',
      '🎓 College Annual Fests & Cultural Galas'
    ],
    crowdCapacity: 'Up to 1,200 Guests',
    wattageRMS: '9,000 Watts RMS',
    badge: '⭐ Most Booked Package',
    isPopular: true,
    image: '/sound2.jpg',
    specs: {
      lineArrayTops: '4x LLOYD LEE Dual 10" Precision Line Array Columns',
      subwoofers: '4x Dual 18" Horn-Loaded High-Excursion Subwoofers (Sub-35Hz Bass)',
      amplification: 'Lab.gruppen / Powersoft 10,000W Power Amp Rack',
      mixerConsole: 'Behringer X32 Producer 32-Channel Digital Mixing Console',
      microphones: '4x Shure SLX-D Digital Wireless Microphones',
      stageMonitors: '2x Active 15" Coaxial Stage Wedges',
      lightingAndTruss: '10x LED Pars + 4x 7R Sharpy Moving Beam Heads + 10ft T-Bar Truss',
      soundCrew: '1x Senior Sound Engineer + 2x Rigging Technicians',
      dolbyCalibration: 'Dolby Dynamic Range EQ Tuning & DSP Delay Alignment'
    },
    features: [
      'Engineered for Gavdev Sohala, Varat, Miravnuk & Sangeet',
      '4x LLOYD LEE Dual Line Array Modules with extreme throw',
      '4x Dual 18" Ground-Shaking Subwoofers',
      '32-Channel Digital Mixing Desk with iPad remote control',
      '4x Premium Shure Wireless Vocal Mics',
      'Dynamic moving Sharpy lighting included',
      'Dolby spatial dispersion calibration for wide road coverage',
      'Complimentary Smoke Fog Machine effect'
    ]
  },
  {
    id: 'gold',
    name: 'Gold Package (Premium)',
    tagline: 'Arena-grade LLOYD LEE Monster Rig & Concert Truss for Festivals, Ganpati Utsav, Durga Devi (Navratri) & Mega Shows',
    price: 74999,
    originalPrice: 92000,
    recommendedFor: 'Festivals, Ganpati Utsav & Visarjan, Durga Devi (Navratri), Mega Live Concerts & Stadium Events',
    suitableEvents: [
      '🐘 Ganpati Utsav, Aagman & Grand Visarjan Miravnuk',
      '🔱 Durga Devi (Navratri) Dandiya & Garba Mahotsav',
      '🎆 Major Public Festivals, Shiv Jayanti & Shobha Yatra',
      '🎸 Mega Live Concerts & Celebrity Stage Shows',
      '🏟️ Stadium Rallies, EDM Sunburn Nights & Mega Crowd Events',
      '👑 Mega Royal Weddings & VIP Destination Receptions'
    ],
    crowdCapacity: '3,000 to 10,000+ Guests',
    wattageRMS: '24,000 Watts RMS (Max Output)',
    badge: '👑 Arena & Concert Grade',
    isPopular: false,
    image: '/sound5.jpg',
    specs: {
      lineArrayTops: '8x to 12x LLOYD LEE Dual 12" Long-Throw Line Array Flying Clusters',
      subwoofers: '8x Dual 18" Ultra-Low Frequency Sub Bins (Earth-quaking 30Hz - 80Hz)',
      amplification: 'Dual Tour-Grade 25,000W Custom Amplifier Bank with DBX Processors',
      mixerConsole: 'Allen & Heath SQ-6 / Yamaha CL5 48-Channel Digital Stage Console',
      microphones: '8x Sennheiser EW-D / Shure Beta 58 Wireless Systems + Drum Mic Kit',
      stageMonitors: '4x In-Ear Monitor (IEM) Systems + 4x High-Output Stage Blasters',
      lightingAndTruss: 'Full 30ft Aluminum Goalpost Truss, 12x Beam 230 Sharpy + Blinders + Hazer',
      soundCrew: '2x Master Sound Engineers + 4x Rigging & Stage Crew',
      dolbyCalibration: 'Full Arena Dolby Surround DSP 3D Acoustic Alignment'
    },
    features: [
      'Ultimate Mega Setup for Ganpati, Durga Devi (Navratri) & Festivals',
      'Full 8-12 LLOYD LEE Line Array Concert Rig with flying motors',
      '8x Dual 18" Ultra Subwoofers for extreme 30Hz bass impact',
      'Full 30ft heavy aluminum lighting truss with 12x Sharpy Beams',
      'Multi-track live audio master recording delivered on USB',
      'Wireless In-Ear Monitor systems for live band performers',
      'CO2 Jets and Stage Hazer machines for dramatic concert look',
      'Dedicated backup power generator hookup management'
    ]
  }
];

export const SOUND_ADD_ONS: SoundAddOn[] = [
  {
    id: 'extra_sub',
    name: 'Extra Pair Dual 18" Subwoofers (4,000W)',
    category: 'bass',
    price: 6999,
    description: 'Boost low-end rumble for intense EDM, Ganpati Visarjan drops, and Gavdev Miravnuk.',
    iconName: 'Speaker'
  },
  {
    id: 'sharpy_lights',
    name: '4x Extra 7R Sharpy Beam Lights + Controller',
    category: 'lighting',
    price: 4999,
    description: 'Razor-sharp beams cutting through the crowd for concert stage & night rally look.',
    iconName: 'Zap'
  },
  {
    id: 'iem_system',
    name: 'Wireless In-Ear Monitor (IEM) Kit (4 Receivers)',
    category: 'monitors',
    price: 3999,
    description: 'Zero-feedback personal ear monitoring for live vocalists, dhol-tasha, and drummers.',
    iconName: 'Headphones'
  },
  {
    id: 'co2_smoke',
    name: 'CO2 Stage Jet + Low-Fog Cold Spark Machine',
    category: 'special_fx',
    price: 5499,
    description: 'Breathtaking cold-pyro fountains and dense floor smoke for bride-groom entry & festival drops.',
    iconName: 'Flame'
  },
  {
    id: 'multitrack_rec',
    name: 'Live Multitrack Master Audio Recording',
    category: 'recording',
    price: 3499,
    description: 'High-res 24-bit 96kHz individual track recording of live band instruments & dhol tasha.',
    iconName: 'Radio'
  },
  {
    id: 'silent_dg',
    name: 'Silent Diesel Generator Backup (25 kVA)',
    category: 'power',
    price: 7999,
    description: 'Continuous uninterrupted sound power supply with automatic changeover for outdoor processions.',
    iconName: 'Cpu'
  }
];

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    clientName: 'Rahul Deshmukh',
    roleOrEvent: 'Gavdev Sohala & Grand Wedding Varat',
    rating: 5,
    comment: 'Booked the Silver Package for our Gavdev Sohala and wedding Varat miravnuk. The LLOYD LEE sound punch was unbelievable! The bass carried for kilometers without distorting vocals. Got the booking SMS and receipt instantly on payment!',
    date: 'February 2026',
    verifiedBooking: true
  },
  {
    id: 'rev-2',
    clientName: 'Sunil Patil (Mandal President)',
    roleOrEvent: 'Ganpati Utsav & Durga Devi Navratri Festival (8,000+ Crowd)',
    rating: 5,
    comment: 'Chintamani Sound LLOYD LEE Series is in a league of its own for Ganpati and Navratri. The Gold Package line arrays and subwoofers covered the entire chowk without any dead spots. The digital invoice and text message confirmation made mandal accounts seamless.',
    date: 'January 2026',
    verifiedBooking: true
  },
  {
    id: 'rev-3',
    clientName: 'Sanjay Shinde',
    roleOrEvent: 'Grand Marriage Event & Anniversary Celebration',
    rating: 5,
    comment: 'We used the Simple Package for our family anniversary and marriage reception. The sound was so sweet, crystal clear, and speech audibility was 100%. The team arrived on time and handled everything with great professionalism.',
    date: 'January 2026',
    verifiedBooking: true
  }
];
