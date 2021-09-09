import { Years } from './Years';
import axios, { AxiosRequestConfig } from 'axios';
import { Make } from './Make';
import { Model } from './Model';
import { GetModelsParams } from './GetModelsParams';
import { GetTrimsParams } from './GetTrimsParams';
import { Trim } from './Trim';
import { ModelDetail } from './ModelDetail';
import { ParamMembers } from './TrimParamsMembersMap';

const CARQUERY_API_URL = 'https://www.carqueryapi.com/api/0.3/';

const assign = (target: unknown, source: unknown) => Object.assign(target, source)

export class CarQuery {
    private config: AxiosRequestConfig = {
        baseURL: CARQUERY_API_URL
    };

    async getYears(): Promise<Years> {
        this.config.params = {
            cmd: 'getYears'
        };

        const response = await axios.request(this.config);
        const years: Years = {
            minYear: Number(response.data.Years.min_year),
            maxYear: Number(response.data.Years.max_year),
        };

        return Promise.resolve(years);
    }

    async getMakes(year: number, soldInUSA?: boolean): Promise<Make[]> {
        this.config.params = {
            cmd: 'getMakes',
            year: year
        };

        if (soldInUSA) {
            Object.assign(this.config.params, {sold_in_us: 1});
        }

        const response = await axios.request(this.config);
        const makes: Make[] = response.data.Makes.map((make: any) => {
            return {
                id: make.make_id,
                display: make.make_display,
                isCommon: make.make_is_common == '1',
                country: make.make_country
            };
        });

        return Promise.resolve(makes);
    }

    async getModels(params: GetModelsParams): Promise<Model[]> {
        this.config.params = {
            cmd: 'getModels',
            year: params.year,
            make: params.make
        };

        if (params.soldInUSA) {
            Object.assign(this.config.params, {sold_in_us: 1});
        }

        if (params.body) {
            Object.assign(this.config.params, {body: params.body});
        }

        const response = await axios.request(this.config);
        const models: Model[] = response.data.Models.map((model: any) => {
            return {
                makeId: model.model_make_id,
                name: model.model_name
            };
        });

        return Promise.resolve(models);
    }

    async getTrims(params: GetTrimsParams): Promise<Trim[]> {
        this.config.params = {
            cmd: 'getTrims'
        };

        this.buildGetTrimsQueryString(params);

        const response = await axios.request(this.config);
        const trims: Trim[] = response.data.Trims.map((trim: any) => {
            return this.mapToTrim(trim);
        });

        return Promise.resolve(trims);
    }

    private buildGetTrimsQueryString(params: GetTrimsParams) {
    	for (const member in params) {
	    	if (!!member)
		    	assign(this.config.params, { [ParamMembers[member]]: params[member] });
	    }
    }

    private mapToTrim(trim: any): Trim {
        return {
            modelId: trim.model_id,
            makeId: trim.model_make_id,
            name: trim.model_name,
            trim: trim.model_trim,
            year: Number(trim.model_year),
            body: trim.model_body,
            enginePosition: trim.model_engine_position,
            engineCC: Number(trim.model_engine_cc),
            engineCylinders: Number(trim.model_engine_cyl),
            engineType: trim.model_engine_type,
            engineValvesPerCylinder: Number(trim.model_engine_valves_per_cyl),
            engineHorsepower: Number(trim.model_engine_power_ps),
            enginePowerRPM: Number(trim.model_engine_power_rpm),
            engineTorqueNewtonMetre: Number(trim.model_engine_torque_nm),
            engineTorqueRPM: Number(trim.model_engine_torque_rpm),
            engineBoreMM: Number(trim.model_engine_bore_mm),
            engineStrokeMM: Number(trim.model_engine_stroke_mm),
            engineCompression: trim.model_engine_compression,
            engineFuel: trim.model_engine_fuel,
            topSpeedKilometerPerHour: Number(trim.model_top_speed_kph),
            zeroTo100KilometerPerHour: Number(trim.model_0_to_100_kph),
            drive: trim.model_drive,
            transmissionType: trim.model_transmission_type,
            seats: Number(trim.model_seats),
            doors: Number(trim.model_doors),
            weightKiloGrams: Number(trim.model_weight_kg),
            lengthMM: Number(trim.model_length_mm),
            widthMM: Number(trim.model_width_mm),
            heightMM: Number(trim.model_height_mm),
            wheelbaseMM: Number(trim.model_wheelbase_mm),
            litresPer100KilometerHighway: Number(trim.model_lkm_hwy),
            litresPer100KilometerMixed: Number(trim.model_lkm_mixed),
            litresPer100KilometerCity: Number(trim.model_lkm_city),
            fuelCapacityLiters: Number(trim.model_fuel_cap_l),
            soldInUSA: trim.model_sold_in_us === '1',
            co2: trim.model_co2,
            make: trim.model_make_display,
            display: trim.make_display,
            country: trim.make_country
        };
    }

    public async getModelDetail(modelId: number): Promise<ModelDetail> {
        this.config.params = {
            cmd: 'getModel',
            model: modelId
        };

        const response = await axios.request(this.config);
        const detail = response.data[0];
        const modelDetail: ModelDetail = {
            modelId: Number(detail.model_id),
            makeId: detail.model_make_id,
            modelName: detail.model_name,
            trim: detail.model_trim,
            year: Number(detail.model_year),
            body: detail.model_body,
            enginePosition: detail.model_engine_position,
            engineCC: Number(detail.model_engine_cc),
            engineCylinders: Number(detail.model_engine_cyl),
            engineType: detail.model_engine_type,
            engineValvesPerCylinder: Number(detail.model_engine_valves_per_cyl),
            engineHoresepower: Number(detail.model_engine_power_ps),
            enginePowerRPM: Number(detail.model_engine_power_rpm),
            engineTorqueNewtonMetre: Number(detail.model_engine_torque_nm),
            engineTorqueRPM: Number(detail.model_engine_torque_rpm),
            engineBoreMM: Number(detail.model_engine_bore_mm),
            engineStrokeMM: Number(detail.model_engine_stroke_mm),
            engineCompression: detail.model_engine_compression,
            engineFuel: detail.model_engine_fuel,
            topSpeedKilometerPerHour: Number(detail.model_top_speed_kph),
            zeroTo100KilometerPerHour: Number(detail.model_0_to_100_kph),
            drive: detail.model_drive,
            transmissionType: detail.model_transmission_type,
            seats: Number(detail.model_seats),
            doors: Number(detail.model_doors),
            weightKilograms: Number(detail.model_weight_kg),
            lengthMM: Number(detail.model_length_mm),
            widthMM: Number(detail.model_width_mm),
            heightMM: Number(detail.model_height_mm),
            wheelbaseMM: Number(detail.model_wheelbase_mm),
            litresPer100KilometerHighway: Number(detail.model_lkm_hwy),
            litresPer100KilometerMixed: Number(detail.model_lkm_mixed),
            litresPer100KilometerCity: Number(detail.model_lkm_city),
            fuelCapacityLiters: Number(detail.model_fuel_cap_l),
            soldInUSA: detail.model_sold_in_us === '1',
            engineLiters: Number(detail.model_engine_l),
            engineCubicInches: Number(detail.model_engine_ci),
            engineValves: Number(detail.model_engine_valves),
            engineHorsepower: Number(detail.model_engine_power_hp),
            enginePowerKW: Number(detail.model_engine_power_kw),
            engineTorquePoundFoot: Number(detail.model_engine_torque_lbft),
            engineTorqueKilogram: Number(detail.model_engine_torque_kgm),
            topSpeedMilesPerHour: Number(detail.model_top_speed_mph),
            weightPounds: Number(detail.model_weight_lbs),
            lengthInches: Number(detail.model_length_in),
            widthInches: Number(detail.model_width_in),
            heightInches: Number(detail.model_height_in),
            wheelbaseInches: Number(detail.model_wheelbase_in),
            milesPerGallonHighway: Number(detail.model_mpg_hwy),
            milesPerGallonCity: Number(detail.model_mpg_city),
            milesPerGallonMixed: Number(detail.model_mpg_mixed),
            fuelCapacityGallons: Number(detail.model_fuel_cap_g),
            makeDisplay: detail.make_display,
            makeCountry: detail.make_country,
            ExtColors: detail.ExtColors,
            IntColors: detail.ExtColors,
        };

        return Promise.resolve(modelDetail);
    }
}
