import React,{useState} from 'react';
import Styles from '../styles/faculty.module.scss';
import Router from 'next/router';
import QRCode from 'qrcode.react';
import Spinner from '../components/spinner/spinner'

import HeaderPart from '../components/HeaderPart'
import MainForm from '../components/mainForm'
import CancelPart from '../components/CancelPart'


const Login = () => {   
    
    const [submitClicked , setsubmitClicked ] = useState(false)
    const [studentData , setStudentData] = useState({})


    return (
        <div className={Styles.container}> 
            <div className={Styles.mainDiv}>

            < HeaderPart message='Verify a student' />

                { (submitClicked && Object.keys(studentData).length === 0 ) ? <Spinner /> : Object.keys(studentData).length === 0 ? 
                    
                    <MainForm setsubmitClicked={setsubmitClicked} setStudentData={setStudentData} /> 
                 
                    : studentData.notFound ? (  <CancelPart /> )

                :(
                           
                 <div className={Styles.studentData}>  

                    <p> Name : {studentData.Name}</p>
                    <p> ID : {studentData.ID}</p>
                    
                  { (studentData.havePermission || studentData[' Cumulative Dues '] < 5000 ) ? 
                    <p> {studentData.Name} is  Allowed For Sitting In The Exam  </p> : 
                    <p> {studentData.Name} is  <span style={{color:'red'}}> Not </span> Allowed For Sitting In The Exam  </p>  
                      
                  }
                 
                    <div style={{textAlign:'center'}}>
                    <QRCode value={`${studentData.Name} ${ (studentData.havePermission || studentData[' Cumulative Dues '] < 5000 ) ? '' : 'dont'} have permission to sit for exam`}  />
                    </div>

                 <button className={`${Styles.red} ${Styles.button}`} type="button" onClick={() => Router.reload(window.location.pathname)}>
                       Check Another
                 </button> 

                    </div>
                )
                }
            </div>
        </div>
    )
}

export default Login



