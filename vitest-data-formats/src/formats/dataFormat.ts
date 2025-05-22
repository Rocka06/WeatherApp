class DataFormat {
    constructor(public formatName: string = 'default') {}

    format(data: any): string {
        if (data === null || data === undefined || typeof data !== 'object') {
            throw new Error('Invalid input');
        }
        return `Formatted: ${JSON.stringify(data)}`;
    }
}

export default DataFormat;