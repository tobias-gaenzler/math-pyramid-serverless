import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { QueryParameterProvider } from './query-parameter-provider';
import { MathPyramidFactory } from './math-pyramid-factory';

const HEADERS = {
    'Content-Type': 'application/json',
    'X-Custom-Header': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:3000'
};

export const createHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const [size, maxValue] = new QueryParameterProvider().getSizeAndMaxValue(event);

        const factory: MathPyramidFactory = new MathPyramidFactory();
        const solution: number[] = factory.createRandomSolution(size, maxValue);
        const startValues: number[] = factory.getUniquelySolvableRandomStartValues(solution);

        console.log(`Start values: ${JSON.stringify(startValues)}`);
        console.log(`Solution values: ${JSON.stringify(solution)}`);

        return {
            statusCode: 200,
            headers: HEADERS,
            body: JSON.stringify({
                size: size,
                startValues: startValues,
                solution: solution,
            }),
        };
    } catch (err) {
        console.error(err);
        return {
            statusCode: 500,
            headers: HEADERS,
            body: `{ "message": "${err}" }`
        };
    }
};
