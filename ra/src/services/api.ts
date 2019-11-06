export class ApiService {

    private readonly urlApi: string ;
    private readonly apiKey: string ;

    constructor() {
        this.urlApi = 'http://api.openweathermap.org/data/2.5/';
        this.apiKey = '2755cc9f1f75cba5236a750318d7379f';
        this.getWeather = this.getWeather.bind(this);
    }

    async getWeather(city) {
        try {
            const response = await fetch(`${this.urlApi}weather?q=${city}&appid=${this.apiKey}`);
            return await response.json();
        } catch (e) {
            console.log(e);
        }
    }

}
