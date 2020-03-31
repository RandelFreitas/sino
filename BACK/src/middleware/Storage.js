const ns = require("cls-hooked").createNamespace("request");
const requestStorage = require("cls-hooked").getNamespace("request");

exports.bindCurrentNamespace = (req, res, next) => {
    ns.bindEmitter(req);
    ns.bindEmitter(res);

    ns.run(() => {
        const tenantId = undefined;
        // const tenantId = "5e8290cb18436f1950c23ace";//5e8290cb18436f1950c23ace - 5e82272c61c7fe2a180f9018
        ns.set("tenantId", tenantId);
        next();
    });
};

exports.getCurrentTenantId = () => {
    return requestStorage.get("tenantId");
};

exports.setCurrentTenantId = (tenantId) => {
    return requestStorage.set("tenantId", tenantId);
};
