export class Cities {
  private API_KEY: string
  private BASE_URL: string
  private cities: string[][] | null = null

  constructor() {
    this.API_KEY = '482944e26d320a80bd5e4f23b3de7d1f'
    this.BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast'
    this.cities = null
  }

  /**
   * Search the text file contents for matching string
   * @param term
   * @returns
   */
  async search(term: string): Promise<string[][] | null> {
    if (!term || term.length == 0) {
      return null
    }

    // Load cities CSV on the first try
    if (!this.cities) {
      this.cities = await this.loadCSV('/src/assets/cities_20000.csv')
    }

    // Filter the cities based on the search term
    const searchTerm = term.toLowerCase()

    const results: string[][] = []

    this.cities.forEach((city) => {
      if (city[1]?.toLowerCase().startsWith(searchTerm)) {
        // skip if city, state, and country are already loaded
        if (results.find((row) => row[1] == city[1] && row[2] == city[2] && row[4] == city[4])) {
          return
        }
        // limit max results
        if (results.length > 12) {
          return
        }
        results.push(city)
      }
    })

    return results
  }

  /**
   * Load text file into array
   * @param url
   * @returns
   */
  private async loadCSV(url: string): Promise<string[][]> {
    const response = await fetch(url)
    const csvText = await response.text()
    const lines = csvText.split('\n')
    return lines.map((line) => line.split(','))
  }

  /**
   *
   * @param city_name
   * @returns
   */
  async getHourlyForecast(city_name: string): Promise<void> {
    try {
      const response = await fetch(
        `${this.BASE_URL}?q=${city_name}&units=imperial&appid=${this.API_KEY}`
      )

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }

      const data = await response.json()
      console.log('Weather', data)
      return data
    } catch (error) {
      console.error('Error fetching hourly forecast:', error)
    }
  }

  /**
   *
   * @param city_name
   * @returns
   */
  async getDailyForecast(city_name: string): Promise<void> {
    try {
      const response = await fetch(
        `${this.BASE_URL}?q=${city_name}&units=imperial&appid=${this.API_KEY}`
      )

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }

      const data = await response.json()
      console.log('Weather daily', data)
      return data
    } catch (error) {
      console.error('Error fetching hourly forecast:', error)
    }
  }
}
