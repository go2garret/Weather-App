export class Cities {
  private API_KEY: string
  private BASE_URL: string

  constructor() {
    this.API_KEY = '482944e26d320a80bd5e4f23b3de7d1f' // Replace with your actual API key
    this.BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast'
  }

  async getHourlyForecast(lat: number, lon: number): Promise<void> {
    try {
      const response = await fetch(
        `${this.BASE_URL}?lat=${lat}&lon=${lon}&units=imperial&appid=${this.API_KEY}`
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

  async getDailyForecast(lat: number, lon: number): Promise<void> {
    try {
      const response = await fetch(
        `${this.BASE_URL}?lat=${lat}&lon=${lon}&units=imperial&appid=${this.API_KEY}`
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
