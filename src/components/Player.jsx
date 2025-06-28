import { useState } from "react"
export default function player({initialName,symbol,isActive,onChangeName}){
    const [playerName,setPlayerName]=useState(initialName)
    const [isEditing, setIsEditing]=useState(false)
    function handleEditClick(){
        setIsEditing((editing)=>!isEditing);
        if(isEditing){
            onChangeName(symbol,playerName)
        }
        
    }
    function handleChange(event){
        setPlayerName(event.target.value)
        
    }

    let editablePlayerName=<span className="player-name">{playerName}</span>
    let btnCaption='save'
    if(isEditing){
        editablePlayerName=<input type="text" required Value={playerName} onChange={handleChange}/>
    }
    return <li className={isActive?'active':undefined}><span className="player">
        {editablePlayerName}
    <span className="player-symbol">{symbol}</span>
    </span>
    <button onClick={handleEditClick}>{isEditing?'save':'edit'}</button>
    </li>
}