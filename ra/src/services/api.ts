import {actions} from "../actions/actions";

export class ApiService {

    private readonly urlApi: string;
    private readonly apiKey: string;

    constructor() {
        this.urlApi = 'http://api.openweathermap.org/data/2.5/';
        this.apiKey = '2755cc9f1f75cba5236a750318d7379f';
        this.getCity = this.getCity.bind(this);
        this.getCities = this.getCities.bind(this);
    }

    private async request(city) {
        try {
            const response = await fetch(`${this.urlApi}weather?q=${city}&appid=${this.apiKey}`);
            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.message);
            }
            return await response.json();
        } catch (err) {
            alert(err);
        }
    }

    getCity(city) {
        return (dispatch) => {
            return this.request(city).then(json => {
                json ? dispatch(actions.receivedCity(json)) : null;
            });
        }
    }

    getCities(cities: string[] = ['Moscow', 'Ryazan', 'Voronezh']) {
        return (dispatch) => {
            let responses: Promise<any>[] = [];
            cities.map(async city => responses.push(this.request(city)));
            return Promise.all(responses)
                .then(cities => {
                    cities && cities.length ? dispatch(actions.initCities(cities)) : null;
                });
        };

    }

}
