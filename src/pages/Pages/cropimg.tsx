
import React, { useState, useRef } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Modal from 'react-modal';
import axios from 'axios';
import { IMG_URL } from "../Apps/query";

type Crop = {
  aspect?: number;
  unit?: 'px' | '%' | 'vw' | 'vh';
  width?: number;
  height?: number;
  x?: number;
  y?: number;
};

const CropImg: React.FC = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [src, setSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>({ aspect: 4 / 3 });
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  const imageRef = useRef<HTMLImageElement>(null);

  const handleCardClick = () => {
    setIsModalOpen(true);
    // setSrc('newimg'); // Default image for testing
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Do not reset the image source and crop state when closing the modal
  };

  // const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files.length > 0) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       if (reader.result) {
  //         setSrc(reader.result as string);
  //         // Reset the crop state when a new image is uploaded
  //         setCrop({ aspect: 4 / 3 });
  //         setCroppedImage(null); // Reset the cropped image
  //       }
  //     };
  //     reader.readAsDataURL(e.target.files[0]);
  //   }
  // };
  const handleFile = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          setImg(event.target.files[0]);
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };
  const handleImageLoaded = (image: HTMLImageElement) => {
    imageRef.current = image;
  };

  const handleCropChange = (crop: Crop) => {
    setCrop(crop);
  };

  const handleCropComplete = (crop: Crop) => {
    if (imageRef.current && crop.width && crop.height) {
      const croppedImageUrl = getCroppedImg(imageRef.current, crop);
      setCroppedImage(croppedImageUrl);
    }
  };

  const handleManualCrop = () => {
    if (imageRef.current && crop.width && crop.height) {
      const croppedImageUrl = getCroppedImg(imageRef.current, crop);
      setCroppedImage(croppedImageUrl);
      // Reset the image source and crop state after cropping
      setSrc(null);
      setCrop({ aspect: 4 / 3 });
    }
  };

  const getCroppedImg = (image: HTMLImageElement, crop: Crop) => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const aspectRatio = crop.aspect || 1; // Default to 1 if aspect is not defined

    canvas.width = crop.width!; // Keep original width
    canvas.height = crop.height!; // Keep original height

    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(
      image,
      crop.x! * scaleX,
      crop.y! * scaleY,
      crop.width! * scaleX,
      crop.height! * scaleY,
      0,
      0,
      crop.width!,
      crop.height!
    );

    return canvas.toDataURL('image/jpeg');
  };
  const fileUpload = () => {
    const formData = new FormData();
    formData.append("file", src);
    formData.append("item", props.onwhich);
    formData.append("uid", localStorage.usercode);
    formData.append("w", props.imgw);
    formData.append("h", props.imgh);
    formData.append("token", localStorage.token);

    axios
      .post(IMG_URL, formData)
      .then((response) => {
        console.log("response", response.data.urlimage);
        localStorage.setItem('url-img', response.data.urlimage);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div>
      <div style={{ width: '10rem', border: '1px solid #ddd', borderRadius: '400px', marginBottom: '20px' }}>
        <img
          src={src || 'https://placekitten.com/200/300'}
          alt="Card image cap"
          onClick={handleCardClick}
          style={{ width: '100%', height: 'auto', objectFit: 'cover', cursor: 'pointer', borderRadius: '350px' }}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        style={{
          content: {
            background: '#fff',
            padding: '20px',
            borderRadius: '8px',
            maxWidth: '400px',
            width: '100%',
            margin: 'auto',
            maxHeight: '30%', // Adjust the height as needed
            margin:'100px auto auto auto',
          },
          overlay: {
            position: 'fixed',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: '9999',
          },
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', borderBottom: '1px solid #ddd' }}>
          <h5>Modal Title</h5>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer' }} onClick={handleCloseModal}>
            <span style={{ fontSize: '20px', fontWeight: 'bold' }}>&times;</span>
          </button>
        </div>
        <input type="file" onChange={handleFile} />
        <ReactCrop
          src={src}
          crop={crop}
          onImageLoaded={handleImageLoaded}
          onComplete={handleCropComplete}
          onChange={handleCropChange}
        />
         <input type="button" onClick={fileUpload} className="submit" value="upload" />
        <button style={{ padding: '8px 16px', cursor: 'pointer', marginRight: '8px' }} onClick={handleManualCrop}>
          Crop Image
        </button>
        {croppedImage && (
          <img
            src={croppedImage}
            alt="Cropped"
            style={{ width: '100%', height: 'auto', marginTop: '16px', borderRadius: '8px' }}
          />
        )}
        <div style={{ marginTop: '16px', textAlign: 'right' }}>
          <button style={{ padding: '8px 16px', cursor: 'pointer' }} onClick={handleCloseModal}>
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default CropImg;
