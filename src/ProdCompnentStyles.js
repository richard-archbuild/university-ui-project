import Background from "./Images/pexels-olly-3806252.jpg"

let styles = {
  wrapper:{
    width:300,
    backgroundColor:"lightGray",
  },
  backgroundImage:{
        alignContent:"center",
        alignItems:"center",
        backgroundImage: `url(${Background})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',  
        position:"absolute",
        top:0,
        bottom:0,
        left:0,
        right:0,
        zIndex:1,
  },
  shade:{
     position:"absolute",
     top:0,
     bottom:0,
     left:0,
     right:0,
     backgroundColor: 'rgba(52, 52, 52, 0.5)',
     zIndex:-2
  },
}

export default styles;
