import { useContext } from 'react';
import Button from './Button';
import ModeContext from '../context/ModeContext'

function Toggle() {
  // const [isLight, setIsLight] = useState(true);
  const ctx = useContext(ModeContext); 

  // const handlerToggleLight = () => {
  //   setIsLight(() => !isLight);
  //   console.log('isLight:', isLight);
  // }
  // const buttonLabel = isLight ? '🌞' : '🌛';
  const buttonLabel = ctx.isLight ? '🌞' : '🌛';
  return (
  <span>
    Toggle Mode<Button label={buttonLabel} onClick={ctx.handlerToggle} />
  </span>
  )
}

export default Toggle;