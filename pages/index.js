import React,{useState} from 'react'
import Image from 'next/image'
import Styles from '../styles/faculty.module.scss'
import axios from 'axios'
import QRCode from 'qrcode.react'
import AdmitCardGenerator from '../components/admitCardGenerator'
import Spinner from '../components/spinner/spinner'
import Router from 'next/router';
import CancelIcon from '@material-ui/icons/Cancel';

const Login = () => {   
    
    const [values, setValues] = useState({
        studentid: '',
      });

    const [err , seterr] = useState('');
    const [session, setSession] = useState('Summer - 2021')
    const [term, setTerm] = useState('Mid Exam')
    const [submitClicked , setsubmitClicked ] = useState(false)
    const [settingErr , setSettingErr ] = useState('')

    const [studentData , setStudentData] = useState({})

    
      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
        seterr('')
      };
      
      const handleSubmit = (e) => {

        e.preventDefault();
        let id = values.studentid

        if( id === '' || term === '' || session === '' ){
            setSettingErr('Fillup All the Fields ... ')
            return;
        }

        else if(id.length < 9) {
            seterr('Invalid Student ID ')
            return;
        } 

        
        setsubmitClicked(true)


         if(id.includes('-')) {id =  id.split('-').join(' ')}
        else if(id.length === 9) {id =  [id.substr(0,3) , id.substr(3,3) , id.substr(6,3)].join(' ')}

        axios.get(`/api/student/${id}`)
        .then(function (res) {
            setStudentData(res.data)
        })
        .catch(function (error) {
         console.log(error);
        })

         

        setValues({studentid : ''})
      }

      const errorStyle = {
        color:'#b34040' ,
        boxShadow:'-5px -5px 20px #fff,5px 5px 20px #babecc',
        padding:10 , 
        textAlign:'center', 
        border:'1px solid' ,
        fontSize : 13,
        width: '70%',
        margin: '0 auto'
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
                    { err && <p style={errorStyle} > {err} </p>}

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

                    { settingErr && <p 
                        style={errorStyle} > 
                        {settingErr} </p>
                    }


                    <button className={`${Styles.red} ${Styles.button}`} type="submit" onClick={handleSubmit}>
                        Submit
                    </button> 

                </form>  
                
                : studentData.notFound ? (
                    <div className={Styles.studentData}>
                        <CancelIcon style={{width: '7rem', height: '7rem', color: '#6ab04c'}}/>
                        <p style={{textAlign: 'center'}}>Sorry, The ID you searched for is Not Found in our Database</p>
                        <button className={`${Styles.red} ${Styles.button}`} type="button" 
                                onClick={ () => Router.reload(window.location.pathname) }>
                                    Go Back 
                        </button> 
                    </div>
                ) 
                : (
                           
                <div className={Styles.studentData}>  
                    <p> Name : {studentData.Name}</p>
                    <p> ID : {studentData.ID}</p>
                    <p> Permission :  You { (studentData.havePermission || studentData[' Cumulative Dues '] < 5000 ) ? '' : 'Dont'} have permission  </p>
                 
                    <div style={{textAlign:'center'}}>
                     <QRCode value={`${studentData.Name}, you ${ (studentData.havePermission || studentData[' Cumulative Dues '] < 5000 ) ? '' : 'dont'} have permission to sit for exam`}  />
                    </div>

                    { (studentData.havePermission || studentData[' Cumulative Dues '] < 5000 ) ? 

                        <AdmitCardGenerator studentData={studentData} session={session} term={term}/> : 
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



