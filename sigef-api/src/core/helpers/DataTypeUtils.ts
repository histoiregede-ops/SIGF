export class DataTypeUtils {
    private static instance: DataTypeUtils

    constructor() {
    }

    public static getInstance(): DataTypeUtils {
        if (!DataTypeUtils.instance) {
            DataTypeUtils.instance = new DataTypeUtils()
        }
        return DataTypeUtils.instance
    }

    public test(): void {
        console.log('test')
    }

    public booleanFromString(value: string): boolean | undefined {
        if (value == 'true') {
            return true
        } else if (value == 'false') {
            return false
        }
        else {
            return undefined
        }
    }

}