import { Opposition } from "./Opposition";
import { OppositionPartiePrenante } from "./PartiePrenante";
import { OppositionRequisition } from "./OppositionRequisition";

Opposition.hasMany(OppositionPartiePrenante, { foreignKey: 'oppositionId', as: 'partiesPrenantes' });
Opposition.hasMany(OppositionRequisition, { foreignKey: 'oppositionId', as: 'requisitions' });
OppositionPartiePrenante.belongsTo(Opposition, { foreignKey: 'oppositionId' });
OppositionRequisition.belongsTo(Opposition, { foreignKey: 'oppositionId' });
