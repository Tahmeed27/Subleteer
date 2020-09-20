import React, {useRef, useState, useEffect} from 'react';
import classes from './ImagePicker.module.css';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(20),
      height: theme.spacing(20),
    },
}));

const ImagePicker = (props) => {

    const avatarClasses = useStyles();

    const defaultImage = props.preview ? props.preview : null

    const [file, setFile] = useState();
    const [previewURL, setPreviewURL] = useState(defaultImage);
    const [isValid, setIsValid] = useState(false);

    const filePickerRef = useRef();

    const pickImageHandler = () => {
        filePickerRef.current.click();
    };

    const pickedHandler = (event) => {
        let pickedFile;
        let fileIsValid = isValid;
        if (event.target.files && event.target.files.length !== 0){
            pickedFile = event.target.files[0];
            setFile(pickedFile);
            setIsValid(true);
            fileIsValid = true;
        }else{
            setIsValid(false);
            fileIsValid = false;
        }
        if(fileIsValid){
            props.onInput(pickedFile);
        }
    }

    useEffect(()=>{
        if(!file){
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewURL(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    }, [file])

    return (
        <div className={classes.FormControl}>
            <input 
                type="file" 
                id = {props.id} 
                style={{display:"none"}} 
                accept=".jpg, .jpeg, .png" 
                ref={filePickerRef}
                onChange={pickedHandler}
                />
            <Avatar alt="Preview" src={previewURL} className={classes.Avatar} style={{ height: '100px', width: '100px' }} />
            <button type="button" onClick={pickImageHandler}>Pick Image</button>
        </div>
    );
};

export default ImagePicker;