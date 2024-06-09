import React from 'react'
import { IoIosClose } from "react-icons/io";

export default function AddStock(props) {
  return (props.trigger) ? (
    <div>
        <div >
            <button onClick={()=>props.setTrigger(false)}><IoIosClose/></button>
            {props.children}
        </div>
    </div>
  ) : ""
}
