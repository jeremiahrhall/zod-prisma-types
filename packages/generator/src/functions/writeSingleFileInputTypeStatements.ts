import { inputTypesNotInRelationMap } from './typeInRelationMap';
import { type WriteStatements } from '../types';
import { writeInputObjectType } from './contentWriters';

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

export const writeSingleFileInputTypeStatements: WriteStatements = (
  dmmf,
  fileWriter,
) => {
  if (!dmmf.generatorConfig.createInputTypes) return;

  fileWriter.writer.blankLine();

  fileWriter.writeHeading(`INPUT TYPES`, 'FAT');
  const typesNotInMap = inputTypesNotInRelationMap(dmmf);
  dmmf.schema.inputObjectTypes.prisma.forEach((inputType) => {
    writeInputObjectType({ dmmf, fileWriter }, inputType, typesNotInMap);
    fileWriter.writer.newLine();
  });
};
