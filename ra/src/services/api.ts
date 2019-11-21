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

    private async request(city, dispatch) {
        try {
            const response = await fetch(`${this.urlApi}weather?q=${city}&appid=${this.apiKey}`);
            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.message);
            }
            return await response.json();
        } catch (err) {
            dispatch(actions.errorCity(err.message));
        }
    }

    getCity(city) {
        return (dispatch) => {
            dispatch(actions.clearCity());
            dispatch(actions.searchCity(city));
            return this.request(city, dispatch).then(json => {
                if(json) {
                    dispatch(actions.validCity());
                    dispatch(actions.receivedCity(json));
                }
            });
        }
    }

    getCities(cities: string[] = ['Moscow', 'Ryazan', 'Voronezh']) {
        return (dispatch) => {
            let responses: Promise<any>[] = [];
            cities.map(async city => responses.push(this.request(city, dispatch)));
            return Promise.all(responses)
                .then(cities => {
                    cities && cities.length ? dispatch(actions.initCities(cities)) : null;
                });
        };

    }

}
