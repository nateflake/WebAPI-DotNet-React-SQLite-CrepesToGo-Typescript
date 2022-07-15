import { Box, Typography } from "@mui/material";
import Slider from 'react-slick';
import SliderImg from "./SliderImg";

export default function HomePage() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      <div>
        <Slider {...settings}>
          <SliderImg imgUrl={"images/crepe_party_01.png"} altString={"crepe party 1"} />
          <SliderImg imgUrl={"images/crepe_party_02.png"} altString={"crepe party 2"} />
        </Slider>
      </div>
      <Box display='flex' justifyContent='center' sx={{ p: 4 }}>
        <Typography variant='h1'>
          CrepesToGo
        </Typography>
      </Box>
    </>
  );
}