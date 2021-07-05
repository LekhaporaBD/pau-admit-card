import React,{useState} from 'react'
import Image from 'next/image'
import Styles from '../styles/faculty.module.scss'
import axios from 'axios'
import Spinner from '../components/spinner/spinner'
import Alert from '@material-ui/lab/Alert';
import Router from 'next/router';

const Login = () => {   
    
    const [values, setValues] = useState({
        studentid: '',
      });

    const [err , seterr ] = useState('')
    const [settingErr , setSettingErr ] = useState('')

    const [examSessionValue , setexamSessionValue ] = useState('Summer - 2021')
    const [examTypeValue , setexamTypeValue ] = useState('Mid Exam')

    const [submitClicked , setsubmitClicked ] = useState(false)
    // const [checked , setchecked ] = useState(false)


    const [showAlert , setshowAlert ] = useState(false)
    const [showError , setshowError ] = useState(false)

    const [studentData , setStudentData] = useState({})
    const [checked , setchecked ] = useState(studentData.havePermission)
    
    console.log(checked)
      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
        seterr('')
      };
      
      const handleUpdate = () => {
        studentData['havePermission'] = checked;

        let id = studentData.ID;

        axios.put(`/api/student/${id}` , studentData )
        .then(function (res) {
            console.log(res.data);
            setshowAlert(true)
            // setStudentData(res.data)
        })
        .catch(function (error) {
         console.log(error);
         setshowError(true)
        })

        
      }

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

        if(id.length < 9) seterr('Invalid Student ID ')
        else if(id.includes('-')) {id =  id.split('-').join(' ')}
        else if(id.length === 9) {id =  [id.substr(0,3) , id.substr(3,3) , id.substr(6,3)].join(' ')}

        axios.get(`/api/student/${id}`)
        .then(function (res) {
            setStudentData(res.data)
            setchecked(res.data.havePermission)
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

                    <button className={`${Styles.red} ${Styles.button}`} type="submit" onClick={handleSubmit}>
                        Search Student
                    </button> 

                </form>  
                
                :  
                            
                 <div className={Styles.studentData}>  

                    <p> Name : {studentData.Name}</p>
                    <p> ID : {studentData.ID}</p>

                    <p style={{display:'flex'}}> Give Special Permission : 
                    <label className={Styles.toggleLabel}>
                      <div className={Styles.switchContainer}> 
                        <input className={Styles.switch}  type="checkbox" name="check" value="check" checked={checked} onChange={ () => setchecked( prevState => !prevState) }/>
                        <div className={Styles.toggle}></div>
                      </div>
                    </label></p>

                    <button className={`${Styles.red} ${Styles.button}`} type="submit" onClick={handleUpdate}>
                        Update Student
                    </button> 

                    </div>
                }
                
            </div>
        </div>
    )
}

export default Login