import { Button } from '@mui/material';


export const HighlightedText = ({ text }: { text: string }) => {

    return (
        <Button
            variant="outlined"
            disabled
            style={{
                width: 140,
                height: 50,
                color: 'black',
                backgroundColor: 'white',
                borderColor: 'black',
                borderRadius: '5rem',
                borderStyle: 'solid',
                fontSize: 20,
                fontWeight: 'bold',
                cursor: 'default'
            }}
        >
            {text}
        </Button>
    )

}