import React from 'react';
import ModalImage from 'react-modal-image';

function ImageHolder({ source }) {
  const { image, author, tags } = source;
  // Thumbnail and popup image urls
  const smallImageFile = image;
  const largeImageFile = image.replace('_m', '');

  return(
    <div style={style.paper}>
      <ModalImage
        small={smallImageFile}
        large={largeImageFile}
        alt="flickr"
      />
      <div style={style.info}>
        <p style={style.author}>{author}</p>
        <p style={style.tags}>{tags}</p>
      </div>
    </div>
  );
}

const style = {
  paper: {
    height: 200,
    width: 200,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block'
  },
  img: {
    height: 150,
    width: 150,
    padding: 25,
    textAlign: 'center',
    display: 'inline-block'
  },
  info: {
    display: 'flex',
    flexDirection: 'column'
  },
  author: {
    margin: 0,
    fontSize: '12px',
    color: 'gray'
  },
  tags: {
    fontSize: '14px'
  }
};

export default ImageHolder;
