## Table of content

1. [About](#about)
2. [Installation](#installation)
3. [Usage](#usage)


# About

`zod-prisma-types` is a generator for `prisma` that tries to mirror the type structure of the generated prisma types as closly as possible in `zod schemas`. It also provides the option to write advanced zod validators directly in the prisma schema comments.

# Installation

# Usage

To use the generator add the following code snippet to your prisma.schema file:

```prisma
generator zod {
  provider = "zod-prisma-types"
  output   = "./zod" // optional custom output path - defaults to ./prisma/generated/zod
}
```

This generator only creates an `index.ts` file in the specified output folder that contains all relevant zod schemas. 
>This design decesion was made because in ts-morph it is more efficient to create a single file and write a bunch of statements at once than creating multiple files where only a few statements are added. Can be beneficial for big prisma schemas.

## Naming of zod schemas

The zod types are named after the generated prisma types so you just need to hover over a prisma function and and know which type to import. The result would look something like this in trpc v.10:
```ts
import {
  UserFindFirstArgs,
  UserFindManyArgs,
  UserFindUniqueArgs,
} from './prisma/generated/zod';

const appRouter = t.router({
  findManyUser: t.procedure.input(UserFindManyArgs).query(({ input }) => {
    return prisma.user.findMany(input);
  }),
  findUniqueUser: t.procedure.input(UserFindUniqueArgs).query(({ input }) => {
    return prisma.user.findUnique(input);
  }),
  findFirstUser: t.procedure.input(UserFindFirstArgs).query(({ input }) => {
    return prisma.user.findFirst(input);
  }),
  // rest of implementation ...
});
```
