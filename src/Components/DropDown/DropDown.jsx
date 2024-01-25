import React, { useState } from 'react'
import './DropDown.css'
import { FaAngleDown } from "react-icons/fa";

const DropDown = ({value,options,handleChange,id,handleDelete}) => {
    const [isOpen,setIsOpen] = useState(false)
    const [selectedValue,setSeletedValue] = useState(value)

    const handleIsOpen=()=>{
        setIsOpen(!isOpen)
    }

    const handleSelected=(val)=>{
        handleChange(val,id)
        setSeletedValue(val.Label) 
        handleIsOpen()
    }

    let color=''

    switch (value) {
        case "First name":
          color = "#4bcebc";
          break;
        case "Account Name":
          color = "#d22020";
          break;
        default:
          color = " #d5eff9";
      }

  return (
    <div className='schema-dropdown-container'>
        <div className='schema-dropdown-type' style={{backgroundColor:color}}></div>
        <div className='schema-dropdown-body'>
            <div className='schema-dropdown-input'>{value || selectedValue}</div>
           <div className='schema-dropdown-icon'><FaAngleDown onClick={handleIsOpen} style={{fontSize:'1.2rem',color:' #5a7c93'}} /></div>
            <div className={`schema-dropdown-list ${isOpen ? 'visible' : ''}`} >
                {options.map((eachItem)=>{
                    return(
                        <div key={eachItem.id} className='schema-dropdown-list-item' onClick={()=>handleSelected(eachItem)}>{eachItem.Label}</div>
                    )
                })}
        </div>
        </div>
        <div className='schema-dropdown-delete' onClick={()=>handleDelete(id)}>
            <div className='schema-dropdown-delete-icon'></div>
        </div>
       
    </div>
  )
}

export default DropDown