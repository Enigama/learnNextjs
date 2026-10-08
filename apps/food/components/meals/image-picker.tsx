'use client';

import { ChangeEvent, useRef, useState } from 'react';
import classes from './image-picker.module.css';
import Image from 'next/image';

interface ImagePickerProps {
    label?: string;
    name?: string;
}
export default function ImagePicker({ label, name }: ImagePickerProps) {
    const [pickedImage, setPickedImage] = useState<FileReader['result']>();
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        inputRef.current?.click();
    };
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) {
            setPickedImage(null);
            return;
        }

        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPickedImage(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    };

    return (
        <div className={classes.picker}>
            <label htmlFor={name}>{label}</label>
            <div className={classes.controls}>
                <div className={classes.preview}>
                    {pickedImage ? (
                        <Image src={pickedImage as string} alt="Image from the user" fill />
                    ) : (
                        <p>No image picked yet.</p>
                    )}
                </div>
                <input
                    ref={inputRef}
                    className={classes.input}
                    type="file"
                    id={name}
                    name={name}
                    accept="image/png, image/jpeg"
                    onChange={handleImageChange}
                />
                <button onClick={handleClick} type="button" className={classes.button}>
                    Pick an Image
                </button>
            </div>
        </div>
    );
}
