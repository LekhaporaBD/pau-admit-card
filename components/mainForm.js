import React,{useState} from 'react';
import Image from 'next/image';
import Styles from '../styles/faculty.module.scss';
import axios from 'axios';
import Router from 'next/router';
import QRCode from 'qrcode.react';
import Spinner from '../components/spinner/spinner'


const mainForm = () => {

    const [values, setValues] = useState({
        studentid: '',
      });

    const [err , seterr ] = useState('')
    const [settingErr , setSettingErr ] = useState('')

    const [submitClicked , setsubmitClicked ] = useState(false)

    const [examSessionValue , setexamSessionValue ] = useState('')
    const [examTypeValue , setexamTypeValue ] = useState('')

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
            
        </div>
    )
}

export default mainForm
