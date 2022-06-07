declare const username: any;
declare const password: any;
declare const database: any;
declare const host: any;
export namespace test {
    export { username };
    export { password };
    export { database };
    export { host };
    export const dialect: string;
    export const seederStorage: string;
}
export namespace development {
    export { username };
    export { password };
    export { database };
    export { host };
    const dialect_1: string;
    export { dialect_1 as dialect };
    const seederStorage_1: string;
    export { seederStorage_1 as seederStorage };
}
export namespace production {
    export const use_env_variable: string;
    const dialect_2: string;
    export { dialect_2 as dialect };
    const seederStorage_2: string;
    export { seederStorage_2 as seederStorage };
    export namespace dialectOptions {
        namespace ssl {
            const require: boolean;
            const rejectUnauthorized: boolean;
        }
    }
}
export {};
//# sourceMappingURL=database.d.ts.map