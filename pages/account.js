import React,{useState} from 'react'
import Image from 'next/image'
import Styles from '../styles/faculty.module.scss'
import axios from 'axios'
import Spinner from '../components/spinner/spinner'
import Alert from '@material-ui/lab/Alert';
import Router from 'next/router';

const Login = () => {   
    
    const [values, setValues] = useState({studentid: ''});

    const [err , seterr ] = useState('')

    const [submitClicked , setsubmitClicked ] = useState(false)
    
    const [showAlert , setshowAlert ] = useState(false)
    const [showError , setshowError ] = useState(false)

    const [studentData , setStudentData] = useState({})    
    
    const [due , setdue ] = useState('')

    
      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
        seterr('')
      };
      
      const handleUpdate = () => {
        studentData[' Cumulative Dues '] = due;

        let id = studentData.ID;
        
        axios.put(`/api/student/${id}` , studentData )
        .then(function (res) {
            console.log(res.data);
            setshowAlert(true)
            // setStudentData(res.data)
        })
        .catch(function (error) {console.log(error) ; setshowError(true)})
        
      }


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

                    <Image src='logo.png' alt="me" width="120" height="130" />
                </div>

                <div style={{margin : '2rem auto' , textAlign:'center'}}>
                    <p style={{fontSize:30 , color:'darkblue'}} > Choose A Student <br/> From Here  </p>
                </div>

                { showAlert? <Alert severity="success"><p> You successfully Changed him/her Special Permission Status</p>  <button onClick={() => Router.reload(window.location.pathname)} className={`${Styles.red} ${Styles.button}`}> Go Back To The Main Page</button> </Alert> :
                   showError ?  <Alert severity="error"><p> There is something worng. </p>  <button onClick={() => Router.reload(window.location.pathname)} className={`${Styles.red} ${Styles.button}`}> Go Back And try again </button></Alert> : 
                    (submitClicked && Object.keys(studentData).length === 0 ) ? <Spinner /> :
                     Object.keys(studentData).length === 0 ? 
                    
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
                        Search Student
                    </button> 

                </form>  
                
                :
                           
                 <div className={Styles.studentData}>  

                    <p> Name : {studentData.Name}</p>
                    <p> ID : {studentData.ID}</p>
                    <p> Dues :  <label className={Styles.label}>
                        <input 
                        type = "text" 
                        placeholder = "Cumulative Dues" 
                        className = {Styles.input} 
                        style={{textAlign:'center' }}
                        onChange = {(e) => setdue(e.target.value)}
                        value = {due.length === 0  ? studentData[' Cumulative Dues '] : due}
                        />
                    </label></p>
                

                    <button className={`${Styles.red} ${Styles.button}`} type="button" onClick={handleUpdate}>
                        Update Student
                    </button> 

                    </div>
                }
                
            </div>
        </div>
    )
}

export default Login



