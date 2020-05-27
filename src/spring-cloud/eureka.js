import { Eureka as EurekaObject } from "eureka-js-client";

export class Eureka {
  
  constructor(
    instanceId,
    app,
    ipAddr,
    vipAddress,
    hostName,
    eurekaUrl
  ) {
    this.eureka = new EurekaObject({
      instance: {
        instanceId,
        app,
        ipAddr,
        vipAddress,
        hostName,
        dataCenterInfo: {
          "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
          name: "MyOwn"
        }
      },
      eureka: {
        serviceUrls: {
          default: [
            `${eurekaUrl}/eureka/apps`
          ]
        }
      }
    });
  }

  start() {
    this.eureka.start((err, r) => {
      console.log(err.message);
    });
  }
}
