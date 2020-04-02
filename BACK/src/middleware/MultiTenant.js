const mongoose = require("../database/Connect");

const { getCurrentTenantId, getCurrentSubTenantId } = require("./Storage");

exports.tenantModel = (name, schema, options) => {
  return (props = {}) => {
    schema.add({ tenantId: String });
    const Model = mongoose.model(name, schema, options);

    const { skipTenant } = props;
    if (skipTenant) return Model;

    Model.schema.set("discriminatorKey", "tenantId");

    const tenantId = getCurrentTenantId();
    const discriminatorName = `${Model.modelName}-${tenantId}`;
    const existingDiscriminator = (Model.discriminators || {})[
      discriminatorName
    ];
    return (
      existingDiscriminator ||
      Model.discriminator(discriminatorName, new mongoose.Schema({}))
    );
  };
};

exports.subTenantModel = (name, schema, options) => {
  return (props = {}) => {
    schema.add({ tenantId: {type: String, default: `${name}-${getCurrentTenantId()}`} });
    schema.add({ subTenantId: String });
    
    
    const Model = mongoose.model(name, schema, options);

    const { skipTenant } = props;
    if (skipTenant) return Model;
    
    discriminatorName = undefined;
    const { skipSubTenant } = props;
    if (skipSubTenant) {
      Model.schema.set("discriminatorKey", "tenantId");
      discriminatorName = `${Model.modelName}-${getCurrentTenantId()}`;
    } else {
      Model.schema.set("discriminatorKey", "subTenantId");
      discriminatorName = `${Model.modelName}-${getCurrentTenantId()}-${getCurrentSubTenantId()}`;
    }

    const existingDiscriminator = (Model.discriminators || {})[
      discriminatorName
    ];
    return (
      existingDiscriminator ||
      Model.discriminator(discriminatorName, new mongoose.Schema({}))
    );
  };
};


exports.tenantlessModel = (name, schema, options) => {
  return () => mongoose.model(name, schema, options);
};
