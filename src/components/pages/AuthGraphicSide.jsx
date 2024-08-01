import person from '../../assets/images/figma/auth-person.png';
import eclipse from '../../assets/images/figma/eclipse.svg';

const AuthGraphicSide = () => {
    return (
        <>
            <img src={person} alt='Illustration' className='z-1 position-absolute top-50 start-50 translate-middle'></img>
            <img src={eclipse} alt="" className='z-10' style={{ position: 'absolute', bottom: 0, width: '200%', height: 'auto'}} />
        </>
    )
}

export default AuthGraphicSide