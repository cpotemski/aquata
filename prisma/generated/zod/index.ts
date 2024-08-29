import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','email','role','name']);

export const StationScalarFieldEnumSchema = z.enum(['id','name','ownerId','resourcesId','coordinatesId','harvesters','distribution']);

export const FleetScalarFieldEnumSchema = z.enum(['id','ownerId','targetId','baseFleet','resourcesId','travelTime','remainingTime','action','actionTime','returning']);

export const ShipGroupScalarFieldEnumSchema = z.enum(['id','fleetId','type','amount']);

export const ResourceScalarFieldEnumSchema = z.enum(['id','aluminium','steel','plutonium']);

export const ResourceNodeScalarFieldEnumSchema = z.enum(['id','type','coordinatesId']);

export const CoordinateScalarFieldEnumSchema = z.enum(['id','x','y']);

export const BuildOrderScalarFieldEnumSchema = z.enum(['id','ownerId','type','what','amount','remainingTime']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const RoleSchema = z.enum(['USER','MODERATOR','ADMIN']);

export type RoleType = `${z.infer<typeof RoleSchema>}`

export const ResourceTypeSchema = z.enum(['Aluminium','Steel','Plutonium']);

export type ResourceTypeType = `${z.infer<typeof ResourceTypeSchema>}`

export const ShipTypeSchema = z.enum(['Piranha','Jellyfish','Shark','HackBoat','Taifun','Blizzard','Hurricane','Tsunami','Enterprise','Bermuda','KittyHawk','Atlantis']);

export type ShipTypeType = `${z.infer<typeof ShipTypeSchema>}`

export const FightTypeSchema = z.enum(['Normal','Emp','FirstStrike']);

export type FightTypeType = `${z.infer<typeof FightTypeSchema>}`

export const BuildOrderTypeSchema = z.enum(['Ship','Harvester']);

export type BuildOrderTypeType = `${z.infer<typeof BuildOrderTypeSchema>}`

export const FleetActionTypeSchema = z.enum(['Attack','Defend']);

export type FleetActionTypeType = `${z.infer<typeof FleetActionTypeSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  role: RoleSchema,
  id: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  email: z.string(),
  name: z.string(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// STATION SCHEMA
/////////////////////////////////////////

export const StationSchema = z.object({
  id: z.string(),
  name: z.string(),
  ownerId: z.string(),
  resourcesId: z.string(),
  coordinatesId: z.string(),
  harvesters: z.number().int(),
  distribution: z.number().int().array(),
})

export type Station = z.infer<typeof StationSchema>

/////////////////////////////////////////
// FLEET SCHEMA
/////////////////////////////////////////

export const FleetSchema = z.object({
  action: FleetActionTypeSchema.nullable(),
  id: z.string(),
  ownerId: z.string(),
  targetId: z.string().nullable(),
  baseFleet: z.boolean(),
  resourcesId: z.string(),
  travelTime: z.number().int().nullable(),
  remainingTime: z.number().int().nullable(),
  actionTime: z.number().int().nullable(),
  returning: z.boolean().nullable(),
})

export type Fleet = z.infer<typeof FleetSchema>

/////////////////////////////////////////
// SHIP GROUP SCHEMA
/////////////////////////////////////////

export const ShipGroupSchema = z.object({
  type: ShipTypeSchema,
  id: z.string(),
  fleetId: z.string(),
  amount: z.number().int(),
})

export type ShipGroup = z.infer<typeof ShipGroupSchema>

/////////////////////////////////////////
// RESOURCE SCHEMA
/////////////////////////////////////////

export const ResourceSchema = z.object({
  id: z.string(),
  aluminium: z.number().int(),
  steel: z.number().int(),
  plutonium: z.number().int(),
})

export type Resource = z.infer<typeof ResourceSchema>

/////////////////////////////////////////
// RESOURCE NODE SCHEMA
/////////////////////////////////////////

export const ResourceNodeSchema = z.object({
  type: ResourceTypeSchema,
  id: z.string(),
  coordinatesId: z.string(),
})

export type ResourceNode = z.infer<typeof ResourceNodeSchema>

/////////////////////////////////////////
// COORDINATE SCHEMA
/////////////////////////////////////////

export const CoordinateSchema = z.object({
  id: z.string(),
  x: z.number().int(),
  y: z.number().int(),
})

export type Coordinate = z.infer<typeof CoordinateSchema>

/////////////////////////////////////////
// BUILD ORDER SCHEMA
/////////////////////////////////////////

export const BuildOrderSchema = z.object({
  type: BuildOrderTypeSchema,
  what: ShipTypeSchema,
  id: z.string(),
  ownerId: z.string(),
  amount: z.number().int(),
  remainingTime: z.number().int(),
})

export type BuildOrder = z.infer<typeof BuildOrderSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  station: z.union([z.boolean(),z.lazy(() => StationArgsSchema)]).optional(),
  fleets: z.union([z.boolean(),z.lazy(() => FleetFindManyArgsSchema)]).optional(),
  incomingFleets: z.union([z.boolean(),z.lazy(() => FleetFindManyArgsSchema)]).optional(),
  buildOrders: z.union([z.boolean(),z.lazy(() => BuildOrderFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  fleets: z.boolean().optional(),
  incomingFleets: z.boolean().optional(),
  buildOrders: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  email: z.boolean().optional(),
  role: z.boolean().optional(),
  name: z.boolean().optional(),
  station: z.union([z.boolean(),z.lazy(() => StationArgsSchema)]).optional(),
  fleets: z.union([z.boolean(),z.lazy(() => FleetFindManyArgsSchema)]).optional(),
  incomingFleets: z.union([z.boolean(),z.lazy(() => FleetFindManyArgsSchema)]).optional(),
  buildOrders: z.union([z.boolean(),z.lazy(() => BuildOrderFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// STATION
//------------------------------------------------------

export const StationIncludeSchema: z.ZodType<Prisma.StationInclude> = z.object({
  owner: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  resources: z.union([z.boolean(),z.lazy(() => ResourceArgsSchema)]).optional(),
  coordinates: z.union([z.boolean(),z.lazy(() => CoordinateArgsSchema)]).optional(),
}).strict()

export const StationArgsSchema: z.ZodType<Prisma.StationDefaultArgs> = z.object({
  select: z.lazy(() => StationSelectSchema).optional(),
  include: z.lazy(() => StationIncludeSchema).optional(),
}).strict();

export const StationSelectSchema: z.ZodType<Prisma.StationSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  ownerId: z.boolean().optional(),
  resourcesId: z.boolean().optional(),
  coordinatesId: z.boolean().optional(),
  harvesters: z.boolean().optional(),
  distribution: z.boolean().optional(),
  owner: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  resources: z.union([z.boolean(),z.lazy(() => ResourceArgsSchema)]).optional(),
  coordinates: z.union([z.boolean(),z.lazy(() => CoordinateArgsSchema)]).optional(),
}).strict()

// FLEET
//------------------------------------------------------

export const FleetIncludeSchema: z.ZodType<Prisma.FleetInclude> = z.object({
  owner: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  target: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  ships: z.union([z.boolean(),z.lazy(() => ShipGroupFindManyArgsSchema)]).optional(),
  resources: z.union([z.boolean(),z.lazy(() => ResourceArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => FleetCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const FleetArgsSchema: z.ZodType<Prisma.FleetDefaultArgs> = z.object({
  select: z.lazy(() => FleetSelectSchema).optional(),
  include: z.lazy(() => FleetIncludeSchema).optional(),
}).strict();

export const FleetCountOutputTypeArgsSchema: z.ZodType<Prisma.FleetCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => FleetCountOutputTypeSelectSchema).nullish(),
}).strict();

export const FleetCountOutputTypeSelectSchema: z.ZodType<Prisma.FleetCountOutputTypeSelect> = z.object({
  ships: z.boolean().optional(),
}).strict();

export const FleetSelectSchema: z.ZodType<Prisma.FleetSelect> = z.object({
  id: z.boolean().optional(),
  ownerId: z.boolean().optional(),
  targetId: z.boolean().optional(),
  baseFleet: z.boolean().optional(),
  resourcesId: z.boolean().optional(),
  travelTime: z.boolean().optional(),
  remainingTime: z.boolean().optional(),
  action: z.boolean().optional(),
  actionTime: z.boolean().optional(),
  returning: z.boolean().optional(),
  owner: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  target: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  ships: z.union([z.boolean(),z.lazy(() => ShipGroupFindManyArgsSchema)]).optional(),
  resources: z.union([z.boolean(),z.lazy(() => ResourceArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => FleetCountOutputTypeArgsSchema)]).optional(),
}).strict()

// SHIP GROUP
//------------------------------------------------------

export const ShipGroupIncludeSchema: z.ZodType<Prisma.ShipGroupInclude> = z.object({
  fleet: z.union([z.boolean(),z.lazy(() => FleetArgsSchema)]).optional(),
}).strict()

export const ShipGroupArgsSchema: z.ZodType<Prisma.ShipGroupDefaultArgs> = z.object({
  select: z.lazy(() => ShipGroupSelectSchema).optional(),
  include: z.lazy(() => ShipGroupIncludeSchema).optional(),
}).strict();

export const ShipGroupSelectSchema: z.ZodType<Prisma.ShipGroupSelect> = z.object({
  id: z.boolean().optional(),
  fleetId: z.boolean().optional(),
  type: z.boolean().optional(),
  amount: z.boolean().optional(),
  fleet: z.union([z.boolean(),z.lazy(() => FleetArgsSchema)]).optional(),
}).strict()

// RESOURCE
//------------------------------------------------------

export const ResourceIncludeSchema: z.ZodType<Prisma.ResourceInclude> = z.object({
  station: z.union([z.boolean(),z.lazy(() => StationArgsSchema)]).optional(),
  fleet: z.union([z.boolean(),z.lazy(() => FleetArgsSchema)]).optional(),
}).strict()

export const ResourceArgsSchema: z.ZodType<Prisma.ResourceDefaultArgs> = z.object({
  select: z.lazy(() => ResourceSelectSchema).optional(),
  include: z.lazy(() => ResourceIncludeSchema).optional(),
}).strict();

export const ResourceSelectSchema: z.ZodType<Prisma.ResourceSelect> = z.object({
  id: z.boolean().optional(),
  aluminium: z.boolean().optional(),
  steel: z.boolean().optional(),
  plutonium: z.boolean().optional(),
  station: z.union([z.boolean(),z.lazy(() => StationArgsSchema)]).optional(),
  fleet: z.union([z.boolean(),z.lazy(() => FleetArgsSchema)]).optional(),
}).strict()

// RESOURCE NODE
//------------------------------------------------------

export const ResourceNodeIncludeSchema: z.ZodType<Prisma.ResourceNodeInclude> = z.object({
  coordinates: z.union([z.boolean(),z.lazy(() => CoordinateArgsSchema)]).optional(),
}).strict()

export const ResourceNodeArgsSchema: z.ZodType<Prisma.ResourceNodeDefaultArgs> = z.object({
  select: z.lazy(() => ResourceNodeSelectSchema).optional(),
  include: z.lazy(() => ResourceNodeIncludeSchema).optional(),
}).strict();

export const ResourceNodeSelectSchema: z.ZodType<Prisma.ResourceNodeSelect> = z.object({
  id: z.boolean().optional(),
  type: z.boolean().optional(),
  coordinatesId: z.boolean().optional(),
  coordinates: z.union([z.boolean(),z.lazy(() => CoordinateArgsSchema)]).optional(),
}).strict()

// COORDINATE
//------------------------------------------------------

export const CoordinateIncludeSchema: z.ZodType<Prisma.CoordinateInclude> = z.object({
  station: z.union([z.boolean(),z.lazy(() => StationArgsSchema)]).optional(),
  resourceNode: z.union([z.boolean(),z.lazy(() => ResourceNodeArgsSchema)]).optional(),
}).strict()

export const CoordinateArgsSchema: z.ZodType<Prisma.CoordinateDefaultArgs> = z.object({
  select: z.lazy(() => CoordinateSelectSchema).optional(),
  include: z.lazy(() => CoordinateIncludeSchema).optional(),
}).strict();

export const CoordinateSelectSchema: z.ZodType<Prisma.CoordinateSelect> = z.object({
  id: z.boolean().optional(),
  x: z.boolean().optional(),
  y: z.boolean().optional(),
  station: z.union([z.boolean(),z.lazy(() => StationArgsSchema)]).optional(),
  resourceNode: z.union([z.boolean(),z.lazy(() => ResourceNodeArgsSchema)]).optional(),
}).strict()

// BUILD ORDER
//------------------------------------------------------

export const BuildOrderIncludeSchema: z.ZodType<Prisma.BuildOrderInclude> = z.object({
  owner: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const BuildOrderArgsSchema: z.ZodType<Prisma.BuildOrderDefaultArgs> = z.object({
  select: z.lazy(() => BuildOrderSelectSchema).optional(),
  include: z.lazy(() => BuildOrderIncludeSchema).optional(),
}).strict();

export const BuildOrderSelectSchema: z.ZodType<Prisma.BuildOrderSelect> = z.object({
  id: z.boolean().optional(),
  ownerId: z.boolean().optional(),
  type: z.boolean().optional(),
  what: z.boolean().optional(),
  amount: z.boolean().optional(),
  remainingTime: z.boolean().optional(),
  owner: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleFilterSchema),z.lazy(() => RoleSchema) ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  station: z.union([ z.lazy(() => StationNullableRelationFilterSchema),z.lazy(() => StationWhereInputSchema) ]).optional().nullable(),
  fleets: z.lazy(() => FleetListRelationFilterSchema).optional(),
  incomingFleets: z.lazy(() => FleetListRelationFilterSchema).optional(),
  buildOrders: z.lazy(() => BuildOrderListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  station: z.lazy(() => StationOrderByWithRelationInputSchema).optional(),
  fleets: z.lazy(() => FleetOrderByRelationAggregateInputSchema).optional(),
  incomingFleets: z.lazy(() => FleetOrderByRelationAggregateInputSchema).optional(),
  buildOrders: z.lazy(() => BuildOrderOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    email: z.string(),
    name: z.string()
  }),
  z.object({
    id: z.string(),
    email: z.string(),
  }),
  z.object({
    id: z.string(),
    name: z.string(),
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    email: z.string(),
    name: z.string(),
  }),
  z.object({
    email: z.string(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  email: z.string().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleFilterSchema),z.lazy(() => RoleSchema) ]).optional(),
  station: z.union([ z.lazy(() => StationNullableRelationFilterSchema),z.lazy(() => StationWhereInputSchema) ]).optional().nullable(),
  fleets: z.lazy(() => FleetListRelationFilterSchema).optional(),
  incomingFleets: z.lazy(() => FleetListRelationFilterSchema).optional(),
  buildOrders: z.lazy(() => BuildOrderListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleWithAggregatesFilterSchema),z.lazy(() => RoleSchema) ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const StationWhereInputSchema: z.ZodType<Prisma.StationWhereInput> = z.object({
  AND: z.union([ z.lazy(() => StationWhereInputSchema),z.lazy(() => StationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => StationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StationWhereInputSchema),z.lazy(() => StationWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  ownerId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  resourcesId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  coordinatesId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  harvesters: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  distribution: z.lazy(() => IntNullableListFilterSchema).optional(),
  owner: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  resources: z.union([ z.lazy(() => ResourceRelationFilterSchema),z.lazy(() => ResourceWhereInputSchema) ]).optional(),
  coordinates: z.union([ z.lazy(() => CoordinateRelationFilterSchema),z.lazy(() => CoordinateWhereInputSchema) ]).optional(),
}).strict();

export const StationOrderByWithRelationInputSchema: z.ZodType<Prisma.StationOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional(),
  resourcesId: z.lazy(() => SortOrderSchema).optional(),
  coordinatesId: z.lazy(() => SortOrderSchema).optional(),
  harvesters: z.lazy(() => SortOrderSchema).optional(),
  distribution: z.lazy(() => SortOrderSchema).optional(),
  owner: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  resources: z.lazy(() => ResourceOrderByWithRelationInputSchema).optional(),
  coordinates: z.lazy(() => CoordinateOrderByWithRelationInputSchema).optional()
}).strict();

export const StationWhereUniqueInputSchema: z.ZodType<Prisma.StationWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    name: z.string(),
    ownerId: z.string(),
    resourcesId: z.string(),
    coordinatesId: z.string()
  }),
  z.object({
    id: z.string(),
    name: z.string(),
    ownerId: z.string(),
    resourcesId: z.string(),
  }),
  z.object({
    id: z.string(),
    name: z.string(),
    ownerId: z.string(),
    coordinatesId: z.string(),
  }),
  z.object({
    id: z.string(),
    name: z.string(),
    ownerId: z.string(),
  }),
  z.object({
    id: z.string(),
    name: z.string(),
    resourcesId: z.string(),
    coordinatesId: z.string(),
  }),
  z.object({
    id: z.string(),
    name: z.string(),
    resourcesId: z.string(),
  }),
  z.object({
    id: z.string(),
    name: z.string(),
    coordinatesId: z.string(),
  }),
  z.object({
    id: z.string(),
    name: z.string(),
  }),
  z.object({
    id: z.string(),
    ownerId: z.string(),
    resourcesId: z.string(),
    coordinatesId: z.string(),
  }),
  z.object({
    id: z.string(),
    ownerId: z.string(),
    resourcesId: z.string(),
  }),
  z.object({
    id: z.string(),
    ownerId: z.string(),
    coordinatesId: z.string(),
  }),
  z.object({
    id: z.string(),
    ownerId: z.string(),
  }),
  z.object({
    id: z.string(),
    resourcesId: z.string(),
    coordinatesId: z.string(),
  }),
  z.object({
    id: z.string(),
    resourcesId: z.string(),
  }),
  z.object({
    id: z.string(),
    coordinatesId: z.string(),
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    name: z.string(),
    ownerId: z.string(),
    resourcesId: z.string(),
    coordinatesId: z.string(),
  }),
  z.object({
    name: z.string(),
    ownerId: z.string(),
    resourcesId: z.string(),
  }),
  z.object({
    name: z.string(),
    ownerId: z.string(),
    coordinatesId: z.string(),
  }),
  z.object({
    name: z.string(),
    ownerId: z.string(),
  }),
  z.object({
    name: z.string(),
    resourcesId: z.string(),
    coordinatesId: z.string(),
  }),
  z.object({
    name: z.string(),
    resourcesId: z.string(),
  }),
  z.object({
    name: z.string(),
    coordinatesId: z.string(),
  }),
  z.object({
    name: z.string(),
  }),
  z.object({
    ownerId: z.string(),
    resourcesId: z.string(),
    coordinatesId: z.string(),
  }),
  z.object({
    ownerId: z.string(),
    resourcesId: z.string(),
  }),
  z.object({
    ownerId: z.string(),
    coordinatesId: z.string(),
  }),
  z.object({
    ownerId: z.string(),
  }),
  z.object({
    resourcesId: z.string(),
    coordinatesId: z.string(),
  }),
  z.object({
    resourcesId: z.string(),
  }),
  z.object({
    coordinatesId: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  ownerId: z.string().optional(),
  resourcesId: z.string().optional(),
  coordinatesId: z.string().optional(),
  AND: z.union([ z.lazy(() => StationWhereInputSchema),z.lazy(() => StationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => StationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StationWhereInputSchema),z.lazy(() => StationWhereInputSchema).array() ]).optional(),
  harvesters: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  distribution: z.lazy(() => IntNullableListFilterSchema).optional(),
  owner: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  resources: z.union([ z.lazy(() => ResourceRelationFilterSchema),z.lazy(() => ResourceWhereInputSchema) ]).optional(),
  coordinates: z.union([ z.lazy(() => CoordinateRelationFilterSchema),z.lazy(() => CoordinateWhereInputSchema) ]).optional(),
}).strict());

export const StationOrderByWithAggregationInputSchema: z.ZodType<Prisma.StationOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional(),
  resourcesId: z.lazy(() => SortOrderSchema).optional(),
  coordinatesId: z.lazy(() => SortOrderSchema).optional(),
  harvesters: z.lazy(() => SortOrderSchema).optional(),
  distribution: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => StationCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => StationAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => StationMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => StationMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => StationSumOrderByAggregateInputSchema).optional()
}).strict();

export const StationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.StationScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => StationScalarWhereWithAggregatesInputSchema),z.lazy(() => StationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => StationScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StationScalarWhereWithAggregatesInputSchema),z.lazy(() => StationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  ownerId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  resourcesId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  coordinatesId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  harvesters: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  distribution: z.lazy(() => IntNullableListFilterSchema).optional()
}).strict();

export const FleetWhereInputSchema: z.ZodType<Prisma.FleetWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FleetWhereInputSchema),z.lazy(() => FleetWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FleetWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FleetWhereInputSchema),z.lazy(() => FleetWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  ownerId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  targetId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  baseFleet: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  resourcesId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  travelTime: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  remainingTime: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  action: z.union([ z.lazy(() => EnumFleetActionTypeNullableFilterSchema),z.lazy(() => FleetActionTypeSchema) ]).optional().nullable(),
  actionTime: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  returning: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  owner: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  target: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  ships: z.lazy(() => ShipGroupListRelationFilterSchema).optional(),
  resources: z.union([ z.lazy(() => ResourceRelationFilterSchema),z.lazy(() => ResourceWhereInputSchema) ]).optional(),
}).strict();

export const FleetOrderByWithRelationInputSchema: z.ZodType<Prisma.FleetOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional(),
  targetId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  baseFleet: z.lazy(() => SortOrderSchema).optional(),
  resourcesId: z.lazy(() => SortOrderSchema).optional(),
  travelTime: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  remainingTime: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  action: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  actionTime: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  returning: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  owner: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  target: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  ships: z.lazy(() => ShipGroupOrderByRelationAggregateInputSchema).optional(),
  resources: z.lazy(() => ResourceOrderByWithRelationInputSchema).optional()
}).strict();

export const FleetWhereUniqueInputSchema: z.ZodType<Prisma.FleetWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    resourcesId: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    resourcesId: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  resourcesId: z.string().optional(),
  AND: z.union([ z.lazy(() => FleetWhereInputSchema),z.lazy(() => FleetWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FleetWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FleetWhereInputSchema),z.lazy(() => FleetWhereInputSchema).array() ]).optional(),
  ownerId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  targetId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  baseFleet: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  travelTime: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  remainingTime: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  action: z.union([ z.lazy(() => EnumFleetActionTypeNullableFilterSchema),z.lazy(() => FleetActionTypeSchema) ]).optional().nullable(),
  actionTime: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  returning: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  owner: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  target: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  ships: z.lazy(() => ShipGroupListRelationFilterSchema).optional(),
  resources: z.union([ z.lazy(() => ResourceRelationFilterSchema),z.lazy(() => ResourceWhereInputSchema) ]).optional(),
}).strict());

export const FleetOrderByWithAggregationInputSchema: z.ZodType<Prisma.FleetOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional(),
  targetId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  baseFleet: z.lazy(() => SortOrderSchema).optional(),
  resourcesId: z.lazy(() => SortOrderSchema).optional(),
  travelTime: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  remainingTime: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  action: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  actionTime: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  returning: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => FleetCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => FleetAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => FleetMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => FleetMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => FleetSumOrderByAggregateInputSchema).optional()
}).strict();

export const FleetScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.FleetScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => FleetScalarWhereWithAggregatesInputSchema),z.lazy(() => FleetScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => FleetScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FleetScalarWhereWithAggregatesInputSchema),z.lazy(() => FleetScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  ownerId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  targetId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  baseFleet: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  resourcesId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  travelTime: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  remainingTime: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  action: z.union([ z.lazy(() => EnumFleetActionTypeNullableWithAggregatesFilterSchema),z.lazy(() => FleetActionTypeSchema) ]).optional().nullable(),
  actionTime: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  returning: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
}).strict();

export const ShipGroupWhereInputSchema: z.ZodType<Prisma.ShipGroupWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ShipGroupWhereInputSchema),z.lazy(() => ShipGroupWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ShipGroupWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ShipGroupWhereInputSchema),z.lazy(() => ShipGroupWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  fleetId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumShipTypeFilterSchema),z.lazy(() => ShipTypeSchema) ]).optional(),
  amount: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  fleet: z.union([ z.lazy(() => FleetRelationFilterSchema),z.lazy(() => FleetWhereInputSchema) ]).optional(),
}).strict();

export const ShipGroupOrderByWithRelationInputSchema: z.ZodType<Prisma.ShipGroupOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  fleetId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  fleet: z.lazy(() => FleetOrderByWithRelationInputSchema).optional()
}).strict();

export const ShipGroupWhereUniqueInputSchema: z.ZodType<Prisma.ShipGroupWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    fleetId_type: z.lazy(() => ShipGroupFleetIdTypeCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    fleetId_type: z.lazy(() => ShipGroupFleetIdTypeCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().optional(),
  fleetId_type: z.lazy(() => ShipGroupFleetIdTypeCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => ShipGroupWhereInputSchema),z.lazy(() => ShipGroupWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ShipGroupWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ShipGroupWhereInputSchema),z.lazy(() => ShipGroupWhereInputSchema).array() ]).optional(),
  fleetId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumShipTypeFilterSchema),z.lazy(() => ShipTypeSchema) ]).optional(),
  amount: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  fleet: z.union([ z.lazy(() => FleetRelationFilterSchema),z.lazy(() => FleetWhereInputSchema) ]).optional(),
}).strict());

export const ShipGroupOrderByWithAggregationInputSchema: z.ZodType<Prisma.ShipGroupOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  fleetId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ShipGroupCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ShipGroupAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ShipGroupMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ShipGroupMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ShipGroupSumOrderByAggregateInputSchema).optional()
}).strict();

export const ShipGroupScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ShipGroupScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ShipGroupScalarWhereWithAggregatesInputSchema),z.lazy(() => ShipGroupScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ShipGroupScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ShipGroupScalarWhereWithAggregatesInputSchema),z.lazy(() => ShipGroupScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  fleetId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumShipTypeWithAggregatesFilterSchema),z.lazy(() => ShipTypeSchema) ]).optional(),
  amount: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const ResourceWhereInputSchema: z.ZodType<Prisma.ResourceWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ResourceWhereInputSchema),z.lazy(() => ResourceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ResourceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ResourceWhereInputSchema),z.lazy(() => ResourceWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  aluminium: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  steel: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  plutonium: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  station: z.union([ z.lazy(() => StationNullableRelationFilterSchema),z.lazy(() => StationWhereInputSchema) ]).optional().nullable(),
  fleet: z.union([ z.lazy(() => FleetNullableRelationFilterSchema),z.lazy(() => FleetWhereInputSchema) ]).optional().nullable(),
}).strict();

export const ResourceOrderByWithRelationInputSchema: z.ZodType<Prisma.ResourceOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  aluminium: z.lazy(() => SortOrderSchema).optional(),
  steel: z.lazy(() => SortOrderSchema).optional(),
  plutonium: z.lazy(() => SortOrderSchema).optional(),
  station: z.lazy(() => StationOrderByWithRelationInputSchema).optional(),
  fleet: z.lazy(() => FleetOrderByWithRelationInputSchema).optional()
}).strict();

export const ResourceWhereUniqueInputSchema: z.ZodType<Prisma.ResourceWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => ResourceWhereInputSchema),z.lazy(() => ResourceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ResourceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ResourceWhereInputSchema),z.lazy(() => ResourceWhereInputSchema).array() ]).optional(),
  aluminium: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  steel: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  plutonium: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  station: z.union([ z.lazy(() => StationNullableRelationFilterSchema),z.lazy(() => StationWhereInputSchema) ]).optional().nullable(),
  fleet: z.union([ z.lazy(() => FleetNullableRelationFilterSchema),z.lazy(() => FleetWhereInputSchema) ]).optional().nullable(),
}).strict());

export const ResourceOrderByWithAggregationInputSchema: z.ZodType<Prisma.ResourceOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  aluminium: z.lazy(() => SortOrderSchema).optional(),
  steel: z.lazy(() => SortOrderSchema).optional(),
  plutonium: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ResourceCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ResourceAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ResourceMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ResourceMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ResourceSumOrderByAggregateInputSchema).optional()
}).strict();

export const ResourceScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ResourceScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ResourceScalarWhereWithAggregatesInputSchema),z.lazy(() => ResourceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ResourceScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ResourceScalarWhereWithAggregatesInputSchema),z.lazy(() => ResourceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  aluminium: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  steel: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  plutonium: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const ResourceNodeWhereInputSchema: z.ZodType<Prisma.ResourceNodeWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ResourceNodeWhereInputSchema),z.lazy(() => ResourceNodeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ResourceNodeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ResourceNodeWhereInputSchema),z.lazy(() => ResourceNodeWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumResourceTypeFilterSchema),z.lazy(() => ResourceTypeSchema) ]).optional(),
  coordinatesId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  coordinates: z.union([ z.lazy(() => CoordinateRelationFilterSchema),z.lazy(() => CoordinateWhereInputSchema) ]).optional(),
}).strict();

export const ResourceNodeOrderByWithRelationInputSchema: z.ZodType<Prisma.ResourceNodeOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  coordinatesId: z.lazy(() => SortOrderSchema).optional(),
  coordinates: z.lazy(() => CoordinateOrderByWithRelationInputSchema).optional()
}).strict();

export const ResourceNodeWhereUniqueInputSchema: z.ZodType<Prisma.ResourceNodeWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    coordinatesId: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    coordinatesId: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  coordinatesId: z.string().optional(),
  AND: z.union([ z.lazy(() => ResourceNodeWhereInputSchema),z.lazy(() => ResourceNodeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ResourceNodeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ResourceNodeWhereInputSchema),z.lazy(() => ResourceNodeWhereInputSchema).array() ]).optional(),
  type: z.union([ z.lazy(() => EnumResourceTypeFilterSchema),z.lazy(() => ResourceTypeSchema) ]).optional(),
  coordinates: z.union([ z.lazy(() => CoordinateRelationFilterSchema),z.lazy(() => CoordinateWhereInputSchema) ]).optional(),
}).strict());

export const ResourceNodeOrderByWithAggregationInputSchema: z.ZodType<Prisma.ResourceNodeOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  coordinatesId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ResourceNodeCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ResourceNodeMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ResourceNodeMinOrderByAggregateInputSchema).optional()
}).strict();

export const ResourceNodeScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ResourceNodeScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ResourceNodeScalarWhereWithAggregatesInputSchema),z.lazy(() => ResourceNodeScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ResourceNodeScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ResourceNodeScalarWhereWithAggregatesInputSchema),z.lazy(() => ResourceNodeScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumResourceTypeWithAggregatesFilterSchema),z.lazy(() => ResourceTypeSchema) ]).optional(),
  coordinatesId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const CoordinateWhereInputSchema: z.ZodType<Prisma.CoordinateWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CoordinateWhereInputSchema),z.lazy(() => CoordinateWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CoordinateWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CoordinateWhereInputSchema),z.lazy(() => CoordinateWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  x: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  y: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  station: z.union([ z.lazy(() => StationNullableRelationFilterSchema),z.lazy(() => StationWhereInputSchema) ]).optional().nullable(),
  resourceNode: z.union([ z.lazy(() => ResourceNodeNullableRelationFilterSchema),z.lazy(() => ResourceNodeWhereInputSchema) ]).optional().nullable(),
}).strict();

export const CoordinateOrderByWithRelationInputSchema: z.ZodType<Prisma.CoordinateOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  x: z.lazy(() => SortOrderSchema).optional(),
  y: z.lazy(() => SortOrderSchema).optional(),
  station: z.lazy(() => StationOrderByWithRelationInputSchema).optional(),
  resourceNode: z.lazy(() => ResourceNodeOrderByWithRelationInputSchema).optional()
}).strict();

export const CoordinateWhereUniqueInputSchema: z.ZodType<Prisma.CoordinateWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    x_y: z.lazy(() => CoordinateXYCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    x_y: z.lazy(() => CoordinateXYCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().optional(),
  x_y: z.lazy(() => CoordinateXYCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => CoordinateWhereInputSchema),z.lazy(() => CoordinateWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CoordinateWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CoordinateWhereInputSchema),z.lazy(() => CoordinateWhereInputSchema).array() ]).optional(),
  x: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  y: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  station: z.union([ z.lazy(() => StationNullableRelationFilterSchema),z.lazy(() => StationWhereInputSchema) ]).optional().nullable(),
  resourceNode: z.union([ z.lazy(() => ResourceNodeNullableRelationFilterSchema),z.lazy(() => ResourceNodeWhereInputSchema) ]).optional().nullable(),
}).strict());

export const CoordinateOrderByWithAggregationInputSchema: z.ZodType<Prisma.CoordinateOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  x: z.lazy(() => SortOrderSchema).optional(),
  y: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CoordinateCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => CoordinateAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CoordinateMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CoordinateMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => CoordinateSumOrderByAggregateInputSchema).optional()
}).strict();

export const CoordinateScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CoordinateScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CoordinateScalarWhereWithAggregatesInputSchema),z.lazy(() => CoordinateScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CoordinateScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CoordinateScalarWhereWithAggregatesInputSchema),z.lazy(() => CoordinateScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  x: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  y: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const BuildOrderWhereInputSchema: z.ZodType<Prisma.BuildOrderWhereInput> = z.object({
  AND: z.union([ z.lazy(() => BuildOrderWhereInputSchema),z.lazy(() => BuildOrderWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BuildOrderWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BuildOrderWhereInputSchema),z.lazy(() => BuildOrderWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  ownerId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumBuildOrderTypeFilterSchema),z.lazy(() => BuildOrderTypeSchema) ]).optional(),
  what: z.union([ z.lazy(() => EnumShipTypeFilterSchema),z.lazy(() => ShipTypeSchema) ]).optional(),
  amount: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  remainingTime: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  owner: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const BuildOrderOrderByWithRelationInputSchema: z.ZodType<Prisma.BuildOrderOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  what: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  remainingTime: z.lazy(() => SortOrderSchema).optional(),
  owner: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const BuildOrderWhereUniqueInputSchema: z.ZodType<Prisma.BuildOrderWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => BuildOrderWhereInputSchema),z.lazy(() => BuildOrderWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BuildOrderWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BuildOrderWhereInputSchema),z.lazy(() => BuildOrderWhereInputSchema).array() ]).optional(),
  ownerId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumBuildOrderTypeFilterSchema),z.lazy(() => BuildOrderTypeSchema) ]).optional(),
  what: z.union([ z.lazy(() => EnumShipTypeFilterSchema),z.lazy(() => ShipTypeSchema) ]).optional(),
  amount: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  remainingTime: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  owner: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const BuildOrderOrderByWithAggregationInputSchema: z.ZodType<Prisma.BuildOrderOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  what: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  remainingTime: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => BuildOrderCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => BuildOrderAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => BuildOrderMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => BuildOrderMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => BuildOrderSumOrderByAggregateInputSchema).optional()
}).strict();

export const BuildOrderScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.BuildOrderScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => BuildOrderScalarWhereWithAggregatesInputSchema),z.lazy(() => BuildOrderScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => BuildOrderScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BuildOrderScalarWhereWithAggregatesInputSchema),z.lazy(() => BuildOrderScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  ownerId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumBuildOrderTypeWithAggregatesFilterSchema),z.lazy(() => BuildOrderTypeSchema) ]).optional(),
  what: z.union([ z.lazy(() => EnumShipTypeWithAggregatesFilterSchema),z.lazy(() => ShipTypeSchema) ]).optional(),
  amount: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  remainingTime: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  email: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  name: z.string(),
  station: z.lazy(() => StationCreateNestedOneWithoutOwnerInputSchema).optional(),
  fleets: z.lazy(() => FleetCreateNestedManyWithoutOwnerInputSchema).optional(),
  incomingFleets: z.lazy(() => FleetCreateNestedManyWithoutTargetInputSchema).optional(),
  buildOrders: z.lazy(() => BuildOrderCreateNestedManyWithoutOwnerInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  email: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  name: z.string(),
  station: z.lazy(() => StationUncheckedCreateNestedOneWithoutOwnerInputSchema).optional(),
  fleets: z.lazy(() => FleetUncheckedCreateNestedManyWithoutOwnerInputSchema).optional(),
  incomingFleets: z.lazy(() => FleetUncheckedCreateNestedManyWithoutTargetInputSchema).optional(),
  buildOrders: z.lazy(() => BuildOrderUncheckedCreateNestedManyWithoutOwnerInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  station: z.lazy(() => StationUpdateOneWithoutOwnerNestedInputSchema).optional(),
  fleets: z.lazy(() => FleetUpdateManyWithoutOwnerNestedInputSchema).optional(),
  incomingFleets: z.lazy(() => FleetUpdateManyWithoutTargetNestedInputSchema).optional(),
  buildOrders: z.lazy(() => BuildOrderUpdateManyWithoutOwnerNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  station: z.lazy(() => StationUncheckedUpdateOneWithoutOwnerNestedInputSchema).optional(),
  fleets: z.lazy(() => FleetUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional(),
  incomingFleets: z.lazy(() => FleetUncheckedUpdateManyWithoutTargetNestedInputSchema).optional(),
  buildOrders: z.lazy(() => BuildOrderUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  email: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  name: z.string()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StationCreateInputSchema: z.ZodType<Prisma.StationCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  harvesters: z.number().int().optional(),
  distribution: z.union([ z.lazy(() => StationCreatedistributionInputSchema),z.number().int().array() ]).optional(),
  owner: z.lazy(() => UserCreateNestedOneWithoutStationInputSchema),
  resources: z.lazy(() => ResourceCreateNestedOneWithoutStationInputSchema),
  coordinates: z.lazy(() => CoordinateCreateNestedOneWithoutStationInputSchema)
}).strict();

export const StationUncheckedCreateInputSchema: z.ZodType<Prisma.StationUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  ownerId: z.string(),
  resourcesId: z.string(),
  coordinatesId: z.string(),
  harvesters: z.number().int().optional(),
  distribution: z.union([ z.lazy(() => StationCreatedistributionInputSchema),z.number().int().array() ]).optional(),
}).strict();

export const StationUpdateInputSchema: z.ZodType<Prisma.StationUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  harvesters: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  distribution: z.union([ z.lazy(() => StationUpdatedistributionInputSchema),z.number().int().array() ]).optional(),
  owner: z.lazy(() => UserUpdateOneRequiredWithoutStationNestedInputSchema).optional(),
  resources: z.lazy(() => ResourceUpdateOneRequiredWithoutStationNestedInputSchema).optional(),
  coordinates: z.lazy(() => CoordinateUpdateOneRequiredWithoutStationNestedInputSchema).optional()
}).strict();

export const StationUncheckedUpdateInputSchema: z.ZodType<Prisma.StationUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  resourcesId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  coordinatesId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  harvesters: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  distribution: z.union([ z.lazy(() => StationUpdatedistributionInputSchema),z.number().int().array() ]).optional(),
}).strict();

export const StationCreateManyInputSchema: z.ZodType<Prisma.StationCreateManyInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  ownerId: z.string(),
  resourcesId: z.string(),
  coordinatesId: z.string(),
  harvesters: z.number().int().optional(),
  distribution: z.union([ z.lazy(() => StationCreatedistributionInputSchema),z.number().int().array() ]).optional(),
}).strict();

export const StationUpdateManyMutationInputSchema: z.ZodType<Prisma.StationUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  harvesters: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  distribution: z.union([ z.lazy(() => StationUpdatedistributionInputSchema),z.number().int().array() ]).optional(),
}).strict();

export const StationUncheckedUpdateManyInputSchema: z.ZodType<Prisma.StationUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  resourcesId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  coordinatesId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  harvesters: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  distribution: z.union([ z.lazy(() => StationUpdatedistributionInputSchema),z.number().int().array() ]).optional(),
}).strict();

export const FleetCreateInputSchema: z.ZodType<Prisma.FleetCreateInput> = z.object({
  id: z.string().optional(),
  baseFleet: z.boolean().optional(),
  travelTime: z.number().int().optional().nullable(),
  remainingTime: z.number().int().optional().nullable(),
  action: z.lazy(() => FleetActionTypeSchema).optional().nullable(),
  actionTime: z.number().int().optional().nullable(),
  returning: z.boolean().optional().nullable(),
  owner: z.lazy(() => UserCreateNestedOneWithoutFleetsInputSchema),
  target: z.lazy(() => UserCreateNestedOneWithoutIncomingFleetsInputSchema).optional(),
  ships: z.lazy(() => ShipGroupCreateNestedManyWithoutFleetInputSchema).optional(),
  resources: z.lazy(() => ResourceCreateNestedOneWithoutFleetInputSchema)
}).strict();

export const FleetUncheckedCreateInputSchema: z.ZodType<Prisma.FleetUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  ownerId: z.string(),
  targetId: z.string().optional().nullable(),
  baseFleet: z.boolean().optional(),
  resourcesId: z.string(),
  travelTime: z.number().int().optional().nullable(),
  remainingTime: z.number().int().optional().nullable(),
  action: z.lazy(() => FleetActionTypeSchema).optional().nullable(),
  actionTime: z.number().int().optional().nullable(),
  returning: z.boolean().optional().nullable(),
  ships: z.lazy(() => ShipGroupUncheckedCreateNestedManyWithoutFleetInputSchema).optional()
}).strict();

export const FleetUpdateInputSchema: z.ZodType<Prisma.FleetUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  baseFleet: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  travelTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  remainingTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  action: z.union([ z.lazy(() => FleetActionTypeSchema),z.lazy(() => NullableEnumFleetActionTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actionTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  returning: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  owner: z.lazy(() => UserUpdateOneRequiredWithoutFleetsNestedInputSchema).optional(),
  target: z.lazy(() => UserUpdateOneWithoutIncomingFleetsNestedInputSchema).optional(),
  ships: z.lazy(() => ShipGroupUpdateManyWithoutFleetNestedInputSchema).optional(),
  resources: z.lazy(() => ResourceUpdateOneRequiredWithoutFleetNestedInputSchema).optional()
}).strict();

export const FleetUncheckedUpdateInputSchema: z.ZodType<Prisma.FleetUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  targetId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  baseFleet: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  resourcesId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  travelTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  remainingTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  action: z.union([ z.lazy(() => FleetActionTypeSchema),z.lazy(() => NullableEnumFleetActionTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actionTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  returning: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ships: z.lazy(() => ShipGroupUncheckedUpdateManyWithoutFleetNestedInputSchema).optional()
}).strict();

export const FleetCreateManyInputSchema: z.ZodType<Prisma.FleetCreateManyInput> = z.object({
  id: z.string().optional(),
  ownerId: z.string(),
  targetId: z.string().optional().nullable(),
  baseFleet: z.boolean().optional(),
  resourcesId: z.string(),
  travelTime: z.number().int().optional().nullable(),
  remainingTime: z.number().int().optional().nullable(),
  action: z.lazy(() => FleetActionTypeSchema).optional().nullable(),
  actionTime: z.number().int().optional().nullable(),
  returning: z.boolean().optional().nullable()
}).strict();

export const FleetUpdateManyMutationInputSchema: z.ZodType<Prisma.FleetUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  baseFleet: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  travelTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  remainingTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  action: z.union([ z.lazy(() => FleetActionTypeSchema),z.lazy(() => NullableEnumFleetActionTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actionTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  returning: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const FleetUncheckedUpdateManyInputSchema: z.ZodType<Prisma.FleetUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  targetId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  baseFleet: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  resourcesId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  travelTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  remainingTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  action: z.union([ z.lazy(() => FleetActionTypeSchema),z.lazy(() => NullableEnumFleetActionTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actionTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  returning: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ShipGroupCreateInputSchema: z.ZodType<Prisma.ShipGroupCreateInput> = z.object({
  id: z.string().optional(),
  type: z.lazy(() => ShipTypeSchema),
  amount: z.number().int(),
  fleet: z.lazy(() => FleetCreateNestedOneWithoutShipsInputSchema)
}).strict();

export const ShipGroupUncheckedCreateInputSchema: z.ZodType<Prisma.ShipGroupUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  fleetId: z.string(),
  type: z.lazy(() => ShipTypeSchema),
  amount: z.number().int()
}).strict();

export const ShipGroupUpdateInputSchema: z.ZodType<Prisma.ShipGroupUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => ShipTypeSchema),z.lazy(() => EnumShipTypeFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  fleet: z.lazy(() => FleetUpdateOneRequiredWithoutShipsNestedInputSchema).optional()
}).strict();

export const ShipGroupUncheckedUpdateInputSchema: z.ZodType<Prisma.ShipGroupUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fleetId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => ShipTypeSchema),z.lazy(() => EnumShipTypeFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ShipGroupCreateManyInputSchema: z.ZodType<Prisma.ShipGroupCreateManyInput> = z.object({
  id: z.string().optional(),
  fleetId: z.string(),
  type: z.lazy(() => ShipTypeSchema),
  amount: z.number().int()
}).strict();

export const ShipGroupUpdateManyMutationInputSchema: z.ZodType<Prisma.ShipGroupUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => ShipTypeSchema),z.lazy(() => EnumShipTypeFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ShipGroupUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ShipGroupUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fleetId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => ShipTypeSchema),z.lazy(() => EnumShipTypeFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ResourceCreateInputSchema: z.ZodType<Prisma.ResourceCreateInput> = z.object({
  id: z.string().optional(),
  aluminium: z.number().int().optional(),
  steel: z.number().int().optional(),
  plutonium: z.number().int().optional(),
  station: z.lazy(() => StationCreateNestedOneWithoutResourcesInputSchema).optional(),
  fleet: z.lazy(() => FleetCreateNestedOneWithoutResourcesInputSchema).optional()
}).strict();

export const ResourceUncheckedCreateInputSchema: z.ZodType<Prisma.ResourceUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  aluminium: z.number().int().optional(),
  steel: z.number().int().optional(),
  plutonium: z.number().int().optional(),
  station: z.lazy(() => StationUncheckedCreateNestedOneWithoutResourcesInputSchema).optional(),
  fleet: z.lazy(() => FleetUncheckedCreateNestedOneWithoutResourcesInputSchema).optional()
}).strict();

export const ResourceUpdateInputSchema: z.ZodType<Prisma.ResourceUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  aluminium: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  steel: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  plutonium: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  station: z.lazy(() => StationUpdateOneWithoutResourcesNestedInputSchema).optional(),
  fleet: z.lazy(() => FleetUpdateOneWithoutResourcesNestedInputSchema).optional()
}).strict();

export const ResourceUncheckedUpdateInputSchema: z.ZodType<Prisma.ResourceUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  aluminium: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  steel: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  plutonium: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  station: z.lazy(() => StationUncheckedUpdateOneWithoutResourcesNestedInputSchema).optional(),
  fleet: z.lazy(() => FleetUncheckedUpdateOneWithoutResourcesNestedInputSchema).optional()
}).strict();

export const ResourceCreateManyInputSchema: z.ZodType<Prisma.ResourceCreateManyInput> = z.object({
  id: z.string().optional(),
  aluminium: z.number().int().optional(),
  steel: z.number().int().optional(),
  plutonium: z.number().int().optional()
}).strict();

export const ResourceUpdateManyMutationInputSchema: z.ZodType<Prisma.ResourceUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  aluminium: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  steel: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  plutonium: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ResourceUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ResourceUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  aluminium: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  steel: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  plutonium: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ResourceNodeCreateInputSchema: z.ZodType<Prisma.ResourceNodeCreateInput> = z.object({
  id: z.string().optional(),
  type: z.lazy(() => ResourceTypeSchema),
  coordinates: z.lazy(() => CoordinateCreateNestedOneWithoutResourceNodeInputSchema)
}).strict();

export const ResourceNodeUncheckedCreateInputSchema: z.ZodType<Prisma.ResourceNodeUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  type: z.lazy(() => ResourceTypeSchema),
  coordinatesId: z.string()
}).strict();

export const ResourceNodeUpdateInputSchema: z.ZodType<Prisma.ResourceNodeUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => ResourceTypeSchema),z.lazy(() => EnumResourceTypeFieldUpdateOperationsInputSchema) ]).optional(),
  coordinates: z.lazy(() => CoordinateUpdateOneRequiredWithoutResourceNodeNestedInputSchema).optional()
}).strict();

export const ResourceNodeUncheckedUpdateInputSchema: z.ZodType<Prisma.ResourceNodeUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => ResourceTypeSchema),z.lazy(() => EnumResourceTypeFieldUpdateOperationsInputSchema) ]).optional(),
  coordinatesId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ResourceNodeCreateManyInputSchema: z.ZodType<Prisma.ResourceNodeCreateManyInput> = z.object({
  id: z.string().optional(),
  type: z.lazy(() => ResourceTypeSchema),
  coordinatesId: z.string()
}).strict();

export const ResourceNodeUpdateManyMutationInputSchema: z.ZodType<Prisma.ResourceNodeUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => ResourceTypeSchema),z.lazy(() => EnumResourceTypeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ResourceNodeUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ResourceNodeUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => ResourceTypeSchema),z.lazy(() => EnumResourceTypeFieldUpdateOperationsInputSchema) ]).optional(),
  coordinatesId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CoordinateCreateInputSchema: z.ZodType<Prisma.CoordinateCreateInput> = z.object({
  id: z.string().optional(),
  x: z.number().int(),
  y: z.number().int(),
  station: z.lazy(() => StationCreateNestedOneWithoutCoordinatesInputSchema).optional(),
  resourceNode: z.lazy(() => ResourceNodeCreateNestedOneWithoutCoordinatesInputSchema).optional()
}).strict();

export const CoordinateUncheckedCreateInputSchema: z.ZodType<Prisma.CoordinateUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  x: z.number().int(),
  y: z.number().int(),
  station: z.lazy(() => StationUncheckedCreateNestedOneWithoutCoordinatesInputSchema).optional(),
  resourceNode: z.lazy(() => ResourceNodeUncheckedCreateNestedOneWithoutCoordinatesInputSchema).optional()
}).strict();

export const CoordinateUpdateInputSchema: z.ZodType<Prisma.CoordinateUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  x: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  y: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  station: z.lazy(() => StationUpdateOneWithoutCoordinatesNestedInputSchema).optional(),
  resourceNode: z.lazy(() => ResourceNodeUpdateOneWithoutCoordinatesNestedInputSchema).optional()
}).strict();

export const CoordinateUncheckedUpdateInputSchema: z.ZodType<Prisma.CoordinateUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  x: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  y: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  station: z.lazy(() => StationUncheckedUpdateOneWithoutCoordinatesNestedInputSchema).optional(),
  resourceNode: z.lazy(() => ResourceNodeUncheckedUpdateOneWithoutCoordinatesNestedInputSchema).optional()
}).strict();

export const CoordinateCreateManyInputSchema: z.ZodType<Prisma.CoordinateCreateManyInput> = z.object({
  id: z.string().optional(),
  x: z.number().int(),
  y: z.number().int()
}).strict();

export const CoordinateUpdateManyMutationInputSchema: z.ZodType<Prisma.CoordinateUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  x: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  y: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CoordinateUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CoordinateUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  x: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  y: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BuildOrderCreateInputSchema: z.ZodType<Prisma.BuildOrderCreateInput> = z.object({
  id: z.string().optional(),
  type: z.lazy(() => BuildOrderTypeSchema),
  what: z.lazy(() => ShipTypeSchema),
  amount: z.number().int(),
  remainingTime: z.number().int(),
  owner: z.lazy(() => UserCreateNestedOneWithoutBuildOrdersInputSchema)
}).strict();

export const BuildOrderUncheckedCreateInputSchema: z.ZodType<Prisma.BuildOrderUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  ownerId: z.string(),
  type: z.lazy(() => BuildOrderTypeSchema),
  what: z.lazy(() => ShipTypeSchema),
  amount: z.number().int(),
  remainingTime: z.number().int()
}).strict();

export const BuildOrderUpdateInputSchema: z.ZodType<Prisma.BuildOrderUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => BuildOrderTypeSchema),z.lazy(() => EnumBuildOrderTypeFieldUpdateOperationsInputSchema) ]).optional(),
  what: z.union([ z.lazy(() => ShipTypeSchema),z.lazy(() => EnumShipTypeFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  remainingTime: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  owner: z.lazy(() => UserUpdateOneRequiredWithoutBuildOrdersNestedInputSchema).optional()
}).strict();

export const BuildOrderUncheckedUpdateInputSchema: z.ZodType<Prisma.BuildOrderUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => BuildOrderTypeSchema),z.lazy(() => EnumBuildOrderTypeFieldUpdateOperationsInputSchema) ]).optional(),
  what: z.union([ z.lazy(() => ShipTypeSchema),z.lazy(() => EnumShipTypeFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  remainingTime: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BuildOrderCreateManyInputSchema: z.ZodType<Prisma.BuildOrderCreateManyInput> = z.object({
  id: z.string().optional(),
  ownerId: z.string(),
  type: z.lazy(() => BuildOrderTypeSchema),
  what: z.lazy(() => ShipTypeSchema),
  amount: z.number().int(),
  remainingTime: z.number().int()
}).strict();

export const BuildOrderUpdateManyMutationInputSchema: z.ZodType<Prisma.BuildOrderUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => BuildOrderTypeSchema),z.lazy(() => EnumBuildOrderTypeFieldUpdateOperationsInputSchema) ]).optional(),
  what: z.union([ z.lazy(() => ShipTypeSchema),z.lazy(() => EnumShipTypeFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  remainingTime: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BuildOrderUncheckedUpdateManyInputSchema: z.ZodType<Prisma.BuildOrderUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => BuildOrderTypeSchema),z.lazy(() => EnumBuildOrderTypeFieldUpdateOperationsInputSchema) ]).optional(),
  what: z.union([ z.lazy(() => ShipTypeSchema),z.lazy(() => EnumShipTypeFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  remainingTime: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const EnumRoleFilterSchema: z.ZodType<Prisma.EnumRoleFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleFilterSchema) ]).optional(),
}).strict();

export const StationNullableRelationFilterSchema: z.ZodType<Prisma.StationNullableRelationFilter> = z.object({
  is: z.lazy(() => StationWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => StationWhereInputSchema).optional().nullable()
}).strict();

export const FleetListRelationFilterSchema: z.ZodType<Prisma.FleetListRelationFilter> = z.object({
  every: z.lazy(() => FleetWhereInputSchema).optional(),
  some: z.lazy(() => FleetWhereInputSchema).optional(),
  none: z.lazy(() => FleetWhereInputSchema).optional()
}).strict();

export const BuildOrderListRelationFilterSchema: z.ZodType<Prisma.BuildOrderListRelationFilter> = z.object({
  every: z.lazy(() => BuildOrderWhereInputSchema).optional(),
  some: z.lazy(() => BuildOrderWhereInputSchema).optional(),
  none: z.lazy(() => BuildOrderWhereInputSchema).optional()
}).strict();

export const FleetOrderByRelationAggregateInputSchema: z.ZodType<Prisma.FleetOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BuildOrderOrderByRelationAggregateInputSchema: z.ZodType<Prisma.BuildOrderOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const EnumRoleWithAggregatesFilterSchema: z.ZodType<Prisma.EnumRoleWithAggregatesFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRoleFilterSchema).optional()
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const IntNullableListFilterSchema: z.ZodType<Prisma.IntNullableListFilter> = z.object({
  equals: z.number().array().optional().nullable(),
  has: z.number().optional().nullable(),
  hasEvery: z.number().array().optional(),
  hasSome: z.number().array().optional(),
  isEmpty: z.boolean().optional()
}).strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const ResourceRelationFilterSchema: z.ZodType<Prisma.ResourceRelationFilter> = z.object({
  is: z.lazy(() => ResourceWhereInputSchema).optional(),
  isNot: z.lazy(() => ResourceWhereInputSchema).optional()
}).strict();

export const CoordinateRelationFilterSchema: z.ZodType<Prisma.CoordinateRelationFilter> = z.object({
  is: z.lazy(() => CoordinateWhereInputSchema).optional(),
  isNot: z.lazy(() => CoordinateWhereInputSchema).optional()
}).strict();

export const StationCountOrderByAggregateInputSchema: z.ZodType<Prisma.StationCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional(),
  resourcesId: z.lazy(() => SortOrderSchema).optional(),
  coordinatesId: z.lazy(() => SortOrderSchema).optional(),
  harvesters: z.lazy(() => SortOrderSchema).optional(),
  distribution: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StationAvgOrderByAggregateInputSchema: z.ZodType<Prisma.StationAvgOrderByAggregateInput> = z.object({
  harvesters: z.lazy(() => SortOrderSchema).optional(),
  distribution: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StationMaxOrderByAggregateInputSchema: z.ZodType<Prisma.StationMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional(),
  resourcesId: z.lazy(() => SortOrderSchema).optional(),
  coordinatesId: z.lazy(() => SortOrderSchema).optional(),
  harvesters: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StationMinOrderByAggregateInputSchema: z.ZodType<Prisma.StationMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional(),
  resourcesId: z.lazy(() => SortOrderSchema).optional(),
  coordinatesId: z.lazy(() => SortOrderSchema).optional(),
  harvesters: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StationSumOrderByAggregateInputSchema: z.ZodType<Prisma.StationSumOrderByAggregateInput> = z.object({
  harvesters: z.lazy(() => SortOrderSchema).optional(),
  distribution: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const EnumFleetActionTypeNullableFilterSchema: z.ZodType<Prisma.EnumFleetActionTypeNullableFilter> = z.object({
  equals: z.lazy(() => FleetActionTypeSchema).optional().nullable(),
  in: z.lazy(() => FleetActionTypeSchema).array().optional().nullable(),
  notIn: z.lazy(() => FleetActionTypeSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => FleetActionTypeSchema),z.lazy(() => NestedEnumFleetActionTypeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const BoolNullableFilterSchema: z.ZodType<Prisma.BoolNullableFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const UserNullableRelationFilterSchema: z.ZodType<Prisma.UserNullableRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => UserWhereInputSchema).optional().nullable()
}).strict();

export const ShipGroupListRelationFilterSchema: z.ZodType<Prisma.ShipGroupListRelationFilter> = z.object({
  every: z.lazy(() => ShipGroupWhereInputSchema).optional(),
  some: z.lazy(() => ShipGroupWhereInputSchema).optional(),
  none: z.lazy(() => ShipGroupWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const ShipGroupOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ShipGroupOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FleetCountOrderByAggregateInputSchema: z.ZodType<Prisma.FleetCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional(),
  targetId: z.lazy(() => SortOrderSchema).optional(),
  baseFleet: z.lazy(() => SortOrderSchema).optional(),
  resourcesId: z.lazy(() => SortOrderSchema).optional(),
  travelTime: z.lazy(() => SortOrderSchema).optional(),
  remainingTime: z.lazy(() => SortOrderSchema).optional(),
  action: z.lazy(() => SortOrderSchema).optional(),
  actionTime: z.lazy(() => SortOrderSchema).optional(),
  returning: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FleetAvgOrderByAggregateInputSchema: z.ZodType<Prisma.FleetAvgOrderByAggregateInput> = z.object({
  travelTime: z.lazy(() => SortOrderSchema).optional(),
  remainingTime: z.lazy(() => SortOrderSchema).optional(),
  actionTime: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FleetMaxOrderByAggregateInputSchema: z.ZodType<Prisma.FleetMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional(),
  targetId: z.lazy(() => SortOrderSchema).optional(),
  baseFleet: z.lazy(() => SortOrderSchema).optional(),
  resourcesId: z.lazy(() => SortOrderSchema).optional(),
  travelTime: z.lazy(() => SortOrderSchema).optional(),
  remainingTime: z.lazy(() => SortOrderSchema).optional(),
  action: z.lazy(() => SortOrderSchema).optional(),
  actionTime: z.lazy(() => SortOrderSchema).optional(),
  returning: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FleetMinOrderByAggregateInputSchema: z.ZodType<Prisma.FleetMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional(),
  targetId: z.lazy(() => SortOrderSchema).optional(),
  baseFleet: z.lazy(() => SortOrderSchema).optional(),
  resourcesId: z.lazy(() => SortOrderSchema).optional(),
  travelTime: z.lazy(() => SortOrderSchema).optional(),
  remainingTime: z.lazy(() => SortOrderSchema).optional(),
  action: z.lazy(() => SortOrderSchema).optional(),
  actionTime: z.lazy(() => SortOrderSchema).optional(),
  returning: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FleetSumOrderByAggregateInputSchema: z.ZodType<Prisma.FleetSumOrderByAggregateInput> = z.object({
  travelTime: z.lazy(() => SortOrderSchema).optional(),
  remainingTime: z.lazy(() => SortOrderSchema).optional(),
  actionTime: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const EnumFleetActionTypeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.EnumFleetActionTypeNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => FleetActionTypeSchema).optional().nullable(),
  in: z.lazy(() => FleetActionTypeSchema).array().optional().nullable(),
  notIn: z.lazy(() => FleetActionTypeSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => FleetActionTypeSchema),z.lazy(() => NestedEnumFleetActionTypeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumFleetActionTypeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumFleetActionTypeNullableFilterSchema).optional()
}).strict();

export const BoolNullableWithAggregatesFilterSchema: z.ZodType<Prisma.BoolNullableWithAggregatesFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolNullableFilterSchema).optional()
}).strict();

export const EnumShipTypeFilterSchema: z.ZodType<Prisma.EnumShipTypeFilter> = z.object({
  equals: z.lazy(() => ShipTypeSchema).optional(),
  in: z.lazy(() => ShipTypeSchema).array().optional(),
  notIn: z.lazy(() => ShipTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ShipTypeSchema),z.lazy(() => NestedEnumShipTypeFilterSchema) ]).optional(),
}).strict();

export const FleetRelationFilterSchema: z.ZodType<Prisma.FleetRelationFilter> = z.object({
  is: z.lazy(() => FleetWhereInputSchema).optional(),
  isNot: z.lazy(() => FleetWhereInputSchema).optional()
}).strict();

export const ShipGroupFleetIdTypeCompoundUniqueInputSchema: z.ZodType<Prisma.ShipGroupFleetIdTypeCompoundUniqueInput> = z.object({
  fleetId: z.string(),
  type: z.lazy(() => ShipTypeSchema)
}).strict();

export const ShipGroupCountOrderByAggregateInputSchema: z.ZodType<Prisma.ShipGroupCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  fleetId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ShipGroupAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ShipGroupAvgOrderByAggregateInput> = z.object({
  amount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ShipGroupMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ShipGroupMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  fleetId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ShipGroupMinOrderByAggregateInputSchema: z.ZodType<Prisma.ShipGroupMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  fleetId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ShipGroupSumOrderByAggregateInputSchema: z.ZodType<Prisma.ShipGroupSumOrderByAggregateInput> = z.object({
  amount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumShipTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumShipTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ShipTypeSchema).optional(),
  in: z.lazy(() => ShipTypeSchema).array().optional(),
  notIn: z.lazy(() => ShipTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ShipTypeSchema),z.lazy(() => NestedEnumShipTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumShipTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumShipTypeFilterSchema).optional()
}).strict();

export const FleetNullableRelationFilterSchema: z.ZodType<Prisma.FleetNullableRelationFilter> = z.object({
  is: z.lazy(() => FleetWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => FleetWhereInputSchema).optional().nullable()
}).strict();

export const ResourceCountOrderByAggregateInputSchema: z.ZodType<Prisma.ResourceCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  aluminium: z.lazy(() => SortOrderSchema).optional(),
  steel: z.lazy(() => SortOrderSchema).optional(),
  plutonium: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ResourceAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ResourceAvgOrderByAggregateInput> = z.object({
  aluminium: z.lazy(() => SortOrderSchema).optional(),
  steel: z.lazy(() => SortOrderSchema).optional(),
  plutonium: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ResourceMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ResourceMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  aluminium: z.lazy(() => SortOrderSchema).optional(),
  steel: z.lazy(() => SortOrderSchema).optional(),
  plutonium: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ResourceMinOrderByAggregateInputSchema: z.ZodType<Prisma.ResourceMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  aluminium: z.lazy(() => SortOrderSchema).optional(),
  steel: z.lazy(() => SortOrderSchema).optional(),
  plutonium: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ResourceSumOrderByAggregateInputSchema: z.ZodType<Prisma.ResourceSumOrderByAggregateInput> = z.object({
  aluminium: z.lazy(() => SortOrderSchema).optional(),
  steel: z.lazy(() => SortOrderSchema).optional(),
  plutonium: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumResourceTypeFilterSchema: z.ZodType<Prisma.EnumResourceTypeFilter> = z.object({
  equals: z.lazy(() => ResourceTypeSchema).optional(),
  in: z.lazy(() => ResourceTypeSchema).array().optional(),
  notIn: z.lazy(() => ResourceTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ResourceTypeSchema),z.lazy(() => NestedEnumResourceTypeFilterSchema) ]).optional(),
}).strict();

export const ResourceNodeCountOrderByAggregateInputSchema: z.ZodType<Prisma.ResourceNodeCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  coordinatesId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ResourceNodeMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ResourceNodeMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  coordinatesId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ResourceNodeMinOrderByAggregateInputSchema: z.ZodType<Prisma.ResourceNodeMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  coordinatesId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumResourceTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumResourceTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ResourceTypeSchema).optional(),
  in: z.lazy(() => ResourceTypeSchema).array().optional(),
  notIn: z.lazy(() => ResourceTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ResourceTypeSchema),z.lazy(() => NestedEnumResourceTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumResourceTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumResourceTypeFilterSchema).optional()
}).strict();

export const ResourceNodeNullableRelationFilterSchema: z.ZodType<Prisma.ResourceNodeNullableRelationFilter> = z.object({
  is: z.lazy(() => ResourceNodeWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => ResourceNodeWhereInputSchema).optional().nullable()
}).strict();

export const CoordinateXYCompoundUniqueInputSchema: z.ZodType<Prisma.CoordinateXYCompoundUniqueInput> = z.object({
  x: z.number(),
  y: z.number()
}).strict();

export const CoordinateCountOrderByAggregateInputSchema: z.ZodType<Prisma.CoordinateCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  x: z.lazy(() => SortOrderSchema).optional(),
  y: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CoordinateAvgOrderByAggregateInputSchema: z.ZodType<Prisma.CoordinateAvgOrderByAggregateInput> = z.object({
  x: z.lazy(() => SortOrderSchema).optional(),
  y: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CoordinateMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CoordinateMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  x: z.lazy(() => SortOrderSchema).optional(),
  y: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CoordinateMinOrderByAggregateInputSchema: z.ZodType<Prisma.CoordinateMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  x: z.lazy(() => SortOrderSchema).optional(),
  y: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CoordinateSumOrderByAggregateInputSchema: z.ZodType<Prisma.CoordinateSumOrderByAggregateInput> = z.object({
  x: z.lazy(() => SortOrderSchema).optional(),
  y: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumBuildOrderTypeFilterSchema: z.ZodType<Prisma.EnumBuildOrderTypeFilter> = z.object({
  equals: z.lazy(() => BuildOrderTypeSchema).optional(),
  in: z.lazy(() => BuildOrderTypeSchema).array().optional(),
  notIn: z.lazy(() => BuildOrderTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => BuildOrderTypeSchema),z.lazy(() => NestedEnumBuildOrderTypeFilterSchema) ]).optional(),
}).strict();

export const BuildOrderCountOrderByAggregateInputSchema: z.ZodType<Prisma.BuildOrderCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  what: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  remainingTime: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BuildOrderAvgOrderByAggregateInputSchema: z.ZodType<Prisma.BuildOrderAvgOrderByAggregateInput> = z.object({
  amount: z.lazy(() => SortOrderSchema).optional(),
  remainingTime: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BuildOrderMaxOrderByAggregateInputSchema: z.ZodType<Prisma.BuildOrderMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  what: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  remainingTime: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BuildOrderMinOrderByAggregateInputSchema: z.ZodType<Prisma.BuildOrderMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  what: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  remainingTime: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BuildOrderSumOrderByAggregateInputSchema: z.ZodType<Prisma.BuildOrderSumOrderByAggregateInput> = z.object({
  amount: z.lazy(() => SortOrderSchema).optional(),
  remainingTime: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumBuildOrderTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumBuildOrderTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => BuildOrderTypeSchema).optional(),
  in: z.lazy(() => BuildOrderTypeSchema).array().optional(),
  notIn: z.lazy(() => BuildOrderTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => BuildOrderTypeSchema),z.lazy(() => NestedEnumBuildOrderTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumBuildOrderTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumBuildOrderTypeFilterSchema).optional()
}).strict();

export const StationCreateNestedOneWithoutOwnerInputSchema: z.ZodType<Prisma.StationCreateNestedOneWithoutOwnerInput> = z.object({
  create: z.union([ z.lazy(() => StationCreateWithoutOwnerInputSchema),z.lazy(() => StationUncheckedCreateWithoutOwnerInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StationCreateOrConnectWithoutOwnerInputSchema).optional(),
  connect: z.lazy(() => StationWhereUniqueInputSchema).optional()
}).strict();

export const FleetCreateNestedManyWithoutOwnerInputSchema: z.ZodType<Prisma.FleetCreateNestedManyWithoutOwnerInput> = z.object({
  create: z.union([ z.lazy(() => FleetCreateWithoutOwnerInputSchema),z.lazy(() => FleetCreateWithoutOwnerInputSchema).array(),z.lazy(() => FleetUncheckedCreateWithoutOwnerInputSchema),z.lazy(() => FleetUncheckedCreateWithoutOwnerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FleetCreateOrConnectWithoutOwnerInputSchema),z.lazy(() => FleetCreateOrConnectWithoutOwnerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FleetCreateManyOwnerInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FleetWhereUniqueInputSchema),z.lazy(() => FleetWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FleetCreateNestedManyWithoutTargetInputSchema: z.ZodType<Prisma.FleetCreateNestedManyWithoutTargetInput> = z.object({
  create: z.union([ z.lazy(() => FleetCreateWithoutTargetInputSchema),z.lazy(() => FleetCreateWithoutTargetInputSchema).array(),z.lazy(() => FleetUncheckedCreateWithoutTargetInputSchema),z.lazy(() => FleetUncheckedCreateWithoutTargetInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FleetCreateOrConnectWithoutTargetInputSchema),z.lazy(() => FleetCreateOrConnectWithoutTargetInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FleetCreateManyTargetInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FleetWhereUniqueInputSchema),z.lazy(() => FleetWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const BuildOrderCreateNestedManyWithoutOwnerInputSchema: z.ZodType<Prisma.BuildOrderCreateNestedManyWithoutOwnerInput> = z.object({
  create: z.union([ z.lazy(() => BuildOrderCreateWithoutOwnerInputSchema),z.lazy(() => BuildOrderCreateWithoutOwnerInputSchema).array(),z.lazy(() => BuildOrderUncheckedCreateWithoutOwnerInputSchema),z.lazy(() => BuildOrderUncheckedCreateWithoutOwnerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BuildOrderCreateOrConnectWithoutOwnerInputSchema),z.lazy(() => BuildOrderCreateOrConnectWithoutOwnerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BuildOrderCreateManyOwnerInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BuildOrderWhereUniqueInputSchema),z.lazy(() => BuildOrderWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StationUncheckedCreateNestedOneWithoutOwnerInputSchema: z.ZodType<Prisma.StationUncheckedCreateNestedOneWithoutOwnerInput> = z.object({
  create: z.union([ z.lazy(() => StationCreateWithoutOwnerInputSchema),z.lazy(() => StationUncheckedCreateWithoutOwnerInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StationCreateOrConnectWithoutOwnerInputSchema).optional(),
  connect: z.lazy(() => StationWhereUniqueInputSchema).optional()
}).strict();

export const FleetUncheckedCreateNestedManyWithoutOwnerInputSchema: z.ZodType<Prisma.FleetUncheckedCreateNestedManyWithoutOwnerInput> = z.object({
  create: z.union([ z.lazy(() => FleetCreateWithoutOwnerInputSchema),z.lazy(() => FleetCreateWithoutOwnerInputSchema).array(),z.lazy(() => FleetUncheckedCreateWithoutOwnerInputSchema),z.lazy(() => FleetUncheckedCreateWithoutOwnerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FleetCreateOrConnectWithoutOwnerInputSchema),z.lazy(() => FleetCreateOrConnectWithoutOwnerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FleetCreateManyOwnerInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FleetWhereUniqueInputSchema),z.lazy(() => FleetWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FleetUncheckedCreateNestedManyWithoutTargetInputSchema: z.ZodType<Prisma.FleetUncheckedCreateNestedManyWithoutTargetInput> = z.object({
  create: z.union([ z.lazy(() => FleetCreateWithoutTargetInputSchema),z.lazy(() => FleetCreateWithoutTargetInputSchema).array(),z.lazy(() => FleetUncheckedCreateWithoutTargetInputSchema),z.lazy(() => FleetUncheckedCreateWithoutTargetInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FleetCreateOrConnectWithoutTargetInputSchema),z.lazy(() => FleetCreateOrConnectWithoutTargetInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FleetCreateManyTargetInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FleetWhereUniqueInputSchema),z.lazy(() => FleetWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const BuildOrderUncheckedCreateNestedManyWithoutOwnerInputSchema: z.ZodType<Prisma.BuildOrderUncheckedCreateNestedManyWithoutOwnerInput> = z.object({
  create: z.union([ z.lazy(() => BuildOrderCreateWithoutOwnerInputSchema),z.lazy(() => BuildOrderCreateWithoutOwnerInputSchema).array(),z.lazy(() => BuildOrderUncheckedCreateWithoutOwnerInputSchema),z.lazy(() => BuildOrderUncheckedCreateWithoutOwnerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BuildOrderCreateOrConnectWithoutOwnerInputSchema),z.lazy(() => BuildOrderCreateOrConnectWithoutOwnerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BuildOrderCreateManyOwnerInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BuildOrderWhereUniqueInputSchema),z.lazy(() => BuildOrderWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const EnumRoleFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumRoleFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => RoleSchema).optional()
}).strict();

export const StationUpdateOneWithoutOwnerNestedInputSchema: z.ZodType<Prisma.StationUpdateOneWithoutOwnerNestedInput> = z.object({
  create: z.union([ z.lazy(() => StationCreateWithoutOwnerInputSchema),z.lazy(() => StationUncheckedCreateWithoutOwnerInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StationCreateOrConnectWithoutOwnerInputSchema).optional(),
  upsert: z.lazy(() => StationUpsertWithoutOwnerInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => StationWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => StationWhereInputSchema) ]).optional(),
  connect: z.lazy(() => StationWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => StationUpdateToOneWithWhereWithoutOwnerInputSchema),z.lazy(() => StationUpdateWithoutOwnerInputSchema),z.lazy(() => StationUncheckedUpdateWithoutOwnerInputSchema) ]).optional(),
}).strict();

export const FleetUpdateManyWithoutOwnerNestedInputSchema: z.ZodType<Prisma.FleetUpdateManyWithoutOwnerNestedInput> = z.object({
  create: z.union([ z.lazy(() => FleetCreateWithoutOwnerInputSchema),z.lazy(() => FleetCreateWithoutOwnerInputSchema).array(),z.lazy(() => FleetUncheckedCreateWithoutOwnerInputSchema),z.lazy(() => FleetUncheckedCreateWithoutOwnerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FleetCreateOrConnectWithoutOwnerInputSchema),z.lazy(() => FleetCreateOrConnectWithoutOwnerInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FleetUpsertWithWhereUniqueWithoutOwnerInputSchema),z.lazy(() => FleetUpsertWithWhereUniqueWithoutOwnerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FleetCreateManyOwnerInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FleetWhereUniqueInputSchema),z.lazy(() => FleetWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FleetWhereUniqueInputSchema),z.lazy(() => FleetWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FleetWhereUniqueInputSchema),z.lazy(() => FleetWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FleetWhereUniqueInputSchema),z.lazy(() => FleetWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FleetUpdateWithWhereUniqueWithoutOwnerInputSchema),z.lazy(() => FleetUpdateWithWhereUniqueWithoutOwnerInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FleetUpdateManyWithWhereWithoutOwnerInputSchema),z.lazy(() => FleetUpdateManyWithWhereWithoutOwnerInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FleetScalarWhereInputSchema),z.lazy(() => FleetScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FleetUpdateManyWithoutTargetNestedInputSchema: z.ZodType<Prisma.FleetUpdateManyWithoutTargetNestedInput> = z.object({
  create: z.union([ z.lazy(() => FleetCreateWithoutTargetInputSchema),z.lazy(() => FleetCreateWithoutTargetInputSchema).array(),z.lazy(() => FleetUncheckedCreateWithoutTargetInputSchema),z.lazy(() => FleetUncheckedCreateWithoutTargetInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FleetCreateOrConnectWithoutTargetInputSchema),z.lazy(() => FleetCreateOrConnectWithoutTargetInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FleetUpsertWithWhereUniqueWithoutTargetInputSchema),z.lazy(() => FleetUpsertWithWhereUniqueWithoutTargetInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FleetCreateManyTargetInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FleetWhereUniqueInputSchema),z.lazy(() => FleetWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FleetWhereUniqueInputSchema),z.lazy(() => FleetWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FleetWhereUniqueInputSchema),z.lazy(() => FleetWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FleetWhereUniqueInputSchema),z.lazy(() => FleetWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FleetUpdateWithWhereUniqueWithoutTargetInputSchema),z.lazy(() => FleetUpdateWithWhereUniqueWithoutTargetInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FleetUpdateManyWithWhereWithoutTargetInputSchema),z.lazy(() => FleetUpdateManyWithWhereWithoutTargetInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FleetScalarWhereInputSchema),z.lazy(() => FleetScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const BuildOrderUpdateManyWithoutOwnerNestedInputSchema: z.ZodType<Prisma.BuildOrderUpdateManyWithoutOwnerNestedInput> = z.object({
  create: z.union([ z.lazy(() => BuildOrderCreateWithoutOwnerInputSchema),z.lazy(() => BuildOrderCreateWithoutOwnerInputSchema).array(),z.lazy(() => BuildOrderUncheckedCreateWithoutOwnerInputSchema),z.lazy(() => BuildOrderUncheckedCreateWithoutOwnerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BuildOrderCreateOrConnectWithoutOwnerInputSchema),z.lazy(() => BuildOrderCreateOrConnectWithoutOwnerInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BuildOrderUpsertWithWhereUniqueWithoutOwnerInputSchema),z.lazy(() => BuildOrderUpsertWithWhereUniqueWithoutOwnerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BuildOrderCreateManyOwnerInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BuildOrderWhereUniqueInputSchema),z.lazy(() => BuildOrderWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BuildOrderWhereUniqueInputSchema),z.lazy(() => BuildOrderWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BuildOrderWhereUniqueInputSchema),z.lazy(() => BuildOrderWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BuildOrderWhereUniqueInputSchema),z.lazy(() => BuildOrderWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BuildOrderUpdateWithWhereUniqueWithoutOwnerInputSchema),z.lazy(() => BuildOrderUpdateWithWhereUniqueWithoutOwnerInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BuildOrderUpdateManyWithWhereWithoutOwnerInputSchema),z.lazy(() => BuildOrderUpdateManyWithWhereWithoutOwnerInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BuildOrderScalarWhereInputSchema),z.lazy(() => BuildOrderScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const StationUncheckedUpdateOneWithoutOwnerNestedInputSchema: z.ZodType<Prisma.StationUncheckedUpdateOneWithoutOwnerNestedInput> = z.object({
  create: z.union([ z.lazy(() => StationCreateWithoutOwnerInputSchema),z.lazy(() => StationUncheckedCreateWithoutOwnerInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StationCreateOrConnectWithoutOwnerInputSchema).optional(),
  upsert: z.lazy(() => StationUpsertWithoutOwnerInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => StationWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => StationWhereInputSchema) ]).optional(),
  connect: z.lazy(() => StationWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => StationUpdateToOneWithWhereWithoutOwnerInputSchema),z.lazy(() => StationUpdateWithoutOwnerInputSchema),z.lazy(() => StationUncheckedUpdateWithoutOwnerInputSchema) ]).optional(),
}).strict();

export const FleetUncheckedUpdateManyWithoutOwnerNestedInputSchema: z.ZodType<Prisma.FleetUncheckedUpdateManyWithoutOwnerNestedInput> = z.object({
  create: z.union([ z.lazy(() => FleetCreateWithoutOwnerInputSchema),z.lazy(() => FleetCreateWithoutOwnerInputSchema).array(),z.lazy(() => FleetUncheckedCreateWithoutOwnerInputSchema),z.lazy(() => FleetUncheckedCreateWithoutOwnerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FleetCreateOrConnectWithoutOwnerInputSchema),z.lazy(() => FleetCreateOrConnectWithoutOwnerInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FleetUpsertWithWhereUniqueWithoutOwnerInputSchema),z.lazy(() => FleetUpsertWithWhereUniqueWithoutOwnerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FleetCreateManyOwnerInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FleetWhereUniqueInputSchema),z.lazy(() => FleetWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FleetWhereUniqueInputSchema),z.lazy(() => FleetWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FleetWhereUniqueInputSchema),z.lazy(() => FleetWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FleetWhereUniqueInputSchema),z.lazy(() => FleetWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FleetUpdateWithWhereUniqueWithoutOwnerInputSchema),z.lazy(() => FleetUpdateWithWhereUniqueWithoutOwnerInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FleetUpdateManyWithWhereWithoutOwnerInputSchema),z.lazy(() => FleetUpdateManyWithWhereWithoutOwnerInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FleetScalarWhereInputSchema),z.lazy(() => FleetScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FleetUncheckedUpdateManyWithoutTargetNestedInputSchema: z.ZodType<Prisma.FleetUncheckedUpdateManyWithoutTargetNestedInput> = z.object({
  create: z.union([ z.lazy(() => FleetCreateWithoutTargetInputSchema),z.lazy(() => FleetCreateWithoutTargetInputSchema).array(),z.lazy(() => FleetUncheckedCreateWithoutTargetInputSchema),z.lazy(() => FleetUncheckedCreateWithoutTargetInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FleetCreateOrConnectWithoutTargetInputSchema),z.lazy(() => FleetCreateOrConnectWithoutTargetInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FleetUpsertWithWhereUniqueWithoutTargetInputSchema),z.lazy(() => FleetUpsertWithWhereUniqueWithoutTargetInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FleetCreateManyTargetInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FleetWhereUniqueInputSchema),z.lazy(() => FleetWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FleetWhereUniqueInputSchema),z.lazy(() => FleetWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FleetWhereUniqueInputSchema),z.lazy(() => FleetWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FleetWhereUniqueInputSchema),z.lazy(() => FleetWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FleetUpdateWithWhereUniqueWithoutTargetInputSchema),z.lazy(() => FleetUpdateWithWhereUniqueWithoutTargetInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FleetUpdateManyWithWhereWithoutTargetInputSchema),z.lazy(() => FleetUpdateManyWithWhereWithoutTargetInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FleetScalarWhereInputSchema),z.lazy(() => FleetScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const BuildOrderUncheckedUpdateManyWithoutOwnerNestedInputSchema: z.ZodType<Prisma.BuildOrderUncheckedUpdateManyWithoutOwnerNestedInput> = z.object({
  create: z.union([ z.lazy(() => BuildOrderCreateWithoutOwnerInputSchema),z.lazy(() => BuildOrderCreateWithoutOwnerInputSchema).array(),z.lazy(() => BuildOrderUncheckedCreateWithoutOwnerInputSchema),z.lazy(() => BuildOrderUncheckedCreateWithoutOwnerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BuildOrderCreateOrConnectWithoutOwnerInputSchema),z.lazy(() => BuildOrderCreateOrConnectWithoutOwnerInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BuildOrderUpsertWithWhereUniqueWithoutOwnerInputSchema),z.lazy(() => BuildOrderUpsertWithWhereUniqueWithoutOwnerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BuildOrderCreateManyOwnerInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BuildOrderWhereUniqueInputSchema),z.lazy(() => BuildOrderWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BuildOrderWhereUniqueInputSchema),z.lazy(() => BuildOrderWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BuildOrderWhereUniqueInputSchema),z.lazy(() => BuildOrderWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BuildOrderWhereUniqueInputSchema),z.lazy(() => BuildOrderWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BuildOrderUpdateWithWhereUniqueWithoutOwnerInputSchema),z.lazy(() => BuildOrderUpdateWithWhereUniqueWithoutOwnerInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BuildOrderUpdateManyWithWhereWithoutOwnerInputSchema),z.lazy(() => BuildOrderUpdateManyWithWhereWithoutOwnerInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BuildOrderScalarWhereInputSchema),z.lazy(() => BuildOrderScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const StationCreatedistributionInputSchema: z.ZodType<Prisma.StationCreatedistributionInput> = z.object({
  set: z.number().array()
}).strict();

export const UserCreateNestedOneWithoutStationInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutStationInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutStationInputSchema),z.lazy(() => UserUncheckedCreateWithoutStationInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutStationInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const ResourceCreateNestedOneWithoutStationInputSchema: z.ZodType<Prisma.ResourceCreateNestedOneWithoutStationInput> = z.object({
  create: z.union([ z.lazy(() => ResourceCreateWithoutStationInputSchema),z.lazy(() => ResourceUncheckedCreateWithoutStationInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ResourceCreateOrConnectWithoutStationInputSchema).optional(),
  connect: z.lazy(() => ResourceWhereUniqueInputSchema).optional()
}).strict();

export const CoordinateCreateNestedOneWithoutStationInputSchema: z.ZodType<Prisma.CoordinateCreateNestedOneWithoutStationInput> = z.object({
  create: z.union([ z.lazy(() => CoordinateCreateWithoutStationInputSchema),z.lazy(() => CoordinateUncheckedCreateWithoutStationInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CoordinateCreateOrConnectWithoutStationInputSchema).optional(),
  connect: z.lazy(() => CoordinateWhereUniqueInputSchema).optional()
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const StationUpdatedistributionInputSchema: z.ZodType<Prisma.StationUpdatedistributionInput> = z.object({
  set: z.number().array().optional(),
  push: z.union([ z.number(),z.number().array() ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutStationNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutStationNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutStationInputSchema),z.lazy(() => UserUncheckedCreateWithoutStationInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutStationInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutStationInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutStationInputSchema),z.lazy(() => UserUpdateWithoutStationInputSchema),z.lazy(() => UserUncheckedUpdateWithoutStationInputSchema) ]).optional(),
}).strict();

export const ResourceUpdateOneRequiredWithoutStationNestedInputSchema: z.ZodType<Prisma.ResourceUpdateOneRequiredWithoutStationNestedInput> = z.object({
  create: z.union([ z.lazy(() => ResourceCreateWithoutStationInputSchema),z.lazy(() => ResourceUncheckedCreateWithoutStationInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ResourceCreateOrConnectWithoutStationInputSchema).optional(),
  upsert: z.lazy(() => ResourceUpsertWithoutStationInputSchema).optional(),
  connect: z.lazy(() => ResourceWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ResourceUpdateToOneWithWhereWithoutStationInputSchema),z.lazy(() => ResourceUpdateWithoutStationInputSchema),z.lazy(() => ResourceUncheckedUpdateWithoutStationInputSchema) ]).optional(),
}).strict();

export const CoordinateUpdateOneRequiredWithoutStationNestedInputSchema: z.ZodType<Prisma.CoordinateUpdateOneRequiredWithoutStationNestedInput> = z.object({
  create: z.union([ z.lazy(() => CoordinateCreateWithoutStationInputSchema),z.lazy(() => CoordinateUncheckedCreateWithoutStationInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CoordinateCreateOrConnectWithoutStationInputSchema).optional(),
  upsert: z.lazy(() => CoordinateUpsertWithoutStationInputSchema).optional(),
  connect: z.lazy(() => CoordinateWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CoordinateUpdateToOneWithWhereWithoutStationInputSchema),z.lazy(() => CoordinateUpdateWithoutStationInputSchema),z.lazy(() => CoordinateUncheckedUpdateWithoutStationInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutFleetsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutFleetsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutFleetsInputSchema),z.lazy(() => UserUncheckedCreateWithoutFleetsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutFleetsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutIncomingFleetsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutIncomingFleetsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutIncomingFleetsInputSchema),z.lazy(() => UserUncheckedCreateWithoutIncomingFleetsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutIncomingFleetsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const ShipGroupCreateNestedManyWithoutFleetInputSchema: z.ZodType<Prisma.ShipGroupCreateNestedManyWithoutFleetInput> = z.object({
  create: z.union([ z.lazy(() => ShipGroupCreateWithoutFleetInputSchema),z.lazy(() => ShipGroupCreateWithoutFleetInputSchema).array(),z.lazy(() => ShipGroupUncheckedCreateWithoutFleetInputSchema),z.lazy(() => ShipGroupUncheckedCreateWithoutFleetInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShipGroupCreateOrConnectWithoutFleetInputSchema),z.lazy(() => ShipGroupCreateOrConnectWithoutFleetInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ShipGroupCreateManyFleetInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ShipGroupWhereUniqueInputSchema),z.lazy(() => ShipGroupWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ResourceCreateNestedOneWithoutFleetInputSchema: z.ZodType<Prisma.ResourceCreateNestedOneWithoutFleetInput> = z.object({
  create: z.union([ z.lazy(() => ResourceCreateWithoutFleetInputSchema),z.lazy(() => ResourceUncheckedCreateWithoutFleetInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ResourceCreateOrConnectWithoutFleetInputSchema).optional(),
  connect: z.lazy(() => ResourceWhereUniqueInputSchema).optional()
}).strict();

export const ShipGroupUncheckedCreateNestedManyWithoutFleetInputSchema: z.ZodType<Prisma.ShipGroupUncheckedCreateNestedManyWithoutFleetInput> = z.object({
  create: z.union([ z.lazy(() => ShipGroupCreateWithoutFleetInputSchema),z.lazy(() => ShipGroupCreateWithoutFleetInputSchema).array(),z.lazy(() => ShipGroupUncheckedCreateWithoutFleetInputSchema),z.lazy(() => ShipGroupUncheckedCreateWithoutFleetInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShipGroupCreateOrConnectWithoutFleetInputSchema),z.lazy(() => ShipGroupCreateOrConnectWithoutFleetInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ShipGroupCreateManyFleetInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ShipGroupWhereUniqueInputSchema),z.lazy(() => ShipGroupWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const NullableEnumFleetActionTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableEnumFleetActionTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => FleetActionTypeSchema).optional().nullable()
}).strict();

export const NullableBoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableBoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional().nullable()
}).strict();

export const UserUpdateOneRequiredWithoutFleetsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutFleetsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutFleetsInputSchema),z.lazy(() => UserUncheckedCreateWithoutFleetsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutFleetsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutFleetsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutFleetsInputSchema),z.lazy(() => UserUpdateWithoutFleetsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutFleetsInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneWithoutIncomingFleetsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutIncomingFleetsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutIncomingFleetsInputSchema),z.lazy(() => UserUncheckedCreateWithoutIncomingFleetsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutIncomingFleetsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutIncomingFleetsInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutIncomingFleetsInputSchema),z.lazy(() => UserUpdateWithoutIncomingFleetsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutIncomingFleetsInputSchema) ]).optional(),
}).strict();

export const ShipGroupUpdateManyWithoutFleetNestedInputSchema: z.ZodType<Prisma.ShipGroupUpdateManyWithoutFleetNestedInput> = z.object({
  create: z.union([ z.lazy(() => ShipGroupCreateWithoutFleetInputSchema),z.lazy(() => ShipGroupCreateWithoutFleetInputSchema).array(),z.lazy(() => ShipGroupUncheckedCreateWithoutFleetInputSchema),z.lazy(() => ShipGroupUncheckedCreateWithoutFleetInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShipGroupCreateOrConnectWithoutFleetInputSchema),z.lazy(() => ShipGroupCreateOrConnectWithoutFleetInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ShipGroupUpsertWithWhereUniqueWithoutFleetInputSchema),z.lazy(() => ShipGroupUpsertWithWhereUniqueWithoutFleetInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ShipGroupCreateManyFleetInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ShipGroupWhereUniqueInputSchema),z.lazy(() => ShipGroupWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ShipGroupWhereUniqueInputSchema),z.lazy(() => ShipGroupWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ShipGroupWhereUniqueInputSchema),z.lazy(() => ShipGroupWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ShipGroupWhereUniqueInputSchema),z.lazy(() => ShipGroupWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ShipGroupUpdateWithWhereUniqueWithoutFleetInputSchema),z.lazy(() => ShipGroupUpdateWithWhereUniqueWithoutFleetInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ShipGroupUpdateManyWithWhereWithoutFleetInputSchema),z.lazy(() => ShipGroupUpdateManyWithWhereWithoutFleetInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ShipGroupScalarWhereInputSchema),z.lazy(() => ShipGroupScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ResourceUpdateOneRequiredWithoutFleetNestedInputSchema: z.ZodType<Prisma.ResourceUpdateOneRequiredWithoutFleetNestedInput> = z.object({
  create: z.union([ z.lazy(() => ResourceCreateWithoutFleetInputSchema),z.lazy(() => ResourceUncheckedCreateWithoutFleetInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ResourceCreateOrConnectWithoutFleetInputSchema).optional(),
  upsert: z.lazy(() => ResourceUpsertWithoutFleetInputSchema).optional(),
  connect: z.lazy(() => ResourceWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ResourceUpdateToOneWithWhereWithoutFleetInputSchema),z.lazy(() => ResourceUpdateWithoutFleetInputSchema),z.lazy(() => ResourceUncheckedUpdateWithoutFleetInputSchema) ]).optional(),
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const ShipGroupUncheckedUpdateManyWithoutFleetNestedInputSchema: z.ZodType<Prisma.ShipGroupUncheckedUpdateManyWithoutFleetNestedInput> = z.object({
  create: z.union([ z.lazy(() => ShipGroupCreateWithoutFleetInputSchema),z.lazy(() => ShipGroupCreateWithoutFleetInputSchema).array(),z.lazy(() => ShipGroupUncheckedCreateWithoutFleetInputSchema),z.lazy(() => ShipGroupUncheckedCreateWithoutFleetInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShipGroupCreateOrConnectWithoutFleetInputSchema),z.lazy(() => ShipGroupCreateOrConnectWithoutFleetInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ShipGroupUpsertWithWhereUniqueWithoutFleetInputSchema),z.lazy(() => ShipGroupUpsertWithWhereUniqueWithoutFleetInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ShipGroupCreateManyFleetInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ShipGroupWhereUniqueInputSchema),z.lazy(() => ShipGroupWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ShipGroupWhereUniqueInputSchema),z.lazy(() => ShipGroupWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ShipGroupWhereUniqueInputSchema),z.lazy(() => ShipGroupWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ShipGroupWhereUniqueInputSchema),z.lazy(() => ShipGroupWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ShipGroupUpdateWithWhereUniqueWithoutFleetInputSchema),z.lazy(() => ShipGroupUpdateWithWhereUniqueWithoutFleetInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ShipGroupUpdateManyWithWhereWithoutFleetInputSchema),z.lazy(() => ShipGroupUpdateManyWithWhereWithoutFleetInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ShipGroupScalarWhereInputSchema),z.lazy(() => ShipGroupScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FleetCreateNestedOneWithoutShipsInputSchema: z.ZodType<Prisma.FleetCreateNestedOneWithoutShipsInput> = z.object({
  create: z.union([ z.lazy(() => FleetCreateWithoutShipsInputSchema),z.lazy(() => FleetUncheckedCreateWithoutShipsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FleetCreateOrConnectWithoutShipsInputSchema).optional(),
  connect: z.lazy(() => FleetWhereUniqueInputSchema).optional()
}).strict();

export const EnumShipTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumShipTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => ShipTypeSchema).optional()
}).strict();

export const FleetUpdateOneRequiredWithoutShipsNestedInputSchema: z.ZodType<Prisma.FleetUpdateOneRequiredWithoutShipsNestedInput> = z.object({
  create: z.union([ z.lazy(() => FleetCreateWithoutShipsInputSchema),z.lazy(() => FleetUncheckedCreateWithoutShipsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FleetCreateOrConnectWithoutShipsInputSchema).optional(),
  upsert: z.lazy(() => FleetUpsertWithoutShipsInputSchema).optional(),
  connect: z.lazy(() => FleetWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => FleetUpdateToOneWithWhereWithoutShipsInputSchema),z.lazy(() => FleetUpdateWithoutShipsInputSchema),z.lazy(() => FleetUncheckedUpdateWithoutShipsInputSchema) ]).optional(),
}).strict();

export const StationCreateNestedOneWithoutResourcesInputSchema: z.ZodType<Prisma.StationCreateNestedOneWithoutResourcesInput> = z.object({
  create: z.union([ z.lazy(() => StationCreateWithoutResourcesInputSchema),z.lazy(() => StationUncheckedCreateWithoutResourcesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StationCreateOrConnectWithoutResourcesInputSchema).optional(),
  connect: z.lazy(() => StationWhereUniqueInputSchema).optional()
}).strict();

export const FleetCreateNestedOneWithoutResourcesInputSchema: z.ZodType<Prisma.FleetCreateNestedOneWithoutResourcesInput> = z.object({
  create: z.union([ z.lazy(() => FleetCreateWithoutResourcesInputSchema),z.lazy(() => FleetUncheckedCreateWithoutResourcesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FleetCreateOrConnectWithoutResourcesInputSchema).optional(),
  connect: z.lazy(() => FleetWhereUniqueInputSchema).optional()
}).strict();

export const StationUncheckedCreateNestedOneWithoutResourcesInputSchema: z.ZodType<Prisma.StationUncheckedCreateNestedOneWithoutResourcesInput> = z.object({
  create: z.union([ z.lazy(() => StationCreateWithoutResourcesInputSchema),z.lazy(() => StationUncheckedCreateWithoutResourcesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StationCreateOrConnectWithoutResourcesInputSchema).optional(),
  connect: z.lazy(() => StationWhereUniqueInputSchema).optional()
}).strict();

export const FleetUncheckedCreateNestedOneWithoutResourcesInputSchema: z.ZodType<Prisma.FleetUncheckedCreateNestedOneWithoutResourcesInput> = z.object({
  create: z.union([ z.lazy(() => FleetCreateWithoutResourcesInputSchema),z.lazy(() => FleetUncheckedCreateWithoutResourcesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FleetCreateOrConnectWithoutResourcesInputSchema).optional(),
  connect: z.lazy(() => FleetWhereUniqueInputSchema).optional()
}).strict();

export const StationUpdateOneWithoutResourcesNestedInputSchema: z.ZodType<Prisma.StationUpdateOneWithoutResourcesNestedInput> = z.object({
  create: z.union([ z.lazy(() => StationCreateWithoutResourcesInputSchema),z.lazy(() => StationUncheckedCreateWithoutResourcesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StationCreateOrConnectWithoutResourcesInputSchema).optional(),
  upsert: z.lazy(() => StationUpsertWithoutResourcesInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => StationWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => StationWhereInputSchema) ]).optional(),
  connect: z.lazy(() => StationWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => StationUpdateToOneWithWhereWithoutResourcesInputSchema),z.lazy(() => StationUpdateWithoutResourcesInputSchema),z.lazy(() => StationUncheckedUpdateWithoutResourcesInputSchema) ]).optional(),
}).strict();

export const FleetUpdateOneWithoutResourcesNestedInputSchema: z.ZodType<Prisma.FleetUpdateOneWithoutResourcesNestedInput> = z.object({
  create: z.union([ z.lazy(() => FleetCreateWithoutResourcesInputSchema),z.lazy(() => FleetUncheckedCreateWithoutResourcesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FleetCreateOrConnectWithoutResourcesInputSchema).optional(),
  upsert: z.lazy(() => FleetUpsertWithoutResourcesInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => FleetWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => FleetWhereInputSchema) ]).optional(),
  connect: z.lazy(() => FleetWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => FleetUpdateToOneWithWhereWithoutResourcesInputSchema),z.lazy(() => FleetUpdateWithoutResourcesInputSchema),z.lazy(() => FleetUncheckedUpdateWithoutResourcesInputSchema) ]).optional(),
}).strict();

export const StationUncheckedUpdateOneWithoutResourcesNestedInputSchema: z.ZodType<Prisma.StationUncheckedUpdateOneWithoutResourcesNestedInput> = z.object({
  create: z.union([ z.lazy(() => StationCreateWithoutResourcesInputSchema),z.lazy(() => StationUncheckedCreateWithoutResourcesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StationCreateOrConnectWithoutResourcesInputSchema).optional(),
  upsert: z.lazy(() => StationUpsertWithoutResourcesInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => StationWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => StationWhereInputSchema) ]).optional(),
  connect: z.lazy(() => StationWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => StationUpdateToOneWithWhereWithoutResourcesInputSchema),z.lazy(() => StationUpdateWithoutResourcesInputSchema),z.lazy(() => StationUncheckedUpdateWithoutResourcesInputSchema) ]).optional(),
}).strict();

export const FleetUncheckedUpdateOneWithoutResourcesNestedInputSchema: z.ZodType<Prisma.FleetUncheckedUpdateOneWithoutResourcesNestedInput> = z.object({
  create: z.union([ z.lazy(() => FleetCreateWithoutResourcesInputSchema),z.lazy(() => FleetUncheckedCreateWithoutResourcesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FleetCreateOrConnectWithoutResourcesInputSchema).optional(),
  upsert: z.lazy(() => FleetUpsertWithoutResourcesInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => FleetWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => FleetWhereInputSchema) ]).optional(),
  connect: z.lazy(() => FleetWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => FleetUpdateToOneWithWhereWithoutResourcesInputSchema),z.lazy(() => FleetUpdateWithoutResourcesInputSchema),z.lazy(() => FleetUncheckedUpdateWithoutResourcesInputSchema) ]).optional(),
}).strict();

export const CoordinateCreateNestedOneWithoutResourceNodeInputSchema: z.ZodType<Prisma.CoordinateCreateNestedOneWithoutResourceNodeInput> = z.object({
  create: z.union([ z.lazy(() => CoordinateCreateWithoutResourceNodeInputSchema),z.lazy(() => CoordinateUncheckedCreateWithoutResourceNodeInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CoordinateCreateOrConnectWithoutResourceNodeInputSchema).optional(),
  connect: z.lazy(() => CoordinateWhereUniqueInputSchema).optional()
}).strict();

export const EnumResourceTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumResourceTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => ResourceTypeSchema).optional()
}).strict();

export const CoordinateUpdateOneRequiredWithoutResourceNodeNestedInputSchema: z.ZodType<Prisma.CoordinateUpdateOneRequiredWithoutResourceNodeNestedInput> = z.object({
  create: z.union([ z.lazy(() => CoordinateCreateWithoutResourceNodeInputSchema),z.lazy(() => CoordinateUncheckedCreateWithoutResourceNodeInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CoordinateCreateOrConnectWithoutResourceNodeInputSchema).optional(),
  upsert: z.lazy(() => CoordinateUpsertWithoutResourceNodeInputSchema).optional(),
  connect: z.lazy(() => CoordinateWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CoordinateUpdateToOneWithWhereWithoutResourceNodeInputSchema),z.lazy(() => CoordinateUpdateWithoutResourceNodeInputSchema),z.lazy(() => CoordinateUncheckedUpdateWithoutResourceNodeInputSchema) ]).optional(),
}).strict();

export const StationCreateNestedOneWithoutCoordinatesInputSchema: z.ZodType<Prisma.StationCreateNestedOneWithoutCoordinatesInput> = z.object({
  create: z.union([ z.lazy(() => StationCreateWithoutCoordinatesInputSchema),z.lazy(() => StationUncheckedCreateWithoutCoordinatesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StationCreateOrConnectWithoutCoordinatesInputSchema).optional(),
  connect: z.lazy(() => StationWhereUniqueInputSchema).optional()
}).strict();

export const ResourceNodeCreateNestedOneWithoutCoordinatesInputSchema: z.ZodType<Prisma.ResourceNodeCreateNestedOneWithoutCoordinatesInput> = z.object({
  create: z.union([ z.lazy(() => ResourceNodeCreateWithoutCoordinatesInputSchema),z.lazy(() => ResourceNodeUncheckedCreateWithoutCoordinatesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ResourceNodeCreateOrConnectWithoutCoordinatesInputSchema).optional(),
  connect: z.lazy(() => ResourceNodeWhereUniqueInputSchema).optional()
}).strict();

export const StationUncheckedCreateNestedOneWithoutCoordinatesInputSchema: z.ZodType<Prisma.StationUncheckedCreateNestedOneWithoutCoordinatesInput> = z.object({
  create: z.union([ z.lazy(() => StationCreateWithoutCoordinatesInputSchema),z.lazy(() => StationUncheckedCreateWithoutCoordinatesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StationCreateOrConnectWithoutCoordinatesInputSchema).optional(),
  connect: z.lazy(() => StationWhereUniqueInputSchema).optional()
}).strict();

export const ResourceNodeUncheckedCreateNestedOneWithoutCoordinatesInputSchema: z.ZodType<Prisma.ResourceNodeUncheckedCreateNestedOneWithoutCoordinatesInput> = z.object({
  create: z.union([ z.lazy(() => ResourceNodeCreateWithoutCoordinatesInputSchema),z.lazy(() => ResourceNodeUncheckedCreateWithoutCoordinatesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ResourceNodeCreateOrConnectWithoutCoordinatesInputSchema).optional(),
  connect: z.lazy(() => ResourceNodeWhereUniqueInputSchema).optional()
}).strict();

export const StationUpdateOneWithoutCoordinatesNestedInputSchema: z.ZodType<Prisma.StationUpdateOneWithoutCoordinatesNestedInput> = z.object({
  create: z.union([ z.lazy(() => StationCreateWithoutCoordinatesInputSchema),z.lazy(() => StationUncheckedCreateWithoutCoordinatesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StationCreateOrConnectWithoutCoordinatesInputSchema).optional(),
  upsert: z.lazy(() => StationUpsertWithoutCoordinatesInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => StationWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => StationWhereInputSchema) ]).optional(),
  connect: z.lazy(() => StationWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => StationUpdateToOneWithWhereWithoutCoordinatesInputSchema),z.lazy(() => StationUpdateWithoutCoordinatesInputSchema),z.lazy(() => StationUncheckedUpdateWithoutCoordinatesInputSchema) ]).optional(),
}).strict();

export const ResourceNodeUpdateOneWithoutCoordinatesNestedInputSchema: z.ZodType<Prisma.ResourceNodeUpdateOneWithoutCoordinatesNestedInput> = z.object({
  create: z.union([ z.lazy(() => ResourceNodeCreateWithoutCoordinatesInputSchema),z.lazy(() => ResourceNodeUncheckedCreateWithoutCoordinatesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ResourceNodeCreateOrConnectWithoutCoordinatesInputSchema).optional(),
  upsert: z.lazy(() => ResourceNodeUpsertWithoutCoordinatesInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => ResourceNodeWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => ResourceNodeWhereInputSchema) ]).optional(),
  connect: z.lazy(() => ResourceNodeWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ResourceNodeUpdateToOneWithWhereWithoutCoordinatesInputSchema),z.lazy(() => ResourceNodeUpdateWithoutCoordinatesInputSchema),z.lazy(() => ResourceNodeUncheckedUpdateWithoutCoordinatesInputSchema) ]).optional(),
}).strict();

export const StationUncheckedUpdateOneWithoutCoordinatesNestedInputSchema: z.ZodType<Prisma.StationUncheckedUpdateOneWithoutCoordinatesNestedInput> = z.object({
  create: z.union([ z.lazy(() => StationCreateWithoutCoordinatesInputSchema),z.lazy(() => StationUncheckedCreateWithoutCoordinatesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StationCreateOrConnectWithoutCoordinatesInputSchema).optional(),
  upsert: z.lazy(() => StationUpsertWithoutCoordinatesInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => StationWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => StationWhereInputSchema) ]).optional(),
  connect: z.lazy(() => StationWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => StationUpdateToOneWithWhereWithoutCoordinatesInputSchema),z.lazy(() => StationUpdateWithoutCoordinatesInputSchema),z.lazy(() => StationUncheckedUpdateWithoutCoordinatesInputSchema) ]).optional(),
}).strict();

export const ResourceNodeUncheckedUpdateOneWithoutCoordinatesNestedInputSchema: z.ZodType<Prisma.ResourceNodeUncheckedUpdateOneWithoutCoordinatesNestedInput> = z.object({
  create: z.union([ z.lazy(() => ResourceNodeCreateWithoutCoordinatesInputSchema),z.lazy(() => ResourceNodeUncheckedCreateWithoutCoordinatesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ResourceNodeCreateOrConnectWithoutCoordinatesInputSchema).optional(),
  upsert: z.lazy(() => ResourceNodeUpsertWithoutCoordinatesInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => ResourceNodeWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => ResourceNodeWhereInputSchema) ]).optional(),
  connect: z.lazy(() => ResourceNodeWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ResourceNodeUpdateToOneWithWhereWithoutCoordinatesInputSchema),z.lazy(() => ResourceNodeUpdateWithoutCoordinatesInputSchema),z.lazy(() => ResourceNodeUncheckedUpdateWithoutCoordinatesInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutBuildOrdersInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutBuildOrdersInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutBuildOrdersInputSchema),z.lazy(() => UserUncheckedCreateWithoutBuildOrdersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutBuildOrdersInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const EnumBuildOrderTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumBuildOrderTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => BuildOrderTypeSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutBuildOrdersNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutBuildOrdersNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutBuildOrdersInputSchema),z.lazy(() => UserUncheckedCreateWithoutBuildOrdersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutBuildOrdersInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutBuildOrdersInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutBuildOrdersInputSchema),z.lazy(() => UserUpdateWithoutBuildOrdersInputSchema),z.lazy(() => UserUncheckedUpdateWithoutBuildOrdersInputSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedEnumRoleFilterSchema: z.ZodType<Prisma.NestedEnumRoleFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedEnumRoleWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumRoleWithAggregatesFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRoleFilterSchema).optional()
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumFleetActionTypeNullableFilterSchema: z.ZodType<Prisma.NestedEnumFleetActionTypeNullableFilter> = z.object({
  equals: z.lazy(() => FleetActionTypeSchema).optional().nullable(),
  in: z.lazy(() => FleetActionTypeSchema).array().optional().nullable(),
  notIn: z.lazy(() => FleetActionTypeSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => FleetActionTypeSchema),z.lazy(() => NestedEnumFleetActionTypeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedBoolNullableFilterSchema: z.ZodType<Prisma.NestedBoolNullableFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumFleetActionTypeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumFleetActionTypeNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => FleetActionTypeSchema).optional().nullable(),
  in: z.lazy(() => FleetActionTypeSchema).array().optional().nullable(),
  notIn: z.lazy(() => FleetActionTypeSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => FleetActionTypeSchema),z.lazy(() => NestedEnumFleetActionTypeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumFleetActionTypeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumFleetActionTypeNullableFilterSchema).optional()
}).strict();

export const NestedBoolNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolNullableWithAggregatesFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolNullableFilterSchema).optional()
}).strict();

export const NestedEnumShipTypeFilterSchema: z.ZodType<Prisma.NestedEnumShipTypeFilter> = z.object({
  equals: z.lazy(() => ShipTypeSchema).optional(),
  in: z.lazy(() => ShipTypeSchema).array().optional(),
  notIn: z.lazy(() => ShipTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ShipTypeSchema),z.lazy(() => NestedEnumShipTypeFilterSchema) ]).optional(),
}).strict();

export const NestedEnumShipTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumShipTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ShipTypeSchema).optional(),
  in: z.lazy(() => ShipTypeSchema).array().optional(),
  notIn: z.lazy(() => ShipTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ShipTypeSchema),z.lazy(() => NestedEnumShipTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumShipTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumShipTypeFilterSchema).optional()
}).strict();

export const NestedEnumResourceTypeFilterSchema: z.ZodType<Prisma.NestedEnumResourceTypeFilter> = z.object({
  equals: z.lazy(() => ResourceTypeSchema).optional(),
  in: z.lazy(() => ResourceTypeSchema).array().optional(),
  notIn: z.lazy(() => ResourceTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ResourceTypeSchema),z.lazy(() => NestedEnumResourceTypeFilterSchema) ]).optional(),
}).strict();

export const NestedEnumResourceTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumResourceTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ResourceTypeSchema).optional(),
  in: z.lazy(() => ResourceTypeSchema).array().optional(),
  notIn: z.lazy(() => ResourceTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ResourceTypeSchema),z.lazy(() => NestedEnumResourceTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumResourceTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumResourceTypeFilterSchema).optional()
}).strict();

export const NestedEnumBuildOrderTypeFilterSchema: z.ZodType<Prisma.NestedEnumBuildOrderTypeFilter> = z.object({
  equals: z.lazy(() => BuildOrderTypeSchema).optional(),
  in: z.lazy(() => BuildOrderTypeSchema).array().optional(),
  notIn: z.lazy(() => BuildOrderTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => BuildOrderTypeSchema),z.lazy(() => NestedEnumBuildOrderTypeFilterSchema) ]).optional(),
}).strict();

export const NestedEnumBuildOrderTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumBuildOrderTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => BuildOrderTypeSchema).optional(),
  in: z.lazy(() => BuildOrderTypeSchema).array().optional(),
  notIn: z.lazy(() => BuildOrderTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => BuildOrderTypeSchema),z.lazy(() => NestedEnumBuildOrderTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumBuildOrderTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumBuildOrderTypeFilterSchema).optional()
}).strict();

export const StationCreateWithoutOwnerInputSchema: z.ZodType<Prisma.StationCreateWithoutOwnerInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  harvesters: z.number().int().optional(),
  distribution: z.union([ z.lazy(() => StationCreatedistributionInputSchema),z.number().int().array() ]).optional(),
  resources: z.lazy(() => ResourceCreateNestedOneWithoutStationInputSchema),
  coordinates: z.lazy(() => CoordinateCreateNestedOneWithoutStationInputSchema)
}).strict();

export const StationUncheckedCreateWithoutOwnerInputSchema: z.ZodType<Prisma.StationUncheckedCreateWithoutOwnerInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  resourcesId: z.string(),
  coordinatesId: z.string(),
  harvesters: z.number().int().optional(),
  distribution: z.union([ z.lazy(() => StationCreatedistributionInputSchema),z.number().int().array() ]).optional(),
}).strict();

export const StationCreateOrConnectWithoutOwnerInputSchema: z.ZodType<Prisma.StationCreateOrConnectWithoutOwnerInput> = z.object({
  where: z.lazy(() => StationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => StationCreateWithoutOwnerInputSchema),z.lazy(() => StationUncheckedCreateWithoutOwnerInputSchema) ]),
}).strict();

export const FleetCreateWithoutOwnerInputSchema: z.ZodType<Prisma.FleetCreateWithoutOwnerInput> = z.object({
  id: z.string().optional(),
  baseFleet: z.boolean().optional(),
  travelTime: z.number().int().optional().nullable(),
  remainingTime: z.number().int().optional().nullable(),
  action: z.lazy(() => FleetActionTypeSchema).optional().nullable(),
  actionTime: z.number().int().optional().nullable(),
  returning: z.boolean().optional().nullable(),
  target: z.lazy(() => UserCreateNestedOneWithoutIncomingFleetsInputSchema).optional(),
  ships: z.lazy(() => ShipGroupCreateNestedManyWithoutFleetInputSchema).optional(),
  resources: z.lazy(() => ResourceCreateNestedOneWithoutFleetInputSchema)
}).strict();

export const FleetUncheckedCreateWithoutOwnerInputSchema: z.ZodType<Prisma.FleetUncheckedCreateWithoutOwnerInput> = z.object({
  id: z.string().optional(),
  targetId: z.string().optional().nullable(),
  baseFleet: z.boolean().optional(),
  resourcesId: z.string(),
  travelTime: z.number().int().optional().nullable(),
  remainingTime: z.number().int().optional().nullable(),
  action: z.lazy(() => FleetActionTypeSchema).optional().nullable(),
  actionTime: z.number().int().optional().nullable(),
  returning: z.boolean().optional().nullable(),
  ships: z.lazy(() => ShipGroupUncheckedCreateNestedManyWithoutFleetInputSchema).optional()
}).strict();

export const FleetCreateOrConnectWithoutOwnerInputSchema: z.ZodType<Prisma.FleetCreateOrConnectWithoutOwnerInput> = z.object({
  where: z.lazy(() => FleetWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FleetCreateWithoutOwnerInputSchema),z.lazy(() => FleetUncheckedCreateWithoutOwnerInputSchema) ]),
}).strict();

export const FleetCreateManyOwnerInputEnvelopeSchema: z.ZodType<Prisma.FleetCreateManyOwnerInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => FleetCreateManyOwnerInputSchema),z.lazy(() => FleetCreateManyOwnerInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const FleetCreateWithoutTargetInputSchema: z.ZodType<Prisma.FleetCreateWithoutTargetInput> = z.object({
  id: z.string().optional(),
  baseFleet: z.boolean().optional(),
  travelTime: z.number().int().optional().nullable(),
  remainingTime: z.number().int().optional().nullable(),
  action: z.lazy(() => FleetActionTypeSchema).optional().nullable(),
  actionTime: z.number().int().optional().nullable(),
  returning: z.boolean().optional().nullable(),
  owner: z.lazy(() => UserCreateNestedOneWithoutFleetsInputSchema),
  ships: z.lazy(() => ShipGroupCreateNestedManyWithoutFleetInputSchema).optional(),
  resources: z.lazy(() => ResourceCreateNestedOneWithoutFleetInputSchema)
}).strict();

export const FleetUncheckedCreateWithoutTargetInputSchema: z.ZodType<Prisma.FleetUncheckedCreateWithoutTargetInput> = z.object({
  id: z.string().optional(),
  ownerId: z.string(),
  baseFleet: z.boolean().optional(),
  resourcesId: z.string(),
  travelTime: z.number().int().optional().nullable(),
  remainingTime: z.number().int().optional().nullable(),
  action: z.lazy(() => FleetActionTypeSchema).optional().nullable(),
  actionTime: z.number().int().optional().nullable(),
  returning: z.boolean().optional().nullable(),
  ships: z.lazy(() => ShipGroupUncheckedCreateNestedManyWithoutFleetInputSchema).optional()
}).strict();

export const FleetCreateOrConnectWithoutTargetInputSchema: z.ZodType<Prisma.FleetCreateOrConnectWithoutTargetInput> = z.object({
  where: z.lazy(() => FleetWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FleetCreateWithoutTargetInputSchema),z.lazy(() => FleetUncheckedCreateWithoutTargetInputSchema) ]),
}).strict();

export const FleetCreateManyTargetInputEnvelopeSchema: z.ZodType<Prisma.FleetCreateManyTargetInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => FleetCreateManyTargetInputSchema),z.lazy(() => FleetCreateManyTargetInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const BuildOrderCreateWithoutOwnerInputSchema: z.ZodType<Prisma.BuildOrderCreateWithoutOwnerInput> = z.object({
  id: z.string().optional(),
  type: z.lazy(() => BuildOrderTypeSchema),
  what: z.lazy(() => ShipTypeSchema),
  amount: z.number().int(),
  remainingTime: z.number().int()
}).strict();

export const BuildOrderUncheckedCreateWithoutOwnerInputSchema: z.ZodType<Prisma.BuildOrderUncheckedCreateWithoutOwnerInput> = z.object({
  id: z.string().optional(),
  type: z.lazy(() => BuildOrderTypeSchema),
  what: z.lazy(() => ShipTypeSchema),
  amount: z.number().int(),
  remainingTime: z.number().int()
}).strict();

export const BuildOrderCreateOrConnectWithoutOwnerInputSchema: z.ZodType<Prisma.BuildOrderCreateOrConnectWithoutOwnerInput> = z.object({
  where: z.lazy(() => BuildOrderWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BuildOrderCreateWithoutOwnerInputSchema),z.lazy(() => BuildOrderUncheckedCreateWithoutOwnerInputSchema) ]),
}).strict();

export const BuildOrderCreateManyOwnerInputEnvelopeSchema: z.ZodType<Prisma.BuildOrderCreateManyOwnerInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => BuildOrderCreateManyOwnerInputSchema),z.lazy(() => BuildOrderCreateManyOwnerInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const StationUpsertWithoutOwnerInputSchema: z.ZodType<Prisma.StationUpsertWithoutOwnerInput> = z.object({
  update: z.union([ z.lazy(() => StationUpdateWithoutOwnerInputSchema),z.lazy(() => StationUncheckedUpdateWithoutOwnerInputSchema) ]),
  create: z.union([ z.lazy(() => StationCreateWithoutOwnerInputSchema),z.lazy(() => StationUncheckedCreateWithoutOwnerInputSchema) ]),
  where: z.lazy(() => StationWhereInputSchema).optional()
}).strict();

export const StationUpdateToOneWithWhereWithoutOwnerInputSchema: z.ZodType<Prisma.StationUpdateToOneWithWhereWithoutOwnerInput> = z.object({
  where: z.lazy(() => StationWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => StationUpdateWithoutOwnerInputSchema),z.lazy(() => StationUncheckedUpdateWithoutOwnerInputSchema) ]),
}).strict();

export const StationUpdateWithoutOwnerInputSchema: z.ZodType<Prisma.StationUpdateWithoutOwnerInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  harvesters: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  distribution: z.union([ z.lazy(() => StationUpdatedistributionInputSchema),z.number().int().array() ]).optional(),
  resources: z.lazy(() => ResourceUpdateOneRequiredWithoutStationNestedInputSchema).optional(),
  coordinates: z.lazy(() => CoordinateUpdateOneRequiredWithoutStationNestedInputSchema).optional()
}).strict();

export const StationUncheckedUpdateWithoutOwnerInputSchema: z.ZodType<Prisma.StationUncheckedUpdateWithoutOwnerInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  resourcesId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  coordinatesId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  harvesters: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  distribution: z.union([ z.lazy(() => StationUpdatedistributionInputSchema),z.number().int().array() ]).optional(),
}).strict();

export const FleetUpsertWithWhereUniqueWithoutOwnerInputSchema: z.ZodType<Prisma.FleetUpsertWithWhereUniqueWithoutOwnerInput> = z.object({
  where: z.lazy(() => FleetWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => FleetUpdateWithoutOwnerInputSchema),z.lazy(() => FleetUncheckedUpdateWithoutOwnerInputSchema) ]),
  create: z.union([ z.lazy(() => FleetCreateWithoutOwnerInputSchema),z.lazy(() => FleetUncheckedCreateWithoutOwnerInputSchema) ]),
}).strict();

export const FleetUpdateWithWhereUniqueWithoutOwnerInputSchema: z.ZodType<Prisma.FleetUpdateWithWhereUniqueWithoutOwnerInput> = z.object({
  where: z.lazy(() => FleetWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => FleetUpdateWithoutOwnerInputSchema),z.lazy(() => FleetUncheckedUpdateWithoutOwnerInputSchema) ]),
}).strict();

export const FleetUpdateManyWithWhereWithoutOwnerInputSchema: z.ZodType<Prisma.FleetUpdateManyWithWhereWithoutOwnerInput> = z.object({
  where: z.lazy(() => FleetScalarWhereInputSchema),
  data: z.union([ z.lazy(() => FleetUpdateManyMutationInputSchema),z.lazy(() => FleetUncheckedUpdateManyWithoutOwnerInputSchema) ]),
}).strict();

export const FleetScalarWhereInputSchema: z.ZodType<Prisma.FleetScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FleetScalarWhereInputSchema),z.lazy(() => FleetScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FleetScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FleetScalarWhereInputSchema),z.lazy(() => FleetScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  ownerId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  targetId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  baseFleet: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  resourcesId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  travelTime: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  remainingTime: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  action: z.union([ z.lazy(() => EnumFleetActionTypeNullableFilterSchema),z.lazy(() => FleetActionTypeSchema) ]).optional().nullable(),
  actionTime: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  returning: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
}).strict();

export const FleetUpsertWithWhereUniqueWithoutTargetInputSchema: z.ZodType<Prisma.FleetUpsertWithWhereUniqueWithoutTargetInput> = z.object({
  where: z.lazy(() => FleetWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => FleetUpdateWithoutTargetInputSchema),z.lazy(() => FleetUncheckedUpdateWithoutTargetInputSchema) ]),
  create: z.union([ z.lazy(() => FleetCreateWithoutTargetInputSchema),z.lazy(() => FleetUncheckedCreateWithoutTargetInputSchema) ]),
}).strict();

export const FleetUpdateWithWhereUniqueWithoutTargetInputSchema: z.ZodType<Prisma.FleetUpdateWithWhereUniqueWithoutTargetInput> = z.object({
  where: z.lazy(() => FleetWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => FleetUpdateWithoutTargetInputSchema),z.lazy(() => FleetUncheckedUpdateWithoutTargetInputSchema) ]),
}).strict();

export const FleetUpdateManyWithWhereWithoutTargetInputSchema: z.ZodType<Prisma.FleetUpdateManyWithWhereWithoutTargetInput> = z.object({
  where: z.lazy(() => FleetScalarWhereInputSchema),
  data: z.union([ z.lazy(() => FleetUpdateManyMutationInputSchema),z.lazy(() => FleetUncheckedUpdateManyWithoutTargetInputSchema) ]),
}).strict();

export const BuildOrderUpsertWithWhereUniqueWithoutOwnerInputSchema: z.ZodType<Prisma.BuildOrderUpsertWithWhereUniqueWithoutOwnerInput> = z.object({
  where: z.lazy(() => BuildOrderWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => BuildOrderUpdateWithoutOwnerInputSchema),z.lazy(() => BuildOrderUncheckedUpdateWithoutOwnerInputSchema) ]),
  create: z.union([ z.lazy(() => BuildOrderCreateWithoutOwnerInputSchema),z.lazy(() => BuildOrderUncheckedCreateWithoutOwnerInputSchema) ]),
}).strict();

export const BuildOrderUpdateWithWhereUniqueWithoutOwnerInputSchema: z.ZodType<Prisma.BuildOrderUpdateWithWhereUniqueWithoutOwnerInput> = z.object({
  where: z.lazy(() => BuildOrderWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => BuildOrderUpdateWithoutOwnerInputSchema),z.lazy(() => BuildOrderUncheckedUpdateWithoutOwnerInputSchema) ]),
}).strict();

export const BuildOrderUpdateManyWithWhereWithoutOwnerInputSchema: z.ZodType<Prisma.BuildOrderUpdateManyWithWhereWithoutOwnerInput> = z.object({
  where: z.lazy(() => BuildOrderScalarWhereInputSchema),
  data: z.union([ z.lazy(() => BuildOrderUpdateManyMutationInputSchema),z.lazy(() => BuildOrderUncheckedUpdateManyWithoutOwnerInputSchema) ]),
}).strict();

export const BuildOrderScalarWhereInputSchema: z.ZodType<Prisma.BuildOrderScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => BuildOrderScalarWhereInputSchema),z.lazy(() => BuildOrderScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BuildOrderScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BuildOrderScalarWhereInputSchema),z.lazy(() => BuildOrderScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  ownerId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumBuildOrderTypeFilterSchema),z.lazy(() => BuildOrderTypeSchema) ]).optional(),
  what: z.union([ z.lazy(() => EnumShipTypeFilterSchema),z.lazy(() => ShipTypeSchema) ]).optional(),
  amount: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  remainingTime: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const UserCreateWithoutStationInputSchema: z.ZodType<Prisma.UserCreateWithoutStationInput> = z.object({
  id: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  email: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  name: z.string(),
  fleets: z.lazy(() => FleetCreateNestedManyWithoutOwnerInputSchema).optional(),
  incomingFleets: z.lazy(() => FleetCreateNestedManyWithoutTargetInputSchema).optional(),
  buildOrders: z.lazy(() => BuildOrderCreateNestedManyWithoutOwnerInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutStationInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutStationInput> = z.object({
  id: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  email: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  name: z.string(),
  fleets: z.lazy(() => FleetUncheckedCreateNestedManyWithoutOwnerInputSchema).optional(),
  incomingFleets: z.lazy(() => FleetUncheckedCreateNestedManyWithoutTargetInputSchema).optional(),
  buildOrders: z.lazy(() => BuildOrderUncheckedCreateNestedManyWithoutOwnerInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutStationInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutStationInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutStationInputSchema),z.lazy(() => UserUncheckedCreateWithoutStationInputSchema) ]),
}).strict();

export const ResourceCreateWithoutStationInputSchema: z.ZodType<Prisma.ResourceCreateWithoutStationInput> = z.object({
  id: z.string().optional(),
  aluminium: z.number().int().optional(),
  steel: z.number().int().optional(),
  plutonium: z.number().int().optional(),
  fleet: z.lazy(() => FleetCreateNestedOneWithoutResourcesInputSchema).optional()
}).strict();

export const ResourceUncheckedCreateWithoutStationInputSchema: z.ZodType<Prisma.ResourceUncheckedCreateWithoutStationInput> = z.object({
  id: z.string().optional(),
  aluminium: z.number().int().optional(),
  steel: z.number().int().optional(),
  plutonium: z.number().int().optional(),
  fleet: z.lazy(() => FleetUncheckedCreateNestedOneWithoutResourcesInputSchema).optional()
}).strict();

export const ResourceCreateOrConnectWithoutStationInputSchema: z.ZodType<Prisma.ResourceCreateOrConnectWithoutStationInput> = z.object({
  where: z.lazy(() => ResourceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ResourceCreateWithoutStationInputSchema),z.lazy(() => ResourceUncheckedCreateWithoutStationInputSchema) ]),
}).strict();

export const CoordinateCreateWithoutStationInputSchema: z.ZodType<Prisma.CoordinateCreateWithoutStationInput> = z.object({
  id: z.string().optional(),
  x: z.number().int(),
  y: z.number().int(),
  resourceNode: z.lazy(() => ResourceNodeCreateNestedOneWithoutCoordinatesInputSchema).optional()
}).strict();

export const CoordinateUncheckedCreateWithoutStationInputSchema: z.ZodType<Prisma.CoordinateUncheckedCreateWithoutStationInput> = z.object({
  id: z.string().optional(),
  x: z.number().int(),
  y: z.number().int(),
  resourceNode: z.lazy(() => ResourceNodeUncheckedCreateNestedOneWithoutCoordinatesInputSchema).optional()
}).strict();

export const CoordinateCreateOrConnectWithoutStationInputSchema: z.ZodType<Prisma.CoordinateCreateOrConnectWithoutStationInput> = z.object({
  where: z.lazy(() => CoordinateWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CoordinateCreateWithoutStationInputSchema),z.lazy(() => CoordinateUncheckedCreateWithoutStationInputSchema) ]),
}).strict();

export const UserUpsertWithoutStationInputSchema: z.ZodType<Prisma.UserUpsertWithoutStationInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutStationInputSchema),z.lazy(() => UserUncheckedUpdateWithoutStationInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutStationInputSchema),z.lazy(() => UserUncheckedCreateWithoutStationInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutStationInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutStationInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutStationInputSchema),z.lazy(() => UserUncheckedUpdateWithoutStationInputSchema) ]),
}).strict();

export const UserUpdateWithoutStationInputSchema: z.ZodType<Prisma.UserUpdateWithoutStationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fleets: z.lazy(() => FleetUpdateManyWithoutOwnerNestedInputSchema).optional(),
  incomingFleets: z.lazy(() => FleetUpdateManyWithoutTargetNestedInputSchema).optional(),
  buildOrders: z.lazy(() => BuildOrderUpdateManyWithoutOwnerNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutStationInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutStationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fleets: z.lazy(() => FleetUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional(),
  incomingFleets: z.lazy(() => FleetUncheckedUpdateManyWithoutTargetNestedInputSchema).optional(),
  buildOrders: z.lazy(() => BuildOrderUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional()
}).strict();

export const ResourceUpsertWithoutStationInputSchema: z.ZodType<Prisma.ResourceUpsertWithoutStationInput> = z.object({
  update: z.union([ z.lazy(() => ResourceUpdateWithoutStationInputSchema),z.lazy(() => ResourceUncheckedUpdateWithoutStationInputSchema) ]),
  create: z.union([ z.lazy(() => ResourceCreateWithoutStationInputSchema),z.lazy(() => ResourceUncheckedCreateWithoutStationInputSchema) ]),
  where: z.lazy(() => ResourceWhereInputSchema).optional()
}).strict();

export const ResourceUpdateToOneWithWhereWithoutStationInputSchema: z.ZodType<Prisma.ResourceUpdateToOneWithWhereWithoutStationInput> = z.object({
  where: z.lazy(() => ResourceWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ResourceUpdateWithoutStationInputSchema),z.lazy(() => ResourceUncheckedUpdateWithoutStationInputSchema) ]),
}).strict();

export const ResourceUpdateWithoutStationInputSchema: z.ZodType<Prisma.ResourceUpdateWithoutStationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  aluminium: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  steel: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  plutonium: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  fleet: z.lazy(() => FleetUpdateOneWithoutResourcesNestedInputSchema).optional()
}).strict();

export const ResourceUncheckedUpdateWithoutStationInputSchema: z.ZodType<Prisma.ResourceUncheckedUpdateWithoutStationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  aluminium: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  steel: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  plutonium: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  fleet: z.lazy(() => FleetUncheckedUpdateOneWithoutResourcesNestedInputSchema).optional()
}).strict();

export const CoordinateUpsertWithoutStationInputSchema: z.ZodType<Prisma.CoordinateUpsertWithoutStationInput> = z.object({
  update: z.union([ z.lazy(() => CoordinateUpdateWithoutStationInputSchema),z.lazy(() => CoordinateUncheckedUpdateWithoutStationInputSchema) ]),
  create: z.union([ z.lazy(() => CoordinateCreateWithoutStationInputSchema),z.lazy(() => CoordinateUncheckedCreateWithoutStationInputSchema) ]),
  where: z.lazy(() => CoordinateWhereInputSchema).optional()
}).strict();

export const CoordinateUpdateToOneWithWhereWithoutStationInputSchema: z.ZodType<Prisma.CoordinateUpdateToOneWithWhereWithoutStationInput> = z.object({
  where: z.lazy(() => CoordinateWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CoordinateUpdateWithoutStationInputSchema),z.lazy(() => CoordinateUncheckedUpdateWithoutStationInputSchema) ]),
}).strict();

export const CoordinateUpdateWithoutStationInputSchema: z.ZodType<Prisma.CoordinateUpdateWithoutStationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  x: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  y: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  resourceNode: z.lazy(() => ResourceNodeUpdateOneWithoutCoordinatesNestedInputSchema).optional()
}).strict();

export const CoordinateUncheckedUpdateWithoutStationInputSchema: z.ZodType<Prisma.CoordinateUncheckedUpdateWithoutStationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  x: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  y: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  resourceNode: z.lazy(() => ResourceNodeUncheckedUpdateOneWithoutCoordinatesNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutFleetsInputSchema: z.ZodType<Prisma.UserCreateWithoutFleetsInput> = z.object({
  id: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  email: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  name: z.string(),
  station: z.lazy(() => StationCreateNestedOneWithoutOwnerInputSchema).optional(),
  incomingFleets: z.lazy(() => FleetCreateNestedManyWithoutTargetInputSchema).optional(),
  buildOrders: z.lazy(() => BuildOrderCreateNestedManyWithoutOwnerInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutFleetsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutFleetsInput> = z.object({
  id: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  email: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  name: z.string(),
  station: z.lazy(() => StationUncheckedCreateNestedOneWithoutOwnerInputSchema).optional(),
  incomingFleets: z.lazy(() => FleetUncheckedCreateNestedManyWithoutTargetInputSchema).optional(),
  buildOrders: z.lazy(() => BuildOrderUncheckedCreateNestedManyWithoutOwnerInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutFleetsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutFleetsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutFleetsInputSchema),z.lazy(() => UserUncheckedCreateWithoutFleetsInputSchema) ]),
}).strict();

export const UserCreateWithoutIncomingFleetsInputSchema: z.ZodType<Prisma.UserCreateWithoutIncomingFleetsInput> = z.object({
  id: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  email: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  name: z.string(),
  station: z.lazy(() => StationCreateNestedOneWithoutOwnerInputSchema).optional(),
  fleets: z.lazy(() => FleetCreateNestedManyWithoutOwnerInputSchema).optional(),
  buildOrders: z.lazy(() => BuildOrderCreateNestedManyWithoutOwnerInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutIncomingFleetsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutIncomingFleetsInput> = z.object({
  id: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  email: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  name: z.string(),
  station: z.lazy(() => StationUncheckedCreateNestedOneWithoutOwnerInputSchema).optional(),
  fleets: z.lazy(() => FleetUncheckedCreateNestedManyWithoutOwnerInputSchema).optional(),
  buildOrders: z.lazy(() => BuildOrderUncheckedCreateNestedManyWithoutOwnerInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutIncomingFleetsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutIncomingFleetsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutIncomingFleetsInputSchema),z.lazy(() => UserUncheckedCreateWithoutIncomingFleetsInputSchema) ]),
}).strict();

export const ShipGroupCreateWithoutFleetInputSchema: z.ZodType<Prisma.ShipGroupCreateWithoutFleetInput> = z.object({
  id: z.string().optional(),
  type: z.lazy(() => ShipTypeSchema),
  amount: z.number().int()
}).strict();

export const ShipGroupUncheckedCreateWithoutFleetInputSchema: z.ZodType<Prisma.ShipGroupUncheckedCreateWithoutFleetInput> = z.object({
  id: z.string().optional(),
  type: z.lazy(() => ShipTypeSchema),
  amount: z.number().int()
}).strict();

export const ShipGroupCreateOrConnectWithoutFleetInputSchema: z.ZodType<Prisma.ShipGroupCreateOrConnectWithoutFleetInput> = z.object({
  where: z.lazy(() => ShipGroupWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ShipGroupCreateWithoutFleetInputSchema),z.lazy(() => ShipGroupUncheckedCreateWithoutFleetInputSchema) ]),
}).strict();

export const ShipGroupCreateManyFleetInputEnvelopeSchema: z.ZodType<Prisma.ShipGroupCreateManyFleetInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ShipGroupCreateManyFleetInputSchema),z.lazy(() => ShipGroupCreateManyFleetInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ResourceCreateWithoutFleetInputSchema: z.ZodType<Prisma.ResourceCreateWithoutFleetInput> = z.object({
  id: z.string().optional(),
  aluminium: z.number().int().optional(),
  steel: z.number().int().optional(),
  plutonium: z.number().int().optional(),
  station: z.lazy(() => StationCreateNestedOneWithoutResourcesInputSchema).optional()
}).strict();

export const ResourceUncheckedCreateWithoutFleetInputSchema: z.ZodType<Prisma.ResourceUncheckedCreateWithoutFleetInput> = z.object({
  id: z.string().optional(),
  aluminium: z.number().int().optional(),
  steel: z.number().int().optional(),
  plutonium: z.number().int().optional(),
  station: z.lazy(() => StationUncheckedCreateNestedOneWithoutResourcesInputSchema).optional()
}).strict();

export const ResourceCreateOrConnectWithoutFleetInputSchema: z.ZodType<Prisma.ResourceCreateOrConnectWithoutFleetInput> = z.object({
  where: z.lazy(() => ResourceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ResourceCreateWithoutFleetInputSchema),z.lazy(() => ResourceUncheckedCreateWithoutFleetInputSchema) ]),
}).strict();

export const UserUpsertWithoutFleetsInputSchema: z.ZodType<Prisma.UserUpsertWithoutFleetsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutFleetsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutFleetsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutFleetsInputSchema),z.lazy(() => UserUncheckedCreateWithoutFleetsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutFleetsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutFleetsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutFleetsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutFleetsInputSchema) ]),
}).strict();

export const UserUpdateWithoutFleetsInputSchema: z.ZodType<Prisma.UserUpdateWithoutFleetsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  station: z.lazy(() => StationUpdateOneWithoutOwnerNestedInputSchema).optional(),
  incomingFleets: z.lazy(() => FleetUpdateManyWithoutTargetNestedInputSchema).optional(),
  buildOrders: z.lazy(() => BuildOrderUpdateManyWithoutOwnerNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutFleetsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutFleetsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  station: z.lazy(() => StationUncheckedUpdateOneWithoutOwnerNestedInputSchema).optional(),
  incomingFleets: z.lazy(() => FleetUncheckedUpdateManyWithoutTargetNestedInputSchema).optional(),
  buildOrders: z.lazy(() => BuildOrderUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional()
}).strict();

export const UserUpsertWithoutIncomingFleetsInputSchema: z.ZodType<Prisma.UserUpsertWithoutIncomingFleetsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutIncomingFleetsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutIncomingFleetsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutIncomingFleetsInputSchema),z.lazy(() => UserUncheckedCreateWithoutIncomingFleetsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutIncomingFleetsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutIncomingFleetsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutIncomingFleetsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutIncomingFleetsInputSchema) ]),
}).strict();

export const UserUpdateWithoutIncomingFleetsInputSchema: z.ZodType<Prisma.UserUpdateWithoutIncomingFleetsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  station: z.lazy(() => StationUpdateOneWithoutOwnerNestedInputSchema).optional(),
  fleets: z.lazy(() => FleetUpdateManyWithoutOwnerNestedInputSchema).optional(),
  buildOrders: z.lazy(() => BuildOrderUpdateManyWithoutOwnerNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutIncomingFleetsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutIncomingFleetsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  station: z.lazy(() => StationUncheckedUpdateOneWithoutOwnerNestedInputSchema).optional(),
  fleets: z.lazy(() => FleetUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional(),
  buildOrders: z.lazy(() => BuildOrderUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional()
}).strict();

export const ShipGroupUpsertWithWhereUniqueWithoutFleetInputSchema: z.ZodType<Prisma.ShipGroupUpsertWithWhereUniqueWithoutFleetInput> = z.object({
  where: z.lazy(() => ShipGroupWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ShipGroupUpdateWithoutFleetInputSchema),z.lazy(() => ShipGroupUncheckedUpdateWithoutFleetInputSchema) ]),
  create: z.union([ z.lazy(() => ShipGroupCreateWithoutFleetInputSchema),z.lazy(() => ShipGroupUncheckedCreateWithoutFleetInputSchema) ]),
}).strict();

export const ShipGroupUpdateWithWhereUniqueWithoutFleetInputSchema: z.ZodType<Prisma.ShipGroupUpdateWithWhereUniqueWithoutFleetInput> = z.object({
  where: z.lazy(() => ShipGroupWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ShipGroupUpdateWithoutFleetInputSchema),z.lazy(() => ShipGroupUncheckedUpdateWithoutFleetInputSchema) ]),
}).strict();

export const ShipGroupUpdateManyWithWhereWithoutFleetInputSchema: z.ZodType<Prisma.ShipGroupUpdateManyWithWhereWithoutFleetInput> = z.object({
  where: z.lazy(() => ShipGroupScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ShipGroupUpdateManyMutationInputSchema),z.lazy(() => ShipGroupUncheckedUpdateManyWithoutFleetInputSchema) ]),
}).strict();

export const ShipGroupScalarWhereInputSchema: z.ZodType<Prisma.ShipGroupScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ShipGroupScalarWhereInputSchema),z.lazy(() => ShipGroupScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ShipGroupScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ShipGroupScalarWhereInputSchema),z.lazy(() => ShipGroupScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  fleetId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumShipTypeFilterSchema),z.lazy(() => ShipTypeSchema) ]).optional(),
  amount: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const ResourceUpsertWithoutFleetInputSchema: z.ZodType<Prisma.ResourceUpsertWithoutFleetInput> = z.object({
  update: z.union([ z.lazy(() => ResourceUpdateWithoutFleetInputSchema),z.lazy(() => ResourceUncheckedUpdateWithoutFleetInputSchema) ]),
  create: z.union([ z.lazy(() => ResourceCreateWithoutFleetInputSchema),z.lazy(() => ResourceUncheckedCreateWithoutFleetInputSchema) ]),
  where: z.lazy(() => ResourceWhereInputSchema).optional()
}).strict();

export const ResourceUpdateToOneWithWhereWithoutFleetInputSchema: z.ZodType<Prisma.ResourceUpdateToOneWithWhereWithoutFleetInput> = z.object({
  where: z.lazy(() => ResourceWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ResourceUpdateWithoutFleetInputSchema),z.lazy(() => ResourceUncheckedUpdateWithoutFleetInputSchema) ]),
}).strict();

export const ResourceUpdateWithoutFleetInputSchema: z.ZodType<Prisma.ResourceUpdateWithoutFleetInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  aluminium: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  steel: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  plutonium: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  station: z.lazy(() => StationUpdateOneWithoutResourcesNestedInputSchema).optional()
}).strict();

export const ResourceUncheckedUpdateWithoutFleetInputSchema: z.ZodType<Prisma.ResourceUncheckedUpdateWithoutFleetInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  aluminium: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  steel: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  plutonium: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  station: z.lazy(() => StationUncheckedUpdateOneWithoutResourcesNestedInputSchema).optional()
}).strict();

export const FleetCreateWithoutShipsInputSchema: z.ZodType<Prisma.FleetCreateWithoutShipsInput> = z.object({
  id: z.string().optional(),
  baseFleet: z.boolean().optional(),
  travelTime: z.number().int().optional().nullable(),
  remainingTime: z.number().int().optional().nullable(),
  action: z.lazy(() => FleetActionTypeSchema).optional().nullable(),
  actionTime: z.number().int().optional().nullable(),
  returning: z.boolean().optional().nullable(),
  owner: z.lazy(() => UserCreateNestedOneWithoutFleetsInputSchema),
  target: z.lazy(() => UserCreateNestedOneWithoutIncomingFleetsInputSchema).optional(),
  resources: z.lazy(() => ResourceCreateNestedOneWithoutFleetInputSchema)
}).strict();

export const FleetUncheckedCreateWithoutShipsInputSchema: z.ZodType<Prisma.FleetUncheckedCreateWithoutShipsInput> = z.object({
  id: z.string().optional(),
  ownerId: z.string(),
  targetId: z.string().optional().nullable(),
  baseFleet: z.boolean().optional(),
  resourcesId: z.string(),
  travelTime: z.number().int().optional().nullable(),
  remainingTime: z.number().int().optional().nullable(),
  action: z.lazy(() => FleetActionTypeSchema).optional().nullable(),
  actionTime: z.number().int().optional().nullable(),
  returning: z.boolean().optional().nullable()
}).strict();

export const FleetCreateOrConnectWithoutShipsInputSchema: z.ZodType<Prisma.FleetCreateOrConnectWithoutShipsInput> = z.object({
  where: z.lazy(() => FleetWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FleetCreateWithoutShipsInputSchema),z.lazy(() => FleetUncheckedCreateWithoutShipsInputSchema) ]),
}).strict();

export const FleetUpsertWithoutShipsInputSchema: z.ZodType<Prisma.FleetUpsertWithoutShipsInput> = z.object({
  update: z.union([ z.lazy(() => FleetUpdateWithoutShipsInputSchema),z.lazy(() => FleetUncheckedUpdateWithoutShipsInputSchema) ]),
  create: z.union([ z.lazy(() => FleetCreateWithoutShipsInputSchema),z.lazy(() => FleetUncheckedCreateWithoutShipsInputSchema) ]),
  where: z.lazy(() => FleetWhereInputSchema).optional()
}).strict();

export const FleetUpdateToOneWithWhereWithoutShipsInputSchema: z.ZodType<Prisma.FleetUpdateToOneWithWhereWithoutShipsInput> = z.object({
  where: z.lazy(() => FleetWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => FleetUpdateWithoutShipsInputSchema),z.lazy(() => FleetUncheckedUpdateWithoutShipsInputSchema) ]),
}).strict();

export const FleetUpdateWithoutShipsInputSchema: z.ZodType<Prisma.FleetUpdateWithoutShipsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  baseFleet: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  travelTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  remainingTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  action: z.union([ z.lazy(() => FleetActionTypeSchema),z.lazy(() => NullableEnumFleetActionTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actionTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  returning: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  owner: z.lazy(() => UserUpdateOneRequiredWithoutFleetsNestedInputSchema).optional(),
  target: z.lazy(() => UserUpdateOneWithoutIncomingFleetsNestedInputSchema).optional(),
  resources: z.lazy(() => ResourceUpdateOneRequiredWithoutFleetNestedInputSchema).optional()
}).strict();

export const FleetUncheckedUpdateWithoutShipsInputSchema: z.ZodType<Prisma.FleetUncheckedUpdateWithoutShipsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  targetId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  baseFleet: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  resourcesId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  travelTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  remainingTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  action: z.union([ z.lazy(() => FleetActionTypeSchema),z.lazy(() => NullableEnumFleetActionTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actionTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  returning: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const StationCreateWithoutResourcesInputSchema: z.ZodType<Prisma.StationCreateWithoutResourcesInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  harvesters: z.number().int().optional(),
  distribution: z.union([ z.lazy(() => StationCreatedistributionInputSchema),z.number().int().array() ]).optional(),
  owner: z.lazy(() => UserCreateNestedOneWithoutStationInputSchema),
  coordinates: z.lazy(() => CoordinateCreateNestedOneWithoutStationInputSchema)
}).strict();

export const StationUncheckedCreateWithoutResourcesInputSchema: z.ZodType<Prisma.StationUncheckedCreateWithoutResourcesInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  ownerId: z.string(),
  coordinatesId: z.string(),
  harvesters: z.number().int().optional(),
  distribution: z.union([ z.lazy(() => StationCreatedistributionInputSchema),z.number().int().array() ]).optional(),
}).strict();

export const StationCreateOrConnectWithoutResourcesInputSchema: z.ZodType<Prisma.StationCreateOrConnectWithoutResourcesInput> = z.object({
  where: z.lazy(() => StationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => StationCreateWithoutResourcesInputSchema),z.lazy(() => StationUncheckedCreateWithoutResourcesInputSchema) ]),
}).strict();

export const FleetCreateWithoutResourcesInputSchema: z.ZodType<Prisma.FleetCreateWithoutResourcesInput> = z.object({
  id: z.string().optional(),
  baseFleet: z.boolean().optional(),
  travelTime: z.number().int().optional().nullable(),
  remainingTime: z.number().int().optional().nullable(),
  action: z.lazy(() => FleetActionTypeSchema).optional().nullable(),
  actionTime: z.number().int().optional().nullable(),
  returning: z.boolean().optional().nullable(),
  owner: z.lazy(() => UserCreateNestedOneWithoutFleetsInputSchema),
  target: z.lazy(() => UserCreateNestedOneWithoutIncomingFleetsInputSchema).optional(),
  ships: z.lazy(() => ShipGroupCreateNestedManyWithoutFleetInputSchema).optional()
}).strict();

export const FleetUncheckedCreateWithoutResourcesInputSchema: z.ZodType<Prisma.FleetUncheckedCreateWithoutResourcesInput> = z.object({
  id: z.string().optional(),
  ownerId: z.string(),
  targetId: z.string().optional().nullable(),
  baseFleet: z.boolean().optional(),
  travelTime: z.number().int().optional().nullable(),
  remainingTime: z.number().int().optional().nullable(),
  action: z.lazy(() => FleetActionTypeSchema).optional().nullable(),
  actionTime: z.number().int().optional().nullable(),
  returning: z.boolean().optional().nullable(),
  ships: z.lazy(() => ShipGroupUncheckedCreateNestedManyWithoutFleetInputSchema).optional()
}).strict();

export const FleetCreateOrConnectWithoutResourcesInputSchema: z.ZodType<Prisma.FleetCreateOrConnectWithoutResourcesInput> = z.object({
  where: z.lazy(() => FleetWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FleetCreateWithoutResourcesInputSchema),z.lazy(() => FleetUncheckedCreateWithoutResourcesInputSchema) ]),
}).strict();

export const StationUpsertWithoutResourcesInputSchema: z.ZodType<Prisma.StationUpsertWithoutResourcesInput> = z.object({
  update: z.union([ z.lazy(() => StationUpdateWithoutResourcesInputSchema),z.lazy(() => StationUncheckedUpdateWithoutResourcesInputSchema) ]),
  create: z.union([ z.lazy(() => StationCreateWithoutResourcesInputSchema),z.lazy(() => StationUncheckedCreateWithoutResourcesInputSchema) ]),
  where: z.lazy(() => StationWhereInputSchema).optional()
}).strict();

export const StationUpdateToOneWithWhereWithoutResourcesInputSchema: z.ZodType<Prisma.StationUpdateToOneWithWhereWithoutResourcesInput> = z.object({
  where: z.lazy(() => StationWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => StationUpdateWithoutResourcesInputSchema),z.lazy(() => StationUncheckedUpdateWithoutResourcesInputSchema) ]),
}).strict();

export const StationUpdateWithoutResourcesInputSchema: z.ZodType<Prisma.StationUpdateWithoutResourcesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  harvesters: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  distribution: z.union([ z.lazy(() => StationUpdatedistributionInputSchema),z.number().int().array() ]).optional(),
  owner: z.lazy(() => UserUpdateOneRequiredWithoutStationNestedInputSchema).optional(),
  coordinates: z.lazy(() => CoordinateUpdateOneRequiredWithoutStationNestedInputSchema).optional()
}).strict();

export const StationUncheckedUpdateWithoutResourcesInputSchema: z.ZodType<Prisma.StationUncheckedUpdateWithoutResourcesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  coordinatesId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  harvesters: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  distribution: z.union([ z.lazy(() => StationUpdatedistributionInputSchema),z.number().int().array() ]).optional(),
}).strict();

export const FleetUpsertWithoutResourcesInputSchema: z.ZodType<Prisma.FleetUpsertWithoutResourcesInput> = z.object({
  update: z.union([ z.lazy(() => FleetUpdateWithoutResourcesInputSchema),z.lazy(() => FleetUncheckedUpdateWithoutResourcesInputSchema) ]),
  create: z.union([ z.lazy(() => FleetCreateWithoutResourcesInputSchema),z.lazy(() => FleetUncheckedCreateWithoutResourcesInputSchema) ]),
  where: z.lazy(() => FleetWhereInputSchema).optional()
}).strict();

export const FleetUpdateToOneWithWhereWithoutResourcesInputSchema: z.ZodType<Prisma.FleetUpdateToOneWithWhereWithoutResourcesInput> = z.object({
  where: z.lazy(() => FleetWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => FleetUpdateWithoutResourcesInputSchema),z.lazy(() => FleetUncheckedUpdateWithoutResourcesInputSchema) ]),
}).strict();

export const FleetUpdateWithoutResourcesInputSchema: z.ZodType<Prisma.FleetUpdateWithoutResourcesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  baseFleet: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  travelTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  remainingTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  action: z.union([ z.lazy(() => FleetActionTypeSchema),z.lazy(() => NullableEnumFleetActionTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actionTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  returning: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  owner: z.lazy(() => UserUpdateOneRequiredWithoutFleetsNestedInputSchema).optional(),
  target: z.lazy(() => UserUpdateOneWithoutIncomingFleetsNestedInputSchema).optional(),
  ships: z.lazy(() => ShipGroupUpdateManyWithoutFleetNestedInputSchema).optional()
}).strict();

export const FleetUncheckedUpdateWithoutResourcesInputSchema: z.ZodType<Prisma.FleetUncheckedUpdateWithoutResourcesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  targetId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  baseFleet: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  travelTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  remainingTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  action: z.union([ z.lazy(() => FleetActionTypeSchema),z.lazy(() => NullableEnumFleetActionTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actionTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  returning: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ships: z.lazy(() => ShipGroupUncheckedUpdateManyWithoutFleetNestedInputSchema).optional()
}).strict();

export const CoordinateCreateWithoutResourceNodeInputSchema: z.ZodType<Prisma.CoordinateCreateWithoutResourceNodeInput> = z.object({
  id: z.string().optional(),
  x: z.number().int(),
  y: z.number().int(),
  station: z.lazy(() => StationCreateNestedOneWithoutCoordinatesInputSchema).optional()
}).strict();

export const CoordinateUncheckedCreateWithoutResourceNodeInputSchema: z.ZodType<Prisma.CoordinateUncheckedCreateWithoutResourceNodeInput> = z.object({
  id: z.string().optional(),
  x: z.number().int(),
  y: z.number().int(),
  station: z.lazy(() => StationUncheckedCreateNestedOneWithoutCoordinatesInputSchema).optional()
}).strict();

export const CoordinateCreateOrConnectWithoutResourceNodeInputSchema: z.ZodType<Prisma.CoordinateCreateOrConnectWithoutResourceNodeInput> = z.object({
  where: z.lazy(() => CoordinateWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CoordinateCreateWithoutResourceNodeInputSchema),z.lazy(() => CoordinateUncheckedCreateWithoutResourceNodeInputSchema) ]),
}).strict();

export const CoordinateUpsertWithoutResourceNodeInputSchema: z.ZodType<Prisma.CoordinateUpsertWithoutResourceNodeInput> = z.object({
  update: z.union([ z.lazy(() => CoordinateUpdateWithoutResourceNodeInputSchema),z.lazy(() => CoordinateUncheckedUpdateWithoutResourceNodeInputSchema) ]),
  create: z.union([ z.lazy(() => CoordinateCreateWithoutResourceNodeInputSchema),z.lazy(() => CoordinateUncheckedCreateWithoutResourceNodeInputSchema) ]),
  where: z.lazy(() => CoordinateWhereInputSchema).optional()
}).strict();

export const CoordinateUpdateToOneWithWhereWithoutResourceNodeInputSchema: z.ZodType<Prisma.CoordinateUpdateToOneWithWhereWithoutResourceNodeInput> = z.object({
  where: z.lazy(() => CoordinateWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CoordinateUpdateWithoutResourceNodeInputSchema),z.lazy(() => CoordinateUncheckedUpdateWithoutResourceNodeInputSchema) ]),
}).strict();

export const CoordinateUpdateWithoutResourceNodeInputSchema: z.ZodType<Prisma.CoordinateUpdateWithoutResourceNodeInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  x: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  y: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  station: z.lazy(() => StationUpdateOneWithoutCoordinatesNestedInputSchema).optional()
}).strict();

export const CoordinateUncheckedUpdateWithoutResourceNodeInputSchema: z.ZodType<Prisma.CoordinateUncheckedUpdateWithoutResourceNodeInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  x: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  y: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  station: z.lazy(() => StationUncheckedUpdateOneWithoutCoordinatesNestedInputSchema).optional()
}).strict();

export const StationCreateWithoutCoordinatesInputSchema: z.ZodType<Prisma.StationCreateWithoutCoordinatesInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  harvesters: z.number().int().optional(),
  distribution: z.union([ z.lazy(() => StationCreatedistributionInputSchema),z.number().int().array() ]).optional(),
  owner: z.lazy(() => UserCreateNestedOneWithoutStationInputSchema),
  resources: z.lazy(() => ResourceCreateNestedOneWithoutStationInputSchema)
}).strict();

export const StationUncheckedCreateWithoutCoordinatesInputSchema: z.ZodType<Prisma.StationUncheckedCreateWithoutCoordinatesInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  ownerId: z.string(),
  resourcesId: z.string(),
  harvesters: z.number().int().optional(),
  distribution: z.union([ z.lazy(() => StationCreatedistributionInputSchema),z.number().int().array() ]).optional(),
}).strict();

export const StationCreateOrConnectWithoutCoordinatesInputSchema: z.ZodType<Prisma.StationCreateOrConnectWithoutCoordinatesInput> = z.object({
  where: z.lazy(() => StationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => StationCreateWithoutCoordinatesInputSchema),z.lazy(() => StationUncheckedCreateWithoutCoordinatesInputSchema) ]),
}).strict();

export const ResourceNodeCreateWithoutCoordinatesInputSchema: z.ZodType<Prisma.ResourceNodeCreateWithoutCoordinatesInput> = z.object({
  id: z.string().optional(),
  type: z.lazy(() => ResourceTypeSchema)
}).strict();

export const ResourceNodeUncheckedCreateWithoutCoordinatesInputSchema: z.ZodType<Prisma.ResourceNodeUncheckedCreateWithoutCoordinatesInput> = z.object({
  id: z.string().optional(),
  type: z.lazy(() => ResourceTypeSchema)
}).strict();

export const ResourceNodeCreateOrConnectWithoutCoordinatesInputSchema: z.ZodType<Prisma.ResourceNodeCreateOrConnectWithoutCoordinatesInput> = z.object({
  where: z.lazy(() => ResourceNodeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ResourceNodeCreateWithoutCoordinatesInputSchema),z.lazy(() => ResourceNodeUncheckedCreateWithoutCoordinatesInputSchema) ]),
}).strict();

export const StationUpsertWithoutCoordinatesInputSchema: z.ZodType<Prisma.StationUpsertWithoutCoordinatesInput> = z.object({
  update: z.union([ z.lazy(() => StationUpdateWithoutCoordinatesInputSchema),z.lazy(() => StationUncheckedUpdateWithoutCoordinatesInputSchema) ]),
  create: z.union([ z.lazy(() => StationCreateWithoutCoordinatesInputSchema),z.lazy(() => StationUncheckedCreateWithoutCoordinatesInputSchema) ]),
  where: z.lazy(() => StationWhereInputSchema).optional()
}).strict();

export const StationUpdateToOneWithWhereWithoutCoordinatesInputSchema: z.ZodType<Prisma.StationUpdateToOneWithWhereWithoutCoordinatesInput> = z.object({
  where: z.lazy(() => StationWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => StationUpdateWithoutCoordinatesInputSchema),z.lazy(() => StationUncheckedUpdateWithoutCoordinatesInputSchema) ]),
}).strict();

export const StationUpdateWithoutCoordinatesInputSchema: z.ZodType<Prisma.StationUpdateWithoutCoordinatesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  harvesters: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  distribution: z.union([ z.lazy(() => StationUpdatedistributionInputSchema),z.number().int().array() ]).optional(),
  owner: z.lazy(() => UserUpdateOneRequiredWithoutStationNestedInputSchema).optional(),
  resources: z.lazy(() => ResourceUpdateOneRequiredWithoutStationNestedInputSchema).optional()
}).strict();

export const StationUncheckedUpdateWithoutCoordinatesInputSchema: z.ZodType<Prisma.StationUncheckedUpdateWithoutCoordinatesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  resourcesId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  harvesters: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  distribution: z.union([ z.lazy(() => StationUpdatedistributionInputSchema),z.number().int().array() ]).optional(),
}).strict();

export const ResourceNodeUpsertWithoutCoordinatesInputSchema: z.ZodType<Prisma.ResourceNodeUpsertWithoutCoordinatesInput> = z.object({
  update: z.union([ z.lazy(() => ResourceNodeUpdateWithoutCoordinatesInputSchema),z.lazy(() => ResourceNodeUncheckedUpdateWithoutCoordinatesInputSchema) ]),
  create: z.union([ z.lazy(() => ResourceNodeCreateWithoutCoordinatesInputSchema),z.lazy(() => ResourceNodeUncheckedCreateWithoutCoordinatesInputSchema) ]),
  where: z.lazy(() => ResourceNodeWhereInputSchema).optional()
}).strict();

export const ResourceNodeUpdateToOneWithWhereWithoutCoordinatesInputSchema: z.ZodType<Prisma.ResourceNodeUpdateToOneWithWhereWithoutCoordinatesInput> = z.object({
  where: z.lazy(() => ResourceNodeWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ResourceNodeUpdateWithoutCoordinatesInputSchema),z.lazy(() => ResourceNodeUncheckedUpdateWithoutCoordinatesInputSchema) ]),
}).strict();

export const ResourceNodeUpdateWithoutCoordinatesInputSchema: z.ZodType<Prisma.ResourceNodeUpdateWithoutCoordinatesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => ResourceTypeSchema),z.lazy(() => EnumResourceTypeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ResourceNodeUncheckedUpdateWithoutCoordinatesInputSchema: z.ZodType<Prisma.ResourceNodeUncheckedUpdateWithoutCoordinatesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => ResourceTypeSchema),z.lazy(() => EnumResourceTypeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateWithoutBuildOrdersInputSchema: z.ZodType<Prisma.UserCreateWithoutBuildOrdersInput> = z.object({
  id: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  email: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  name: z.string(),
  station: z.lazy(() => StationCreateNestedOneWithoutOwnerInputSchema).optional(),
  fleets: z.lazy(() => FleetCreateNestedManyWithoutOwnerInputSchema).optional(),
  incomingFleets: z.lazy(() => FleetCreateNestedManyWithoutTargetInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutBuildOrdersInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutBuildOrdersInput> = z.object({
  id: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  email: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  name: z.string(),
  station: z.lazy(() => StationUncheckedCreateNestedOneWithoutOwnerInputSchema).optional(),
  fleets: z.lazy(() => FleetUncheckedCreateNestedManyWithoutOwnerInputSchema).optional(),
  incomingFleets: z.lazy(() => FleetUncheckedCreateNestedManyWithoutTargetInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutBuildOrdersInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutBuildOrdersInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutBuildOrdersInputSchema),z.lazy(() => UserUncheckedCreateWithoutBuildOrdersInputSchema) ]),
}).strict();

export const UserUpsertWithoutBuildOrdersInputSchema: z.ZodType<Prisma.UserUpsertWithoutBuildOrdersInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutBuildOrdersInputSchema),z.lazy(() => UserUncheckedUpdateWithoutBuildOrdersInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutBuildOrdersInputSchema),z.lazy(() => UserUncheckedCreateWithoutBuildOrdersInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutBuildOrdersInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutBuildOrdersInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutBuildOrdersInputSchema),z.lazy(() => UserUncheckedUpdateWithoutBuildOrdersInputSchema) ]),
}).strict();

export const UserUpdateWithoutBuildOrdersInputSchema: z.ZodType<Prisma.UserUpdateWithoutBuildOrdersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  station: z.lazy(() => StationUpdateOneWithoutOwnerNestedInputSchema).optional(),
  fleets: z.lazy(() => FleetUpdateManyWithoutOwnerNestedInputSchema).optional(),
  incomingFleets: z.lazy(() => FleetUpdateManyWithoutTargetNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutBuildOrdersInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutBuildOrdersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  station: z.lazy(() => StationUncheckedUpdateOneWithoutOwnerNestedInputSchema).optional(),
  fleets: z.lazy(() => FleetUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional(),
  incomingFleets: z.lazy(() => FleetUncheckedUpdateManyWithoutTargetNestedInputSchema).optional()
}).strict();

export const FleetCreateManyOwnerInputSchema: z.ZodType<Prisma.FleetCreateManyOwnerInput> = z.object({
  id: z.string().optional(),
  targetId: z.string().optional().nullable(),
  baseFleet: z.boolean().optional(),
  resourcesId: z.string(),
  travelTime: z.number().int().optional().nullable(),
  remainingTime: z.number().int().optional().nullable(),
  action: z.lazy(() => FleetActionTypeSchema).optional().nullable(),
  actionTime: z.number().int().optional().nullable(),
  returning: z.boolean().optional().nullable()
}).strict();

export const FleetCreateManyTargetInputSchema: z.ZodType<Prisma.FleetCreateManyTargetInput> = z.object({
  id: z.string().optional(),
  ownerId: z.string(),
  baseFleet: z.boolean().optional(),
  resourcesId: z.string(),
  travelTime: z.number().int().optional().nullable(),
  remainingTime: z.number().int().optional().nullable(),
  action: z.lazy(() => FleetActionTypeSchema).optional().nullable(),
  actionTime: z.number().int().optional().nullable(),
  returning: z.boolean().optional().nullable()
}).strict();

export const BuildOrderCreateManyOwnerInputSchema: z.ZodType<Prisma.BuildOrderCreateManyOwnerInput> = z.object({
  id: z.string().optional(),
  type: z.lazy(() => BuildOrderTypeSchema),
  what: z.lazy(() => ShipTypeSchema),
  amount: z.number().int(),
  remainingTime: z.number().int()
}).strict();

export const FleetUpdateWithoutOwnerInputSchema: z.ZodType<Prisma.FleetUpdateWithoutOwnerInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  baseFleet: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  travelTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  remainingTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  action: z.union([ z.lazy(() => FleetActionTypeSchema),z.lazy(() => NullableEnumFleetActionTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actionTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  returning: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  target: z.lazy(() => UserUpdateOneWithoutIncomingFleetsNestedInputSchema).optional(),
  ships: z.lazy(() => ShipGroupUpdateManyWithoutFleetNestedInputSchema).optional(),
  resources: z.lazy(() => ResourceUpdateOneRequiredWithoutFleetNestedInputSchema).optional()
}).strict();

export const FleetUncheckedUpdateWithoutOwnerInputSchema: z.ZodType<Prisma.FleetUncheckedUpdateWithoutOwnerInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  targetId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  baseFleet: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  resourcesId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  travelTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  remainingTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  action: z.union([ z.lazy(() => FleetActionTypeSchema),z.lazy(() => NullableEnumFleetActionTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actionTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  returning: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ships: z.lazy(() => ShipGroupUncheckedUpdateManyWithoutFleetNestedInputSchema).optional()
}).strict();

export const FleetUncheckedUpdateManyWithoutOwnerInputSchema: z.ZodType<Prisma.FleetUncheckedUpdateManyWithoutOwnerInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  targetId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  baseFleet: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  resourcesId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  travelTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  remainingTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  action: z.union([ z.lazy(() => FleetActionTypeSchema),z.lazy(() => NullableEnumFleetActionTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actionTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  returning: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const FleetUpdateWithoutTargetInputSchema: z.ZodType<Prisma.FleetUpdateWithoutTargetInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  baseFleet: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  travelTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  remainingTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  action: z.union([ z.lazy(() => FleetActionTypeSchema),z.lazy(() => NullableEnumFleetActionTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actionTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  returning: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  owner: z.lazy(() => UserUpdateOneRequiredWithoutFleetsNestedInputSchema).optional(),
  ships: z.lazy(() => ShipGroupUpdateManyWithoutFleetNestedInputSchema).optional(),
  resources: z.lazy(() => ResourceUpdateOneRequiredWithoutFleetNestedInputSchema).optional()
}).strict();

export const FleetUncheckedUpdateWithoutTargetInputSchema: z.ZodType<Prisma.FleetUncheckedUpdateWithoutTargetInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  baseFleet: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  resourcesId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  travelTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  remainingTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  action: z.union([ z.lazy(() => FleetActionTypeSchema),z.lazy(() => NullableEnumFleetActionTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actionTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  returning: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ships: z.lazy(() => ShipGroupUncheckedUpdateManyWithoutFleetNestedInputSchema).optional()
}).strict();

export const FleetUncheckedUpdateManyWithoutTargetInputSchema: z.ZodType<Prisma.FleetUncheckedUpdateManyWithoutTargetInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  baseFleet: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  resourcesId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  travelTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  remainingTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  action: z.union([ z.lazy(() => FleetActionTypeSchema),z.lazy(() => NullableEnumFleetActionTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actionTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  returning: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const BuildOrderUpdateWithoutOwnerInputSchema: z.ZodType<Prisma.BuildOrderUpdateWithoutOwnerInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => BuildOrderTypeSchema),z.lazy(() => EnumBuildOrderTypeFieldUpdateOperationsInputSchema) ]).optional(),
  what: z.union([ z.lazy(() => ShipTypeSchema),z.lazy(() => EnumShipTypeFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  remainingTime: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BuildOrderUncheckedUpdateWithoutOwnerInputSchema: z.ZodType<Prisma.BuildOrderUncheckedUpdateWithoutOwnerInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => BuildOrderTypeSchema),z.lazy(() => EnumBuildOrderTypeFieldUpdateOperationsInputSchema) ]).optional(),
  what: z.union([ z.lazy(() => ShipTypeSchema),z.lazy(() => EnumShipTypeFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  remainingTime: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BuildOrderUncheckedUpdateManyWithoutOwnerInputSchema: z.ZodType<Prisma.BuildOrderUncheckedUpdateManyWithoutOwnerInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => BuildOrderTypeSchema),z.lazy(() => EnumBuildOrderTypeFieldUpdateOperationsInputSchema) ]).optional(),
  what: z.union([ z.lazy(() => ShipTypeSchema),z.lazy(() => EnumShipTypeFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  remainingTime: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ShipGroupCreateManyFleetInputSchema: z.ZodType<Prisma.ShipGroupCreateManyFleetInput> = z.object({
  id: z.string().optional(),
  type: z.lazy(() => ShipTypeSchema),
  amount: z.number().int()
}).strict();

export const ShipGroupUpdateWithoutFleetInputSchema: z.ZodType<Prisma.ShipGroupUpdateWithoutFleetInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => ShipTypeSchema),z.lazy(() => EnumShipTypeFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ShipGroupUncheckedUpdateWithoutFleetInputSchema: z.ZodType<Prisma.ShipGroupUncheckedUpdateWithoutFleetInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => ShipTypeSchema),z.lazy(() => EnumShipTypeFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ShipGroupUncheckedUpdateManyWithoutFleetInputSchema: z.ZodType<Prisma.ShipGroupUncheckedUpdateManyWithoutFleetInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => ShipTypeSchema),z.lazy(() => EnumShipTypeFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const StationFindFirstArgsSchema: z.ZodType<Prisma.StationFindFirstArgs> = z.object({
  select: StationSelectSchema.optional(),
  include: StationIncludeSchema.optional(),
  where: StationWhereInputSchema.optional(),
  orderBy: z.union([ StationOrderByWithRelationInputSchema.array(),StationOrderByWithRelationInputSchema ]).optional(),
  cursor: StationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StationScalarFieldEnumSchema,StationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const StationFindFirstOrThrowArgsSchema: z.ZodType<Prisma.StationFindFirstOrThrowArgs> = z.object({
  select: StationSelectSchema.optional(),
  include: StationIncludeSchema.optional(),
  where: StationWhereInputSchema.optional(),
  orderBy: z.union([ StationOrderByWithRelationInputSchema.array(),StationOrderByWithRelationInputSchema ]).optional(),
  cursor: StationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StationScalarFieldEnumSchema,StationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const StationFindManyArgsSchema: z.ZodType<Prisma.StationFindManyArgs> = z.object({
  select: StationSelectSchema.optional(),
  include: StationIncludeSchema.optional(),
  where: StationWhereInputSchema.optional(),
  orderBy: z.union([ StationOrderByWithRelationInputSchema.array(),StationOrderByWithRelationInputSchema ]).optional(),
  cursor: StationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StationScalarFieldEnumSchema,StationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const StationAggregateArgsSchema: z.ZodType<Prisma.StationAggregateArgs> = z.object({
  where: StationWhereInputSchema.optional(),
  orderBy: z.union([ StationOrderByWithRelationInputSchema.array(),StationOrderByWithRelationInputSchema ]).optional(),
  cursor: StationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const StationGroupByArgsSchema: z.ZodType<Prisma.StationGroupByArgs> = z.object({
  where: StationWhereInputSchema.optional(),
  orderBy: z.union([ StationOrderByWithAggregationInputSchema.array(),StationOrderByWithAggregationInputSchema ]).optional(),
  by: StationScalarFieldEnumSchema.array(),
  having: StationScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const StationFindUniqueArgsSchema: z.ZodType<Prisma.StationFindUniqueArgs> = z.object({
  select: StationSelectSchema.optional(),
  include: StationIncludeSchema.optional(),
  where: StationWhereUniqueInputSchema,
}).strict() ;

export const StationFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.StationFindUniqueOrThrowArgs> = z.object({
  select: StationSelectSchema.optional(),
  include: StationIncludeSchema.optional(),
  where: StationWhereUniqueInputSchema,
}).strict() ;

export const FleetFindFirstArgsSchema: z.ZodType<Prisma.FleetFindFirstArgs> = z.object({
  select: FleetSelectSchema.optional(),
  include: FleetIncludeSchema.optional(),
  where: FleetWhereInputSchema.optional(),
  orderBy: z.union([ FleetOrderByWithRelationInputSchema.array(),FleetOrderByWithRelationInputSchema ]).optional(),
  cursor: FleetWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FleetScalarFieldEnumSchema,FleetScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FleetFindFirstOrThrowArgsSchema: z.ZodType<Prisma.FleetFindFirstOrThrowArgs> = z.object({
  select: FleetSelectSchema.optional(),
  include: FleetIncludeSchema.optional(),
  where: FleetWhereInputSchema.optional(),
  orderBy: z.union([ FleetOrderByWithRelationInputSchema.array(),FleetOrderByWithRelationInputSchema ]).optional(),
  cursor: FleetWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FleetScalarFieldEnumSchema,FleetScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FleetFindManyArgsSchema: z.ZodType<Prisma.FleetFindManyArgs> = z.object({
  select: FleetSelectSchema.optional(),
  include: FleetIncludeSchema.optional(),
  where: FleetWhereInputSchema.optional(),
  orderBy: z.union([ FleetOrderByWithRelationInputSchema.array(),FleetOrderByWithRelationInputSchema ]).optional(),
  cursor: FleetWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FleetScalarFieldEnumSchema,FleetScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FleetAggregateArgsSchema: z.ZodType<Prisma.FleetAggregateArgs> = z.object({
  where: FleetWhereInputSchema.optional(),
  orderBy: z.union([ FleetOrderByWithRelationInputSchema.array(),FleetOrderByWithRelationInputSchema ]).optional(),
  cursor: FleetWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const FleetGroupByArgsSchema: z.ZodType<Prisma.FleetGroupByArgs> = z.object({
  where: FleetWhereInputSchema.optional(),
  orderBy: z.union([ FleetOrderByWithAggregationInputSchema.array(),FleetOrderByWithAggregationInputSchema ]).optional(),
  by: FleetScalarFieldEnumSchema.array(),
  having: FleetScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const FleetFindUniqueArgsSchema: z.ZodType<Prisma.FleetFindUniqueArgs> = z.object({
  select: FleetSelectSchema.optional(),
  include: FleetIncludeSchema.optional(),
  where: FleetWhereUniqueInputSchema,
}).strict() ;

export const FleetFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.FleetFindUniqueOrThrowArgs> = z.object({
  select: FleetSelectSchema.optional(),
  include: FleetIncludeSchema.optional(),
  where: FleetWhereUniqueInputSchema,
}).strict() ;

export const ShipGroupFindFirstArgsSchema: z.ZodType<Prisma.ShipGroupFindFirstArgs> = z.object({
  select: ShipGroupSelectSchema.optional(),
  include: ShipGroupIncludeSchema.optional(),
  where: ShipGroupWhereInputSchema.optional(),
  orderBy: z.union([ ShipGroupOrderByWithRelationInputSchema.array(),ShipGroupOrderByWithRelationInputSchema ]).optional(),
  cursor: ShipGroupWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ShipGroupScalarFieldEnumSchema,ShipGroupScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ShipGroupFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ShipGroupFindFirstOrThrowArgs> = z.object({
  select: ShipGroupSelectSchema.optional(),
  include: ShipGroupIncludeSchema.optional(),
  where: ShipGroupWhereInputSchema.optional(),
  orderBy: z.union([ ShipGroupOrderByWithRelationInputSchema.array(),ShipGroupOrderByWithRelationInputSchema ]).optional(),
  cursor: ShipGroupWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ShipGroupScalarFieldEnumSchema,ShipGroupScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ShipGroupFindManyArgsSchema: z.ZodType<Prisma.ShipGroupFindManyArgs> = z.object({
  select: ShipGroupSelectSchema.optional(),
  include: ShipGroupIncludeSchema.optional(),
  where: ShipGroupWhereInputSchema.optional(),
  orderBy: z.union([ ShipGroupOrderByWithRelationInputSchema.array(),ShipGroupOrderByWithRelationInputSchema ]).optional(),
  cursor: ShipGroupWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ShipGroupScalarFieldEnumSchema,ShipGroupScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ShipGroupAggregateArgsSchema: z.ZodType<Prisma.ShipGroupAggregateArgs> = z.object({
  where: ShipGroupWhereInputSchema.optional(),
  orderBy: z.union([ ShipGroupOrderByWithRelationInputSchema.array(),ShipGroupOrderByWithRelationInputSchema ]).optional(),
  cursor: ShipGroupWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ShipGroupGroupByArgsSchema: z.ZodType<Prisma.ShipGroupGroupByArgs> = z.object({
  where: ShipGroupWhereInputSchema.optional(),
  orderBy: z.union([ ShipGroupOrderByWithAggregationInputSchema.array(),ShipGroupOrderByWithAggregationInputSchema ]).optional(),
  by: ShipGroupScalarFieldEnumSchema.array(),
  having: ShipGroupScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ShipGroupFindUniqueArgsSchema: z.ZodType<Prisma.ShipGroupFindUniqueArgs> = z.object({
  select: ShipGroupSelectSchema.optional(),
  include: ShipGroupIncludeSchema.optional(),
  where: ShipGroupWhereUniqueInputSchema,
}).strict() ;

export const ShipGroupFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ShipGroupFindUniqueOrThrowArgs> = z.object({
  select: ShipGroupSelectSchema.optional(),
  include: ShipGroupIncludeSchema.optional(),
  where: ShipGroupWhereUniqueInputSchema,
}).strict() ;

export const ResourceFindFirstArgsSchema: z.ZodType<Prisma.ResourceFindFirstArgs> = z.object({
  select: ResourceSelectSchema.optional(),
  include: ResourceIncludeSchema.optional(),
  where: ResourceWhereInputSchema.optional(),
  orderBy: z.union([ ResourceOrderByWithRelationInputSchema.array(),ResourceOrderByWithRelationInputSchema ]).optional(),
  cursor: ResourceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ResourceScalarFieldEnumSchema,ResourceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ResourceFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ResourceFindFirstOrThrowArgs> = z.object({
  select: ResourceSelectSchema.optional(),
  include: ResourceIncludeSchema.optional(),
  where: ResourceWhereInputSchema.optional(),
  orderBy: z.union([ ResourceOrderByWithRelationInputSchema.array(),ResourceOrderByWithRelationInputSchema ]).optional(),
  cursor: ResourceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ResourceScalarFieldEnumSchema,ResourceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ResourceFindManyArgsSchema: z.ZodType<Prisma.ResourceFindManyArgs> = z.object({
  select: ResourceSelectSchema.optional(),
  include: ResourceIncludeSchema.optional(),
  where: ResourceWhereInputSchema.optional(),
  orderBy: z.union([ ResourceOrderByWithRelationInputSchema.array(),ResourceOrderByWithRelationInputSchema ]).optional(),
  cursor: ResourceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ResourceScalarFieldEnumSchema,ResourceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ResourceAggregateArgsSchema: z.ZodType<Prisma.ResourceAggregateArgs> = z.object({
  where: ResourceWhereInputSchema.optional(),
  orderBy: z.union([ ResourceOrderByWithRelationInputSchema.array(),ResourceOrderByWithRelationInputSchema ]).optional(),
  cursor: ResourceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ResourceGroupByArgsSchema: z.ZodType<Prisma.ResourceGroupByArgs> = z.object({
  where: ResourceWhereInputSchema.optional(),
  orderBy: z.union([ ResourceOrderByWithAggregationInputSchema.array(),ResourceOrderByWithAggregationInputSchema ]).optional(),
  by: ResourceScalarFieldEnumSchema.array(),
  having: ResourceScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ResourceFindUniqueArgsSchema: z.ZodType<Prisma.ResourceFindUniqueArgs> = z.object({
  select: ResourceSelectSchema.optional(),
  include: ResourceIncludeSchema.optional(),
  where: ResourceWhereUniqueInputSchema,
}).strict() ;

export const ResourceFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ResourceFindUniqueOrThrowArgs> = z.object({
  select: ResourceSelectSchema.optional(),
  include: ResourceIncludeSchema.optional(),
  where: ResourceWhereUniqueInputSchema,
}).strict() ;

export const ResourceNodeFindFirstArgsSchema: z.ZodType<Prisma.ResourceNodeFindFirstArgs> = z.object({
  select: ResourceNodeSelectSchema.optional(),
  include: ResourceNodeIncludeSchema.optional(),
  where: ResourceNodeWhereInputSchema.optional(),
  orderBy: z.union([ ResourceNodeOrderByWithRelationInputSchema.array(),ResourceNodeOrderByWithRelationInputSchema ]).optional(),
  cursor: ResourceNodeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ResourceNodeScalarFieldEnumSchema,ResourceNodeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ResourceNodeFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ResourceNodeFindFirstOrThrowArgs> = z.object({
  select: ResourceNodeSelectSchema.optional(),
  include: ResourceNodeIncludeSchema.optional(),
  where: ResourceNodeWhereInputSchema.optional(),
  orderBy: z.union([ ResourceNodeOrderByWithRelationInputSchema.array(),ResourceNodeOrderByWithRelationInputSchema ]).optional(),
  cursor: ResourceNodeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ResourceNodeScalarFieldEnumSchema,ResourceNodeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ResourceNodeFindManyArgsSchema: z.ZodType<Prisma.ResourceNodeFindManyArgs> = z.object({
  select: ResourceNodeSelectSchema.optional(),
  include: ResourceNodeIncludeSchema.optional(),
  where: ResourceNodeWhereInputSchema.optional(),
  orderBy: z.union([ ResourceNodeOrderByWithRelationInputSchema.array(),ResourceNodeOrderByWithRelationInputSchema ]).optional(),
  cursor: ResourceNodeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ResourceNodeScalarFieldEnumSchema,ResourceNodeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ResourceNodeAggregateArgsSchema: z.ZodType<Prisma.ResourceNodeAggregateArgs> = z.object({
  where: ResourceNodeWhereInputSchema.optional(),
  orderBy: z.union([ ResourceNodeOrderByWithRelationInputSchema.array(),ResourceNodeOrderByWithRelationInputSchema ]).optional(),
  cursor: ResourceNodeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ResourceNodeGroupByArgsSchema: z.ZodType<Prisma.ResourceNodeGroupByArgs> = z.object({
  where: ResourceNodeWhereInputSchema.optional(),
  orderBy: z.union([ ResourceNodeOrderByWithAggregationInputSchema.array(),ResourceNodeOrderByWithAggregationInputSchema ]).optional(),
  by: ResourceNodeScalarFieldEnumSchema.array(),
  having: ResourceNodeScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ResourceNodeFindUniqueArgsSchema: z.ZodType<Prisma.ResourceNodeFindUniqueArgs> = z.object({
  select: ResourceNodeSelectSchema.optional(),
  include: ResourceNodeIncludeSchema.optional(),
  where: ResourceNodeWhereUniqueInputSchema,
}).strict() ;

export const ResourceNodeFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ResourceNodeFindUniqueOrThrowArgs> = z.object({
  select: ResourceNodeSelectSchema.optional(),
  include: ResourceNodeIncludeSchema.optional(),
  where: ResourceNodeWhereUniqueInputSchema,
}).strict() ;

export const CoordinateFindFirstArgsSchema: z.ZodType<Prisma.CoordinateFindFirstArgs> = z.object({
  select: CoordinateSelectSchema.optional(),
  include: CoordinateIncludeSchema.optional(),
  where: CoordinateWhereInputSchema.optional(),
  orderBy: z.union([ CoordinateOrderByWithRelationInputSchema.array(),CoordinateOrderByWithRelationInputSchema ]).optional(),
  cursor: CoordinateWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CoordinateScalarFieldEnumSchema,CoordinateScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CoordinateFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CoordinateFindFirstOrThrowArgs> = z.object({
  select: CoordinateSelectSchema.optional(),
  include: CoordinateIncludeSchema.optional(),
  where: CoordinateWhereInputSchema.optional(),
  orderBy: z.union([ CoordinateOrderByWithRelationInputSchema.array(),CoordinateOrderByWithRelationInputSchema ]).optional(),
  cursor: CoordinateWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CoordinateScalarFieldEnumSchema,CoordinateScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CoordinateFindManyArgsSchema: z.ZodType<Prisma.CoordinateFindManyArgs> = z.object({
  select: CoordinateSelectSchema.optional(),
  include: CoordinateIncludeSchema.optional(),
  where: CoordinateWhereInputSchema.optional(),
  orderBy: z.union([ CoordinateOrderByWithRelationInputSchema.array(),CoordinateOrderByWithRelationInputSchema ]).optional(),
  cursor: CoordinateWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CoordinateScalarFieldEnumSchema,CoordinateScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CoordinateAggregateArgsSchema: z.ZodType<Prisma.CoordinateAggregateArgs> = z.object({
  where: CoordinateWhereInputSchema.optional(),
  orderBy: z.union([ CoordinateOrderByWithRelationInputSchema.array(),CoordinateOrderByWithRelationInputSchema ]).optional(),
  cursor: CoordinateWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CoordinateGroupByArgsSchema: z.ZodType<Prisma.CoordinateGroupByArgs> = z.object({
  where: CoordinateWhereInputSchema.optional(),
  orderBy: z.union([ CoordinateOrderByWithAggregationInputSchema.array(),CoordinateOrderByWithAggregationInputSchema ]).optional(),
  by: CoordinateScalarFieldEnumSchema.array(),
  having: CoordinateScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CoordinateFindUniqueArgsSchema: z.ZodType<Prisma.CoordinateFindUniqueArgs> = z.object({
  select: CoordinateSelectSchema.optional(),
  include: CoordinateIncludeSchema.optional(),
  where: CoordinateWhereUniqueInputSchema,
}).strict() ;

export const CoordinateFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CoordinateFindUniqueOrThrowArgs> = z.object({
  select: CoordinateSelectSchema.optional(),
  include: CoordinateIncludeSchema.optional(),
  where: CoordinateWhereUniqueInputSchema,
}).strict() ;

export const BuildOrderFindFirstArgsSchema: z.ZodType<Prisma.BuildOrderFindFirstArgs> = z.object({
  select: BuildOrderSelectSchema.optional(),
  include: BuildOrderIncludeSchema.optional(),
  where: BuildOrderWhereInputSchema.optional(),
  orderBy: z.union([ BuildOrderOrderByWithRelationInputSchema.array(),BuildOrderOrderByWithRelationInputSchema ]).optional(),
  cursor: BuildOrderWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BuildOrderScalarFieldEnumSchema,BuildOrderScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BuildOrderFindFirstOrThrowArgsSchema: z.ZodType<Prisma.BuildOrderFindFirstOrThrowArgs> = z.object({
  select: BuildOrderSelectSchema.optional(),
  include: BuildOrderIncludeSchema.optional(),
  where: BuildOrderWhereInputSchema.optional(),
  orderBy: z.union([ BuildOrderOrderByWithRelationInputSchema.array(),BuildOrderOrderByWithRelationInputSchema ]).optional(),
  cursor: BuildOrderWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BuildOrderScalarFieldEnumSchema,BuildOrderScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BuildOrderFindManyArgsSchema: z.ZodType<Prisma.BuildOrderFindManyArgs> = z.object({
  select: BuildOrderSelectSchema.optional(),
  include: BuildOrderIncludeSchema.optional(),
  where: BuildOrderWhereInputSchema.optional(),
  orderBy: z.union([ BuildOrderOrderByWithRelationInputSchema.array(),BuildOrderOrderByWithRelationInputSchema ]).optional(),
  cursor: BuildOrderWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BuildOrderScalarFieldEnumSchema,BuildOrderScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BuildOrderAggregateArgsSchema: z.ZodType<Prisma.BuildOrderAggregateArgs> = z.object({
  where: BuildOrderWhereInputSchema.optional(),
  orderBy: z.union([ BuildOrderOrderByWithRelationInputSchema.array(),BuildOrderOrderByWithRelationInputSchema ]).optional(),
  cursor: BuildOrderWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const BuildOrderGroupByArgsSchema: z.ZodType<Prisma.BuildOrderGroupByArgs> = z.object({
  where: BuildOrderWhereInputSchema.optional(),
  orderBy: z.union([ BuildOrderOrderByWithAggregationInputSchema.array(),BuildOrderOrderByWithAggregationInputSchema ]).optional(),
  by: BuildOrderScalarFieldEnumSchema.array(),
  having: BuildOrderScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const BuildOrderFindUniqueArgsSchema: z.ZodType<Prisma.BuildOrderFindUniqueArgs> = z.object({
  select: BuildOrderSelectSchema.optional(),
  include: BuildOrderIncludeSchema.optional(),
  where: BuildOrderWhereUniqueInputSchema,
}).strict() ;

export const BuildOrderFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.BuildOrderFindUniqueOrThrowArgs> = z.object({
  select: BuildOrderSelectSchema.optional(),
  include: BuildOrderIncludeSchema.optional(),
  where: BuildOrderWhereUniqueInputSchema,
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const StationCreateArgsSchema: z.ZodType<Prisma.StationCreateArgs> = z.object({
  select: StationSelectSchema.optional(),
  include: StationIncludeSchema.optional(),
  data: z.union([ StationCreateInputSchema,StationUncheckedCreateInputSchema ]),
}).strict() ;

export const StationUpsertArgsSchema: z.ZodType<Prisma.StationUpsertArgs> = z.object({
  select: StationSelectSchema.optional(),
  include: StationIncludeSchema.optional(),
  where: StationWhereUniqueInputSchema,
  create: z.union([ StationCreateInputSchema,StationUncheckedCreateInputSchema ]),
  update: z.union([ StationUpdateInputSchema,StationUncheckedUpdateInputSchema ]),
}).strict() ;

export const StationCreateManyArgsSchema: z.ZodType<Prisma.StationCreateManyArgs> = z.object({
  data: z.union([ StationCreateManyInputSchema,StationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const StationCreateManyAndReturnArgsSchema: z.ZodType<Prisma.StationCreateManyAndReturnArgs> = z.object({
  data: z.union([ StationCreateManyInputSchema,StationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const StationDeleteArgsSchema: z.ZodType<Prisma.StationDeleteArgs> = z.object({
  select: StationSelectSchema.optional(),
  include: StationIncludeSchema.optional(),
  where: StationWhereUniqueInputSchema,
}).strict() ;

export const StationUpdateArgsSchema: z.ZodType<Prisma.StationUpdateArgs> = z.object({
  select: StationSelectSchema.optional(),
  include: StationIncludeSchema.optional(),
  data: z.union([ StationUpdateInputSchema,StationUncheckedUpdateInputSchema ]),
  where: StationWhereUniqueInputSchema,
}).strict() ;

export const StationUpdateManyArgsSchema: z.ZodType<Prisma.StationUpdateManyArgs> = z.object({
  data: z.union([ StationUpdateManyMutationInputSchema,StationUncheckedUpdateManyInputSchema ]),
  where: StationWhereInputSchema.optional(),
}).strict() ;

export const StationDeleteManyArgsSchema: z.ZodType<Prisma.StationDeleteManyArgs> = z.object({
  where: StationWhereInputSchema.optional(),
}).strict() ;

export const FleetCreateArgsSchema: z.ZodType<Prisma.FleetCreateArgs> = z.object({
  select: FleetSelectSchema.optional(),
  include: FleetIncludeSchema.optional(),
  data: z.union([ FleetCreateInputSchema,FleetUncheckedCreateInputSchema ]),
}).strict() ;

export const FleetUpsertArgsSchema: z.ZodType<Prisma.FleetUpsertArgs> = z.object({
  select: FleetSelectSchema.optional(),
  include: FleetIncludeSchema.optional(),
  where: FleetWhereUniqueInputSchema,
  create: z.union([ FleetCreateInputSchema,FleetUncheckedCreateInputSchema ]),
  update: z.union([ FleetUpdateInputSchema,FleetUncheckedUpdateInputSchema ]),
}).strict() ;

export const FleetCreateManyArgsSchema: z.ZodType<Prisma.FleetCreateManyArgs> = z.object({
  data: z.union([ FleetCreateManyInputSchema,FleetCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const FleetCreateManyAndReturnArgsSchema: z.ZodType<Prisma.FleetCreateManyAndReturnArgs> = z.object({
  data: z.union([ FleetCreateManyInputSchema,FleetCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const FleetDeleteArgsSchema: z.ZodType<Prisma.FleetDeleteArgs> = z.object({
  select: FleetSelectSchema.optional(),
  include: FleetIncludeSchema.optional(),
  where: FleetWhereUniqueInputSchema,
}).strict() ;

export const FleetUpdateArgsSchema: z.ZodType<Prisma.FleetUpdateArgs> = z.object({
  select: FleetSelectSchema.optional(),
  include: FleetIncludeSchema.optional(),
  data: z.union([ FleetUpdateInputSchema,FleetUncheckedUpdateInputSchema ]),
  where: FleetWhereUniqueInputSchema,
}).strict() ;

export const FleetUpdateManyArgsSchema: z.ZodType<Prisma.FleetUpdateManyArgs> = z.object({
  data: z.union([ FleetUpdateManyMutationInputSchema,FleetUncheckedUpdateManyInputSchema ]),
  where: FleetWhereInputSchema.optional(),
}).strict() ;

export const FleetDeleteManyArgsSchema: z.ZodType<Prisma.FleetDeleteManyArgs> = z.object({
  where: FleetWhereInputSchema.optional(),
}).strict() ;

export const ShipGroupCreateArgsSchema: z.ZodType<Prisma.ShipGroupCreateArgs> = z.object({
  select: ShipGroupSelectSchema.optional(),
  include: ShipGroupIncludeSchema.optional(),
  data: z.union([ ShipGroupCreateInputSchema,ShipGroupUncheckedCreateInputSchema ]),
}).strict() ;

export const ShipGroupUpsertArgsSchema: z.ZodType<Prisma.ShipGroupUpsertArgs> = z.object({
  select: ShipGroupSelectSchema.optional(),
  include: ShipGroupIncludeSchema.optional(),
  where: ShipGroupWhereUniqueInputSchema,
  create: z.union([ ShipGroupCreateInputSchema,ShipGroupUncheckedCreateInputSchema ]),
  update: z.union([ ShipGroupUpdateInputSchema,ShipGroupUncheckedUpdateInputSchema ]),
}).strict() ;

export const ShipGroupCreateManyArgsSchema: z.ZodType<Prisma.ShipGroupCreateManyArgs> = z.object({
  data: z.union([ ShipGroupCreateManyInputSchema,ShipGroupCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ShipGroupCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ShipGroupCreateManyAndReturnArgs> = z.object({
  data: z.union([ ShipGroupCreateManyInputSchema,ShipGroupCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ShipGroupDeleteArgsSchema: z.ZodType<Prisma.ShipGroupDeleteArgs> = z.object({
  select: ShipGroupSelectSchema.optional(),
  include: ShipGroupIncludeSchema.optional(),
  where: ShipGroupWhereUniqueInputSchema,
}).strict() ;

export const ShipGroupUpdateArgsSchema: z.ZodType<Prisma.ShipGroupUpdateArgs> = z.object({
  select: ShipGroupSelectSchema.optional(),
  include: ShipGroupIncludeSchema.optional(),
  data: z.union([ ShipGroupUpdateInputSchema,ShipGroupUncheckedUpdateInputSchema ]),
  where: ShipGroupWhereUniqueInputSchema,
}).strict() ;

export const ShipGroupUpdateManyArgsSchema: z.ZodType<Prisma.ShipGroupUpdateManyArgs> = z.object({
  data: z.union([ ShipGroupUpdateManyMutationInputSchema,ShipGroupUncheckedUpdateManyInputSchema ]),
  where: ShipGroupWhereInputSchema.optional(),
}).strict() ;

export const ShipGroupDeleteManyArgsSchema: z.ZodType<Prisma.ShipGroupDeleteManyArgs> = z.object({
  where: ShipGroupWhereInputSchema.optional(),
}).strict() ;

export const ResourceCreateArgsSchema: z.ZodType<Prisma.ResourceCreateArgs> = z.object({
  select: ResourceSelectSchema.optional(),
  include: ResourceIncludeSchema.optional(),
  data: z.union([ ResourceCreateInputSchema,ResourceUncheckedCreateInputSchema ]).optional(),
}).strict() ;

export const ResourceUpsertArgsSchema: z.ZodType<Prisma.ResourceUpsertArgs> = z.object({
  select: ResourceSelectSchema.optional(),
  include: ResourceIncludeSchema.optional(),
  where: ResourceWhereUniqueInputSchema,
  create: z.union([ ResourceCreateInputSchema,ResourceUncheckedCreateInputSchema ]),
  update: z.union([ ResourceUpdateInputSchema,ResourceUncheckedUpdateInputSchema ]),
}).strict() ;

export const ResourceCreateManyArgsSchema: z.ZodType<Prisma.ResourceCreateManyArgs> = z.object({
  data: z.union([ ResourceCreateManyInputSchema,ResourceCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ResourceCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ResourceCreateManyAndReturnArgs> = z.object({
  data: z.union([ ResourceCreateManyInputSchema,ResourceCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ResourceDeleteArgsSchema: z.ZodType<Prisma.ResourceDeleteArgs> = z.object({
  select: ResourceSelectSchema.optional(),
  include: ResourceIncludeSchema.optional(),
  where: ResourceWhereUniqueInputSchema,
}).strict() ;

export const ResourceUpdateArgsSchema: z.ZodType<Prisma.ResourceUpdateArgs> = z.object({
  select: ResourceSelectSchema.optional(),
  include: ResourceIncludeSchema.optional(),
  data: z.union([ ResourceUpdateInputSchema,ResourceUncheckedUpdateInputSchema ]),
  where: ResourceWhereUniqueInputSchema,
}).strict() ;

export const ResourceUpdateManyArgsSchema: z.ZodType<Prisma.ResourceUpdateManyArgs> = z.object({
  data: z.union([ ResourceUpdateManyMutationInputSchema,ResourceUncheckedUpdateManyInputSchema ]),
  where: ResourceWhereInputSchema.optional(),
}).strict() ;

export const ResourceDeleteManyArgsSchema: z.ZodType<Prisma.ResourceDeleteManyArgs> = z.object({
  where: ResourceWhereInputSchema.optional(),
}).strict() ;

export const ResourceNodeCreateArgsSchema: z.ZodType<Prisma.ResourceNodeCreateArgs> = z.object({
  select: ResourceNodeSelectSchema.optional(),
  include: ResourceNodeIncludeSchema.optional(),
  data: z.union([ ResourceNodeCreateInputSchema,ResourceNodeUncheckedCreateInputSchema ]),
}).strict() ;

export const ResourceNodeUpsertArgsSchema: z.ZodType<Prisma.ResourceNodeUpsertArgs> = z.object({
  select: ResourceNodeSelectSchema.optional(),
  include: ResourceNodeIncludeSchema.optional(),
  where: ResourceNodeWhereUniqueInputSchema,
  create: z.union([ ResourceNodeCreateInputSchema,ResourceNodeUncheckedCreateInputSchema ]),
  update: z.union([ ResourceNodeUpdateInputSchema,ResourceNodeUncheckedUpdateInputSchema ]),
}).strict() ;

export const ResourceNodeCreateManyArgsSchema: z.ZodType<Prisma.ResourceNodeCreateManyArgs> = z.object({
  data: z.union([ ResourceNodeCreateManyInputSchema,ResourceNodeCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ResourceNodeCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ResourceNodeCreateManyAndReturnArgs> = z.object({
  data: z.union([ ResourceNodeCreateManyInputSchema,ResourceNodeCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ResourceNodeDeleteArgsSchema: z.ZodType<Prisma.ResourceNodeDeleteArgs> = z.object({
  select: ResourceNodeSelectSchema.optional(),
  include: ResourceNodeIncludeSchema.optional(),
  where: ResourceNodeWhereUniqueInputSchema,
}).strict() ;

export const ResourceNodeUpdateArgsSchema: z.ZodType<Prisma.ResourceNodeUpdateArgs> = z.object({
  select: ResourceNodeSelectSchema.optional(),
  include: ResourceNodeIncludeSchema.optional(),
  data: z.union([ ResourceNodeUpdateInputSchema,ResourceNodeUncheckedUpdateInputSchema ]),
  where: ResourceNodeWhereUniqueInputSchema,
}).strict() ;

export const ResourceNodeUpdateManyArgsSchema: z.ZodType<Prisma.ResourceNodeUpdateManyArgs> = z.object({
  data: z.union([ ResourceNodeUpdateManyMutationInputSchema,ResourceNodeUncheckedUpdateManyInputSchema ]),
  where: ResourceNodeWhereInputSchema.optional(),
}).strict() ;

export const ResourceNodeDeleteManyArgsSchema: z.ZodType<Prisma.ResourceNodeDeleteManyArgs> = z.object({
  where: ResourceNodeWhereInputSchema.optional(),
}).strict() ;

export const CoordinateCreateArgsSchema: z.ZodType<Prisma.CoordinateCreateArgs> = z.object({
  select: CoordinateSelectSchema.optional(),
  include: CoordinateIncludeSchema.optional(),
  data: z.union([ CoordinateCreateInputSchema,CoordinateUncheckedCreateInputSchema ]),
}).strict() ;

export const CoordinateUpsertArgsSchema: z.ZodType<Prisma.CoordinateUpsertArgs> = z.object({
  select: CoordinateSelectSchema.optional(),
  include: CoordinateIncludeSchema.optional(),
  where: CoordinateWhereUniqueInputSchema,
  create: z.union([ CoordinateCreateInputSchema,CoordinateUncheckedCreateInputSchema ]),
  update: z.union([ CoordinateUpdateInputSchema,CoordinateUncheckedUpdateInputSchema ]),
}).strict() ;

export const CoordinateCreateManyArgsSchema: z.ZodType<Prisma.CoordinateCreateManyArgs> = z.object({
  data: z.union([ CoordinateCreateManyInputSchema,CoordinateCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CoordinateCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CoordinateCreateManyAndReturnArgs> = z.object({
  data: z.union([ CoordinateCreateManyInputSchema,CoordinateCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CoordinateDeleteArgsSchema: z.ZodType<Prisma.CoordinateDeleteArgs> = z.object({
  select: CoordinateSelectSchema.optional(),
  include: CoordinateIncludeSchema.optional(),
  where: CoordinateWhereUniqueInputSchema,
}).strict() ;

export const CoordinateUpdateArgsSchema: z.ZodType<Prisma.CoordinateUpdateArgs> = z.object({
  select: CoordinateSelectSchema.optional(),
  include: CoordinateIncludeSchema.optional(),
  data: z.union([ CoordinateUpdateInputSchema,CoordinateUncheckedUpdateInputSchema ]),
  where: CoordinateWhereUniqueInputSchema,
}).strict() ;

export const CoordinateUpdateManyArgsSchema: z.ZodType<Prisma.CoordinateUpdateManyArgs> = z.object({
  data: z.union([ CoordinateUpdateManyMutationInputSchema,CoordinateUncheckedUpdateManyInputSchema ]),
  where: CoordinateWhereInputSchema.optional(),
}).strict() ;

export const CoordinateDeleteManyArgsSchema: z.ZodType<Prisma.CoordinateDeleteManyArgs> = z.object({
  where: CoordinateWhereInputSchema.optional(),
}).strict() ;

export const BuildOrderCreateArgsSchema: z.ZodType<Prisma.BuildOrderCreateArgs> = z.object({
  select: BuildOrderSelectSchema.optional(),
  include: BuildOrderIncludeSchema.optional(),
  data: z.union([ BuildOrderCreateInputSchema,BuildOrderUncheckedCreateInputSchema ]),
}).strict() ;

export const BuildOrderUpsertArgsSchema: z.ZodType<Prisma.BuildOrderUpsertArgs> = z.object({
  select: BuildOrderSelectSchema.optional(),
  include: BuildOrderIncludeSchema.optional(),
  where: BuildOrderWhereUniqueInputSchema,
  create: z.union([ BuildOrderCreateInputSchema,BuildOrderUncheckedCreateInputSchema ]),
  update: z.union([ BuildOrderUpdateInputSchema,BuildOrderUncheckedUpdateInputSchema ]),
}).strict() ;

export const BuildOrderCreateManyArgsSchema: z.ZodType<Prisma.BuildOrderCreateManyArgs> = z.object({
  data: z.union([ BuildOrderCreateManyInputSchema,BuildOrderCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const BuildOrderCreateManyAndReturnArgsSchema: z.ZodType<Prisma.BuildOrderCreateManyAndReturnArgs> = z.object({
  data: z.union([ BuildOrderCreateManyInputSchema,BuildOrderCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const BuildOrderDeleteArgsSchema: z.ZodType<Prisma.BuildOrderDeleteArgs> = z.object({
  select: BuildOrderSelectSchema.optional(),
  include: BuildOrderIncludeSchema.optional(),
  where: BuildOrderWhereUniqueInputSchema,
}).strict() ;

export const BuildOrderUpdateArgsSchema: z.ZodType<Prisma.BuildOrderUpdateArgs> = z.object({
  select: BuildOrderSelectSchema.optional(),
  include: BuildOrderIncludeSchema.optional(),
  data: z.union([ BuildOrderUpdateInputSchema,BuildOrderUncheckedUpdateInputSchema ]),
  where: BuildOrderWhereUniqueInputSchema,
}).strict() ;

export const BuildOrderUpdateManyArgsSchema: z.ZodType<Prisma.BuildOrderUpdateManyArgs> = z.object({
  data: z.union([ BuildOrderUpdateManyMutationInputSchema,BuildOrderUncheckedUpdateManyInputSchema ]),
  where: BuildOrderWhereInputSchema.optional(),
}).strict() ;

export const BuildOrderDeleteManyArgsSchema: z.ZodType<Prisma.BuildOrderDeleteManyArgs> = z.object({
  where: BuildOrderWhereInputSchema.optional(),
}).strict() ;