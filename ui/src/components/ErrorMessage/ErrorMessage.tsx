import { Button } from "@mui/material"

export const ERROR_MESSAGE: string = "Error while retrieving math pyramid data from API. Please try again later."

type Props = {
    restart: () => void
}

const ErrorMessage: React.FC<Props> = ({
    restart
}: Props) => (
        <>
            <div>
                {ERROR_MESSAGE}
            </div>
            <Button color="primary" variant="contained" onClick={restart}>
                Try again
            </Button>
        </>
    )

export default ErrorMessage
