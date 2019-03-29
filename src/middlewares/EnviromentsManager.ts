import { EnviromentsEnum } from 'src/types/typesIndex';

export class EnviromentsManager {
  static getServerUrl() {
    switch (process.env.REACT_APP_ENV) {
      case EnviromentsEnum.LOCAL:
      case EnviromentsEnum.PUBLIC:
        return 'http://localhost:4001';
      case EnviromentsEnum.STAGING:
        return 'https://typing-dev-2.herokuapp.com/';
      case process.env.REACT_APP_ENV:
        return 'https://calm-ravine-85126.herokuapp.com/';
      default:
        throw new Error('unknown enviroment - check your .env');
    }
  }
  static getAppId() {
    switch (process.env.REACT_APP_ENV) {
      case EnviromentsEnum.TEST:
      case EnviromentsEnum.LOCAL:
      case EnviromentsEnum.PUBLIC:
        return '544172982736878';

      case EnviromentsEnum.STAGING:
        return '653846344985974';
      default:
        return '';
    }
  }

  static prefixByEnviroment(endpoint: string) {
    switch (process.env.REACT_APP_ENV) {
      case EnviromentsEnum.LOCAL:
      case EnviromentsEnum.PUBLIC:
        return `/${endpoint}`;
      case EnviromentsEnum.STAGING:
        return `https://typing-dev-2.herokuapp.com/${endpoint}`;
      case EnviromentsEnum.TEST:
        return `https://calm-ravine-85126.herokuapp.com/${endpoint}`;
      default:
        return '/';
    }
  }
}