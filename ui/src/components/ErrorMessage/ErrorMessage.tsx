import { Button, Stack } from "@mui/material"

export const ERROR_MESSAGE: string = 'Error while retrieving math pyramid data from API. Please try again later.';

type Props = {
    userName: string
    restart: () => void
};

const ErrorMessage: React.FC<Props> = ({
    userName,
    restart
}: Props) => {
    return (
        <>
            <div>
                My name: {userName}
            </div>
            <div>
                {ERROR_MESSAGE}
            </div>
            <Button color="primary" variant="contained" onClick={restart}>
                Try again
            </Button>
        </>
    )
}

export default ErrorMessage
