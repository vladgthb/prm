export type Data<T> = Record<'data', T>;

export type ResponseData<key extends string, T> = Data<Record<key, T>>;
