// src/components/Navigation.js
import React, { useState, useEffect } from 'react';
import './navigation.css';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
    const [modal, setModal] = useState('');
    const [pdfs, setPdfs] = useState([]);
    const navigate = useNavigate();

    // Check for token on mount
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/'); // Redirect to login if not authenticated
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear the token
        navigate('/'); // Redirect to login page
    };

    const openModal = (modalName) => {
        setModal(modalName);
        if (modalName === 'schedule') {
            fetchPdfs();
        }
    };

    const closeModal = () => {
        setModal('');
        setPdfs([]);
    };

    const fetchPdfs = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/pdfs');
            const data = await response.json();
            if (data.length > 0) {
                setPdfs(data);
            }
        } catch (error) {
            console.error('Error fetching PDFs:', error);
        }
    };

    const instructions = {
        scan: "Instructions for Scan",
        coe: "Instructions for COE",
        enrollment: "Instructions for Enrollment MG",
        schedule: "Instructions for Schedule",
        dd214: "Instructions for DD214",
        tar: "Instructions for TAR",
        awardLetter: "Instructions for Award Letter",
    };

    return (
        <div className="navbar">
            <div className="container">
                <div onClick={() => { }} className="box box-scan">Scan</div>
                <div onClick={() => openModal('coe')} className="box">COE</div>
                <div onClick={() => openModal('enrollment')} className="box">Enrollment MG</div>
                <div onClick={() => openModal('schedule')} className="box">Schedule</div>
                <div onClick={() => openModal('dd214')} className="box">DD214</div>
                <div onClick={() => openModal('tar')} className="box">TAR</div>
                <div onClick={() => openModal('awardLetter')} className="box">Award Letter</div>
                <div onClick={handleLogout} className="logout-button">Logout</div> {/* Logout button */}
            </div>
            {modal && (
                <div className="modal" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h2>{instructions[modal]}</h2>
                        {modal === 'schedule' && (
                            <div>
                                {pdfs.length > 0 ? (
                                    pdfs.map((pdf, index) => (
                                        <iframe
                                            key={index}
                                            src={`http://localhost:3000/${pdf.filePath}`}
                                            width="100%"
                                            height="600px"
                                            title={`PDF ${index + 1}`}
                                        ></iframe>
                                    ))
                                ) : (
                                    <p>No PDFs available.</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navigation;