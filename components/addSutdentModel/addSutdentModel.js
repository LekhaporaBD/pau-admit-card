import React from 'react'
import Classes from './addSutdentModel.module.scss'
import AddStudentForm from './addStudentForm'

const AddSutdentModel = ({handleClose}) => {

    const userData = ''
    return (
        <div> 
             <div className={Classes.switch} >
                {/* <div className={Classes.circle}></div> */}
                {/* <div className={`${Classes.circle} ${Classes.circleT}`}></div>  */}
                <div className={Classes.container} >
                    <AddStudentForm />
                </div>
            </div> 
        </div>
    )
}

export default AddSutdentModel
