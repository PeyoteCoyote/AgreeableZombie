import React, { PropTypes, Component } from 'react';
 import ImageGallery from 'react-image-gallery';
  
 class NotesCarousel extends React.Component {
  
   handleImageLoad(event) {
     console.log('Image loaded ', event.target)
   }
  
   handlePlay() {
     this._imageGallery.play()
   }
  
   handlePause() {
     this._imageGallery.pause()
   }
  
   render() {
  
     const images = [
       {
         original: 'http://lorempixel.com/1000/600/nature/1/',
         thumbnail: 'http://lorempixel.com/250/150/nature/1/',
         originalClass: 'featured-slide',
         thumbnailClass: 'featured-thumb',
         originalAlt: 'original-alt',
         thumbnailAlt: 'thumbnail-alt',
         description: 'Optional description...',
         srcSet: 'Optional srcset (responsive images src)',
         size: 'Optional size (image size relative to the breakpoint)'
       },
       {
         original: 'http://lorempixel.com/1000/600/nature/2/',
         thumbnail: 'http://lorempixel.com/250/150/nature/2/'
       },
       {
         original: 'http://lorempixel.com/1000/600/nature/3/',
         thumbnail: 'http://lorempixel.com/250/150/nature/3/'
       }
     ]
  
     return (
       <div>
         <button onClick={this.handlePlay.bind(this)}>Play</button>
         <button onClick={this.handlePause.bind(this)}>Pause</button>
         <ImageGallery
           ref={i => this._imageGallery = i}
           items={images}
           slideInterval={2000}
           onImageLoad={this.handleImageLoad}/>
       </div>
     );
   }
  
 }
 
 export default NotesCarousel;