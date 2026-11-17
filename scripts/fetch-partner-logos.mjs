import https from 'https'
import http from 'http'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.join(__dirname, '../public/images/partners')
fs.mkdirSync(outDir, { recursive: true })

const partners = [
  { id: 'mtn', name: 'MTN', files: ['MTN_2022_logo.svg', 'MTN 2022 logo.svg'], simple: 'mtn', domain: 'mtn.com', color: '#FFCC00' },
  { id: 'zain', name: 'Zain', files: ['Zain_(Unternehmen)_logo.svg', 'Zain (Unternehmen) logo.svg'], simple: 'zain', domain: 'zain.com', color: '#6C3D91' },
  { id: 'vodafone', name: 'Vodafone', files: ['Vodafone_logo_2017.svg', 'Vodafone logo 2017.svg'], simple: 'vodafone', domain: 'vodafone.com', color: '#E60000' },
  { id: 'airtel', name: 'Airtel', files: ['Airtel_logo.svg', 'Airtel logo.svg'], simple: 'airtel', domain: 'airtel.in', color: '#ED1C24' },
  { id: 'tigo', name: 'Tigo', files: ['Tigo_logo.svg', 'Tigo logo.svg'], simple: null, domain: 'tigo.com', color: '#0033A0' },
  { id: 'sudani', name: 'Sudani', files: [], simple: null, domain: 'sudani.sd', color: '#009639' },
  { id: 'orange', name: 'Orange', files: ['Orange_logo.svg', 'Orange logo.svg'], simple: 'orange', domain: 'orange.com', color: '#FF7900' },
  { id: 'btc', name: 'BTC', files: [], simple: null, domain: 'btc.bw', color: '#003366' },
  { id: 'mascom', name: 'Mascom', files: [], simple: null, domain: 'mascom.bw', color: '#E31C23' },
  { id: 'america-movil', name: 'América Móvil', files: ['América_Móvil_logo.svg'], simple: null, domain: 'americamovil.com', color: '#0033A0' },
  { id: 'digicel', name: 'Digicel', files: ['Digicel_logo.svg', 'Digicel logo.svg'], simple: null, domain: 'digicelgroup.com', color: '#ED1C24' },
  { id: 'claro', name: 'Claro', files: ['Claro_logo_(2017).svg', 'Claro logo (2017).svg'], simple: null, domain: 'claro.com.br', color: '#DA291C' },
  { id: 'etisalat', name: 'e&', files: ['Etisalat_Logo.svg'], simple: 'etisalat', domain: 'etisalat.ae', color: '#111111' },
  { id: 'ooredoo', name: 'Ooredoo', files: ['Ooredoo_logo.svg', 'Ooredoo logo.svg'], simple: null, domain: 'ooredoo.com', color: '#ED1C24' },
  { id: 'korek', name: 'Korek', files: [], simple: null, domain: 'korek.com', color: '#E30613' },
  { id: 'safaricom', name: 'Safaricom', files: ['Safaricom-logo-png_seeklogo-530479.svg'], simple: null, domain: 'safaricom.co.ke', color: '#6CBE45' },
  { id: 'dialog', name: 'Dialog', files: [], simple: null, domain: 'dialog.lk', color: '#7A1FA2' },
  { id: 'hutch', name: 'Hutch', files: [], simple: null, domain: 'hutch.lk', color: '#E6007E' },
  { id: 'mobitel', name: 'Mobitel', files: [], simple: null, domain: 'mobitel.lk', color: '#00A3E0' },
  { id: 'movitel', name: 'Movitel', files: [], simple: null, domain: 'movitel.co.mz', color: '#F36F21' },
  { id: 'telcel', name: 'Telcel', files: ['Telcel_logo.svg', 'Telcel logo.svg'], simple: null, domain: 'telcel.com', color: '#0033A0' },
  { id: 'tim', name: 'TIM', files: ['TIM_logo.svg', 'TIM logo.svg'], simple: 'tim', domain: 'tim.it', color: '#0000FF' },
  { id: 'personal', name: 'Personal', files: [], simple: null, domain: 'personal.com.py', color: '#00ADEF' },
  { id: 'entel', name: 'Entel', files: ['Entel_logo.svg', 'Entel logo.svg'], simple: null, domain: 'entel.cl', color: '#0057A8' },
  { id: 'du', name: 'du', files: [], simple: null, domain: 'du.ae', color: '#00A9CE' },
  { id: 'ais', name: 'AIS', files: ['AIS_logo.svg', 'AIS logo.svg'], simple: null, domain: 'ais.th', color: '#85C441' },
  { id: 'truemove', name: 'TrueMove', files: [], simple: null, domain: 'true.th', color: '#ED1C24' },
  { id: 'timwe', name: 'Timwe', files: [], simple: null, domain: 'timwe.com', color: '#1A3C6E' },
  { id: 'comviva', name: 'Comviva', files: [], simple: null, domain: 'comviva.com', color: '#E35205' },
]

function get(url, redirects = 0) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('http://') ? http : https
    const req = lib.get(
      url,
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
          Accept: 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9',
        },
        timeout: 30000,
      },
      (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location && redirects < 6) {
          get(new URL(res.headers.location, url).href, redirects + 1).then(resolve, reject)
          return
        }
        const chunks = []
        res.on('data', (d) => chunks.push(d))
        res.on('end', () =>
          resolve({
            status: res.statusCode,
            type: res.headers['content-type'] || '',
            body: Buffer.concat(chunks),
          }),
        )
      },
    )
    req.on('error', reject)
  })
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

function isImage(body, type) {
  if (!body || body.length < 80) return false
  if (type.includes('html') || type.includes('json') || type.includes('text/plain')) {
    const head = body.slice(0, 80).toString('utf8')
    if (!head.includes('<svg') && !head.includes('<?xml')) return false
  }
  const sig = body.slice(0, 12)
  if (sig[0] === 0x89 && sig[1] === 0x50) return 'png'
  if (sig[0] === 0xff && sig[1] === 0xd8) return 'jpg'
  if (sig.toString('utf8').includes('svg') || sig.toString('utf8').includes('XML') || type.includes('svg')) return 'svg'
  if (sig.toString('ascii', 0, 4) === 'RIFF') return 'webp'
  return false
}

function wordmarkSvg(name, color) {
  const safe = String(name).replace(/&/g, '&amp;')
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="320" height="120" viewBox="0 0 320 120">
  <rect width="320" height="120" rx="16" fill="#ffffff"/>
  <text x="160" y="70" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="28" font-weight="700" fill="${color}">${safe}</text>
</svg>
`
}

async function fromFilePath(title) {
  const url = 'https://commons.wikimedia.org/wiki/Special:FilePath/' + encodeURIComponent(title) + '?width=480'
  const r = await get(url)
  const kind = isImage(r.body, r.type)
  if (r.status === 200 && kind) return { body: r.body, ext: kind === true ? 'png' : kind }
  return null
}

async function fromSimpleIcons(slug, color) {
  if (!slug) return null
  const urls = [
    `https://cdn.simpleicons.org/${slug}`,
    color ? `https://cdn.simpleicons.org/${slug}/${color.replace('#', '')}` : null,
  ].filter(Boolean)
  for (const url of urls) {
    try {
      const r = await get(url)
      const kind = isImage(r.body, r.type)
      if (r.status === 200 && kind) return { body: r.body, ext: 'svg' }
    } catch {
      /* ignore */
    }
  }
  return null
}

async function fromGoogleFavicon(domain) {
  if (!domain) return null
  try {
    const r = await get(`https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=128`)
    const kind = isImage(r.body, r.type)
    if (r.status === 200 && kind && r.body.length > 400) {
      return { body: r.body, ext: kind === true ? 'png' : kind }
    }
  } catch {
    /* ignore */
  }
  return null
}

async function fromDuckFavicon(domain) {
  if (!domain) return null
  try {
    const r = await get(`https://icons.duckduckgo.com/ip3/${domain}.ico`)
    const kind = isImage(r.body, r.type)
    if (r.status === 200 && kind && r.body.length > 300) {
      return { body: r.body, ext: kind === true ? 'png' : kind }
    }
  } catch {
    /* ignore */
  }
  return null
}

const results = []

for (const p of partners) {
  await sleep(700)
  let got = null
  let source = null

  for (const title of p.files) {
    try {
      got = await fromFilePath(title)
      if (got) {
        source = 'commons'
        break
      }
    } catch {
      /* next */
    }
    await sleep(350)
  }

  if (!got) {
    got = await fromSimpleIcons(p.simple, p.color)
    if (got) source = 'simpleicons'
  }

  if (!got) {
    got = await fromGoogleFavicon(p.domain)
    if (got) source = 'favicon'
  }

  if (!got) {
    got = await fromDuckFavicon(p.domain)
    if (got) source = 'ddg'
  }

  let file
  if (got) {
    file = `${p.id}.${got.ext}`
    fs.writeFileSync(path.join(outDir, file), got.body)
  } else {
    file = `${p.id}.svg`
    fs.writeFileSync(path.join(outDir, file), wordmarkSvg(p.name, p.color))
    source = 'wordmark'
  }

  console.log(`${String(source).padEnd(12)} ${file} (${got?.body?.length || 0}b)`)
  results.push({ id: p.id, name: p.name, file, source })
}

fs.writeFileSync(path.join(outDir, 'manifest.json'), JSON.stringify(results, null, 2))
console.log(
  'done',
  results.filter((r) => r.source !== 'wordmark').length + '/' + results.length,
)
