import { Depot } from "./Depot";
import { DepotPartiePrenante } from "./PartiePrenante";

Depot.hasMany(DepotPartiePrenante, { foreignKey: 'depotId', as: 'partiesPrenantes' });
DepotPartiePrenante.belongsTo(Depot, { foreignKey: 'depotId' });
