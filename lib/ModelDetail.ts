export interface ModelDetail {
    modelId: number;
    makeId: string;
    modelName: string;
    year: number;
    trim: string;
    body: string;
    enginePosition: string;
    engineCC: number;
    engineCylinders: number;
    engineType: string;
    engineValvesPerCylinder: number;
    engineHoresepower: number;
    enginePowerRPM: number;
    engineTorqueNewtonMetre: number;
    engineTorqueRPM: number;
    engineBoreMM: number;
    engineStrokeMM: number;
    engineCompression: string;
    engineFuel: string;
    topSpeedKilometerPerHour: number;
    zeroTo100KilometerPerHour: number;
    drive: string;
    transmissionType: string;
    seats: number;
    doors: number;
    weightKilograms: number;
    lengthMM: number;
    widthMM: number;
    heightMM: number;
    wheelbaseMM: number;
    litresPer100KilometerHighway: number;
    litresPer100KilometerMixed: number;
    litresPer100KilometerCity: number;
    fuelCapacityLiters: number;
    soldInUSA: boolean;
    engineLiters: number;
    engineCubicInches: number;
    engineValves: number;
    engineHorsepower: number;
    enginePowerKW: number;
    engineTorquePoundFoot: number;
    engineTorqueKilogram: number;
    topSpeedMilesPerHour: number;
    weightPounds: number;
    lengthInches: number;
    widthInches: number;
    heightInches: number;
    wheelbaseInches: number;
    milesPerGallonHighway: number;
    milesPerGallonCity: number;
    milesPerGallonMixed: number;
    fuelCapacityGallons: number;
    makeDisplay: string;
    makeCountry: string;
    ExtColors: any;
    IntColors: any;
}