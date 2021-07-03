import React,{useState} from 'react'
import Image from 'next/image'
import Styles from '../styles/faculty.module.scss'
import axios from 'axios'
import QRCode from 'qrcode.react'
import AdmitCardGenerator from '../components/admitCardGenerator'
import Spinner from '../components/spinner/spinner'
import Router from 'next/router';


const Login = () => {   
    
    const [values, setValues] = useState({
        studentid: '',
      });

    const [err , seterr] = useState('');
    const [session, setSession] = useState('Summer - 2021')
    const [term, setTerm] = useState('Mid Exam')
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
      console.log(values)
    
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
                        <select 
                            value={session}
                            className={`${Styles.examSession} ${Styles.select}`} 
                            onChange={(e) => setSession(e.target.value)}
                        >
                            <option value="Summer - 2021" selected > Summer 2021 </option>
                            <option value="Spring - 2021" disabled> Spring 2021 </option>
                            <option value="Fall - 2021" disabled > Fall 2021 </option>
                        </select>
                        </div>
                        <div className={Styles.selectWrapper}>
                        <select 
                            value={term}
                            className={`${Styles.examType} ${Styles.select}`}
                            onChange={(e) => setTerm(e.target.value)}
                         >
                            <option value="Mid Exam" selected > Mid Exam </option>
                            <option value="Final Exam"> Final Exam </option>
                        </select>      
                        </div>
                    </div>

                    <button className={`${Styles.red} ${Styles.button}`} type="submit" onClick={handleSubmit}>
                        Submit
                    </button> 

                </form>  
                
                :
                           
                <div className={Styles.studentData}>  
                    <p> Name : {studentData.Name}</p>
                    <p> ID : {studentData.ID}</p>
                    <p> Due :  {studentData[' Cumulative Dues ']}</p>
                 
                    <div style={{textAlign:'center'}}>
                     <QRCode value={`${studentData.Name} have ${studentData[' Cumulative Dues ']} taka Dues`}  />
                    </div>

                    { (studentData.havePermission || studentData[' Cumulative Dues '] < 5000 ) ? 
                        <AdmitCardGenerator studentData={studentData} session={session} term={term}/> : 
                           <button className={`${Styles.red} ${Styles.button}`} type="button" 
                                onClick={ () => Router.reload(window.location.pathname) }>
                                    Go Back 
                            </button> 
                    }

                  </div>
                }
                
                
            </div>
        </div>
    )
}

export default Login



