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
  avatarUrl: string;
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
    name: 'Government Employee',
    avatarUrl: `https://res.cloudinary.com/dujbozubz/image/upload/v1553959546/robot-avatar/robot-avatar${0}.png`
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
    name: 'Postal Clerk',
    avatarUrl: `https://res.cloudinary.com/dujbozubz/image/upload/v1553959546/robot-avatar/robot-avatar${1}.png`
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
    name: 'Customer Services',
    avatarUrl: `https://res.cloudinary.com/dujbozubz/image/upload/v1553959546/robot-avatar/robot-avatar${2}.png`
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
    name: 'Receptionist',
    avatarUrl: `https://res.cloudinary.com/dujbozubz/image/upload/v1553959546/robot-avatar/robot-avatar${3}.png`
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
    name: 'Secretary',
    avatarUrl: `https://res.cloudinary.com/dujbozubz/image/upload/v1553959546/robot-avatar/robot-avatar${4}.png`
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
    name: 'Data Entry',
    avatarUrl: `https://res.cloudinary.com/dujbozubz/image/upload/v1553959546/robot-avatar/robot-avatar${5}.png`
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
    name: 'Medical Transcriptionists',
    avatarUrl: `https://res.cloudinary.com/dujbozubz/image/upload/v1553959546/robot-avatar/robot-avatar${6}.png`
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
    name: 'Administrative Assistant',
    avatarUrl: `https://res.cloudinary.com/dujbozubz/image/upload/v1553959546/robot-avatar/robot-avatar${7}.png`
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
    name: 'Legal',
    avatarUrl: `https://res.cloudinary.com/dujbozubz/image/upload/v1553959546/robot-avatar/robot-avatar${8}.png`
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
    name: 'Court Reporter',
    avatarUrl: `https://res.cloudinary.com/dujbozubz/image/upload/v1553959546/robot-avatar/robot-avatar${9}.png`
  }
];
