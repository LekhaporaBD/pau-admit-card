import React, {useState, useEffect} from 'react';
import jsPDF from 'jspdf';
import QRCode from 'qrcode'
import imageUrI from './imageUrI'
import { format } from 'date-fns';

import Styles from '../styles/faculty.module.scss';



const AdmitCardGenerator = ({studentData, session, term}) => {
  const [url, setUrl] = useState('')

  useEffect(() => {
    QRCode.toDataURL(`${studentData.Name} have permission to sit for exam`)
    .then(url => {
      setUrl(url)
    })
    .catch(err => {
      console.error(err)
    })
  }, [])

  const handleSubmit = () => {

    const doc = new jsPDF({
      orientation: 'l',
      unit: 'px',
      format: 'a5',
      putOnlyUsedFonts:true,
      floatPrecision: 16
    });

    //Adding University Logo
    doc.addImage(imageUrI, 'jpg', 24, -5, 400, 89)

    //Adding qrcode
    doc.addImage(url, 'png', doc.internal.pageSize.width - 100, 160)

    // Setting up Exam Session
    doc.setFontSize(35)
    doc.text(82, 100, `Admit Card - ${term}`)

    //Setting Line
    doc.setDrawColor(44, 45, 146)
    doc.setLineWidth(2)
    doc.line(100, 110, 350, 110)

    // Setting up Information
    doc.setFontSize(20)
    doc.text(50, 150, 'Name')
    doc.text(135, 150, ':')
    doc.text(150, 150, studentData.Name)

    doc.text(50, 180, 'Id')
    doc.text(135, 180, ':')
    doc.text(150, 180, studentData.ID)

    doc.text(50, 210, 'Batch: ')
    doc.text(135, 210, ':')
    doc.text(150, 210, studentData.ID.trim().substring(0,3))

    doc.text(50, 240, 'Department')
    doc.text(135, 240, ':')
    doc.text(150, 240, 'CSE')

    doc.text(50, 270, 'Semester')
    doc.text(135, 270, ':')
    doc.text(150, 270, session)
  

    doc.setDrawColor(44, 45, 146)
    doc.setLineWidth(1)
    doc.line(0, doc.internal.pageSize.height - 20, doc.internal.pageSize.width, doc.internal.pageSize.height - 20)

    doc.setTextColor(150);
    doc.setFontSize(12)
    var today = new Date();
    doc.text(50, doc.internal.pageSize.height - 8, `Timestamp: ${format(today, 'do MMMM, eeee, yyyy | p')}`);
    // doc.text(50, doc.internal.pageSize.height - 8, `Timestamp: ${today.getDate()} - ${today.getMonth()+1} - ${today.getFullYear()} :: ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`);

    doc.save(`Admit Card - ${studentData.ID}`);
  }
  return (
    <button className={`${Styles.red} ${Styles.button}`} type="submit" onClick={handleSubmit}>
      Download AdmitCard
    </button> 
  )
}


export default AdmitCardGenerator

