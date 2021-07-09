import React,{useState} from 'react';
import Styles from '../../styles/faculty.module.scss';
import axios from 'axios';

const MainForm = () => {

    const [values, setValues] = useState({
        studentid: '',
        studentname : '',
        permission : false
      });

    const [checked , setchecked ] = useState(false)

    const [err , seterr ] = useState('')
    const [settingErr , setSettingErr ] = useState('')

    const [session, setSession] = useState('Summer - 2021')
    const [term, setTerm] = useState('Mid Exam')
    
      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
        seterr('')
      };
console.log(values.studentname);
      
      const handleSubmit = (e) => {

        e.preventDefault();

        let id = values.studentid
        let Name = values.studentname
        
        if( id === '' || term === '' || session === '' ){
          setSettingErr('Fillup All the Fields ... ')
          return;
      }

        else if(id.length < 9) {
            seterr('Invalid Student ID ')
            return;
        } 
 
        // setsubmitClicked(true)

        if(id.includes('-')) {id =  id.split('-').join(' ')}
        else if(id.length === 9) {id =  [id.substr(0,3) , id.substr(3,3) , id.substr(6,3)].join(' ')}

        const newStudentData = {
            ID : id ,
            Name ,
            ['Cumulative Dues'] : 9999.00,
            havePermission : checked
        }

        axios.post(`/api/addStudent` , newStudentData)
        .then(function (res) {setStudentData(res.data)})
        .catch(function (error) {console.log(error);})
    

        setValues({studentid : '' , studentname : '' , permission : false})
        setchecked(false)
      }
    

      const errorStyle = {
        boxShadow:'-5px -5px 20px #fff,5px 5px 20px #babecc',
        color:'#b34040',padding:10 , 
        textAlign:'center', border:'1px solid' ,
        fontSize : 13, width: '70%',margin: '0 auto' , marginBottom:20
    }

    return (
        <div>

                <div style={{margin : '1rem auto' , textAlign:'center'}}>
                    <p style={{fontSize:27 , color:'darkgreen'}} > ADD STUDENT  </p>
                </div>


                <form className={Styles.form} style={{padding:0}}>
                {/* ID */}
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

                {/* Name */}

                <label className={Styles.label}>
                        <input 
                        type = "text" 
                        placeholder = "Student Name" 
                        className = {Styles.input} 
                        onChange = {handleChange('studentname')}
                        value = {values.studentname}
                        />
                    </label>


                    {/* Permission */}

                    <p style={{display:'flex'}}> Give Special Permission : 
                        <label className={Styles.toggleLabel}>
                        <div className={Styles.switchContainer}> 
                            <input className={Styles.switch}  type="checkbox" name="check" value="check" checked={checked} 
                                 onChange={ () => {setchecked( prevState => !prevState) ; handleChange('permission')} }/>
                            <div className={Styles.toggle}></div>
                        </div>
                        </label>
                    </p>


                    { settingErr && <p 
                        style={errorStyle} > 
                        {settingErr} </p>
                    }


                    <button className={`${Styles.red} ${Styles.button}`} style={{marginBottom:30}} type="submit" onClick={handleSubmit}>
                        ADD Student
                    </button> 

                </form>  
                
        </div>
    )
}

export default MainForm
