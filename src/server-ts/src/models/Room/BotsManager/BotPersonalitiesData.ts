import { DeviceType } from '../../../../../types/typesIndex';
enum BotsSpeedFunction {
  constants = 'constant',
  linear = 'linear'
}
export interface BotsProperties {
  wpmRange: [number, number];
  accuracy: [number, number];
  speedFunction: BotsSpeedFunction;
}
export interface BotsPersonalities {
  [DeviceType.DESKTOP]: BotsProperties;
  [DeviceType.MOBILE]: BotsProperties;
  name: string;
}

export const botPersonalitiesData: BotsPersonalities[] = [
  {
    desktop: {
      wpmRange: [20, 30],
      accuracy: [0.9, 1],
      speedFunction: BotsSpeedFunction.constants
    },
    mobile: {
      wpmRange: [3, 30],
      accuracy: [90, 95],
      speedFunction: BotsSpeedFunction.constants
    },
    name: 'Government Employee'
  },
  {
    desktop: {
      wpmRange: [20, 40],
      accuracy: [85, 95],
      speedFunction: BotsSpeedFunction.constants
    },
    mobile: {
      wpmRange: [10, 20],
      accuracy: [85, 95],
      speedFunction: BotsSpeedFunction.constants
    },
    name: 'Postal Clerk'
  },
  {
    desktop: {
      wpmRange: [30, 50],
      accuracy: [85, 100],
      speedFunction: BotsSpeedFunction.constants
    },
    mobile: {
      wpmRange: [30, 50],
      accuracy: [85, 100],
      speedFunction: BotsSpeedFunction.constants
    },
    name: 'Customer Services'
  },
  {
    desktop: {
      wpmRange: [40, 60],
      accuracy: [87, 100],
      speedFunction: BotsSpeedFunction.constants
    },
    mobile: {
      wpmRange: [40, 60],
      accuracy: [87, 100],
      speedFunction: BotsSpeedFunction.constants
    },
    name: 'Receptionist'
  },
  {
    desktop: {
      wpmRange: [40, 60],
      accuracy: [87, 100],
      speedFunction: BotsSpeedFunction.constants
    },
    mobile: {
      wpmRange: [40, 60],
      accuracy: [87, 100],
      speedFunction: BotsSpeedFunction.constants
    },
    name: 'Secretary'
  },
  {
    desktop: {
      wpmRange: [60, 80],
      accuracy: [99, 99],
      speedFunction: BotsSpeedFunction.constants
    },
    mobile: {
      wpmRange: [60, 80],
      accuracy: [99, 99],
      speedFunction: BotsSpeedFunction.constants
    },
    name: 'Data Entry'
  },
  {
    desktop: {
      wpmRange: [70, 80],
      accuracy: [90, 100],
      speedFunction: BotsSpeedFunction.constants
    },
    mobile: {
      wpmRange: [70, 80],
      accuracy: [90, 100],
      speedFunction: BotsSpeedFunction.constants
    },
    name: 'Medical Transcriptionists'
  },
  {
    desktop: {
      wpmRange: [80, 100],
      accuracy: [70, 94],
      speedFunction: BotsSpeedFunction.constants
    },
    mobile: {
      wpmRange: [80, 100],
      accuracy: [70, 94],
      speedFunction: BotsSpeedFunction.constants
    },
    name: 'Administrative Assistant'
  },
  {
    desktop: {
      wpmRange: [80, 100],
      accuracy: [80, 100],
      speedFunction: BotsSpeedFunction.constants
    },
    mobile: {
      wpmRange: [80, 100],
      accuracy: [80, 100],
      speedFunction: BotsSpeedFunction.constants
    },
    name: 'Legal'
  },
  {
    desktop: {
      wpmRange: [100, 200],
      accuracy: [99, 100],
      speedFunction: BotsSpeedFunction.constants
    },
    mobile: {
      wpmRange: [100, 200],
      accuracy: [99, 100],
      speedFunction: BotsSpeedFunction.constants
    },
    name: 'Court Reporter'
  }
];
