import React, { useRef, useEffect, useState } from 'react';

// import '../App.css'

import Webcam from 'react-webcam';

import * as faceapi from 'face-api.js';
// import { ColorRing } from 'react-loader-spinner';

function FaceAttendance() {
  const webcamRef = useRef<any>(null);
  const canvasRef = useRef<any>(null);

  const [admissionNumber, setAdmissionNumber] = useState('');
  const [imgsrc, setImgsrc] = useState('');
  const [faces, setFaces] = useState<any>([]);
  const [loader, setLoader] = useState(false);

  const handleVideo = async () => {
    if (webcamRef.current && webcamRef.current.video.readyState === 4) {
      const video = webcamRef.current.video;
      const detections = await faceapi.detectAllFaces(
        video,
        new faceapi.TinyFaceDetectorOptions()
      );

      setFaces(detections);
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

          // Ensure canvas and video are the same size
          const videoWidth = video.videoWidth;
          const videoHeight = video.videoHeight;

          canvasRef.current.width = videoWidth;
          canvasRef.current.height = videoHeight;

          ctx.lineWidth = 5;
          ctx.strokeStyle = 'yellow';

          detections.forEach((detection) => {
            const { x, y, width, height } = detection.box;
            ctx.strokeRect(x, y, width, height);
          });

        }

      }




    }
  };

  useEffect(() => {
    const loadModels = async () => {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.faceExpressionNet.loadFromUri('/models'),
      ]);
    };

    loadModels();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      handleVideo();
    }, 100);

    return () => clearInterval(interval);
  }, [faces]);

  const capture = async () => {
    setLoader(true);
    if (!admissionNumber) {
      setLoader(false);
      alert('Please enter the admission number.');
      return;
    }

    if (faces) {
      console.log('faces', faces);
      const imageSrc = webcamRef.current.getScreenshot();
      setImgsrc(imageSrc);
      const response = await fetch('https://mainpy.crownelearn.in/store-face', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ faces, admissionNumber, imageSrc }),
      });
      console.log('response', response);
      const data = await response.json();
      if (data.status === 'success') {
        setLoader(false);
        alert(`Student added successfully: ${data.admissionNumber}`);
        setAdmissionNumber('');
      } else {
        setLoader(false);
        alert(data.message);
        setAdmissionNumber('');
      }
    } else {
      setLoader(false);
      alert('Align face before capturing...');
    }
  };

  const takeAttendance = async () => {
    setLoader(true);
    const imageSrc = webcamRef.current.getScreenshot();
    setImgsrc(imageSrc);
    const response = await fetch(
      'https://mainpy.crownelearn.in/take-attendance',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageSrc }),
      }
    );

    const data = await response.json();
    if (data.status === 'success') {
      setLoader(false);
      alert(
        `Attendance recorded for admission number: ${data.admissionNumber}`
      );
    } else {
      setLoader(false);
      alert(data.message);
    }
  };

  const deleteStudent = async () => {
    setLoader(true);
    if (!admissionNumber) {
      setLoader(false);
      alert('Please enter the admission number before deleting.');
      return;
    }

    const response = await fetch(
      'https://mainpy.crownelearn.in/delete-student',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ admissionNumber }),
      }
    );

    const data = await response.json();
    if (data.status === 'success') {
      setLoader(false);
      alert(`Student Deleted for admission number: ${data.admissionNumber}`);
      setAdmissionNumber('');
    } else {
      setLoader(false);
      alert(data.message);
      setAdmissionNumber('');
    }
  };

  const handleMouseEnter = (e: any) => {
    e.target.style.backgroundColor = '#000000';
    e.target.style.color = '#ffffff';
  };

  const handleMouseLeave = (e: any) => {
    e.target.style.backgroundColor = '#ffffff';
    e.target.style.color = '#000000';
  };

  return (
    <>

      <div className="">

        <div className='relative'>
          <input
            type="text"
            placeholder="Enter Admission Number"
            value={admissionNumber}
            onChange={(e) => setAdmissionNumber(e.target.value)}

            className='form-input mb-4 m-auto'
          />
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"

            className=' absolute w-[300px] h-[240px] sm:w-[740px] sm:h-[480px] m-auto items-center'
          />
          {loader && <div className="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 absolute">
            <span className="animate-[spin_3s_linear_infinite] border-8 border-r-warning border-l-primary border-t-danger border-b-success rounded-full w-14 h-14 inline-block align-middle m-auto"></span>
          </div>}

          <canvas
            ref={canvasRef}

            className=' absolute w-[300px] h-[240px] sm:w-[740px] sm:h-[480px] m-auto items-center'
          />


        </div>
        <div className='flex   justify-start space-x-2 ' >
          <button
            onClick={capture}


            className='btn btn-sm btn-success whitespace-nowrap sm:mt-[500px] mt-[250px]'
          >
            Capture Face
          </button>
          <button
            onClick={takeAttendance}

            className='btn btn-sm btn-secondary whitespace-nowrap sm:mt-[500px] mt-[250px]'
          >

            Take Attendance
          </button>
          <button
            onClick={deleteStudent}

            className='btn btn-sm btn-danger whitespace-nowrap sm:mt-[500px] mt-[250px]'
          >
            Delete Student
          </button>
        </div>
      </div></>
  );
}

export default FaceAttendance;
