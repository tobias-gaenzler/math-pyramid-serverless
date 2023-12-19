import { APIGatewayProxyEvent } from 'aws-lambda';

export class QueryParameterProvider {

    getSizeAndMaxValue(event: APIGatewayProxyEvent): [number, number] {
        let size: number = 3;
        let maxValue: number = 100;
        
        if (this.isDefined(event.queryStringParameters?.size)) {
            if (this.isValidSize(event.queryStringParameters?.size)) {
                size = Number(event.queryStringParameters!.size);
            } else {
                throw new Error(`Invalid size: size must be between 3 and 10. Current value:${size}`);
            }
        }
        if (this.isDefined(event.queryStringParameters?.maxValue)) {
            if (this.isValidMaxValue(event.queryStringParameters?.maxValue)) {
                maxValue = Number(event.queryStringParameters!.maxValue);
            } else {
                throw new Error(`Invalid maxValue: maxValue must be between 100 and 1000000. Current value:${maxValue}`);
            }
        }

        console.log(`Using the following values: size: ${size}, maxValue: ${maxValue}`);
        return [size, maxValue];
    }

    private isDefined(size: string | undefined): boolean {
        return size !== null && size !== undefined;
    }

    private isValidSize(size: string | undefined): boolean {
        try {
            if (size === undefined) {
                return false;
            }
            const parsedSize: number = parseInt(size);
            return (parsedSize >= 3 && parsedSize <= 10);
        } catch (error) {
            return false;
        }
    }

    private isValidMaxValue(maxValue: string | undefined): boolean {
        try {
            if (maxValue === undefined) {
                return false;
            }
            const parsedMaxValue: number = parseInt(maxValue);
            return (parsedMaxValue >= 100 && parsedMaxValue <= 1000000);
        } catch (error) {
            return false;
        }
    }
}