const ns = require("cls-hooked").createNamespace("request");
const requestStorage = require("cls-hooked").getNamespace("request");

exports.bindCurrentNamespace = (req, res, next) => {
    ns.bindEmitter(req);
    ns.bindEmitter(res);

    ns.run(() => {
        const tenantId = undefined;
        const subTenantId = undefined;
        ns.set("tenantId", tenantId);
        ns.set("subTenantId", subTenantId);
        next();
    });
};

exports.getCurrentTenantId = () => {
    return requestStorage.get("tenantId");
};

exports.setCurrentTenantId = (tenantId) => {
    return requestStorage.set("tenantId", tenantId);
};

exports.getCurrentSubTenantId = () => {
    return requestStorage.get("subTenantId");
};

exports.setCurrentSubTenantId = (subTenantId) => {
    return requestStorage.set("subTenantId", subTenantId);
};
