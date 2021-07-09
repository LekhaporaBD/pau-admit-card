import React from 'react'
import Image from 'next/image'


const HeaderPart = ({message}) => {
    return (
        <div>
                <div style={{marginBottom : '2rem' , textAlign:'center'}}>
                    <Image src='/logo.png' alt="me" width="120" height="130" />
                </div>

                <div style={{margin : '2rem auto' , textAlign:'center'}}>
                    <p style={{fontSize:30 , color:'darkblue'}} > {message} <br/> From Here  </p>
                </div>
        </div>
    )
}

export default HeaderPart
