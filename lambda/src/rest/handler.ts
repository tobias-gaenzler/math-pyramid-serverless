import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { QueryParameterProvider } from './query-parameter-provider';
import { MathPyramidFactory } from './math-pyramid-factory';

const HEADERS = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:3000'
};

const queryParameterProvider: QueryParameterProvider = new QueryParameterProvider();
const factory: MathPyramidFactory = new MathPyramidFactory();

export const createHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const [size, maxValue] = queryParameterProvider.getSizeAndMaxValue(event);
        const solutionValues: number[] = factory.createRandomSolution(size, maxValue);
        const startValues: number[] = factory.getUniquelySolvableRandomStartValues(solutionValues);

        console.log(`Start values: ${JSON.stringify(startValues)}`);
        console.log(`Solution values: ${JSON.stringify(solutionValues)}`);

        return {
            statusCode: 200,
            headers: HEADERS,
            body: JSON.stringify({
                size: size,
                startValues: startValues,
                solution: solutionValues,
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
