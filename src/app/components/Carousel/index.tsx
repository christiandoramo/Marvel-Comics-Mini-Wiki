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
import { CharacterCard } from '../CharacterCard';
import { CharacterPlaceholder } from '@/app/utils/placeholders';
import Image from 'next/image';


const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const Carousel: React.FC = () => {
  const [characters, setCharacters] = React.useState<CharacterData[]>([])
  const [actualOffset, setActualOffset] = React.useState<number>(Math.floor(Math.random() * 1000))
  const limit = 30
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const router = useRouter()

  const goToHome = () => {
    router.push('/home')
  }

  async function handleReloadImages() {
    const chars = await getCharactersAdvanced({ offset: actualOffset, limit })
    if (chars) {
      const chasFiltred = chars.filter((char: CharacterData) =>
        !char.thumbnail.path.includes('image_not_available')
        && !char.thumbnail.path.includes('F4c002e0305708'))//pegando apenas com imagem
      setCharacters(chasFiltred)
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
    <div className='flex flex-col justify-center items-center  h-screen space-y-4 overflow-hidden'>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        className='bg-cover absolute
                blur-[10px] z-0 bg-center h-screen  overflow-hidden'
      >
        {characters?.length > 0 ? (
          characters.map((char, index) => (
            <div key={char.id}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Image
                  width={1000}
                  height={1000}
                  alt={char.name}
                  className=' object-cover 
                blur-[10px] z-0 w-screen  origin-center object-center'
                  src={`${char.thumbnail.path}.${char.thumbnail.extension}`} />
              ) :
                <Image alt={char.name}
                  width={1000}
                  height={1000}
                  src={`${CharacterPlaceholder.thumbnail.path}`}
                  className=' object-cover origin-center object-center
                blur-[10px] z-0 w-screen'/>
              }
            </div>
          ))) : <Image alt={CharacterPlaceholder.name}
            width={1000}
            height={1000}
            src={`${CharacterPlaceholder.thumbnail.path}`}
            className=' object-cover
          blur-[10px] z-0 w-screen  origin-center object-center'/>
        }
      </AutoPlaySwipeableViews>
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
                    <CharacterCard
                      {...{ ...char, selectable: false }}
                    />
                  ) : <CharacterCard
                    {...{ ...CharacterPlaceholder, selectable: false }}
                  />
                  }
                </div>
              ))) : <CharacterCard
              {...{ ...CharacterPlaceholder, selectable: false }}
            />}
          </AutoPlaySwipeableViews>
          <MobileStepper
            steps={limit}
            position="static"
            activeStep={activeStep}
            sx={{
              marginTop: '20px',
              backgroundColor: 'rgb(0,0,0,0.5)',
              '.MuiMobileStepper-dot': {
                display: 'none',
              },
              '.MuiMobileStepper-dotActive': {
                display: 'none',
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
      {/* </Backdrop> */}
    </div>
  );
}
export default Carousel;