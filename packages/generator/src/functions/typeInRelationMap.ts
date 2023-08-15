import { relationMap } from '../classes/RelationMap';
import { ExtendedDMMF } from '../classes';
import { PRISMA_ACTION_ARG_MAP, PRISMA_ACTION_ARRAY } from '../constants';

// goal is being able to tell if an input type should be present or not

// find all top level operation inputs
//   {modelName}{opName}input
// Form into map by name
// for each top level operation input
//   filter op args where
//     relationMap[modelName][arg.name] === true
// with this list of types that shouldn't allow deep operations
//   filter the allowed ops like create/upsert etc and limit to connect

export const inputTypesNotInRelationMap = (dmmf: ExtendedDMMF) => {
  const modelNames = dmmf.datamodel.models.map((m) => m.name);
  const modelOps = PRISMA_ACTION_ARRAY;
  const modelInputs = modelNames
    .map((mn) =>
      modelOps.map(
        (mo) =>
          mn + PRISMA_ACTION_ARG_MAP[mo].formattedNames.pascalCase + 'Input',
      ),
    )
    .flat();
  const modelActionInputs = dmmf.schema.inputObjectTypes.prisma.filter((iot) =>
    modelInputs.includes(iot.name),
  );
  return modelActionInputs
    .map((mai) =>
      mai.fields
        .filter((maif) => {
          return (
            mai.linkedModel &&
            !maif.inputTypes.some((maifit) => maifit.location === 'scalar') &&
            !(
              relationMap[mai.linkedModel?.name] &&
              relationMap[mai.linkedModel?.name][maif.formattedNames.camelCase]
            )
          );
        })
        .map((maif) => maif.inputTypes.map((it) => it.type.toString()))
        .flat(),
    )
    .flat();
};
