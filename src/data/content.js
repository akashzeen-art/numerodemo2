// Site copy sourced from solutions.nservetechnology.com (VAS),
// dcb.nservetechnology.com (DCB) and payments.nservetechnology.com (Forex).

export const pillars = [
  {
    id: 'vas',
    icon: 'server.png',
    emoji: '📡',
    title: 'VAS Platforms',
    tagline: 'Telecom solutions that connect, engage & grow.',
    desc: 'From USSD and SMS Gateway to mobile advertising — the network capabilities, value-added services and campaigns operators and enterprises need, in one place.',
    color: '#0c7c6b',
  },
  {
    id: 'dcb',
    icon: 'user-check-icon.png',
    emoji: '📱',
    title: 'Direct Carrier Billing',
    tagline: 'Pay with your mobile. Grow with digital.',
    desc: 'Let customers buy instantly using their phone bill or prepaid balance — checkout built for the phone, across prepaid and postpaid.',
    color: '#0e5f8a',
  },
  {
    id: 'd2c',
    icon: 'cloud.png',
    emoji: '🛒',
    title: 'D2C & Digital Content',
    tagline: 'Content users love. Campaigns that convert.',
    desc: 'HD games, VOD, audio books and 360° digital marketing — so carriers and brands reach subscribers directly and keep them engaged.',
    color: '#148f7a',
  },
  {
    id: 'forex',
    icon: 'graph.png',
    emoji: '💱',
    title: 'Forex & Cross-Border Payments',
    tagline: 'Connecting People. Payments. Processes. Across Borders.',
    desc: 'Every payment has a journey. We connect countries, currencies and stakeholders into one clear process.',
    color: '#b8612e',
  },
]

export const vasCategories = [
  {
    id: 'offers-enablement',
    title: 'Offers Enablement',
    emoji: '🎯',
    accent: '#0c7c6b',
    gradient: 'linear-gradient(45deg, #0c7c6b 0%, #14a08a 100%)',
    image: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=800&q=70',
    tagline: 'For smarter offers',
    blurb: 'Network capabilities that let operators launch, target and deliver offers in real time.',
    intro: 'Enabling Smarter Offers, Powered by Intelligent Network Capabilities.',
    items: [
      { name: 'USSD', fullName: 'Unstructured Supplementary Service Data', headline: 'Reach every mobile user — instantly', summary: 'Engage users with real-time, interactive menus that work on any device, no internet needed. Perfect for mass reach and frictionless service access.' },
    ],
  },
  {
    id: 'core-vas',
    title: 'Core VAS',
    emoji: '📞',
    accent: '#0e5f8a',
    gradient: 'linear-gradient(45deg, #0e5f8a 0%, #148f7a 100%)',
    image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=800&q=70',
    tagline: 'For seamless calling',
    blurb: 'Call-completion services that keep subscribers connected, even when a call can’t go through.',
    intro: 'We ensure seamless communication even when calls can’t connect — boosting subscriber satisfaction, retention, and network usage.',
    items: [
      { name: 'Beep Call', fullName: null, headline: 'Communicate with a missed call', summary: 'Lets users alert others with a missed call when they’re low on balance or wish to communicate passively.' },
      { name: 'MCN & CMB', fullName: 'Missed Call Notification & Call Me Back', headline: 'Never miss a call again', summary: 'Essential call-completion services that keep subscribers informed and connected, even when they can’t take or make a call.' },
    ],
  },
  {
    id: 'vas-digital',
    title: 'VAS & Digital',
    emoji: '⚙️',
    accent: '#0c7c6b',
    gradient: 'linear-gradient(45deg, #0c7c6b 0%, #0e5f8a 100%)',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=70',
    tagline: 'For digital growth',
    blurb: 'Flexible platforms to create, integrate and scale value-added digital services quickly.',
    intro: 'Engineered for flexibility, rapid integration, and high ROI, our platform helps you stay competitive in a fast-evolving digital landscape.',
    items: [
      { name: 'SDP', fullName: 'Service Delivery Platform', headline: 'Launch and scale VAS faster', summary: 'A centralized platform that streamlines service creation, management, and integration — so operators launch and scale VAS quickly.' },
      { name: 'WAVE', fullName: null, headline: 'Seamless Connectivity, Smarter Control', summary: 'A next-generation solution for integrating Diameter based and application network elements.' },
      { name: 'CRBT', fullName: 'Caller Ring Back Tone', headline: 'Turn every ring into revenue', summary: 'Replaces the standard ringing tone with music, messages, or promotional content — a recurring revenue stream for operators.' },
    ],
  },
  {
    id: 'mobile-advertisement',
    title: 'Mobile Advertisement',
    emoji: '📣',
    accent: '#b8612e',
    gradient: 'linear-gradient(45deg, #b8612e 0%, #0c7c6b 100%)',
    image: 'https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&w=800&q=70',
    tagline: 'For high-reach campaigns',
    blurb: 'Bulk SMS, USSD Push, OBD and Balance + campaigns that reach every mobile user.',
    intro: 'Unlock powerful, high-reach engagement through Balance Plus messages, USSD Push, and Bulk SMS campaigns.',
    items: [
      { name: 'Bulk SMS', fullName: null, headline: 'One campaign, every subscriber', summary: 'Send large-scale, personalized text messages instantly for marketing, alerts, OTPs, and customer engagement.' },
      { name: 'Balance +', fullName: null, headline: 'Promote on every balance check', summary: 'Insert targeted, interactive USSD texts into the response to every USSD balance check.' },
      { name: 'OBD', fullName: 'Outbound Dialing', headline: 'Automated voice campaigns', summary: 'Automated voice calling for promotions, reminders, alerts, and surveys, reaching thousands of users efficiently.' },
      { name: 'USSD Push', fullName: null, headline: 'Interactive pop-ups on any phone', summary: 'Real-time pop-up messages that deliver interactive alerts, offers, and confirmations to any mobile phone without internet.' },
    ],
  },
]

export const vasProducts = vasCategories.flatMap(c =>
  c.items.map(item => ({ ...item, category: c.title, emoji: c.emoji, accent: c.accent }))
)

export const vasDemos = [
  { product: 'USSD', title: 'Interactive menus on any phone', text: 'A subscriber dials *123#, browses offers and activates one in seconds — no app, no internet.' },
  { product: 'MCN & CMB', title: 'Never miss a call again', text: 'When a subscriber is unreachable, they get an instant missed call alert and a call-back request.' },
  { product: 'CRBT', title: 'Turn every ring into revenue', text: 'Replace the standard ringback with music or promos — a recurring revenue stream for operators.' },
  { product: 'Bulk SMS', title: 'One campaign, every subscriber', text: 'Push a personalised offer to thousands of users and watch delivery happen in real time.' },
]

export const dcb = {
  intro: 'Direct Carrier Billing (DCB) is an online mobile payment method that allows users to make purchases directly charged to their mobile phone bill or prepaid SIM card. DCB works across all mobile devices and is accessible to any user having a subscription or prepaid plan with a telecom operator.',
  points: ['Charged to the mobile bill', 'Works with prepaid SIM cards', 'Any mobile device'],
  steps: [
    { title: 'Choose a purchase', desc: 'The user picks a game, subscription, app or digital content online.' },
    { title: 'Pay with mobile', desc: 'They select their mobile number as the payment method and confirm.' },
    { title: 'Charged by the operator', desc: 'The amount is added to the phone bill or deducted from prepaid balance.' },
  ],
  benefits: [
    { title: 'Mobile-first user experience', desc: 'Checkout built for the phone, paid with just a mobile number.' },
    { title: 'Flexible delivery across channels', desc: 'Reach subscribers wherever they are, across every digital channel.' },
    { title: 'Measurable outcomes & performance tracking', desc: 'Track every transaction and campaign with clear, measurable results.' },
  ],
  nonData: {
    title: 'Products for non-data users',
    desc: 'Not every subscriber is online. Our USSD products bring AI assistance, content and rewards to any handset with a simple dial code: no app, no internet, and billed straight to the operator account.',
    points: ['No internet needed', 'Works on any phone', 'Operator billing'],
    products: [
      { code: '*786#', name: 'AI Ginnie', desc: 'Dial *786#, meet AI Ginnie and get helpful answers on health, learning, relationships and everyday life, right from the USSD menu.' },
      { code: '*345#', name: 'Dial & win', desc: 'Subscribers unlock gifts that keep them coming back — motorcycles, smartphones, cash and more.' },
    ],
  },
  contentIntro: 'Apart from being technologically forward, we also keep on acquiring access and rights to communication that would find a global audience. We have the channel, as well as the content, across so many categories — and we regularly update our content repositories to provide users with the latest and most interesting content.',
  content: [
    { emoji: '🎧', title: 'Audio Books', desc: 'Curated audio books content designed for maximum engagement and user satisfaction.' },
    { emoji: '🌍', title: 'Global Content', desc: 'Curated global content designed for maximum engagement and user satisfaction.' },
    { emoji: '🎬', title: 'VOD (Video On Demand)', desc: 'Curated video on demand content designed for maximum engagement and user satisfaction.' },
    { emoji: '🎮', title: 'HD Games', desc: 'Curated HD games content designed for maximum engagement and user satisfaction.' },
    { emoji: '🏆', title: 'Contest', desc: 'Exciting contests and competitions to engage users, reward participation, and drive platform growth.' },
    { emoji: '💪', title: 'Health and Fitness', desc: 'Curated health and fitness content designed for maximum engagement and user satisfaction.' },
  ],
  marketingIntro: 'Digital marketing involves leveraging online channels like social media, search engines, email, and websites to promote brands, engage audiences, and drive conversions. We offer 360º digital marketing solutions, covering all aspects of digital marketing on all digital devices, with various solutions to optimize your digital advertising spends.',
  marketing: [
    { title: 'Campaign Management', desc: 'Comprehensive digital campaign planning and execution' },
    { title: 'Analytics & Reporting', desc: 'Real-time insights into campaign performance' },
    { title: 'Ad Optimization', desc: 'Advanced targeting and optimization techniques' },
    { title: 'Content Strategy', desc: 'Data-driven content creation and distribution' },
    { title: 'Conversion Optimization', desc: 'Maximize ROI with proven conversion strategies' },
    { title: 'Google, Meta & TikTok Ads', desc: 'Targeted paid campaigns that reach your audience where they search, scroll and watch' },
  ],
}

export const forex = {
  layers: [
    {
      emoji: '🤝',
      label: 'Repatriation',
      title: 'Technology-enabler repatriation services',
      sub: 'One Process. Multiple Currencies. Seamless Coordination',
      points: [
        'We bring stakeholders together through a structured and transparent workflow',
        'Every stage of the process managed efficiently',
        'Coordination across authorities, consulates, logistics partners, pharmaceuticals, financial institutions and other service providers',
      ],
    },
    {
      emoji: '💱',
      label: 'Currency',
      title: 'Liquidity across the world',
      sub: 'We provide currency liquidity across most African markets — and selected corridors worldwide — for both inward and outward payments. Our objective is simple: move cross-border value securely, with speed, clarity and fewer intermediaries.',
      points: [
        'Non-convertible currencies requiring significant amounts of blueprints to export',
        'High cost of conversion',
        'Lengthy turnaround time reducing your working capital and treasury pools',
        'Multiple service providers you have to deal with',
      ],
      solution: 'Deep liquidity, broad currency coverage and a 24-48 hour operating model — purpose-built for restricted, exotic and high-friction corridors where conventional banking falls short.',
    },
    {
      emoji: '🛡️',
      label: 'Compliance',
      title: 'Compliance & Control',
      sub: 'Secure information. Clear accountability. Regulation-ready workflows. Every cross-border payment carries regulatory, documentation and information-risk requirements — we embed compliance into the journey so teams can move faster without losing control.',
      points: [
        'Secure by design — sensitive documents, identities and transaction data protected at every handoff',
        'Regulation-ready — built for cross-border compliance expectations across key markets',
        'Transparency — every approval, update and settlement event logged for review',
        'Risk visibility — clear exception handling so compliance teams stay informed',
      ],
    },
    {
      emoji: '🧭',
      label: 'Journey',
      title: 'End-to-End Journey',
      sub: 'Different countries. Different currencies. One connected process. Cross-border success is about orchestrating people, paperwork, partners and payment rails into one dependable journey — with visibility from instruction to confirmation.',
      points: [
        'One connected process across countries and currencies',
        'Built for repatriation, currency conversion and restricted corridors',
        'Speed with control — without sacrificing compliance or auditability',
        'Partner-ready for enterprises, institutions and operators',
      ],
    },
  ],
  stats: [
    { value: '50+', label: 'Geos', desc: 'Major, exotic and illiquid markets managed seamlessly.' },
    { value: '24–48 H', label: 'Turnaround', desc: 'Inward and outward cross-border payments executed fast.' },
    { value: 'Worldwide', label: 'Coverage', desc: 'Deep liquidity across African markets and beyond.' },
  ],
  whyUs: [
    { want: 'Money security', wantDesc: 'Capital protected at every stage of the corridor journey.', why: '100% insured deal', whyDesc: 'Every transaction structured with full deal insurance.' },
    { want: 'Secured platform', wantDesc: 'A trusted environment for cross-border payment coordination.', why: 'Licensed escrow backup', whyDesc: 'Back-up finances as per deposits through a licensed escrow account.' },
    { want: 'Assurance', wantDesc: 'Confidence that process, compliance and outcomes stay aligned.', why: 'Flexible charges', whyDesc: 'Clear, adaptable commercial terms shaped around your corridor needs.' },
    { want: 'Timely revert / update', wantDesc: 'Fast visibility when status changes across stakeholders.', why: 'Works within time frame', whyDesc: 'Execution and updates kept inside agreed operating windows.' },
    { want: 'Known working channels', wantDesc: 'Predictable rails and partners you can rely on repeatedly.', why: 'Customisation of model', whyDesc: 'Corridor models tailored to your markets, currencies and process.' },
  ],
  phases: [
    { title: 'Foundation', desc: 'Corridor mapping, currency model and compliance framework locked in.' },
    { title: 'Due diligence', desc: 'A swift and efficient fully digital due diligence process to make sure we comply to the most stringent international regulation.' },
    { title: 'Account creation', desc: 'Your account is created enabling you to pull most of the rates in real time.' },
    { title: 'Trade!', desc: 'We execute your online or OTC trade.' },
    { title: 'Scale', desc: 'Expanded currency coverage, and end-to-end journey orchestration.' },
    { title: 'Global Reach', desc: 'Additional corridors on request — exotic and illiquid markets included.' },
  ],
  corridors: ['Algeria → Egypt', 'Egypt → Ethiopia', 'Egypt → Pakistan', 'Morocco → Côte d’Ivoire', 'Côte d’Ivoire → Cameroon', 'Cameroon → Ethiopia', 'Ethiopia → Pakistan'],
  highlights: ['Competitive Rates', 'Fast Settlement', 'Secure & Compliant'],
}

export const marqueeItems = [
  'VAS', 'DCB', 'D2C', 'Forex',
  'USSD',
  'Direct Carrier Billing', 'AI Ginnie *786#', 'HD Games', 'VOD', 'Digital Marketing',
  'Cross-Border Payments', '50+ Geos',
]

export const serviceOptions = [
  ...vasCategories.map(c => `VAS — ${c.title}`),
  'Direct Carrier Billing (DCB)',
  'D2C — Content (Games, VOD, Audio Books)',
  'D2C — Digital Marketing',
  'Forex & Cross-Border Payments',
  'Other',
]
