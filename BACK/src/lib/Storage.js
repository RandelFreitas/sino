const ns = require("cls-hooked").createNamespace("request");
const requestStorage = require("cls-hooked").getNamespace("request");

exports.bindCurrentNamespace = (req, res, next) => {
    ns.bindEmitter(req);
    ns.bindEmitter(res);

    ns.run(() => {
        // const tenantId = req.user.organization._id.toString();
        const tenantId = "5e8290cb18436f1950c23ace";//5e8290cb18436f1950c23ace - 5e82272c61c7fe2a180f9018
        ns.set("tenantId", tenantId);
        next();
    });
};

exports.getCurrentTenantId = () => {
    const tenant = requestStorage.get("tenantId");
    //console.log("tenantId from getCurrentTenantId: ", tenant);
    return tenant;
};
