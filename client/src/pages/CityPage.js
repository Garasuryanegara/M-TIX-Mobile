import { Box, Input } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import MovieList from "../components/MovieList";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { api } from "../api/api";

export default function CityPage() {
  const [search, setSearch] = useState(""); // set state untuk search bar
  const [cities, setCities] = useState([]); // set state untuk tampung data city
  useEffect(() => {
    // get semua city untuk di map di bawah
    const cityList = async () => {
      try {
        await api.get("/city/").then((res) => {
          setCities(res.data);
          //   console.log(res.data);
          // return res.data isinya array object city
        });
      } catch (err) {
        console.log(err.message);
      }
    };
    cityList();
    console.log(search);
  }, [search]);
  return (
    <>
      <Box paddingBottom={"80px"}>
        <Input
          w="100vw"
          textAlign={"center"}
          maxW="420px"
          placeholder="type a city to search"
          variant={"unstyled"}
          padding="10px"
          border="1px solid white"
          color="rgb(0,83,80)"
          sx={{
            _focus: {
              border: "2px solid #DD9F20",
            },
          }}
          borderRadius={"0"}
          onChange={(e) => setSearch(e.target.value)}
        ></Input>

        <Box>
          {cities
            .filter((val) => {
              if (search == "") {
                return val;
              } else if (
                val.name.toUpperCase().includes(search.toUpperCase())
              ) {
                return val;
              }
            })
            .map((val, idx) => (
              <Box
                key={val.name + "_" + idx}
                w="100%"
                padding="10px 15px"
                border="1px solid #EBEBEB"
              >
                {val.name}
              </Box>
            ))}
        </Box>
      </Box>
    </>
  );
}
