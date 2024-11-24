import React, { useState, useEffect } from 'react';

import styles from './section8.module.css';

const Section8 = ({ signal, onSubmit, results }) => {
  // Initial state for table rows with 5 rows of sub-columns
  const initialRows = Array.from({ length: 5 }, () => ({
    singleLG: '', singleMLG: '', singleFreq: '',
    tandemLG: '', tandemMLG: '', tandemFreq: '',
    tridemLG: '', tridemMLG: '', tridemFreq: ''
  }));
  
  const [rows, setRows] = useState(initialRows);

  // Handle adding a new row
  const handleAddRow = () => {
    const newRow = { singleLG: '', singleMLG: '', singleFreq: '', tandemLG: '', tandemMLG: '', tandemFreq: '', tridemLG: '', tridemMLG: '', tridemFreq: '' };
    setRows([...rows, newRow]);
  };

  // Handle updating cell data
  const handleChange = (index, field, value) => {
    const updatedRows = rows.map((row, rowIndex) =>
      rowIndex === index ? { ...row, [field]: value } : row
    );
    setRows(updatedRows);
  };

  useEffect(()=>{
    if(signal){
        const nonNullRows = rows.filter(row => 
            Object.values(row).every(value => value !== null && value.trim() !== '')
        );
        onSubmit(nonNullRows);
    }
  },[signal,rows]);



  return (
    <div className={styles.container}>
        <div className={styles.heading}>
            Axle Load Spectrum Data
        </div>
        <div className={styles.tableContainer}>
            <table border="1" cellPadding="10" cellSpacing="0" className={styles.table}>
                <thead className={styles.tableHeader}>
                <tr className={styles.mainHeader}>
                    <th colSpan="3" className={styles.mainHeaderCol}>Rear Single Axle</th>
                    <th colSpan="3" className={styles.mainHeaderCol}>Rear Tandem Axle</th>
                    <th colSpan="3" className={styles.mainHeaderCol}>Rear Tridem Axle</th>
                </tr>
                <tr className={styles.subHeader}>
                    <th className={styles.subHeaderCol}>Load Group (kN)</th>
                    <th className={styles.subHeaderCol}>Mid-Point of Load Group (kN)</th>
                    <th className={styles.subHeaderCol}>Frequency(%)</th>
                    <th className={styles.subHeaderCol}>Load Group (kN)</th>
                    <th className={styles.subHeaderCol}>Mid-Point of Load Group (kN)</th>
                    <th className={styles.subHeaderCol}>Frequency(%)</th>
                    <th className={styles.subHeaderCol}>Load Group (kN)</th>
                    <th className={styles.subHeaderCol}>Mid-Point of Load Group (kN)</th>
                    <th className={styles.subHeaderCol}>Frequency(%)</th>
                </tr>
                </thead>
                <tbody className={styles.tableBody}>
                {rows.map((row, index) => (
                    <tr key={index} className={styles.tableRow}>
                    <td className={styles.tableRowValue}>
                        <input
                        type="text"
                        value={row.singleLG}
                        onChange={(e) => handleChange(index, 'singleLG', e.target.value)}
                        className={`${styles.inputs} ${index % 2 === 0 ? styles.evenClass : styles.oddClass}`}
                        />
                    </td>
                    <td className={styles.tableRowValue}>
                        <input
                        type="text"
                        value={row.singleMLG}
                        onChange={(e) => handleChange(index, 'singleMLG', e.target.value)}
                        className={`${styles.inputs} ${index % 2 === 0 ? styles.evenClass : styles.oddClass}`}
                        />
                    </td>
                    <td className={styles.tableRowValue}>
                        <input
                        type="text"
                        value={row.singleFreq}
                        onChange={(e) => handleChange(index, 'singleFreq', e.target.value)}
                        className={`${styles.inputs} ${index % 2 === 0 ? styles.evenClass : styles.oddClass}`}
                        />
                    </td>
                    <td className={styles.tableRowValue}>
                        <input
                        type="text"
                        value={row.tandemLG}
                        onChange={(e) => handleChange(index, 'tandemLG', e.target.value)}
                        className={`${styles.inputs} ${index % 2 === 0 ? styles.evenClass : styles.oddClass}`}
                        />
                    </td>
                    <td className={styles.tableRowValue}>
                        <input
                        type="text"
                        value={row.tandemMLG}
                        onChange={(e) => handleChange(index, 'tandemMLG', e.target.value)}
                        className={`${styles.inputs} ${index % 2 === 0 ? styles.evenClass : styles.oddClass}`}
                        />
                    </td>
                    <td className={styles.tableRowValue}>
                        <input
                        type="text"
                        value={row.tandemFreq}
                        onChange={(e) => handleChange(index, 'tandemFreq', e.target.value)}
                        className={`${styles.inputs} ${index % 2 === 0 ? styles.evenClass : styles.oddClass}`}
                        />
                    </td>
                    <td className={styles.tableRowValue}>
                        <input
                        type="text"
                        value={row.tridemLG}
                        onChange={(e) => handleChange(index, 'tridemLG', e.target.value)}
                        className={`${styles.inputs} ${index % 2 === 0 ? styles.evenClass : styles.oddClass}`}
                        />
                    </td>
                    <td className={styles.tableRowValue}>
                        <input
                        type="text"
                        value={row.tridemMLG}
                        onChange={(e) => handleChange(index, 'tridemMLG', e.target.value)}
                        className={`${styles.inputs} ${index % 2 === 0 ? styles.evenClass : styles.oddClass}`}
                        />
                    </td>
                    <td className={styles.tableRowValue}>
                        <input
                        type="text"
                        value={row.tridemFreq}
                        onChange={(e) => handleChange(index, 'tridemFreq', e.target.value)}
                        className={`${styles.inputs} ${index % 2 === 0 ? styles.evenClass : styles.oddClass}`}
                        />
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className={styles.buttonContainer}>
            <button type="button" onClick={handleAddRow} className={styles.button}>Add Row</button>
            </div>
        </div>

        {results && (
            <div className={`${styles.outputTables} ${!signal ? styles.hidden : ""}`}>
                <div className={styles.heading}>
                    Expected Repetations
                </div>
                <div className={styles.tableContainer}>
                    <table border="1" cellPadding="10" cellSpacing="0" className={styles.table}>
                    <thead className={styles.tableHeader}>
                    <tr className={styles.mainHeader}>
                        <th colSpan="2" className={styles.mainHeaderCol2}>Single Axle Loads</th>
                        <th colSpan="2" className={styles.mainHeaderCol2}>Tandem Axle Loads</th>
                    </tr>
                    <tr className={styles.subHeader}>
                        <th className={styles.subHeaderCol2}>Axle Loads (Tons)</th>
                        <th className={styles.subHeaderCol2}>Expected Repetitions</th>
                        <th className={styles.subHeaderCol2}>Axle Loads (Tons)</th>
                        <th className={styles.subHeaderCol2}>Expected Repetitions</th>
                    </tr>
                    </thead>
                    <tbody className={styles.tableBody}>
                        {results['ER'].map((row,rowIndex) => (
                            <tr className={styles.outputTableRow}>
                                <td className={styles.outputTableRowValue}>{row.singleAL}</td>
                                <td className={styles.outputTableRowValue}>{row.singleER}</td>
                                <td className={styles.outputTableRowValue}>{row.tandemAL}</td>
                                <td className={styles.outputTableRowValue}>{row.tandemER}</td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
            </div>
        )}

        {results && (
            <div className={`${styles.outputTables} ${!signal ? styles.hidden : ""}`}>
                <div className={styles.heading}>
                    Analysis of Fatigue Life for Tandem Axle Load
                </div>
                <div className={styles.tableContainer}>
                    <table border="1" cellPadding="10" cellSpacing="0" className={styles.table}>
                    <thead className={styles.tableHeader}>
                    <tr className={styles.mainHeader}>
                        <th className={styles.mainHeaderCol2}>Axle Loads (Tons)</th>
                        <th className={styles.mainHeaderCol2}>Load Stress (kgcm<sup>-2</sup>)</th>
                        <th className={styles.mainHeaderCol2}>Stress Ratio</th>
                        <th className={styles.mainHeaderCol2}>Expected Repetations</th>
                        <th className={styles.mainHeaderCol2}>Fatigue Life (N)</th>
                        <th className={styles.mainHeaderCol2}>Fatigue Life Consumed</th>
                    </tr>
                    </thead>
                    <tbody className={styles.tableBody}>
                        {results['SAL'].map((row,rowIndex) => (
                            <tr className={styles.outputTableRow}>
                                <td className={styles.outputTableRowValue}>{row.AL}</td>
                                <td className={styles.outputTableRowValue}>{row.LS}</td>
                                <td className={styles.outputTableRowValue}>{row.SR}</td>
                                <td className={styles.outputTableRowValue}>{row.ER}</td>
                                <td className={styles.outputTableRowValue}>{row.FL}</td>
                                <td className={styles.outputTableRowValue}>{row.FLC}</td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
            </div>
        )}

        
        {results && (
            <div className={`${styles.outputTables} ${!signal ? styles.hidden : ""}`}>
                <div className={styles.heading}>
                    Analysis of Fatigue Life for Single Axle Load
                </div>
                <div className={styles.tableContainer}>
                    <table border="1" cellPadding="10" cellSpacing="0" className={styles.table}>
                    <thead className={styles.tableHeader}>
                    <tr className={styles.mainHeader}>
                        <th className={styles.mainHeaderCol2}>Axle Loads (Tons)</th>
                        <th className={styles.mainHeaderCol2}>Load Stress (kgcm<sup>-2</sup>)</th>
                        <th className={styles.mainHeaderCol2}>Stress Ratio</th>
                        <th className={styles.mainHeaderCol2}>Expected Repetations</th>
                        <th className={styles.mainHeaderCol2}>Fatigue Life (N)</th>
                        <th className={styles.mainHeaderCol2}>Fatigue Life Consumed</th>
                    </tr>
                    </thead>
                    <tbody className={styles.tableBody}>
                        {results['TAL'].map((row,rowIndex) => (
                            <tr className={styles.outputTableRow}>
                                <td className={styles.outputTableRowValue}>{row.AL}</td>
                                <td className={styles.outputTableRowValue}>{row.LS}</td>
                                <td className={styles.outputTableRowValue}>{row.SR}</td>
                                <td className={styles.outputTableRowValue}>{row.ER}</td>
                                <td className={styles.outputTableRowValue}>{row.FL}</td>
                                <td className={styles.outputTableRowValue}>{row.FLC}</td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
            </div>
        )}
        


    </div>
  );
};

export default Section8;
