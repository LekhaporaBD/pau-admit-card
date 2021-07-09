import React from 'react'
import CancelIcon from '@material-ui/icons/Cancel';
import Styles from '../styles/faculty.module.scss'
import Router from 'next/router';


const CancelPart = () => {
    return (
        <div className={Styles.studentData} style={{textAlign:'center'}} >
            <CancelIcon style={{width: '7rem', height: '7rem', color: '#B04C33'}}/>

             <p style={{textAlign: 'center'}}>Sorry, The ID you searched for is Not Found in our Database</p>

        <button className={`${Styles.red} ${Styles.button}`} type="button" 
                onClick={ () => Router.reload(window.location.pathname) }>
                    Go Back 
        </button> 
    </div>
    )
}

export default CancelPart
