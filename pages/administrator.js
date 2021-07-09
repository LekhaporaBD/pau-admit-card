import React,{useState , useEffect} from 'react'
import Styles from '../styles/faculty.module.scss'
import axios from 'axios'
import Spinner from '../components/spinner/spinner'
import Alert from '@material-ui/lab/Alert';
import Router from 'next/router';


import HeaderPart from '../components/HeaderPart'
import MainForm from '../components/mainForm'
import CancelPart from '../components/CancelPart'

import AddStudent from '../components/addStudent'

const Login = () => {   
    

    const [submitClicked , setsubmitClicked ] = useState(false)

    const [open, setOpen] = useState(false);
    const [showAlert , setshowAlert ] = useState(false)
    const [showError , setshowError ] = useState(false)

    const [showAddStudent , setshowAddStudent ] = useState(false)

    const [studentData , setStudentData] = useState({}) ;
    const [checked , setchecked ] = useState(studentData.havePermission)

    useEffect(() => {
        setchecked(studentData.havePermission)
    }, [studentData])
      
      const handleUpdate = () => {
          
        studentData['havePermission'] = checked;

        let id = studentData.ID;

        axios.put(`/api/student/${id}` , studentData )
        .then(function (res) {
            console.log(res.data);
            setshowAlert(true)
        })
        .catch(function (error) {
         console.log(error);
         setshowError(true)
        })

        
      }



    
    return (
        <div className={Styles.container}> 
            <div className={Styles.mainDiv}>

            < HeaderPart message='Give Permission to students' />

            <button className={`${Styles.red} ${Styles.subButton}`} type="submit" onClick={ () => setshowAddStudent( prevState => !prevState)}>
                        Add Student
            </button> 

            { showAddStudent && <AddStudent setOpenModal={setshowAddStudent} openModal={showAddStudent} /> }
     

                { showAlert? <Alert severity="success"><p> You successfully Changed him/her Special Permission Status</p>  <button onClick={() => Router.reload(window.location.pathname)} className={`${Styles.red} ${Styles.button}`}> Go Back To The Main Page</button> </Alert> :
                   showError ?  <Alert severity="error"><p> There is something worng. </p>  <button onClick={() => Router.reload(window.location.pathname)} className={`${Styles.red} ${Styles.button}`}> Go Back And try again </button></Alert> : 
                  (submitClicked && Object.keys(studentData).length === 0 ) ? <Spinner /> : 
                  Object.keys(studentData).length === 0 ? 
                    
                  <MainForm setsubmitClicked={setsubmitClicked} setStudentData={setStudentData} />

                  : studentData.notFound ? (  <CancelPart /> )
                
                  : (
                            
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
                )
                }
                
            </div>
        </div>
    )
}

export default Login