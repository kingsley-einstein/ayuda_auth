import { Eureka as EurekaObject } from "eureka-js-client";

export class Eureka {
  
  constructor(
    instanceId,
    app,
    ipAddr,
    vipAddress
  ) {
    this.eureka = new EurekaObject({
      instance: {
        instanceId,
        app,
        ipAddr,
        vipAddress
      }
    });
  }

  start() {
    this.eureka.start((err, r) => {
      console.log(err.message);
    });
  }
}
