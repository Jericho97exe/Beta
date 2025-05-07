// Esta es una implementación simulada de la API de Riot Games
// En una aplicación real, necesitarías registrarte para obtener una clave API de Riot Games
// y seguir sus términos de servicio y limitaciones de tasa

const API_KEY = process.env.RIOT_API_KEY
const BASE_URL = "https://ddragon.leagueoflegends.com/cdn"

// Obtener la versión más reciente de los datos
export async function getLatestVersion() {
  try {
    const response = await fetch("https://ddragon.leagueoflegends.com/api/versions.json")
    const versions = await response.json()
    return versions[0] // La primera versión es la más reciente
  } catch (error) {
    console.error("Error al obtener la versión más reciente:", error)
    return "13.10.1" // Versión de respaldo
  }
}

// Obtener todos los campeones
export async function getAllChampions() {
  try {
    const version = await getLatestVersion()
    const response = await fetch(`${BASE_URL}/${version}/data/es_ES/champion.json`)
    const data = await response.json()
    return Object.values(data.data)
  } catch (error) {
    console.error("Error al obtener campeones:", error)
    return []
  }
}

// Obtener detalles de un campeón específico
export async function getChampionDetails(championId: string) {
  try {
    const version = await getLatestVersion()
    const response = await fetch(`${BASE_URL}/${version// Esta es una implementación simulada de la API de Riot Games
        // En una aplicación real, necesitarías registrarte para obtener una clave API de Riot Games
        // y seguir sus términos de servicio y limitaciones de tasa
        
        const API_KEY = process.env.RIOT_API_KEY
        const BASE_URL = "https://ddragon.leagueoflegends.com/cdn"
        
        // Obtener la versión más reciente de los datos
        export async function getLatestVersion() {
          try {
            const response = await fetch("https://ddragon.leagueoflegends.com/api/versions.json")
            const versions = await response.json()
            return versions[0] // La primera versión es la más reciente
          } catch (error) {
            console.error("Error al obtener la versión más reciente:", error)
            return "13.10.1" // Versión de respaldo
          }
        }
        
        // Obtener todos los campeones
        export async function getAllChampions() {
          try {
            const version = await getLatestVersion()
            const response = await fetch(`${BASE_URL}/${version}/data/es_ES/champion.json`)
            const data = await response.json()
            return Object.values(data.data)
          } catch (error) {
            console.error("Error al obtener campeones:", error)
            return []
          }
        }
        
        // Obtener detalles de un campeón específico
        export async function getChampionDetails(championId: string) {
          try {
            const version = await getLatestVersion()
            const response = await fetch(`${BASE_URL}/${version}/data/es_ES/champion/${championId}.json`)
            const data = await response.json()
            return data.data[championId]
          } catch (error) {
            console.error(`Error al obtener detalles del campeón ${championId}:`, error)
            return null
          }
        }
        
        // Obtener skins de un campeón
        export async function getChampionSkins(championId: string) {
          try {
            const championDetails = await getChampionDetails(championId)
            if (!championDetails) return []
        
            const version = await getLatestVersion()
        
            // Transformar los datos de skins para incluir URLs de imágenes y más detalles
            return championDetails.skins.map((skin: any) => ({
              id: skin.id,
              name: skin.name === "default" ? `${championDetails.name} Original` : skin.name,
              num: skin.num,
              champion: championDetails.name,
              price: calculateSkinPrice(skin.num), // Función ficticia para asignar precios
              image: `${BASE_URL}/${version}/img/champion/splash/${championId}_${skin.num}.jpg`,
              loadingImage: `${BASE_URL}/${version}/img/champion/loading/${championId}_${skin.num}.jpg`,
            }))
          } catch (error) {
            console.error(`Error al obtener skins del campeón ${championId}:`, error)
            return []
          }
        }
        
        // Función ficticia para calcular precios de skins basados en el número de skin
        function calculateSkinPrice(skinNum: number) {
          if (skinNum === 0) return 0 // Skin por defecto
          if (skinNum % 5 === 0) return 3250 // Ultimate
          if (skinNum % 4 === 0) return 1820 // Legendary
          if (skinNum % 3 === 0) return 1350 // Epic
          if (skinNum % 2 === 0) return 975 // Regular
          return 520 // Basic
        }
        
        // Obtener todas las skins disponibles (limitadas para rendimiento)
        export async function getAllSkins(limit = 20) {
          try {
            const champions = await getAllChampions()
            let allSkins: any[] = []
        
            // Solo obtenemos skins de algunos campeones para limitar las solicitudes
            const selectedChampions = champions.slice(0, 5)
        
            for (const champion of selectedChampions) {
              const championSkins = await getChampionSkins(champion.id)
              allSkins = [...allSkins, ...championSkins]
            }
        
            return allSkins.slice(0, limit)
          } catch (error) {
            console.error("Error al obtener todas las skins:", error)
            return []
          }
        }
        
        // Buscar campeones o skins
        export async function searchItems(query: string) {
          try {
            const champions = await getAllChampions()
            const matchedChampions = champions.filter((champion: any) =>
              champion.name.toLowerCase().includes(query.toLowerCase()),
            )
        
            let matchedSkins: any[] = []
            for (const champion of matchedChampions) {
              const skins = await getChampionSkins(champion.id)
              const filteredSkins = skins.filter((skin: any) => skin.name.toLowerCase().includes(query.toLowerCase()))
              matchedSkins = [...matchedSkins, ...filteredSkins]
            }
        
            return {
              champions: matchedChampions,
              skins: matchedSkins,
            }
          } catch (error) {
            console.error(`Error al buscar "${query}":`, error)
            return { champions: [], skins: [] }
          }
        }}/data/es_ES/champion/${championId}.json`)
    const data = await response.json()
    return data.data[championId]
  } catch (error) {
    console.error(`Error al obtener detalles del campeón ${championId}:`, error)
    return null
  }
}

// Obtener skins de un campeón
export async function getChampionSkins(championId: string) {
  try {
    const championDetails = await getChampionDetails(championId)
    if (!championDetails) return []

    const version = await getLatestVersion()

    // Transformar los datos de skins para incluir URLs de imágenes y más detalles
    return championDetails.skins.map((skin: any) => ({
      id: skin.id,
      name: skin.name === "default" ? `${championDetails.name} Original` : skin.name,
      num: skin.num,
      champion: championDetails.name,
      price: calculateSkinPrice(skin.num), // Función ficticia para asignar precios
      image: `${BASE_URL}/${version}/img/champion/splash/${championId}_${skin.num}.jpg`,
      loadingImage: `${BASE_URL}/${version}/img/champion/loading/${championId}_${skin.num}.jpg`,
    }))
  } catch (error) {
    console.error(`Error al obtener skins del campeón ${championId}:`, error)
    return []
  }
}

// Función ficticia para calcular precios de skins basados en el número de skin
function calculateSkinPrice(skinNum: number) {
  if (skinNum === 0) return 0 // Skin por defecto
  if (skinNum % 5 === 0) return 3250 // Ultimate
  if (skinNum % 4 === 0) return 1820 // Legendary
  if (skinNum % 3 === 0) return 1350 // Epic
  if (skinNum % 2 === 0) return 975 // Regular
  return 520 // Basic
}

// Obtener todas las skins disponibles (limitadas para rendimiento)
export async function getAllSkins(limit = 20) {
  try {
    const champions = await getAllChampions()
    let allSkins: any[] = []

    // Solo obtenemos skins de algunos campeones para limitar las solicitudes
    const selectedChampions = champions.slice(0, 5)

    for (const champion of selectedChampions) {
      const championSkins = await getChampionSkins(champion.id)
      allSkins = [...allSkins, ...championSkins]
    }

    return allSkins.slice(0, limit)
  } catch (error) {
    console.error("Error al obtener todas las skins:", error)
    return []
  }
}

// Buscar campeones o skins
export async function searchItems(query: string) {
  try {
    const champions = await getAllChampions()
    const matchedChampions = champions.filter((champion: any) =>
      champion.name.toLowerCase().includes(query.toLowerCase()),
    )

    let matchedSkins: any[] = []
    for (const champion of matchedChampions) {
      const skins = await getChampionSkins(champion.id)
      const filteredSkins = skins.filter((skin: any) => skin.name.toLowerCase().includes(query.toLowerCase()))
      matchedSkins = [...matchedSkins, ...filteredSkins]
    }

    return {
      champions: matchedChampions,
      skins: matchedSkins,
    }
  } catch (error) {
    console.error(`Error al buscar "${query}":`, error)
    return { champions: [], skins: [] }
  }
}