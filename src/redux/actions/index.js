import axios from 'axios';

export function getImages(param) {
  return async (dispatch) => {
    // Wrapped with heroku cors uri to support cross-origin request
    const encodedURI = encodeURI(`https://cors-anywhere.herokuapp.com/https://api.flickr.com/services/feeds/photos_public.gne?tags=${param}&format=json&jsoncallback=JSONP_CALLBACK`);

    axios.get(encodedURI)
    .then((res) => {
      const JSONP_CALLBACK = json => json;
      const data = eval(res.data);
      const photos = data.items;
      let arr = []
      for(let i = 0; i < photos.length; i++){
        const photo = photos[i];
        const { media: { m }, author, tags } = photo;
        const itemEncodedURI = encodeURI(m);
        arr.push({
          image: itemEncodedURI,
          author,
          tags
        });
      }
      dispatch(fetchImages(arr));
    })
    .catch(function (error) {
      console.log(error);
    });
  };
}

export const fetchImages = (payload) => ({
  type: 'FETCH_IMAGES',
  images: payload
});
