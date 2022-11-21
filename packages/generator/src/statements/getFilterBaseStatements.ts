/* eslint-disable @typescript-eslint/no-non-null-assertion */
// import { ENUM_IMPORT_STATEMENT } from '../constants';
import { GetStatements, Statement } from '../types';
import { writeConstStatement, writeHeading } from '../utils';
import { getIntFilterBaseStatements } from './getIntFilterBaseStatements';

export const getFilterBaseStatements: GetStatements = (datamodel) => {
  // ENUM FILTER
  //------------------------------------------------------

  const enumFilter = [
    writeHeading(`ENUMS`, 'FAT'),
    writeHeading(`SORT ORDER`, 'SLIM'),
    writeConstStatement({
      leadingTrivia: (writer) => writer.newLine(),
      declarations: [
        {
          name: 'SortOrder',
          initializer(writer) {
            writer.write(`z.nativeEnum(Prisma.Prisma.SortOrder)`);
          },
        },
      ],
    }),
    writeHeading(`QUERY MODE`, 'SLIM'),
    writeConstStatement({
      leadingTrivia: (writer) => writer.newLine(),
      declarations: [
        {
          name: 'QueryMode',
          initializer(writer) {
            writer.write(`z.nativeEnum(Prisma.Prisma.QueryMode)`);
          },
        },
      ],
    }),
  ];

  // BOOL FILTER
  //------------------------------------------------------

  const boolFilter: Statement[] = [];

  if (datamodel.baseFilters.Boolean.standard) {
    boolFilter.push(
      writeHeading(`BOOL FILTERS`, 'FAT'),
      writeHeading(`BOOL FILTER`, 'SLIM'),
      writeConstStatement({
        leadingTrivia: (writer) => writer.newLine(),
        declarations: [
          {
            name: 'BoolFilter',
            type: 'z.ZodType<Prisma.Prisma.BoolFilter>',
            initializer(writer) {
              writer
                .write(`z.object(`)
                .inlineBlock(() => {
                  writer.writeLine(`equals: z.boolean().optional(),`);
                  writer.writeLine(
                    `not: z.union([z.boolean(), z.lazy(() => NestedBoolFilter)]).optional(),`,
                  );
                })
                .write(`)`);
            },
          },
        ],
      }),
      writeHeading(`NESTED BOOL FILTER`, 'SLIM'),
      writeConstStatement({
        leadingTrivia: (writer) => writer.newLine(),
        declarations: [
          {
            name: 'NestedBoolFilter',
            type: 'z.ZodType<Prisma.Prisma.NestedBoolFilter>',
            initializer(writer) {
              writer
                .write(`z.object(`)
                .inlineBlock(() => {
                  writer.writeLine(`equals: z.boolean().optional(),`);
                  writer.writeLine(
                    `not: z.union([z.boolean(), z.lazy(() => NestedBoolFilter)]).optional(),`,
                  );
                })
                .write(`)`);
            },
          },
        ],
      }),
    );
  }

  if (datamodel.baseFilters.Boolean.aggregate) {
    boolFilter.push(
      writeHeading(`NESTED BOOL WITH AGGREGATES FILTER`, 'SLIM'),
      writeConstStatement({
        leadingTrivia: (writer) => writer.newLine(),
        declarations: [
          {
            name: 'NestedBoolWithAggregatesFilter',
            type: 'z.ZodType<Prisma.Prisma.NestedBoolWithAggregatesFilter>',
            initializer(writer) {
              writer
                .write(`z.object(`)
                .inlineBlock(() => {
                  writer.writeLine(`equals: z.boolean().optional(),`);
                  writer.writeLine(
                    `not: z.union([z.boolean(), z.lazy(() => NestedBoolWithAggregatesFilter)]).optional(),`,
                  );
                  writer.writeLine(
                    `_count: z.lazy(()=> NestedIntFilter).optional(),`,
                  );
                  writer.writeLine(
                    `_min: z.lazy(()=> NestedBoolFilter).optional(),`,
                  );
                  writer.writeLine(
                    `_max: z.lazy(()=> NestedBoolFilter).optional(),`,
                  );
                })
                .write(`)`);
            },
          },
        ],
      }),
    );
  }

  // STRING FILTER
  //------------------------------------------------------

  const stringFilter = [
    writeHeading(`STRING FILTERS`, 'FAT'),
    writeHeading(`STRING FILTER`, 'SLIM'),
    writeConstStatement({
      leadingTrivia: (writer) => writer.newLine(),
      declarations: [
        {
          name: 'StringFilter',
          type: 'z.ZodType<Prisma.Prisma.StringFilter>',
          initializer(writer) {
            writer
              .write(`z.object(`)
              .inlineBlock(() => {
                writer.writeLine(`equals: z.string().optional(),`);
                writer.writeLine(
                  `in: z.union([z.string(), z.string().array()]).optional(),`,
                );
                writer.writeLine(
                  `notIn: z.union([z.string(), z.string().array()]).optional(),`,
                );
                writer.writeLine(`lt: z.string().optional(),`);
                writer.writeLine(`lte: z.string().optional(),`);
                writer.writeLine(`gt: z.string().optional(),`);
                writer.writeLine(`gte: z.string().optional(),`);
                writer.writeLine(`contains: z.string().optional(),`);
                writer.writeLine(`startsWith: z.string().optional(),`);
                writer.writeLine(`endsWith: z.string().optional(),`);
                writer.writeLine(`mode: QueryMode.optional(),`);
                writer.writeLine(
                  `not: z.union([z.string(), z.lazy(() => NestedStringFilter)]).optional(),`,
                );
              })
              .write(`)`);
          },
        },
      ],
    }),
    writeHeading(`STRING NULLABLE FILTER`, 'SLIM'),
    writeConstStatement({
      leadingTrivia: (writer) => writer.newLine(),
      declarations: [
        {
          name: 'StringNullableFilter',
          type: 'z.ZodType<Prisma.Prisma.StringNullableFilter>',
          initializer(writer) {
            writer
              .write(`z.object(`)
              .inlineBlock(() => {
                writer.writeLine(`equals: z.string().optional().nullable(),`);
                writer.writeLine(
                  `in: z.union([z.string(), z.string().array()]).optional().nullable(),`,
                );
                writer.writeLine(
                  `notIn: z.union([z.string(), z.string().array()]).optional().nullable(),`,
                );
                writer.writeLine(`lt: z.string().optional(),`);
                writer.writeLine(`lte: z.string().optional(),`);
                writer.writeLine(`gt: z.string().optional(),`);
                writer.writeLine(`gte: z.string().optional(),`);
                writer.writeLine(`contains: z.string().optional(),`);
                writer.writeLine(`startsWith: z.string().optional(),`);
                writer.writeLine(`endsWith: z.string().optional(),`);
                writer.writeLine(`mode: QueryMode.optional(),`);
                writer.writeLine(
                  `not: z.union([z.string(), z.lazy(() => NestedStringNullableFilter)]).optional().nullable(),`,
                );
              })
              .write(`)`);
          },
        },
      ],
    }),
    writeHeading(`NESTED STRING FILTER`, 'SLIM'),
    writeConstStatement({
      leadingTrivia: (writer) => writer.newLine(),
      declarations: [
        {
          name: 'NestedStringFilter',
          type: 'z.ZodType<Prisma.Prisma.NestedStringFilter>',
          initializer(writer) {
            writer
              .write(`z.object(`)
              .inlineBlock(() => {
                writer.writeLine(`equals: z.string().optional(),`);
                writer.writeLine(
                  `in: z.union([z.string(), z.string().array()]).optional(),`,
                );
                writer.writeLine(
                  `notIn: z.union([z.string(), z.string().array()]).optional(),`,
                );
                writer.writeLine(`lt: z.string().optional(),`);
                writer.writeLine(`lte: z.string().optional(),`);
                writer.writeLine(`gt: z.string().optional(),`);
                writer.writeLine(`gte: z.string().optional(),`);
                writer.writeLine(`contains: z.string().optional(),`);
                writer.writeLine(`startsWith: z.string().optional(),`);
                writer.writeLine(`endsWith: z.string().optional(),`);
                writer.writeLine(
                  `not: z.union([z.string(), z.lazy(() => NestedStringFilter)]).optional(),`,
                );
              })
              .write(`)`);
          },
        },
      ],
    }),
    writeHeading(`NESTED STRING NULLABLE FILTER`, 'SLIM'),
    writeConstStatement({
      leadingTrivia: (writer) => writer.newLine(),
      declarations: [
        {
          name: 'NestedStringNullableFilter',
          type: 'z.ZodType<Prisma.Prisma.StringNullableFilter>',
          initializer(writer) {
            writer
              .write(`z.object(`)
              .inlineBlock(() => {
                writer.writeLine(`equals: z.string().optional().nullable(),`);
                writer.writeLine(
                  `in: z.union([z.string(), z.string().array()]).optional().nullable(),`,
                );
                writer.writeLine(
                  `notIn: z.union([z.string(), z.string().array()]).optional().nullable(),`,
                );
                writer.writeLine(`lt: z.string().optional(),`);
                writer.writeLine(`lte: z.string().optional(),`);
                writer.writeLine(`gt: z.string().optional(),`);
                writer.writeLine(`gte: z.string().optional(),`);
                writer.writeLine(`contains: z.string().optional(),`);
                writer.writeLine(`startsWith: z.string().optional(),`);
                writer.writeLine(`endsWith: z.string().optional(),`);
                writer.writeLine(`mode: QueryMode.optional(),`);
                writer.writeLine(
                  `not: z.union([z.string(), z.lazy(() => NestedStringNullableFilter)]).optional().nullable(),`,
                );
              })
              .write(`)`);
          },
        },
      ],
    }),
    writeHeading(`STRING WITH AGGREGATES FILTER`, 'SLIM'),
    writeConstStatement({
      leadingTrivia: (writer) => writer.newLine(),
      declarations: [
        {
          name: 'StringWithAggregatesFilter',
          type: 'z.ZodType<Prisma.Prisma.StringWithAggregatesFilter>',
          initializer(writer) {
            writer
              .write(`z.object(`)
              .inlineBlock(() => {
                writer.writeLine(`equals: z.string().optional(),`);
                writer.writeLine(
                  `in: z.union([z.string(), z.string().array()]).optional(),`,
                );
                writer.writeLine(
                  `notIn: z.union([z.string(), z.string().array()]).optional(),`,
                );
                writer.writeLine(`lt: z.string().optional(),`);
                writer.writeLine(`lte: z.string().optional(),`);
                writer.writeLine(`gt: z.string().optional(),`);
                writer.writeLine(`gte: z.string().optional(),`);
                writer.writeLine(`contains: z.string().optional(),`);
                writer.writeLine(`startsWith: z.string().optional(),`);
                writer.writeLine(`endsWith: z.string().optional(),`);
                writer.writeLine(`mode: QueryMode.optional(),`);
                writer.writeLine(
                  `not: z.union([z.string(), z.lazy(() => NestedStringWithAggregatesFilter)]).optional(),`,
                );
                writer.writeLine(
                  `_count: z.lazy(()=> NestedIntFilter).optional(),`,
                );
                writer.writeLine(
                  `_min: z.lazy(()=> NestedStringFilter).optional(),`,
                );
                writer.writeLine(
                  `_max: z.lazy(()=> NestedStringFilter).optional(),`,
                );
              })
              .write(`)`);
          },
        },
      ],
    }),
    writeHeading(`STRING NULLABLE WITH AGGREGATES FILTER`, 'SLIM'),
    writeConstStatement({
      leadingTrivia: (writer) => writer.newLine(),
      declarations: [
        {
          name: 'StringNullableWithAggregatesFilter',
          type: 'z.ZodType<Prisma.Prisma.StringNullableWithAggregatesFilter>',

          initializer(writer) {
            writer
              .write(`z.object(`)
              .inlineBlock(() => {
                writer.writeLine(`equals: z.string().optional().nullable(),`);
                writer.writeLine(
                  `in: z.union([z.string(), z.string().array()]).optional().nullable(),`,
                );
                writer.writeLine(
                  `notIn: z.union([z.string(), z.string().array()]).optional().nullable(),`,
                );
                writer.writeLine(`lt: z.string().optional(),`);
                writer.writeLine(`lte: z.string().optional(),`);
                writer.writeLine(`gt: z.string().optional(),`);
                writer.writeLine(`gte: z.string().optional(),`);
                writer.writeLine(`contains: z.string().optional(),`);
                writer.writeLine(`startsWith: z.string().optional(),`);
                writer.writeLine(`endsWith: z.string().optional(),`);
                writer.writeLine(`mode: QueryMode.optional(),`);
                writer.writeLine(
                  `not: z.union([z.string(), z.lazy(() => NestedStringNullableWithAggregatesFilter)]).optional().nullable(),`,
                );
                writer.writeLine(
                  `_count: z.lazy(()=> NestedIntNullableFilter).optional(),`,
                );
                writer.writeLine(
                  `_min: z.lazy(()=> NestedStringNullableFilter).optional(),`,
                );
                writer.writeLine(
                  `_max: z.lazy(()=> NestedStringNullableFilter).optional(),`,
                );
              })
              .write(`)`);
          },
        },
      ],
    }),
    writeHeading(`NESTED STRING WITH AGGREGATES FILTER`, 'SLIM'),
    writeConstStatement({
      leadingTrivia: (writer) => writer.newLine(),
      declarations: [
        {
          name: 'NestedStringWithAggregatesFilter',
          type: 'z.ZodType<Prisma.Prisma.NestedStringWithAggregatesFilter>',

          initializer(writer) {
            writer
              .write(`z.object(`)
              .inlineBlock(() => {
                writer.writeLine(`equals: z.string().optional(),`);
                writer.writeLine(
                  `in: z.union([z.string(), z.string().array()]).optional(),`,
                );
                writer.writeLine(
                  `notIn: z.union([z.string(), z.string().array()]).optional(),`,
                );
                writer.writeLine(`lt: z.string().optional(),`);
                writer.writeLine(`lte: z.string().optional(),`);
                writer.writeLine(`gt: z.string().optional(),`);
                writer.writeLine(`gte: z.string().optional(),`);
                writer.writeLine(`contains: z.string().optional(),`);
                writer.writeLine(`startsWith: z.string().optional(),`);
                writer.writeLine(`endsWith: z.string().optional(),`);
                writer.writeLine(
                  `not: z.union([z.string(), z.lazy(() => NestedStringWithAggregatesFilter)]).optional(),`,
                );
                writer.writeLine(
                  `_count: z.lazy(()=> NestedIntFilter).optional(),`,
                );
                writer.writeLine(
                  `_min: z.lazy(()=> NestedStringFilter).optional(),`,
                );
                writer.writeLine(
                  `_max: z.lazy(()=> NestedStringFilter).optional(),`,
                );
              })
              .write(`)`);
          },
        },
      ],
    }),
    writeHeading(`NESTED STRING NULLABLE WITH AGGREGATES FILTER`, 'SLIM'),
    writeConstStatement({
      leadingTrivia: (writer) => writer.newLine(),
      declarations: [
        {
          name: 'NestedStringNullableWithAggregatesFilter',
          type: 'z.ZodType<Prisma.Prisma.NestedStringNullableWithAggregatesFilter>',

          initializer(writer) {
            writer
              .write(`z.object(`)
              .inlineBlock(() => {
                writer.writeLine(`equals: z.string().optional().nullable(),`);
                writer.writeLine(
                  `in: z.union([z.string(), z.string().array()]).optional().nullable(),`,
                );
                writer.writeLine(
                  `notIn: z.union([z.string(), z.string().array()]).optional().nullable(),`,
                );
                writer.writeLine(`lt: z.string().optional(),`);
                writer.writeLine(`lte: z.string().optional(),`);
                writer.writeLine(`gt: z.string().optional(),`);
                writer.writeLine(`gte: z.string().optional(),`);
                writer.writeLine(`contains: z.string().optional(),`);
                writer.writeLine(`startsWith: z.string().optional(),`);
                writer.writeLine(`endsWith: z.string().optional(),`);
                writer.writeLine(
                  `not: z.union([z.string(), z.lazy(() => NestedStringNullableWithAggregatesFilter)]).optional().nullable(),`,
                );
                writer.writeLine(
                  `_count: z.lazy(()=> NestedIntNullableFilter).optional(),`,
                );
                writer.writeLine(
                  `_min: z.lazy(()=> NestedStringNullableFilter).optional(),`,
                );
                writer.writeLine(
                  `_max: z.lazy(()=> NestedStringNullableFilter).optional(),`,
                );
              })
              .write(`)`);
          },
        },
      ],
    }),
  ];

  // INT FILTER
  //------------------------------------------------------

  const intFilter: Statement[] = getIntFilterBaseStatements(datamodel);

  // FLOAT FILTER
  //------------------------------------------------------

  const floatFilter = [
    writeHeading(`FLOAT FILTERS`, 'FAT'),
    writeHeading(`FLOAT FILTER`, 'SLIM'),
    writeConstStatement({
      leadingTrivia: (writer) => writer.newLine(),
      declarations: [
        {
          name: 'FloatFilter',
          type: 'z.ZodType<Prisma.Prisma.FloatFilter>',
          initializer(writer) {
            writer
              .write(`z.object(`)
              .inlineBlock(() => {
                writer.writeLine(`equals: z.number().optional(),`);
                writer.writeLine(
                  `in: z.union([z.number(), z.number().array()]).optional(),`,
                );
                writer.writeLine(
                  `notIn: z.union([z.number(), z.number().array()]).optional(),`,
                );
                writer.writeLine(`lt: z.number().optional(),`);
                writer.writeLine(`lte: z.number().optional(),`);
                writer.writeLine(`gt: z.number().optional(),`);
                writer.writeLine(`gte: z.number().optional(),`);
                writer.writeLine(
                  `not: z.union([z.number(), z.lazy(() => NestedFloatFilter)]).optional(),`,
                );
              })
              .write(`)`);
          },
        },
      ],
    }),
    writeHeading(`FLOAT NULLABLE FILTER`, 'SLIM'),
    writeConstStatement({
      leadingTrivia: (writer) => writer.newLine(),
      declarations: [
        {
          name: 'FloatNullableFilter',
          type: 'z.ZodType<Prisma.Prisma.FloatNullableFilter>',
          initializer(writer) {
            writer
              .write(`z.object(`)
              .inlineBlock(() => {
                writer.writeLine(`equals: z.number().optional().nullable(),`);
                writer.writeLine(
                  `in: z.union([z.number(), z.number().array()]).optional().nullable(),`,
                );
                writer.writeLine(
                  `notIn: z.union([z.number(), z.number().array()]).optional().nullable(),`,
                );
                writer.writeLine(`lt: z.number().optional(),`);
                writer.writeLine(`lte: z.number().optional(),`);
                writer.writeLine(`gt: z.number().optional(),`);
                writer.writeLine(`gte: z.number().optional(),`);
                writer.writeLine(
                  `not: z.union([z.number(), z.lazy(() => NestedFloatNullableFilter)]).optional().nullable(),`,
                );
              })
              .write(`)`);
          },
        },
      ],
    }),
    writeHeading(`NESTED FLOAT FILTER`, 'SLIM'),
    writeConstStatement({
      leadingTrivia: (writer) => writer.newLine(),
      declarations: [
        {
          name: 'NestedFloatFilter',
          type: 'z.ZodType<Prisma.Prisma.NestedFloatFilter>',
          initializer(writer) {
            writer
              .write(`z.object(`)
              .inlineBlock(() => {
                writer.writeLine(`equals: z.number().optional(),`);
                writer.writeLine(
                  `in: z.union([z.number(), z.number().array()]).optional(),`,
                );
                writer.writeLine(
                  `notIn: z.union([z.number(), z.number().array()]).optional(),`,
                );
                writer.writeLine(`lt: z.number().optional(),`);
                writer.writeLine(`lte: z.number().optional(),`);
                writer.writeLine(`gt: z.number().optional(),`);
                writer.writeLine(`gte: z.number().optional(),`);
                writer.writeLine(
                  `not: z.union([z.number(), z.lazy(() => NestedFloatFilter)]).optional(),`,
                );
              })
              .write(`)`);
          },
        },
      ],
    }),
    writeConstStatement({
      leadingTrivia: (writer) => writer.newLine(),
      declarations: [
        {
          name: 'NestedFloatNullableFilter',
          type: 'z.ZodType<Prisma.Prisma.NestedFloatNullableFilter>',
          initializer(writer) {
            writer
              .write(`z.object(`)
              .inlineBlock(() => {
                writer.writeLine(`equals: z.number().optional().nullable(),`);
                writer.writeLine(
                  `in: z.union([z.number(), z.number().array()]).optional().nullable(),`,
                );
                writer.writeLine(
                  `notIn: z.union([z.number(), z.number().array()]).optional().nullable(),`,
                );
                writer.writeLine(`lt: z.number().optional(),`);
                writer.writeLine(`lte: z.number().optional(),`);
                writer.writeLine(`gt: z.number().optional(),`);
                writer.writeLine(`gte: z.number().optional(),`);
                writer.writeLine(
                  `not: z.union([z.number(), z.lazy(() => NestedFloatNullableFilter)]).optional().nullable(),`,
                );
              })
              .write(`)`);
          },
        },
      ],
    }),
  ];

  return [
    ...enumFilter,
    ...boolFilter,
    ...stringFilter,
    ...intFilter,
    ...floatFilter,
  ].flat();
};
