import React, { useState } from 'react';

import styles from './section8.module.css';

const Section8 = ({signal}) => {
  // Initial state for table rows with 5 rows of sub-columns
  const initialRows = Array.from({ length: 5 }, () => ({
    col1: '', col2: '', col3: '',
    col4: '', col5: '', col6: '',
    col7: '', col8: '', col9: ''
  }));
  
  const [rows, setRows] = useState(initialRows);

  // Handle adding a new row
  const handleAddRow = () => {
    const newRow = { col1: '', col2: '', col3: '', col4: '', col5: '', col6: '', col7: '', col8: '', col9: '' };
    setRows([...rows, newRow]);
  };

  // Handle updating cell data
  const handleChange = (index, field, value) => {
    const updatedRows = rows.map((row, rowIndex) =>
      rowIndex === index ? { ...row, [field]: value } : row
    );
    setRows(updatedRows);
  };

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
                        value={row.col1}
                        onChange={(e) => handleChange(index, 'col1', e.target.value)}
                        className={`${styles.inputs} ${index % 2 === 0 ? styles.evenClass : styles.oddClass}`}
                        />
                    </td>
                    <td className={styles.tableRowValue}>
                        <input
                        type="text"
                        value={row.col2}
                        onChange={(e) => handleChange(index, 'col2', e.target.value)}
                        className={`${styles.inputs} ${index % 2 === 0 ? styles.evenClass : styles.oddClass}`}
                        />
                    </td>
                    <td className={styles.tableRowValue}>
                        <input
                        type="text"
                        value={row.col3}
                        onChange={(e) => handleChange(index, 'col3', e.target.value)}
                        className={`${styles.inputs} ${index % 2 === 0 ? styles.evenClass : styles.oddClass}`}
                        />
                    </td>
                    <td className={styles.tableRowValue}>
                        <input
                        type="text"
                        value={row.col4}
                        onChange={(e) => handleChange(index, 'col4', e.target.value)}
                        className={`${styles.inputs} ${index % 2 === 0 ? styles.evenClass : styles.oddClass}`}
                        />
                    </td>
                    <td className={styles.tableRowValue}>
                        <input
                        type="text"
                        value={row.col5}
                        onChange={(e) => handleChange(index, 'col5', e.target.value)}
                        className={`${styles.inputs} ${index % 2 === 0 ? styles.evenClass : styles.oddClass}`}
                        />
                    </td>
                    <td className={styles.tableRowValue}>
                        <input
                        type="text"
                        value={row.col6}
                        onChange={(e) => handleChange(index, 'col6', e.target.value)}
                        className={`${styles.inputs} ${index % 2 === 0 ? styles.evenClass : styles.oddClass}`}
                        />
                    </td>
                    <td className={styles.tableRowValue}>
                        <input
                        type="text"
                        value={row.col7}
                        onChange={(e) => handleChange(index, 'col7', e.target.value)}
                        className={`${styles.inputs} ${index % 2 === 0 ? styles.evenClass : styles.oddClass}`}
                        />
                    </td>
                    <td className={styles.tableRowValue}>
                        <input
                        type="text"
                        value={row.col8}
                        onChange={(e) => handleChange(index, 'col8', e.target.value)}
                        className={`${styles.inputs} ${index % 2 === 0 ? styles.evenClass : styles.oddClass}`}
                        />
                    </td>
                    <td className={styles.tableRowValue}>
                        <input
                        type="text"
                        value={row.col9}
                        onChange={(e) => handleChange(index, 'col9', e.target.value)}
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
                    <tr className={styles.outputTableRow}>
                        <td className={styles.outputTableRowValue}></td>
                        <td className={styles.outputTableRowValue}></td>
                        <td className={styles.outputTableRowValue}></td>
                        <td className={styles.outputTableRowValue}></td>
                    </tr>
                    <tr className={styles.outputTableRow}>
                        <td className={styles.outputTableRowValue}></td>
                        <td className={styles.outputTableRowValue}></td>
                        <td className={styles.outputTableRowValue}></td>
                        <td className={styles.outputTableRowValue}></td>
                    </tr>
                    <tr className={styles.outputTableRow}>
                        <td className={styles.outputTableRowValue}></td>
                        <td className={styles.outputTableRowValue}></td>
                        <td className={styles.outputTableRowValue}></td>
                        <td className={styles.outputTableRowValue}></td>
                    </tr>
                    <tr className={styles.outputTableRow}>
                        <td className={styles.outputTableRowValue}></td>
                        <td className={styles.outputTableRowValue}></td>
                        <td className={styles.outputTableRowValue}></td>
                        <td className={styles.outputTableRowValue}></td>
                    </tr>
                    <tr className={styles.outputTableRow}>
                        <td className={styles.outputTableRowValue}></td>
                        <td className={styles.outputTableRowValue}></td>
                        <td className={styles.outputTableRowValue}></td>
                        <td className={styles.outputTableRowValue}></td>
                    </tr>
                    <tr className={styles.outputTableRow}>
                        <td className={styles.outputTableRowValue}></td>
                        <td className={styles.outputTableRowValue}></td>
                        <td className={styles.outputTableRowValue}></td>
                        <td className={styles.outputTableRowValue}></td>
                    </tr>
                </tbody>
                </table>
            </div>
        </div>
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
                    <tr className={styles.outputTableRow}>
                        <td className={styles.outputTableRowValue}></td>
                        <td className={styles.outputTableRowValue}></td>
                        <td className={styles.outputTableRowValue}></td>
                        <td className={styles.outputTableRowValue}></td>
                        <td className={styles.outputTableRowValue}></td>
                        <td className={styles.outputTableRowValue}></td>
                    </tr>
                    <tr className={styles.outputTableRow}>
                        <td className={styles.outputTableRowValue}></td>
                        <td className={styles.outputTableRowValue}></td>
                        <td className={styles.outputTableRowValue}></td>
                        <td className={styles.outputTableRowValue}></td>
                        <td className={styles.outputTableRowValue}></td>
                        <td className={styles.outputTableRowValue}></td>
                    </tr>
                    <tr className={styles.outputTableRow}>
                        <td className={styles.outputTableRowValue}></td>
                        <td className={styles.outputTableRowValue}></td>
                        <td className={styles.outputTableRowValue}></td>
                        <td className={styles.outputTableRowValue}></td>
                        <td className={styles.outputTableRowValue}></td>
                        <td className={styles.outputTableRowValue}></td>
                    </tr>
                    <tr className={styles.outputTableRow}>
                        <td className={styles.outputTableRowValue}></td>
                        <td className={styles.outputTableRowValue}></td>
                        <td className={styles.outputTableRowValue}></td>
                        <td className={styles.outputTableRowValue}></td>
                        <td className={styles.outputTableRowValue}></td>
                        <td className={styles.outputTableRowValue}></td>
                    </tr>
                    <tr className={styles.outputTableRow}>
                        <td className={styles.outputTableRowValue}></td>
                        <td className={styles.outputTableRowValue}></td>
                        <td className={styles.outputTableRowValue}></td>
                        <td className={styles.outputTableRowValue}></td>
                        <td className={styles.outputTableRowValue}></td>
                        <td className={styles.outputTableRowValue}></td>
                    </tr>
                </tbody>
                </table>
            </div>
        </div>
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
                    <tr className={styles.outputTableRow}>
                        <td className={styles.outputTableRowValue}></td>
                        <td className={styles.outputTableRowValue}></td>
                        <td className={styles.outputTableRowValue}></td>
                        <td className={styles.outputTableRowValue}></td>
                        <td className={styles.outputTableRowValue}></td>
                        <td className={styles.outputTableRowValue}></td>
                    </tr>
                    <tr className={styles.outputTableRow}>
                        <td className={styles.outputTableRowValue}></td>
                        <td className={styles.outputTableRowValue}></td>
                        <td className={styles.outputTableRowValue}></td>
                        <td className={styles.outputTableRowValue}></td>
                        <td className={styles.outputTableRowValue}></td>
                        <td className={styles.outputTableRowValue}></td>
                    </tr>
                    <tr className={styles.outputTableRow}>
                        <td className={styles.outputTableRowValue}></td>
                        <td className={styles.outputTableRowValue}></td>
                        <td className={styles.outputTableRowValue}></td>
                        <td className={styles.outputTableRowValue}></td>
                        <td className={styles.outputTableRowValue}></td>
                        <td className={styles.outputTableRowValue}></td>
                    </tr>
                    <tr className={styles.outputTableRow}>
                        <td className={styles.outputTableRowValue}></td>
                        <td className={styles.outputTableRowValue}></td>
                        <td className={styles.outputTableRowValue}></td>
                        <td className={styles.outputTableRowValue}></td>
                        <td className={styles.outputTableRowValue}></td>
                        <td className={styles.outputTableRowValue}></td>
                    </tr>
                    <tr className={styles.outputTableRow}>
                        <td className={styles.outputTableRowValue}></td>
                        <td className={styles.outputTableRowValue}></td>
                        <td className={styles.outputTableRowValue}></td>
                        <td className={styles.outputTableRowValue}></td>
                        <td className={styles.outputTableRowValue}></td>
                        <td className={styles.outputTableRowValue}></td>
                    </tr>
                </tbody>
                </table>
            </div>
        </div>
    </div>
  );
};

export default Section8;
