// Gets user data from Sanity.

export const userQuery = (userId) => {
  const query = `*[_type == "user" && _id == '${userId}']`;
  console.log("Query submited with ", userId);
  return query;
};

//
export const searchQuery = (searchTerm) => {
  const query = `*[_type == "pin" && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*']
  
  {
    image {
      asset -> {
      url

    }
  },

_id,
destination,
postedBy -> {_id, userName, image},


save[]{

  _key, 
  postedBy -> {

_id,
userName,
image

  },
},

  }`;

  return query;
};

export const feedQuery = `*[_type == 'pin'] | order(_createAt desc) {
  image {
    asset -> {
    url

  }
},

_id,
destination,
postedBy -> {_id, userName, image},


save[]{

_key, 
postedBy -> {

_id,
userName,
image

},
},

}
 `;

export const categories = [
  {
    name: "cars",
    image:
      "https://i.pinimg.com/564x/34/5f/48/345f48284748c14be71e4173367cbcd3.jpg",
  },
  {
    name: "fitness",
    image:
      "https://i.pinimg.com/564x/a4/41/9a/a4419a2a6bcf4ebb074880f337a707ae.jpg",
  },
  {
    name: "wallpaper",
    image:
      "https://i.pinimg.com/564x/b3/78/7a/b3787acab53ff86528de9abd1f3c8d75.jpg",
  },
  {
    name: "websites",
    image:
      "https://i.pinimg.com/564x/e6/87/0e/e6870e91dd16984a576be63b2a9c31fa.jpg",
  },
  {
    name: "photo",
    image:
      "https://i.pinimg.com/236x/72/8c/b4/728cb43f48ca762a75da645c121e5c57.jpg",
  },
  {
    name: "food",
    image:
      "https://i.pinimg.com/236x/7d/ef/15/7def15ac734837346dac01fad598fc87.jpg",
  },
  {
    name: "nature",
    image:
      "https://i.pinimg.com/236x/b9/82/d4/b982d49a1edd984c4faef745fd1f8479.jpg",
  },
  {
    name: "art",
    image:
      "https://i.pinimg.com/736x/f4/e5/ba/f4e5ba22311039662dd253be33bf5f0e.jpg",
  },
  {
    name: "travel",
    image:
      "https://i.pinimg.com/236x/fa/95/98/fa95986f2c408098531ca7cc78aee3a4.jpg",
  },
  {
    name: "quotes",
    image:
      "https://i.pinimg.com/236x/46/7c/17/467c17277badb00b638f8ec4da89a358.jpg",
  },
  {
    name: "cats",
    image:
      "https://th-thumbnailer.cdn-si-edu.com/bZAar59Bdm95b057iESytYmmAjI=/1400x1050/filters:focal(594x274:595x275)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/95/db/95db799b-fddf-4fde-91f3-77024442b92d/egypt_kitty_social.jpg",
  },
  {
    name: "dogs",
    image:
      "https://i.pinimg.com/564x/a4/51/fb/a451fb04885f4b8187c352fdc3336357.jpg",
  },
  {
    name: "others",
    image:
      "https://i.pinimg.com/236x/2e/63/c8/2e63c82dfd49aca8dccf9de3f57e8588.jpg",
  },
];

export const pinDetailQuery = (pinId) => {
  const query = `*[_type == "pin" && _id == '${pinId}']{
    image{
      asset->{
        url
      }
    },
    _id,
    title, 
    about,
    category,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
   save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
    comments[]{
      comment,
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    }
  }`;
  return query;
};

export const pinDetailMorePinQuery = (pin) => {
  const query = `*[_type == "pin" && category == '${pin.category}' && _id != '${pin._id}' ]{
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

export const userCreatedPinsQuery = (userId) => {
  const query = `*[ _type == 'pin' && userId == '${userId}'] | order(_createdAt desc){
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

export const userSavedPinsQuery = (userId) => {
  const query = `*[_type == 'pin' && '${userId}' in save[].userId ] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};
