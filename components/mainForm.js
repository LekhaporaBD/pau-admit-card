import React,{useState} from 'react';
import Styles from '../styles/faculty.module.scss';
import axios from 'axios';

const MainForm = ({setsubmitClicked , setStudentData}) => {

    const [values, setValues] = useState({
        studentid: '',
      });

    const [err , seterr ] = useState('')
    const [settingErr , setSettingErr ] = useState('')

    const [session, setSession] = useState('Summer - 2021')
    const [term, setTerm] = useState('Mid Exam')
    
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
        .then(function (res) {setStudentData(res.data)})
        .catch(function (error) {console.log(error);})
    

        setValues({studentid : ''})
      }
    

      const errorStyle = {
        boxShadow:'-5px -5px 20px #fff,5px 5px 20px #babecc',
        color:'#b34040',padding:10 , 
        textAlign:'center', border:'1px solid' ,
        fontSize : 13, width: '70%',margin: '0 auto'
    }

    return (
        <div>
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
                
        </div>
    )
}

export default MainForm
