import SearchBar from '../components/custom/SearchBar';
import Header from '../components/custom/Header';
import ProductList from '../components/custom/ProductList';
import ArtisanList from '../components/custom/ArtisanList';
import Slogan from '../components/custom/Slogan';
import Footer from '../components/custom/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main className='flex flex-col items-center justify-evenly p-24'>
        <div className='max-w-7xl w-full flex flex-row flex-wrap items-center justify-between'>
          <div className='text-wrap md:w-[50%] w-[100%] forprim lg:text-5xl md:text-3xl sm:text-5xl text-2xl font-semibold'>
            DIS<span className='forsec'>COVER</span> TRADITIONAL NORTHEAST
            TREASURES
          </div>
          <SearchBar />
        </div>
      </main>
      <ProductList />
      <ArtisanList />
      <Slogan />
      <Footer />
    </>
  );
}
