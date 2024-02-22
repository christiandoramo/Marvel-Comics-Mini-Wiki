'use client'

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { getCharactersAdvanced } from '@/services/characters';
import { CharacterData } from '@/app/interfaces/characters';
import { Backdrop, makeStyles } from '@material-ui/core';
import { CharacterCard } from '../CharacterCard';
import { CharacterPlaceholder } from '@/app/utils/placeholders';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(10px)',
  },
}));

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const Carousel: React.FC = () => {
  const [characters, setCharacters] = React.useState<CharacterData[]>([])
  const [actualOffset, setActualOffset] = React.useState<number>(Math.floor(Math.random() * 1000))
  const limit = 30
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const router = useRouter()
  const classes = useStyles();

  const goToHome = () => {
    router.push('/home')
  }

  async function handleReloadImages() {
    const chars = await getCharactersAdvanced({ offset: actualOffset, limit })
    if (chars) {
      setCharacters(chars)
    }

  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  React.useEffect(() => {
    handleReloadImages()
  }, [actualOffset]);

  React.useEffect(() => {
    if (activeStep === limit - 1) {
      setActualOffset((prev) => prev + limit);
      handleReloadImages()
    }

  }, [activeStep]);

  return (
    <div className='flex flex-col justify-center items-center h-screen space-y-4'>
      <Backdrop className={classes.backdrop} open>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100vh',
          width: '100vw',
          zIndex: -1,
          backgroundImage: `url(${characters.length > 0 ?
            `${characters[activeStep].thumbnail.path}.${characters[activeStep].thumbnail.extension}` :
            `${CharacterPlaceholder.thumbnail.path}`})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(10px)',
        }}
        />
        <div className='flex flex-col items-center justify-center gap-y-5'>
          <h1 className='text-4xl font-bold tracking-widest mb-8'>MARVEL COMICS MINI WIKI</h1>
          <Box sx={{ maxWidth: 200, flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
            <AutoPlaySwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={activeStep}
              onChangeIndex={handleStepChange}
              enableMouseEvents
            >
              {characters?.length > 0 ? (
                characters.map((char, index) => (
                  <div key={char.id}>
                    {Math.abs(activeStep - index) <= 2 ? (
                      <CharacterCard {...char} />
                    ) : <CharacterCard {...CharacterPlaceholder} />
                    }
                  </div>
                ))) : <CharacterCard {...CharacterPlaceholder} />}
            </AutoPlaySwipeableViews>
            <MobileStepper
              steps={limit}
              position="static"
              activeStep={activeStep}
              sx={{
                marginTop: '20px',
                backgroundColor: 'rgb(0,0,0,0.5)',
                '.MuiMobileStepper-dot': {
                  display: 'none', // Esconda os pontos aqui
                },
                '.MuiMobileStepper-dotActive': {
                  display: 'none', // Esconda os pontos aqui
                },
                borderRadius: '2rem',
              }}
              nextButton={
                <Button
                  size="small"
                  onClick={handleNext}
                  disabled={activeStep === limit - 1}
                  style={{ color: '#FFD200' }}
                >
                  {theme.direction === 'rtl' ? (
                    <KeyboardArrowLeft />
                  ) : (
                    <KeyboardArrowRight />
                  )}
                </Button>
              }
              backButton={
                <Button
                  style={{ color: '#FFD200' }}
                  size="small"
                  onClick={handleBack}
                  disabled={activeStep === 0}>
                  {theme.direction === 'rtl' ? (
                    <KeyboardArrowRight />
                  ) : (
                    <KeyboardArrowLeft />
                  )}
                </Button>
              }
            />
          </Box>
          <Button
            variant="outlined" onClick={() => goToHome()}
            sx={{
              bgcolor: 'red',
              border: '2px solid #000',
              boxShadow: 24,
              textAlign: 'center',
              color: 'white',
              height: '50px'
            }}
          >ENTRAR AGORA</Button>
        </div>
      </Backdrop>
    </div>
  );
}
export default Carousel;