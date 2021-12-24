import { useTheme } from "../Hooks/useTheme"
import './ThemeChanger.css'
import ToggleIcon from '../Assets/toggle.svg'

const colors=["#9C3D54","#8A8635","#FFBF86"]

export default function ThemeChanger() {
    const {color,mode,changeColor,changeMode}=useTheme()
    return (
        <div className={`theme-div ${mode?"dark":null}`}>
            <img src={ToggleIcon} alt="toggle-icon" className={`toggle-icon ${mode?"dark":null}`} onClick={()=>changeMode(!mode)} style={{filter:mode?'invert(100%)':'invert(20%)'}}/>
            <div className={`color-changer ${mode?"dark":null}`}>
                {colors.map(color=>(
                    <div className="each-changer" style={{backgroundColor:color}} key={color} onClick={()=>changeColor(color)}></div>
                ))}
            </div>
        </div>
    )
}
