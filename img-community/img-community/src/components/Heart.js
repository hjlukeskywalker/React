import React from "react";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { styled } from '@material-ui/core';

const Heart = (props)=>{
   
    return(
        <React.Fragment>
           {props.is_like? 
    <FavoriteIcon color="secondary"/>:
    <FavoriteBorderIcon/>}
    
        </React.Fragment>
    );
}
export default Heart;

