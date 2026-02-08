// Coordonnées GPS approximatives des principales villes françaises
export const cityCoordinates: Record<string, [number, number]> = {
  // Grandes villes
  "Paris": [48.8566, 2.3522],
  "Lyon": [45.764, 4.8357],
  "Marseille": [43.2965, 5.3698],
  "Toulouse": [43.6047, 1.4442],
  "Nice": [43.7102, 7.262],
  "Nantes": [47.2184, -1.5536],
  "Strasbourg": [48.5734, 7.7521],
  "Montpellier": [43.6108, 3.8767],
  "Bordeaux": [44.8378, -0.5792],
  "Lille": [50.6292, 3.0573],
  "Rennes": [48.1173, -1.6778],
  "Reims": [49.2583, 4.0317],
  "Le Havre": [49.4944, 0.1079],
  "Saint-Étienne": [45.4397, 4.3872],
  "Toulon": [43.1242, 5.928],
  "Grenoble": [45.1885, 5.7245],
  "Dijon": [47.3220, 5.0415],
  "Angers": [47.4784, -0.5632],
  "Nîmes": [43.8367, 4.3601],
  "Villeurbanne": [45.7640, 4.8800],
  "Aix-en-Provence": [43.5297, 5.4474],
  "Brest": [48.3905, -4.4861],
  "Caluire": [45.7950, 4.8500],
  "Bron": [45.7400, 4.9100],
  "Vénissieux": [45.6970, 4.8870],

  // Île-de-France
  "Paris 15e": [48.8422, 2.2876],
  "Saint-Germain-en-Laye": [48.8984, 2.0945],
  "Val-de-Marne": [48.7833, 2.4833],
  "Nogent-sur-Marne": [48.8375, 2.4836],
  "Limay": [48.9981, 1.7353],
  "Osny": [49.0647, 2.0650],
  "Yvelines": [48.8000, 1.8500],
  "Val-d'Oise": [49.0500, 2.1000],
  "Île-de-France": [48.8566, 2.3522],
  "Maurepas": [48.7631, 1.9168],
  "Plaisir": [48.8167, 1.9500],
  "Coignières": [48.7525, 1.9206],
  "Vexin": [49.1500, 1.9000],

  // Défaut pour villes non listées (centré sur la France)
  "default": [46.2276, 2.2137]
}

export function getCityCoordinates(city: string): [number, number] {
  const normalizedCity = city.trim()
  return cityCoordinates[normalizedCity] || cityCoordinates["default"]
}
