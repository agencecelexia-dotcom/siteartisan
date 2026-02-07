import { Artisan } from "@/types/artisan"

export const artisans: Artisan[] = [
  {
    id: "1",
    createdAt: "2024-01-15",
    updatedAt: "2024-12-01",
    status: "active",
    businessName: "Dupont Plomberie",
    trades: ["plombier"],
    profilePhoto: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=400&fit=crop",
    coverPhoto: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=1200&h=400&fit=crop",
    foundedYear: 2008,
    phone: "0612345678",
    email: "contact@dupont-plomberie.fr",
    website: "https://dupont-plomberie.fr",
    address: "12 rue de la R\u00e9publique",
    city: "Lyon",
    postalCode: "69001",
    department: "Rh\u00f4ne",
    socials: {
      facebook: "https://facebook.com/dupont-plomberie",
      instagram: "https://instagram.com/dupont_plomberie",
    },
    shortDescription: "Plombier qualifi\u00e9 \u00e0 Lyon, sp\u00e9cialiste en r\u00e9novation de salle de bain et d\u00e9pannage rapide.",
    fullDescription: "Entreprise familiale fond\u00e9e en 2008, Dupont Plomberie est votre partenaire de confiance pour tous vos travaux de plomberie \u00e0 Lyon et dans le Rh\u00f4ne. Notre \u00e9quipe de 5 plombiers qualifi\u00e9s intervient rapidement pour vos urgences et r\u00e9alisations. Nous sommes sp\u00e9cialis\u00e9s dans la r\u00e9novation compl\u00e8te de salles de bain, l\u2019installation de syst\u00e8mes de chauffage et le d\u00e9pannage en urgence.",
    serviceArea: ["Lyon", "Villeurbanne", "Caluire", "Bron", "V\u00e9nissieux"],
    serviceRadius: 30,
    projectTypes: ["R\u00e9novation salle de bain", "D\u00e9pannage urgence", "Installation chauffage", "Plomberie g\u00e9n\u00e9rale"],
    specialties: "R\u00e9novation haut de gamme, plomberie \u00e9cologique",
    portfolio: [
      { imageUrl: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&h=400&fit=crop", description: "R\u00e9novation salle de bain moderne" },
      { imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&h=400&fit=crop", description: "Installation douche italienne" },
      { imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop", description: "Salle d'eau compl\u00e8te" },
    ],
    certifications: ["Qualibat", "Plombier agr\u00e9\u00e9 PG"],
    insurances: ["RC Pro", "D\u00e9cennale"],
    guarantees: "Garantie d\u00e9cennale sur tous nos travaux",
    labels: ["RGE", "Qualibat"],
    rating: { average: 4.8, count: 47 },
    isCertified: true,
  },
  {
    id: "2",
    createdAt: "2024-02-20",
    updatedAt: "2024-11-15",
    status: "active",
    businessName: "AquaBlue Piscines",
    trades: ["pisciniste"],
    profilePhoto: "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=400&h=400&fit=crop",
    coverPhoto: "https://images.unsplash.com/photo-1572331165267-854da2b021b1?w=1200&h=400&fit=crop",
    foundedYear: 2012,
    phone: "0698765432",
    email: "info@aquablue-piscines.fr",
    website: "https://aquablue-piscines.fr",
    address: "45 avenue du Lac",
    city: "Aix-en-Provence",
    postalCode: "13100",
    department: "Bouches-du-Rh\u00f4ne",
    socials: {
      facebook: "https://facebook.com/aquablue-piscines",
      instagram: "https://instagram.com/aquablue_piscines",
      linkedin: "https://linkedin.com/company/aquablue-piscines",
    },
    shortDescription: "Pisciniste expert \u00e0 Aix-en-Provence, construction et r\u00e9novation de piscines sur mesure.",
    fullDescription: "AquaBlue Piscines con\u00e7oit et r\u00e9alise des piscines d\u2019exception depuis 2012 dans la r\u00e9gion d\u2019Aix-en-Provence. De la piscine enterr\u00e9e traditionnelle au bassin naturel, nous vous accompagnons dans chaque \u00e9tape de votre projet. Notre bureau d\u2019\u00e9tudes r\u00e9alise des plans 3D pour visualiser votre future piscine avant m\u00eame le d\u00e9but des travaux.",
    serviceArea: ["Aix-en-Provence", "Marseille", "Salon-de-Provence", "Pertuis", "Manosque"],
    serviceRadius: 50,
    projectTypes: ["Piscine enterr\u00e9e", "Piscine hors-sol", "R\u00e9novation piscine", "Entretien annuel", "Piscine naturelle"],
    specialties: "Piscines b\u00e9ton projet\u00e9, piscines naturelles",
    portfolio: [
      { imageUrl: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=600&h=400&fit=crop", description: "Piscine \u00e0 d\u00e9bordement" },
      { imageUrl: "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=600&h=400&fit=crop", description: "Piscine design moderne" },
      { imageUrl: "https://images.unsplash.com/photo-1562778612-e1e0cda9915c?w=600&h=400&fit=crop", description: "Am\u00e9nagement pool house" },
    ],
    certifications: ["FPP (F\u00e9d\u00e9ration des Professionnels de la Piscine)", "ProPiscines"],
    insurances: ["RC Pro", "D\u00e9cennale", "Garantie biennale"],
    guarantees: "Garantie 10 ans structure, 2 ans \u00e9quipements",
    labels: ["Propiscines", "FPP"],
    rating: { average: 4.9, count: 32 },
    isCertified: true,
  },
  {
    id: "3",
    createdAt: "2024-03-10",
    updatedAt: "2024-11-28",
    status: "active",
    businessName: "Vert Jardin",
    trades: ["paysagiste"],
    profilePhoto: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop",
    coverPhoto: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&h=400&fit=crop",
    foundedYear: 2015,
    phone: "0654321098",
    email: "contact@vert-jardin.fr",
    website: "https://vert-jardin.fr",
    address: "8 chemin des Oliviers",
    city: "Montpellier",
    postalCode: "34000",
    department: "H\u00e9rault",
    socials: {
      instagram: "https://instagram.com/vert_jardin_34",
    },
    shortDescription: "Paysagiste cr\u00e9atif \u00e0 Montpellier, conception de jardins m\u00e9diterran\u00e9ens et espaces verts.",
    fullDescription: "Vert Jardin transforme vos ext\u00e9rieurs en v\u00e9ritables havres de paix depuis 2015. Sp\u00e9cialis\u00e9s dans les jardins m\u00e9diterran\u00e9ens et \u00e9co-responsables, nous concevons des espaces qui respectent l\u2019environnement tout en magnifiant votre habitat. De la conception \u00e0 la r\u00e9alisation, notre \u00e9quipe passionn\u00e9e vous accompagne pour cr\u00e9er le jardin de vos r\u00eaves.",
    serviceArea: ["Montpellier", "B\u00e9ziers", "S\u00e8te", "N\u00eemes", "Lunel"],
    serviceRadius: 40,
    projectTypes: ["Cr\u00e9ation de jardin", "Am\u00e9nagement terrasse", "Cl\u00f4tures et murets", "Arrosage automatique", "Entretien paysager"],
    specialties: "Jardins m\u00e9diterran\u00e9ens, am\u00e9nagement durable",
    portfolio: [
      { imageUrl: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&h=400&fit=crop", description: "Jardin m\u00e9diterran\u00e9en" },
      { imageUrl: "https://images.unsplash.com/photo-1598902108854-d1446413650a?w=600&h=400&fit=crop", description: "Terrasse paysag\u00e9e" },
      { imageUrl: "https://images.unsplash.com/photo-1564429238961-441f4cac3516?w=600&h=400&fit=crop", description: "All\u00e9e de jardin" },
    ],
    certifications: ["UNEP (Union Nationale des Entreprises du Paysage)"],
    insurances: ["RC Pro", "D\u00e9cennale"],
    guarantees: "Garantie reprise v\u00e9g\u00e9taux 1 an",
    labels: ["Qualipaysage"],
    rating: { average: 4.7, count: 28 },
    isCertified: true,
  },
  {
    id: "4",
    createdAt: "2024-04-05",
    updatedAt: "2024-12-05",
    status: "active",
    businessName: "\u00c9lectricit\u00e9 Martin",
    trades: ["electricien"],
    profilePhoto: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=400&fit=crop",
    coverPhoto: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&h=400&fit=crop",
    foundedYear: 2005,
    phone: "0678901234",
    email: "contact@electricite-martin.fr",
    website: "https://electricite-martin.fr",
    address: "23 boulevard Voltaire",
    city: "Toulouse",
    postalCode: "31000",
    department: "Haute-Garonne",
    socials: {
      facebook: "https://facebook.com/electricite.martin",
      linkedin: "https://linkedin.com/company/electricite-martin",
    },
    shortDescription: "\u00c9lectricien certifi\u00e9 \u00e0 Toulouse, mise aux normes, domotique et installations \u00e9lectriques.",
    fullDescription: "\u00c9lectricit\u00e9 Martin est une entreprise d\u2019\u00e9lectricit\u00e9 g\u00e9n\u00e9rale bas\u00e9e \u00e0 Toulouse depuis 2005. Notre \u00e9quipe de 8 \u00e9lectriciens qualifi\u00e9s r\u00e9alise tous types de travaux \u00e9lectriques : mise aux normes, installation compl\u00e8te, domotique, bornes de recharge, panneaux solaires. Nous intervenons aussi bien chez les particuliers que les professionnels.",
    serviceArea: ["Toulouse", "Blagnac", "Colomiers", "Tournefeuille", "Muret"],
    serviceRadius: 35,
    projectTypes: ["Mise aux normes", "Installation \u00e9lectrique", "Domotique", "Borne de recharge", "Panneau solaire", "Tableau \u00e9lectrique"],
    specialties: "Domotique, bornes de recharge v\u00e9hicules \u00e9lectriques",
    portfolio: [
      { imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop", description: "Installation domotique" },
      { imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&h=400&fit=crop", description: "Tableau \u00e9lectrique moderne" },
      { imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop", description: "Borne de recharge" },
    ],
    certifications: ["Qualifelec", "IRVE (Borne de recharge)"],
    insurances: ["RC Pro", "D\u00e9cennale"],
    guarantees: "Garantie d\u00e9cennale, SAV r\u00e9actif",
    labels: ["RGE", "Qualifelec", "IRVE"],
    rating: { average: 4.6, count: 56 },
    isCertified: true,
  },
  {
    id: "5",
    createdAt: "2024-05-12",
    updatedAt: "2024-11-30",
    status: "active",
    businessName: "SOS Plombier Express",
    trades: ["plombier"],
    profilePhoto: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=400&fit=crop",
    coverPhoto: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=1200&h=400&fit=crop",
    foundedYear: 2018,
    phone: "0645678901",
    email: "urgence@sos-plombier-express.fr",
    address: "5 rue Pasteur",
    city: "Marseille",
    postalCode: "13001",
    department: "Bouches-du-Rh\u00f4ne",
    shortDescription: "Service d\u2019urgence plomberie 24h/24 \u00e0 Marseille. Intervention rapide et devis gratuit.",
    fullDescription: "SOS Plombier Express intervient en urgence 24h/24 et 7j/7 sur Marseille et ses environs. Fuite d\u2019eau, canalisation bouch\u00e9e, chauffe-eau en panne... nous arrivons en moins d\u2019une heure. Nos tarifs sont transparents et nos devis gratuits. Plus de 1000 interventions r\u00e9ussies par an.",
    serviceArea: ["Marseille", "Aubagne", "La Ciotat", "Cassis", "Aix-en-Provence"],
    serviceRadius: 40,
    projectTypes: ["D\u00e9pannage urgence", "D\u00e9bouchage", "Fuite d'eau", "Chauffe-eau", "Plomberie g\u00e9n\u00e9rale"],
    specialties: "Urgence 24h/24, d\u00e9pannage rapide",
    portfolio: [
      { imageUrl: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&h=400&fit=crop", description: "Intervention d'urgence" },
    ],
    certifications: ["Artisan qualifi\u00e9"],
    insurances: ["RC Pro", "D\u00e9cennale"],
    guarantees: "Devis gratuit, intervention en 1h",
    labels: [],
    rating: { average: 4.4, count: 89 },
    isCertified: false,
  },
  {
    id: "6",
    createdAt: "2024-06-01",
    updatedAt: "2024-12-02",
    status: "active",
    businessName: "Pisci-Sud R\u00e9novation",
    trades: ["pisciniste"],
    profilePhoto: "https://images.unsplash.com/photo-1572331165267-854da2b021b1?w=400&h=400&fit=crop",
    coverPhoto: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=1200&h=400&fit=crop",
    foundedYear: 2010,
    phone: "0667891234",
    email: "contact@pisci-sud.fr",
    website: "https://pisci-sud.fr",
    address: "120 route de Narbonne",
    city: "Toulouse",
    postalCode: "31400",
    department: "Haute-Garonne",
    socials: {
      facebook: "https://facebook.com/piscisud",
    },
    shortDescription: "Sp\u00e9cialiste r\u00e9novation piscine \u00e0 Toulouse, remise en \u00e9tat et modernisation de bassins.",
    fullDescription: "Pisci-Sud R\u00e9novation est le sp\u00e9cialiste de la r\u00e9novation de piscines dans la r\u00e9gion toulousaine. Remplacement de liner, r\u00e9novation b\u00e9ton, installation d\u2019\u00e9quipements modernes (pompe \u00e0 chaleur, traitement au sel, \u00e9clairage LED)... Nous redonnerons une seconde jeunesse \u00e0 votre bassin.",
    serviceArea: ["Toulouse", "Albi", "Montauban", "Carcassonne"],
    serviceRadius: 60,
    projectTypes: ["R\u00e9novation piscine", "Remplacement liner", "Pompe \u00e0 chaleur", "Traitement au sel", "\u00c9clairage piscine"],
    specialties: "R\u00e9novation, modernisation de piscines existantes",
    portfolio: [
      { imageUrl: "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=600&h=400&fit=crop", description: "R\u00e9novation compl\u00e8te" },
      { imageUrl: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=600&h=400&fit=crop", description: "Avant/Apr\u00e8s r\u00e9novation" },
    ],
    certifications: ["FPP", "Qualipiscine"],
    insurances: ["RC Pro", "D\u00e9cennale"],
    guarantees: "Garantie 5 ans liner, 10 ans structure",
    labels: ["FPP"],
    rating: { average: 4.7, count: 21 },
    isCertified: true,
  },
  {
    id: "7",
    createdAt: "2024-06-15",
    updatedAt: "2024-11-20",
    status: "active",
    businessName: "Nature & Paysage",
    trades: ["paysagiste"],
    profilePhoto: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop",
    coverPhoto: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1200&h=400&fit=crop",
    foundedYear: 2019,
    phone: "0623456789",
    email: "hello@nature-paysage.fr",
    website: "https://nature-paysage.fr",
    address: "15 all\u00e9e des Ch\u00eanes",
    city: "Bordeaux",
    postalCode: "33000",
    department: "Gironde",
    socials: {
      instagram: "https://instagram.com/nature_paysage_33",
      facebook: "https://facebook.com/natureetpaysage",
    },
    shortDescription: "Paysagiste \u00e9co-responsable \u00e0 Bordeaux, jardins naturels et am\u00e9nagements durables.",
    fullDescription: "Nature & Paysage cr\u00e9e des jardins vivants et durables \u00e0 Bordeaux et en Gironde. Notre approche \u00e9cologique privil\u00e9gie les essences locales, les techniques de permaculture et la gestion raisonn\u00e9e de l\u2019eau. Chaque projet est unique, con\u00e7u pour s\u2019int\u00e9grer harmonieusement dans son environnement.",
    serviceArea: ["Bordeaux", "M\u00e9rignac", "Pessac", "Talence", "Arcachon"],
    serviceRadius: 45,
    projectTypes: ["Jardin \u00e9cologique", "Permaculture", "Terrasse bois", "Cl\u00f4ture v\u00e9g\u00e9tale", "Am\u00e9nagement ext\u00e9rieur"],
    specialties: "Permaculture, jardins \u00e9cologiques",
    portfolio: [
      { imageUrl: "https://images.unsplash.com/photo-1598902108854-d1446413650a?w=600&h=400&fit=crop", description: "Jardin \u00e9cologique" },
      { imageUrl: "https://images.unsplash.com/photo-1564429238961-441f4cac3516?w=600&h=400&fit=crop", description: "Terrasse bois et v\u00e9g\u00e9talisation" },
    ],
    certifications: ["UNEP"],
    insurances: ["RC Pro"],
    guarantees: "Reprise des v\u00e9g\u00e9taux pendant 1 an",
    labels: ["Qualipaysage", "Eco-jardin"],
    rating: { average: 4.9, count: 15 },
    isCertified: true,
  },
  {
    id: "8",
    createdAt: "2024-07-01",
    updatedAt: "2024-12-04",
    status: "active",
    businessName: "Flash \u00c9lectricit\u00e9",
    trades: ["electricien"],
    profilePhoto: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=400&fit=crop",
    coverPhoto: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&h=400&fit=crop",
    foundedYear: 2016,
    phone: "0634567890",
    email: "contact@flash-electricite.fr",
    address: "67 rue de l\u2019\u00c9nergie",
    city: "Lyon",
    postalCode: "69003",
    department: "Rh\u00f4ne",
    socials: {
      linkedin: "https://linkedin.com/company/flash-electricite",
    },
    shortDescription: "\u00c9lectricien r\u00e9actif \u00e0 Lyon, sp\u00e9cialiste panneaux solaires et \u00e9conomies d\u2019\u00e9nergie.",
    fullDescription: "Flash \u00c9lectricit\u00e9 accompagne les particuliers et professionnels lyonnais dans leur transition \u00e9nerg\u00e9tique. Installation de panneaux solaires, pompes \u00e0 chaleur, bornes de recharge et mise aux normes \u00e9lectriques. Nos \u00e9lectriciens certifi\u00e9s RGE vous font b\u00e9n\u00e9ficier des aides de l\u2019\u00c9tat.",
    serviceArea: ["Lyon", "Villeurbanne", "Saint-\u00c9tienne", "Vienne"],
    serviceRadius: 50,
    projectTypes: ["Panneau solaire", "Pompe \u00e0 chaleur", "Borne de recharge", "Mise aux normes", "R\u00e9novation \u00e9lectrique"],
    specialties: "\u00c9nergies renouvelables, transition \u00e9nerg\u00e9tique",
    portfolio: [
      { imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop", description: "Installation panneaux solaires" },
      { imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&h=400&fit=crop", description: "Tableau \u00e9lectrique r\u00e9nov\u00e9" },
    ],
    certifications: ["Qualifelec", "QualiPV", "IRVE"],
    insurances: ["RC Pro", "D\u00e9cennale"],
    guarantees: "Garantie d\u00e9cennale, accompagnement aides \u00c9tat",
    labels: ["RGE", "Qualifelec", "QualiPV"],
    rating: { average: 4.5, count: 34 },
    isCertified: true,
  },
]

export function getArtisanById(id: string): Artisan | undefined {
  return artisans.find((a) => a.id === id)
}

export function getArtisansByTrade(trade: string): Artisan[] {
  return artisans.filter((a) => a.status === "active" && a.trades.includes(trade as any))
}

export function getArtisansByCity(city: string): Artisan[] {
  return artisans.filter(
    (a) =>
      a.status === "active" &&
      (a.city.toLowerCase().includes(city.toLowerCase()) ||
        a.serviceArea.some((s) => s.toLowerCase().includes(city.toLowerCase())))
  )
}

export function searchArtisans(query: string, trade?: string, city?: string, minRating?: number): Artisan[] {
  return artisans.filter((a) => {
    if (a.status !== "active") return false
    if (trade && !a.trades.includes(trade as any)) return false
    if (city && !a.city.toLowerCase().includes(city.toLowerCase()) && !a.serviceArea.some((s) => s.toLowerCase().includes(city.toLowerCase()))) return false
    if (minRating && a.rating.average < minRating) return false
    if (query) {
      const q = query.toLowerCase()
      return (
        a.businessName.toLowerCase().includes(q) ||
        a.shortDescription.toLowerCase().includes(q) ||
        a.city.toLowerCase().includes(q) ||
        a.projectTypes.some((p) => p.toLowerCase().includes(q))
      )
    }
    return true
  })
}

export function getAllCities(): string[] {
  const cities = new Set<string>()
  artisans.forEach((a) => {
    if (a.status === "active") {
      cities.add(a.city)
      a.serviceArea.forEach((s) => cities.add(s))
    }
  })
  return Array.from(cities).sort()
}

export function getStats() {
  const active = artisans.filter((a) => a.status === "active")
  const cities = new Set<string>()
  active.forEach((a) => cities.add(a.city))
  const avgRating = active.reduce((acc, a) => acc + a.rating.average, 0) / active.length
  return {
    totalArtisans: active.length,
    totalCities: cities.size,
    averageRating: Math.round(avgRating * 10) / 10,
  }
}
