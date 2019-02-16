const uuid = require('uuid/v4');

export class BaseRoom {
  instanceId: string;
  constructor() {
    this.instanceId = `Room-${uuid()}`;
  }
}
