import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import MovieRow from "../components/MovieRow/MovieRow";
import Footer from "../components/Footer/Footer";


function Home() {

  const movies = [
  {
    title: "You",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728",
  },
  {
    title: "Dark",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728",
  },
  {
    title: "Stranger Things",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728",
  },
  {
    title: "Movie Four",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728",
  },
];

  return (
    <>
      <Navbar />
      <Hero />
      <MovieRow title="Trending Now" movies={movies} />
      <MovieRow title="Popular Movies" movies={movies} />
      <MovieRow title="Popular TV Shows" movies={movies} />
      <MovieRow title="Top Rated" movies={movies} />
      <MovieRow title="Latest Releases" movies={movies} />
      <Footer />
    </>
  );
}

export default Home;