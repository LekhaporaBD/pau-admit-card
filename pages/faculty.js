import React,{useState} from 'react';
import Image from 'next/image';
import Styles from '../styles/faculty.module.scss';
import axios from 'axios';
import AdmitCardGenerator from '../components/admitCardGenerator';
import Router from 'next/router';
import QRCode from 'qrcode.react';
import Spinner from '../components/spinner/spinner'

const Login = () => {   
    
    const [values, setValues] = useState({
        studentid: '',
      });

    const [err , seterr ] = useState('')

    const [submitClicked , setsubmitClicked ] = useState(false)

    const [studentData , setStudentData] = useState({})

    
      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
        seterr('')
      };

      
      const handleSubmit = (e) => {

        e.preventDefault();
        setsubmitClicked(true)
        let id = values.studentid

        if(id.length < 9) seterr('Invalid Student ID ')
        else if(id.includes('-')) {id =  id.split('-').join(' ')}
        else if(id.length === 9) {id =  [id.substr(0,3) , id.substr(3,3) , id.substr(6,3)].join(' ')}

        axios.get(`/api/student/${id}`)
        .then(function (res) {
            console.log(res);
            setStudentData(res.data)
        })
        .catch(function (error) {
         console.log(error);
        })

         

        setValues({studentid : ''})
      }
    

    return (
        <div className={Styles.container}> 
            <div className={Styles.mainDiv}>

                <div style={{marginBottom : '2rem' , textAlign:'center'}}>
                    <Image src='/logo.png' alt="me" width="120" height="130" />
                </div>

                <div style={{margin : '2rem auto' , textAlign:'center'}}>
                    <p style={{fontSize:30 , color:'darkblue'}} > Download Your Admit Card <br/> From Here  </p>
                </div>

                { (submitClicked && Object.keys(studentData).length === 0 ) ? <Spinner /> : Object.keys(studentData).length === 0 ? 
                    
                <form className={Styles.form}>
                    <label className={Styles.label}>
                        <input 
                        type = "text" 
                        placeholder = "Student ID" 
                        className = {Styles.input} 
                        onChange = {handleChange('studentid')}
                        value = {values.studentid}
                        />
                    </label>
                    { err && <p style={{color:'red'}} > {err} </p>}

                    <div className={Styles.optionHolder} >
                    <div className={Styles.selectWrapper}>

                        <select className={`${Styles.examSession} ${Styles.select}`} >
                            <option value="0" selected disabled >Exam session </option>
                            <option value="1"  > Summer 2021 </option>
                            <option value="2" disabled > Fall 2021 </option>
                            <option value="3" disabled > Spring 2021 </option>
                        </select>
                        </div>
                        <div className={Styles.selectWrapper}>

                        <select className={`${Styles.examType} ${Styles.select}`} >
                            <option value="7" selected disabled >Exam Type </option>
                            <option value="8"  > Mid Exam </option>
                            <option value="9"  > Final Exam </option>
                        </select>          
                        </div>         
                    </div>

                    <button className={`${Styles.red} ${Styles.button}`} type="submit" onClick={handleSubmit}>
                        Verify Student
                    </button> 

                </form>  
                 
                :
                           
                 <div className={Styles.studentData}>  

                    <p> Name : {studentData.Name}</p>
                    <p> ID : {studentData.ID}</p>
                    
                  { (studentData.havePermission || studentData[' Cumulative Dues '] < 5000 ) ? 
                    <p> {studentData.Name} is <br/> Allowed For Sitting In The Exam  </p> : 
                    <p> {studentData.Name} is <br/> <span style={{color:'red'}}> Not </span> Allowed For Sitting In The Exam  </p>  
                      
                  }
                 
                    <div style={{textAlign:'center'}}>
                     <QRCode 
                        value=  {`${studentData.Name} have ${studentData[' Cumulative Dues ']} taka Dues`}  />
                    </div>

                 <button className={`${Styles.red} ${Styles.button}`} type="button" onClick={() => Router.reload(window.location.pathname)}>
                       Check Another
                 </button> 

                    </div>
                }
            </div>
        </div>
    )
}

export default Login



