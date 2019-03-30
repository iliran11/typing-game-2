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
      wpmRange: [2, 17],
      accuracy: [0.9, 0.95],
      speedFunction: BotsSpeedFunction.constants
    },
    name: 'Government Employee',
    avatarUrl: `https://res.cloudinary.com/dujbozubz/image/upload/v1553959546/robot-avatar/robot-avatar${0}.png`
  },
  {
    desktop: {
      wpmRange: [20, 40],
      accuracy: [0.85, 0.95],
      speedFunction: BotsSpeedFunction.constants
    },
    mobile: {
      wpmRange: [10, 20],
      accuracy: [0.85, 0.95],
      speedFunction: BotsSpeedFunction.constants
    },
    name: 'Postal Clerk',
    avatarUrl: `https://res.cloudinary.com/dujbozubz/image/upload/v1553959546/robot-avatar/robot-avatar${1}.png`
  },
  {
    desktop: {
      wpmRange: [30, 50],
      accuracy: [0.85, 1],
      speedFunction: BotsSpeedFunction.constants
    },
    mobile: {
      wpmRange: [30, 50],
      accuracy: [0.85, 0.1],
      speedFunction: BotsSpeedFunction.constants
    },
    name: 'Customer Services',
    avatarUrl: `https://res.cloudinary.com/dujbozubz/image/upload/v1553959546/robot-avatar/robot-avatar${2}.png`
  },
  {
    desktop: {
      wpmRange: [40, 60],
      accuracy: [0.87, 0.1],
      speedFunction: BotsSpeedFunction.constants
    },
    mobile: {
      wpmRange: [17, 28],
      accuracy: [0.87, 0.1],
      speedFunction: BotsSpeedFunction.constants
    },
    name: 'Receptionist',
    avatarUrl: `https://res.cloudinary.com/dujbozubz/image/upload/v1553959546/robot-avatar/robot-avatar${3}.png`
  },
  {
    desktop: {
      wpmRange: [40, 60],
      accuracy: [0.87, 0.1],
      speedFunction: BotsSpeedFunction.constants
    },
    mobile: {
      wpmRange: [22, 34],
      accuracy: [0.87, 0.1],
      speedFunction: BotsSpeedFunction.constants
    },
    name: 'Secretary',
    avatarUrl: `https://res.cloudinary.com/dujbozubz/image/upload/v1553959546/robot-avatar/robot-avatar${4}.png`
  },
  {
    desktop: {
      wpmRange: [60, 80],
      accuracy: [0.99, 0.99],
      speedFunction: BotsSpeedFunction.constants
    },
    mobile: {
      wpmRange: [34, 45],
      accuracy: [0.99, 0.99],
      speedFunction: BotsSpeedFunction.constants
    },
    name: 'Data Entry',
    avatarUrl: `https://res.cloudinary.com/dujbozubz/image/upload/v1553959546/robot-avatar/robot-avatar${5}.png`
  },
  {
    desktop: {
      wpmRange: [70, 80],
      accuracy: [0.9, 0.1],
      speedFunction: BotsSpeedFunction.constants
    },
    mobile: {
      wpmRange: [70, 80],
      accuracy: [0.9, 0.1],
      speedFunction: BotsSpeedFunction.constants
    },
    name: 'Medical Transcriptionists',
    avatarUrl: `https://res.cloudinary.com/dujbozubz/image/upload/v1553959546/robot-avatar/robot-avatar${6}.png`
  },
  {
    desktop: {
      wpmRange: [80, 100],
      accuracy: [0.7, 0.94],
      speedFunction: BotsSpeedFunction.constants
    },
    mobile: {
      wpmRange: [70, 94],
      accuracy: [0.7, 0.94],
      speedFunction: BotsSpeedFunction.constants
    },
    name: 'Administrative Assistant',
    avatarUrl: `https://res.cloudinary.com/dujbozubz/image/upload/v1553959546/robot-avatar/robot-avatar${7}.png`
  },
  {
    desktop: {
      wpmRange: [80, 100],
      accuracy: [0.8, 0.1],
      speedFunction: BotsSpeedFunction.constants
    },
    mobile: {
      wpmRange: [45, 57],
      accuracy: [0.8, 0.1],
      speedFunction: BotsSpeedFunction.constants
    },
    name: 'Legal',
    avatarUrl: `https://res.cloudinary.com/dujbozubz/image/upload/v1553959546/robot-avatar/robot-avatar${8}.png`
  },
  {
    desktop: {
      wpmRange: [100, 200],
      accuracy: [0.99, 1],
      speedFunction: BotsSpeedFunction.constants
    },
    mobile: {
      wpmRange: [45, 57],
      accuracy: [0.99, 1],
      speedFunction: BotsSpeedFunction.constants
    },
    name: 'Court Reporter',
    avatarUrl: `https://res.cloudinary.com/dujbozubz/image/upload/v1553959546/robot-avatar/robot-avatar${9}.png`
  },
  {
    desktop: {
      wpmRange: [60, 80],
      accuracy: [0.2, 0.5],
      speedFunction: BotsSpeedFunction.constants
    },
    mobile: {
      wpmRange: [34, 45],
      accuracy: [0.2, 0.5],
      speedFunction: BotsSpeedFunction.constants
    },
    name: 'Drunk Guy',
    avatarUrl: `https://res.cloudinary.com/dujbozubz/image/upload/v1553959546/robot-avatar/robot-avatar${10}.png`
  },
  {
    desktop: {
      wpmRange: [70, 90],
      accuracy: [0.9, 1],
      speedFunction: BotsSpeedFunction.constants
    },
    mobile: {
      wpmRange: [40, 51],
      accuracy: [0.9, 1],
      speedFunction: BotsSpeedFunction.constants
    },
    name: 'Mad Girl',
    avatarUrl: `https://res.cloudinary.com/dujbozubz/image/upload/v1553959546/robot-avatar/robot-avatar${11}.png`
  }
];
