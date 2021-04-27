import React from 'react';
import jsPDF from 'jspdf'
import imageUrI from './imageUrI'
import Styles from '../styles/faculty.module.scss';


const AdmitCardGenerator = ({studentData}) => {

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

    // Setting up Exam Session
    doc.setFontSize(30)
    doc.text(150, 100, 'Summer - 2021')

    //Setting Line
    // doc.setLineWidth(2)
    // doc.line(200, 30, 200, 100)
    // doc.setDrawColor(44, 45, 146)

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
    doc.save();
  }
  return (
    <button className={`${Styles.red} ${Styles.button}`} type="submit" onClick={handleSubmit}>
      Download AdmitCard
    </button> 
  )
}


export default AdmitCardGenerator

