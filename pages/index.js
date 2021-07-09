import React,{useState} from 'react'
import Styles from '../styles/faculty.module.scss'
import QRCode from 'qrcode.react'
import AdmitCardGenerator from '../components/admitCardGenerator'
import Spinner from '../components/spinner/spinner'
import Router from 'next/router';

import HeaderPart from '../components/HeaderPart'
import MainForm from '../components/mainForm'
import CancelPart from '../components/CancelPart'

const Login = () => {   
    
    const [submitClicked , setsubmitClicked ] = useState(false)
    const [studentData , setStudentData] = useState({})

    
    return (
        <div className={Styles.container}> 
            <div className={Styles.mainDiv}>

                < HeaderPart message='Download Your Admit Card' />

                { (submitClicked && Object.keys(studentData).length === 0 ) ? <Spinner /> : Object.keys(studentData).length === 0 ?   
                    
                    <MainForm setsubmitClicked={setsubmitClicked} setStudentData={setStudentData} />
           
                : studentData.notFound ? (  <CancelPart /> )
                
                : (
                           
                <div className={Styles.studentData}>  
                    <p> Name : {studentData.Name}</p>
                    <p> ID : {studentData.ID}</p>
                    <p> Permission :  You { (studentData.havePermission ) ? '' : 'Dont'} have permission  </p>
                 
                    <div style={{textAlign:'center'}}>
                     <QRCode value={`${studentData.Name}, you ${ (studentData.havePermission || studentData[' Cumulative Dues '] < 5000 ) ? '' : 'dont'} have permission to sit for exam`}  />
                    </div>

                    { (studentData.havePermission ) ? 

                        <AdmitCardGenerator studentData={studentData} session={'Summer - 2021'} term={'Mid Exam'}/> : 
                           <button className={`${Styles.red} ${Styles.button}`} type="button" 
                                onClick={ () => Router.reload(window.location.pathname) }>
                                    Go Back 
                            </button> 
                    }

                  </div>
                )
                }
                
                
            </div>
        </div>
    )
}

export default Login



