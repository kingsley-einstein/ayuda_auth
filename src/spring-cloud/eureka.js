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
        port: {
          "@enabled": true,
          $: parseInt(process.env.PORT)
        },
        dataCenterInfo: {
          "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
          name: "MyOwn"
        }
      },
      eureka: {
        registerWithEureka: true,
        preferIpAddress: true,
        serviceUrls: {
          default: [
            `${eurekaUrl}/eureka/apps/`
          ]
        }
      }
    });
  }

  start() {
    this.eureka.start((err, r) => {
      if (err) console.log(
        JSON.stringify(err.message)
      );
    });
  }
}
