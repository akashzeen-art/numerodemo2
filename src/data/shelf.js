/** Interactive cases for the Disc Shelf — Numero products & services */

const shot = (id) => ({
  img: `https://images.unsplash.com/${id}?w=600&h=600&fit=crop&auto=format&q=70`,
  blur: `https://images.unsplash.com/${id}?w=640&h=400&fit=crop&auto=format&q=70&blur=200`,
})

export const shelfItems = [
  {
    h: 175,
    title: 'USSD',
    artist: 'Offers Enablement',
    year: 'VAS',
    genre: 'Any phone · No internet',
    img: '/images/ussdimages.png',
    blur: '/images/ussdimages.png',
    tracks: [
      ['01', 'Interactive menus', 'Real-time'],
      ['02', 'Mass reach', 'Any handset'],
      ['03', 'Offer activation', 'Instant'],
      ['04', 'No app needed', 'Dial *code#'],
      ['05', 'Operator ready', 'Carrier-grade'],
    ],
    foot: 'Numero Info · VAS · Offers Enablement',
  },
  {
    h: 210,
    title: 'SMS Gateway',
    artist: 'Messaging Core',
    year: 'VAS',
    genre: 'High throughput SMS',
    img: '/images/smsgateway.png',
    blur: '/images/smsgateway.png',
    tracks: [
      ['01', 'Secure delivery', 'At scale'],
      ['02', 'OTP & alerts', 'Priority'],
      ['03', 'Bulk campaigns', 'Fast'],
      ['04', 'Business SMS', 'Reliable'],
      ['05', 'Zero compromise', 'SLA-ready'],
    ],
    foot: 'Numero Info · VAS · SMS Gateway',
  },
  {
    h: 25,
    title: 'Bulk SMS',
    artist: 'Mobile Advertisement',
    year: 'Campaigns',
    genre: 'One blast · Every subscriber',
    // Bulk SMS / mass messaging blast
    ...shot('photo-1596526131083-e8c633c948d2'),
    tracks: [
      ['01', 'Marketing blasts', 'Scale'],
      ['02', 'Alerts & OTPs', 'Trusted'],
      ['03', 'Personalised text', 'Target'],
      ['04', 'Delivery tracking', 'Clear'],
      ['05', 'High reach', 'Fast'],
    ],
    foot: 'Numero Info · Mobile Advertisement · Bulk SMS',
  },
  {
    h: 150,
    title: 'Carrier Billing',
    artist: 'Direct Carrier Billing',
    year: 'DCB',
    genre: 'Pay with mobile · No card',
    // Mobile checkout / pay with phone balance
    ...shot('photo-1556742049-0cfed4f6a45d'),
    tracks: [
      ['01', 'Choose purchase', 'Content'],
      ['02', 'Pay with number', 'Checkout'],
      ['03', 'Bill or prepaid', 'Operator'],
      ['04', 'Instant access', 'Enjoy'],
      ['05', '40+', 'Geos'],
    ],
    foot: 'Numero Info · DCB · Mobile-first payments',
  },
  {
    h: 255,
    title: 'Forex Rails',
    artist: 'Cross-Border Payments',
    year: '50+',
    genre: 'Liquidity · 24–48h',
    // Currency / cross-border finance
    ...shot('photo-1580519542036-c47de6196ba5'),
    tracks: [
      ['01', '50+ geos', 'Major+exotic'],
      ['02', '24–48h turn', 'Fast'],
      ['03', 'Africa deep', 'Corridors'],
      ['04', 'Fewer hops', 'Clear'],
      ['05', 'Compliance in', 'Control'],
    ],
    foot: 'Numero Info · Forex & Cross-Border Payments',
  },
  {
    h: 285,
    title: 'HD Games',
    artist: 'DCB Content',
    year: 'Engage',
    genre: 'Play · Charge · Return',
    // Mobile / console gaming
    ...shot('photo-1493711662062-fa541adb3fc8'),
    tracks: [
      ['01', 'HD catalogue', 'Fresh'],
      ['02', 'Bill charge', 'Easy'],
      ['03', 'Global titles', 'Reach'],
      ['04', 'High engage', 'Retain'],
      ['05', 'Campaign pair', 'Convert'],
    ],
    foot: 'Numero Info · Content · HD Games',
  },
  {
    h: 125,
    title: 'VOD & Audio',
    artist: 'DCB Content',
    year: 'Media',
    genre: 'Watch · Listen · Subscribe',
    // Streaming / headphones listening
    ...shot('photo-1478737270239-2f02b77fc618'),
    tracks: [
      ['01', 'Video on demand', 'Stream'],
      ['02', 'Audio books', 'Listen'],
      ['03', 'Global rights', 'Fresh'],
      ['04', 'Mobile billed', 'Simple'],
      ['05', 'Audience fit', 'Engage'],
    ],
    foot: 'Numero Info · Content · VOD & Audio Books',
  },
  {
    h: 45,
    title: '360° Digital',
    artist: 'Marketing',
    year: 'Ads',
    genre: 'Meta · Google · TikTok',
    // Social / digital ads & analytics
    ...shot('photo-1611162616475-46b635cb6868'),
    tracks: [
      ['01', 'Campaign mgmt', 'Full'],
      ['02', 'Ad optimize', 'ROI'],
      ['03', 'Analytics', 'Live'],
      ['04', 'Paid social', 'Reach'],
      ['05', 'Convert more', 'Prove'],
    ],
    foot: 'Numero Info · 360º Digital Marketing',
  },
]
