import { Box, Center } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import MovieList from "../components/MovieList";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../api/api";

export default function UpComingPage() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    async function fetch() {
      try {
        await api.get("/movie/v1/upcoming").then((res) => {
          console.log(res.data);
          setMovies(res.data);
        });
      } catch (err) {
        console.log(err.message);
      }
    }
    fetch();
  }, []);
  return (
    <>
      <Box paddingBottom={"80px"}>
        <MovieList movies={movies} />
      </Box>
    </>
  );
}
