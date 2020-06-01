export declare type LiteralUnion<T extends U, U> = T | (U & {});
export declare type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
