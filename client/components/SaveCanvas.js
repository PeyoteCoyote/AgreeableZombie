import React, { Component } from 'react';
 
 var SaveCanvas = (props) => (
   <div className="snapshot-button"> 
     <a href="#" id="btn-download" onClick={props.clickHandler}>Download as image</a>
   </div>  
   );
 
 
 export default SaveCanvas;