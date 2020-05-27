import SpringCloudConfig from "cloud-config-client";

export class CloudConfig {
  constructor() { 
  }

  async load(endpoint, name, profiles) {
    this.config = await SpringCloudConfig.load({
      endpoint, name, profiles
    });
  }

  getProperty(property) {
    return this.config.get(property);
  }
}
