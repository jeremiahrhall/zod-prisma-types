import CodeBlockWriter from 'code-block-writer';

import { writeNonScalarType, writeScalarType, writeSpecialType } from '..';
import { ExtendedDMMFInputType, ExtendedDMMFSchemaArg } from '../../classes';
import { type ContentWriterOptions } from '../../types';

/////////////////////////////////////////////
// INTERFACE
/////////////////////////////////////////////

interface WriteInputTypeFieldOptions {
  writer: CodeBlockWriter;
  field: ExtendedDMMFSchemaArg;
  writeComma?: boolean;
  writeValidation?: boolean;
}

/////////////////////////////////////////////
// WRITER FUNCTION
/////////////////////////////////////////////

const allowedFieldsForInputTypesNotInRelationMap = ['connect', 'disconnect'];

const writeInputTypeField = ({
  writer,
  field,
  writeComma = false,
  writeValidation = false,
}: WriteInputTypeFieldOptions) => {
  const {
    isNullable,
    isOptional,
    zodCustomErrors,
    zodValidatorString,
    zodCustomValidatorString,
  } = field;

  if (field.zodOmitField) {
    writer.write(`// omitted: `);
  }

  writer.write(`${field.name}: `);

  if (field.hasMultipleTypes) {
    writer.write(`z.union([ `);

    field.inputTypes.forEach((inputType, idx) => {
      const writeComma = idx !== field.inputTypes.length - 1;
      writeScalarType(writer, {
        inputType,
        zodCustomErrors,
        zodValidatorString,
        zodCustomValidatorString,
        writeComma,
        writeValidation,
      });
      writeNonScalarType(writer, {
        inputType,
        writeComma,
      });
      writeSpecialType(writer, {
        inputType,
        zodCustomErrors,
        zodCustomValidatorString,
        writeComma,
        writeValidation,
      });
    });

    writer
      .write(` ])`)
      .conditionalWrite(!field.isRequired, `.optional()`)
      .conditionalWrite(field.isNullable, `.nullable()`)
      .write(`,`);
  } else {
    const inputType = field.inputTypes[0];
    writeScalarType(writer, {
      inputType,
      isNullable,
      isOptional,
      zodCustomErrors,
      zodValidatorString,
      zodCustomValidatorString,
      writeValidation,
      writeComma,
    });
    writeNonScalarType(writer, {
      inputType,
      isNullable,
      isOptional,
      writeComma,
    });
    writeSpecialType(writer, {
      inputType,
      zodCustomErrors,
      zodCustomValidatorString,
      isNullable,
      isOptional,
      writeValidation,
      writeComma,
    });
  }

  writer.newLine();
};

/////////////////////////////////////////////
// MAIN FUNCTION
/////////////////////////////////////////////

export const writeInputObjectType = (
  {
    fileWriter: { writer, writeImportSet },
    dmmf,
    getSingleFileContent = false,
  }: ContentWriterOptions,
  inputType: ExtendedDMMFInputType,
  inputTypesToModify: string[],
) => {
  const { useMultipleFiles, addInputTypeValidation } = dmmf.generatorConfig;

  if (useMultipleFiles && !getSingleFileContent) {
    writeImportSet(inputType.imports);
  }

  // when an omit field is present, the type is not a native prism type
  // but a zod union of the native type and an omit type
  // const type = inputType.hasOmitFields()
  //   ? `z.ZodType<Omit<Prisma.${
  //       inputType.name
  //     }, ${inputType.getOmitFieldsUnion()}>>`
  //   : `z.ZodType<Prisma.${inputType.name}>`;

  writer.blankLine().write(`export const ${inputType.name}Schema = `);

  const { extendedWhereUniqueFields } = inputType;

  const writeExtendedWhereUniqueInput =
    Array.isArray(extendedWhereUniqueFields) &&
    extendedWhereUniqueFields.length !== 0;

  if (writeExtendedWhereUniqueInput) {
    // if only one element is present in the array,
    // a z.object is used instead of a z.union
    if (extendedWhereUniqueFields.length === 1) {
      writer
        .write(`z.object(`)
        .inlineBlock(() => {
          extendedWhereUniqueFields[0].forEach((field, idx) => {
            writeInputTypeField({
              writer,
              field,
              writeComma: idx !== extendedWhereUniqueFields[0].length - 1,
              writeValidation: addInputTypeValidation,
            });
          });
        })
        .write(`)`)
        .newLine()
        .write(`.and(`);
    } else {
      // now we need the union of z.objects
      writer
        .write(`z.union([`)
        .newLine()
        .withIndentationLevel(1, () => {
          extendedWhereUniqueFields.forEach((field) => {
            writer
              .write(`z.object(`)
              .inlineBlock(() => {
                field.forEach((field, idx) => {
                  writeInputTypeField({
                    writer,
                    field,
                    writeComma: idx !== extendedWhereUniqueFields[0].length - 1,
                    writeValidation: addInputTypeValidation,
                  });
                });
              })
              .write(`),`)
              .newLine();
          });
        })
        .writeLine(`])`)
        .write(`.and(`);
    }
  }

  writer
    .write(`z.object(`)
    .inlineBlock(() => {
      inputType.fields.forEach((field) => {
        if (inputTypesToModify.includes(inputType.name)) {
          if (
            !allowedFieldsForInputTypesNotInRelationMap.includes(field.name)
          ) {
            return;
          }
        }
        // TODO where to conditionally write the field
        // if (!field.isInRelationMap) {
        //   console.log('field.name', field.name);
        // }
        writeInputTypeField({
          writer,
          field,
          writeValidation: addInputTypeValidation,
          writeComma: field !== inputType.fields[inputType.fields.length - 1],
        });
      });
    })
    .conditionalWrite(
      !writeExtendedWhereUniqueInput,
      `).describe('${inputType.name}Schema');`,
    )
    .conditionalWrite(
      writeExtendedWhereUniqueInput,
      `)).describe('${inputType.name}Schema');`,
    );

  if (useMultipleFiles && !getSingleFileContent) {
    writer.blankLine().writeLine(`export default ${inputType.name}Schema;`);
  }
};
