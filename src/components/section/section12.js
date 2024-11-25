import React, { useState, useEffect } from 'react';

import styles from './section12.module.css';

const Section12 = ({ signal, onSubmit, results }) => {
  const initialRows = Array.from({ length: 5 }, () => ({
    singleLG: '', singleMLG: '', singleFreq: '',
    tandemLG: '', tandemMLG: '', tandemFreq: '',
    tridemLG: '', tridemMLG: '', tridemFreq: ''
  }));
  
  const [rows, setRows] = useState(initialRows);

  const handleAddRow = () => {
    const newRow = { singleLG: '', singleMLG: '', singleFreq: '', tandemLG: '', tandemMLG: '', tandemFreq: '', tridemLG: '', tridemMLG: '', tridemFreq: '' };
    setRows([...rows, newRow]);
  };

  const handleChange = (index, field, value) => {
    const updatedRows = rows.map((row, rowIndex) =>
      rowIndex === index ? { ...row, [field]: value } : row
    );
    setRows(updatedRows);
  };

  useEffect(() => {
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
                <div className={styles.heading2}>
                    Bottom-Up Cracking Fatigue Damage Analysis for 6 hour Day time traffic and Positive Temperature Differential
                </div>
                <div className={styles.tableContainer}>
                <table border="1" cellPadding="10" cellSpacing="0" className={styles.table2}>
                    <thead className={styles.tableHeader}>
                    <tr className={styles.mainHeader}>
                        <th colSpan="5" className={styles.mainHeaderCol2}>Rear Single Axles</th>
                        <th colSpan="5" className={styles.mainHeaderCol2}>Rear Tandem Axles</th>
                        <th colSpan="5" className={styles.mainHeaderCol2}>Rear Tridem Axles</th>
                    </tr>
                    <tr className={styles.subHeader}>
                        <th className={styles.subHeaderCol2}>Expected Repetations (ni)</th>
                        <th className={styles.subHeaderCol2}>Flex Stress (Mpa)</th>
                        <th className={styles.subHeaderCol2}>Stress Ratio (SR)</th>
                        <th className={styles.subHeaderCol2}>Allowable Repetations (Ni)</th>
                        <th className={styles.subHeaderCol2}>Fatigue Damage (ni/Ni)</th>
                        <th className={styles.subHeaderCol2}>Expected Repetations (ni)</th>
                        <th className={styles.subHeaderCol2}>Flex Stress (Mpa)</th>
                        <th className={styles.subHeaderCol2}>Stress Ratio (SR)</th>
                        <th className={styles.subHeaderCol2}>Allowable Repetations (Ni)</th>
                        <th className={styles.subHeaderCol2}>Fatigue Damage (ni/Ni)</th>
                        <th className={styles.subHeaderCol2}>Expected Repetations (ni)</th>
                        <th className={styles.subHeaderCol2}>Flex Stress (Mpa)</th>
                        <th className={styles.subHeaderCol2}>Stress Ratio (SR)</th>
                        <th className={styles.subHeaderCol2}>Allowable Repetations (Ni)</th>
                        <th className={styles.subHeaderCol2}>Fatigue Damage (ni/Ni)</th>
                    </tr>
                    </thead>
                    <tbody className={styles.tableBody}>
                        {results['BUC'].map((row,rowIndex) => (
                            <tr className={styles.outputTableRow}>
                                <td className={styles.outputTableRowValue}>{row.singleER}</td>
                                <td className={styles.outputTableRowValue}>{row.singleFS}</td>
                                <td className={styles.outputTableRowValue}>{row.singleSR}</td>
                                <td className={styles.outputTableRowValue}>{row.singleAR}</td>
                                <td className={styles.outputTableRowValue}>{row.singleFD}</td>
                                <td className={styles.outputTableRowValue}>{row.tandemER}</td>
                                <td className={styles.outputTableRowValue}>{row.tandemFS}</td>
                                <td className={styles.outputTableRowValue}>{row.tandemSR}</td>
                                <td className={styles.outputTableRowValue}>{row.tandemAR}</td>
                                <td className={styles.outputTableRowValue}>{row.tandemFD}</td>
                                <td className={styles.outputTableRowValue}>{row.tridemER}</td>
                                <td className={styles.outputTableRowValue}>{row.tridemFS}</td>
                                <td className={styles.outputTableRowValue}>{row.tridemSR}</td>
                                <td className={styles.outputTableRowValue}>{row.tridemAR}</td>
                                <td className={styles.outputTableRowValue}>{row.tridemFD}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            </div>
        )}

        {results && (
        <div className={`${styles.outputTables} ${!signal ? styles.hidden : ""}`}>
                <div className={styles.heading2}>
                    Top-Down Cracking Fatigue Damage Analysis for 6 hour Night time traffic and Negative Temperature Differential
                </div>
                <div className={styles.tableContainer}>
                <table border="1" cellPadding="10" cellSpacing="0" className={styles.table2}>
                    <thead className={styles.tableHeader}>
                    <tr className={styles.mainHeader}>
                        <th colSpan="5" className={styles.mainHeaderCol2}>Rear Single Axles</th>
                        <th colSpan="5" className={styles.mainHeaderCol2}>Rear Tandem Axles</th>
                        <th colSpan="5" className={styles.mainHeaderCol2}>Rear Tridem Axles</th>
                    </tr>
                    <tr className={styles.subHeader}>
                        <th className={styles.subHeaderCol2}>Expected Repetations (ni)</th>
                        <th className={styles.subHeaderCol2}>Flex Stress (Mpa)</th>
                        <th className={styles.subHeaderCol2}>Stress Ratio (SR)</th>
                        <th className={styles.subHeaderCol2}>Allowable Repetations (Ni)</th>
                        <th className={styles.subHeaderCol2}>Fatigue Damage (ni/Ni)</th>
                        <th className={styles.subHeaderCol2}>Expected Repetations (ni)</th>
                        <th className={styles.subHeaderCol2}>Flex Stress (Mpa)</th>
                        <th className={styles.subHeaderCol2}>Stress Ratio (SR)</th>
                        <th className={styles.subHeaderCol2}>Allowable Repetations (Ni)</th>
                        <th className={styles.subHeaderCol2}>Fatigue Damage (ni/Ni)</th>
                        <th className={styles.subHeaderCol2}>Expected Repetations (ni)</th>
                        <th className={styles.subHeaderCol2}>Flex Stress (Mpa)</th>
                        <th className={styles.subHeaderCol2}>Stress Ratio (SR)</th>
                        <th className={styles.subHeaderCol2}>Allowable Repetations (Ni)</th>
                        <th className={styles.subHeaderCol2}>Fatigue Damage (ni/Ni)</th>
                    </tr>
                    </thead>
                    <tbody className={styles.tableBody}>
                        {results['TDC'].map((row,rowIndex) => (
                            <tr className={styles.outputTableRow}>
                                <td className={styles.outputTableRowValue}>{row.singleER}</td>
                                <td className={styles.outputTableRowValue}>{row.singleFS}</td>
                                <td className={styles.outputTableRowValue}>{row.singleSR}</td>
                                <td className={styles.outputTableRowValue}>{row.singleAR}</td>
                                <td className={styles.outputTableRowValue}>{row.singleFD}</td>
                                <td className={styles.outputTableRowValue}>{row.tandemER}</td>
                                <td className={styles.outputTableRowValue}>{row.tandemFS}</td>
                                <td className={styles.outputTableRowValue}>{row.tandemSR}</td>
                                <td className={styles.outputTableRowValue}>{row.tandemAR}</td>
                                <td className={styles.outputTableRowValue}>{row.tandemFD}</td>
                                <td className={styles.outputTableRowValue}>{row.tridemER}</td>
                                <td className={styles.outputTableRowValue}>{row.tridemFS}</td>
                                <td className={styles.outputTableRowValue}>{row.tridemSR}</td>
                                <td className={styles.outputTableRowValue}>{row.tridemAR}</td>
                                <td className={styles.outputTableRowValue}>{row.tridemFD}</td>
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

export default Section12;
