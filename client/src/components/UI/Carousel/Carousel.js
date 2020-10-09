import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";

const Images = (props) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  // let slides = Object.keys(props.slides).map((igKey) => (
  //   <Carousel.Item>
  //     <img
  //       className="d-block w-100"
  //       src={props.slides[igKey].src}
  //       alt={props.slides[igKey].alt}
  //       style={{ borderRadius: "0" }}
  //     />
  //   </Carousel.Item>
  // ));

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {/* {slides} */}
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={`/${props.image}`}
          alt={props.title}
          style={{ borderRadius: "20px"}}
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default Images;
