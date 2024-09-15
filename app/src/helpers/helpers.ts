export class Helpers {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static parseJson(prop: string): any {
        try {
            return JSON.parse(prop);
        } catch (err) {
            return prop;
        }
    }
}