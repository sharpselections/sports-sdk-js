import {
	z,
	ZodTypeAny,
	ZodString,
	ZodNumber,
	ZodBoolean,
	ZodObject,
	ZodOptional,
	ZodNullable,
	ZodBigInt,
	ZodDate,
} from "zod";

function wrapWithCoerce(schema: ZodTypeAny): ZodTypeAny {
	if (schema instanceof ZodString) {
		return z.coerce.string(schema);
	} else if (schema instanceof ZodNumber) {
		return z.coerce.number(schema);
	} else if (schema instanceof ZodBoolean) {
		return z.coerce.boolean(schema);
	} else if (schema instanceof ZodBigInt) {
		return z.coerce.bigint(schema);
	} else if (schema instanceof ZodDate) {
		return z.coerce.date(schema);
	} else if (schema instanceof ZodOptional || schema instanceof ZodNullable) {
		return schema.constructor(wrapWithCoerce(schema.unwrap()));
	} else if (schema instanceof ZodObject) {
		const newShape = Object.keys(schema.shape).reduce((acc, key) => {
			acc[key] = wrapWithCoerce(schema.shape[key]);
			return acc;
		}, {} as Record<string, ZodTypeAny>);
		return ZodObject.create(newShape);
	}
	return schema;
}

export function coercive<TSchema extends z.AnyZodObject>(schema: TSchema) {
	const entries = Object.entries(schema.shape) as [
		keyof TSchema["shape"],
		z.ZodTypeAny,
	][];

	const newProps = entries.reduce(
		(acc, [key, value]) => {
			acc[key] = wrapWithCoerce(value);
			return acc;
		},
		{} as {
			[key in keyof TSchema["shape"]]: ZodTypeAny;
		},
	);

	return z.object(newProps);
}


/**
 * Makes all properties in the schema optional by wrapping them in ZodOptional<z.ZodNullable<z.ZodTypeAny>>
 * @param schema - any zod object
 */
export function nullish<TSchema extends z.AnyZodObject>(schema: TSchema) {
	const entries = Object.entries(schema.shape) as [
		keyof TSchema["shape"],
		z.ZodTypeAny,
	][];

	const newProps = entries.reduce(
		(acc, [key, value]) => {
			acc[key] = value.nullish();
			return acc;
		},
		{} as {
			[key in keyof TSchema["shape"]]: z.ZodOptional<
				z.ZodNullable<TSchema["shape"][key]>
			>;
		},
	);

	return z.object(newProps);
}

// Utility function to get the list of union values
export const getUnionValues = <T extends string>(schema: z.ZodUnion<[z.ZodLiteral<T>, ...z.ZodLiteral<T>[]]>): T[] => {
	return schema._def.options.map(option => option.value);
};