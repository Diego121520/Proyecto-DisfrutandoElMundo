import wallpaper from '../../LandingPage.jpg';
import styles from './landingpage.module.css';
import {Link} from 'react-router-dom';
function LandingPage(){
    return (
        <div className = {styles.container}>
            <img className = {styles.wallpaper} src = {wallpaper} alt = "https://www.google.com/search?q=countries+wallpaper&sxsrf=ALeKk01X-twkHGlhtOARkMAOpDs0dI5c9g:1618281502758&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjS-_iwmPrvAhVDIbkGHaXNBn4Q_AUoAXoECAIQAw&biw=1106&bih=494&dpr=1.23#imgrc=mnIBkoQ7RA1a1M"/>
            <Link to  = '/home'>
            <h1 className = {styles.title}>Comenzar</h1>
            </Link>
        </div>
    )
}

export default LandingPage;