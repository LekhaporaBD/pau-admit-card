import React,{useState} from 'react';
import Image from 'next/image';
import Styles from '../styles/faculty.module.scss';
import axios from 'axios';
import Router from 'next/router';
import QRCode from 'qrcode.react';
import Spinner from '../components/spinner/spinner'

const Login = () => {   
    
    const [values, setValues] = useState({
        studentid: '',
      });

    const [err , seterr ] = useState('')
    const [settingErr , setSettingErr ] = useState('')

    const [submitClicked , setsubmitClicked ] = useState(false)

    const [examSessionValue , setexamSessionValue ] = useState('Summer - 2021')
    const [examTypeValue , setexamTypeValue ] = useState('Mid Exam')

    const [studentData , setStudentData] = useState({})

    
      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
        seterr('')
      };

      
      const handleSubmit = (e) => {

        e.preventDefault();
        
        let id = values.studentid
        
        if( id === '' || examTypeValue === '' || examSessionValue === '' ){
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

                        <select className={`${Styles.examSession} ${Styles.select}`} value={examSessionValue} onChange={ (e) => setexamSessionValue(e.target.value)} >
                            <option value="0" selected disabled >Exam session </option>
                            <option value="1"  > Summer 2021 </option>
                            <option value="2" disabled > Fall 2021 </option>
                            <option value="3" disabled > Spring 2021 </option>
                        </select>
                        </div>
                        <div className={Styles.selectWrapper}>

                        <select className={`${Styles.examType} ${Styles.select}`} value={examTypeValue} onChange={ (e) => setexamTypeValue(e.target.value)} >
                            <option value="7" selected disabled >Exam Type </option>
                            <option value="8"  > Mid Exam </option>
                            <option value="9"  > Final Exam </option>
                        </select>          
                        </div>         
                    </div>

                    { settingErr && <p 
                        style={errorStyle} > 
                        {settingErr} </p>
                    }

                    <button className={`${Styles.indigo} ${Styles.button}`} type="submit" onClick={handleSubmit}>
                        Verify Student
                    </button> 

                </form>  
                 
                :
                           
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
                }
            </div>
        </div>
    )
}

export default Login



