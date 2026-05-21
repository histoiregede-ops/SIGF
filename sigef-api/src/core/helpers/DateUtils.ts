export class DateUtils {
    private static instance: DateUtils

    constructor() {
    }

    public static getInstance(): DateUtils {
        if (!DateUtils.instance) {
            DateUtils.instance = new DateUtils()
        }
        return DateUtils.instance
    }

    public test(): void {
        console.log('test')
    }

    public getDatesBetweenInterval(start: Date, end: Date): Date[] {
        // console.log(start, end)

        // Mettre l'heure des dates à zéro
        start.setHours(0, 0, 0, 0)
        end.setHours(0, 0, 0, 0)
    
        let dates: Date[] = []
        if(start <= end) {
            let currentDate: Date = new Date(start)
            while (currentDate <= end) {
                dates.push(new Date(currentDate))
                currentDate.setDate(currentDate.getDate() + 1)
            }
        }
    
        return dates
    }

}