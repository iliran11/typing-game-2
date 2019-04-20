import { EnviromentsEnum } from 'src/types/typesIndex';

export class EnviromentsManager {
  static getServerUrl() {
    switch (process.env.REACT_APP_ENV) {
      case EnviromentsEnum.LOCAL:
      case EnviromentsEnum.PUBLIC:
        return 'http://localhost:4001';
      case EnviromentsEnum.STAGING:
        return 'https://typeit-staging.herokuapp.com/';
      case EnviromentsEnum.DEV:
        return 'https://typeit-dev.herokuapp.com/';
      case EnviromentsEnum.PRODUCTION:
        return 'https://typeit-production.herokuapp.com/';
      default:
        throw new Error('unknown enviroment - check your .env');
    }
  }
  static getAppId() {
    switch (process.env.REACT_APP_ENV) {
      case EnviromentsEnum.DEV:
      case EnviromentsEnum.LOCAL:
      case EnviromentsEnum.PUBLIC:
        return '544172982736878';

      case EnviromentsEnum.STAGING:
        return '653846344985974';
      case EnviromentsEnum.PRODUCTION:
        return '2222778527971923';
      default:
        throw new Error('no enviroment!');
    }
  }

  static prefixByEnviroment(endpoint: string) {
    switch (process.env.REACT_APP_ENV) {
      case EnviromentsEnum.LOCAL:
      case EnviromentsEnum.PUBLIC:
        return `/${endpoint}`;
      case EnviromentsEnum.STAGING:
        return `https://typeit-staging.herokuapp.com/${endpoint}`;
      case EnviromentsEnum.DEV:
        return `https://typeit-dev.herokuapp.com/${endpoint}`;
      case EnviromentsEnum.PRODUCTION:
        return `https://typeit-production.herokuapp.com/${endpoint}`
      default:
      throw new Error('no enviroment!');
    }
  }
}
