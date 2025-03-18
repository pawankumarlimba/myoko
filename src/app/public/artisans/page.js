'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import ArtisanCard from '@/components/artisan-card';
import Header from '@/components/custom/Header';
import { artisans as allArtisans } from '@/lib/data';

export default function ArtisansPage() {
  const [artisans, setArtisans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Search and filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [craftType, setCraftType] = useState('all');
  const [region, setRegion] = useState('all');
  const [page, setPage] = useState(1);

  // Function to fetch artisans based on filters and pagination
  const fetchArtisans = async () => {
    setIsLoading(true);
    setError('');

    try {
      // Filter artisans based on searchTerm, craftType, and region
      let filteredArtisans = allArtisans;

      if (searchTerm) {
        filteredArtisans = filteredArtisans.filter((artisan) =>
          artisan.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (craftType && craftType !== 'all') {
        filteredArtisans = filteredArtisans.filter(
          (artisan) => artisan.craftType === craftType
        );
      }

      if (region && region !== 'all') {
        filteredArtisans = filteredArtisans.filter(
          (artisan) => artisan.region === region
        );
      }

      // Pagination logic
      const pageSize = 10; // Set the number of artisans per page
      const startIndex = (page - 1) * pageSize;
      const paginatedArtisans = filteredArtisans.slice(
        startIndex,
        startIndex + pageSize
      );

      setArtisans((prev) =>
        page === 1 ? paginatedArtisans : [...prev, ...paginatedArtisans]
      );
    } catch (err) {
      setError('Something went wrong while fetching artisans.');
    } finally {
      setIsLoading(false);
    }
  };

  // Trigger fetchArtisans when filters or pagination changes
  useEffect(() => {
    fetchArtisans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, craftType, region, page]);

  // Function for handling search input changes
  const handleSearchChange = (e) => {
    setPage(1); // Reset pagination on new search
    setSearchTerm(e.target.value);
  };

  // Function for handling craft type filter changes
  const handleCraftTypeChange = (value) => {
    setPage(1); // Reset pagination on filter change
    setCraftType(value);
  };

  // Function for handling region filter changes
  const handleRegionChange = (value) => {
    setPage(1); // Reset pagination on filter change
    setRegion(value);
  };

  return (
    <>
      <div className='container mx-auto px-4 py-8'>
        <div className='flex flex-col space-y-4'>
          <div className='flex flex-col space-y-2'>
            <h1 className='text-3xl md:text-4xl font-bold tracking-tight'>
              Meet Our Artisans
            </h1>
            <p className='text-muted-foreground max-w-3xl'>
              Discover the skilled craftspeople preserving Northeast India's
              rich cultural heritage through their traditional arts and crafts.
            </p>
          </div>

          <div className='flex flex-col md:flex-row gap-4 py-4'>
            <div className='relative flex-1'>
              <Search className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
              <Input
                placeholder='Search artisans by name or craft...'
                className='pl-10'
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>

            <div className='flex gap-2'>
              {/* <Select value={craftType} onValueChange={handleCraftTypeChange}>
                <SelectTrigger className='w-[180px]'>
                  <SelectValue placeholder='Craft Type' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All Crafts</SelectItem>
                  <SelectItem value='weaving'>Weaving</SelectItem>
                  <SelectItem value='bamboo'>Bamboo & Cane</SelectItem>
                  <SelectItem value='pottery'>Pottery</SelectItem>
                  <SelectItem value='woodcarving'>Wood Carving</SelectItem>
                </SelectContent>
              </Select> */}

              {/* <Select value={region} onValueChange={handleRegionChange}>
                <SelectTrigger className='w-[180px]'>
                  <SelectValue placeholder='Region' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All Regions</SelectItem>
                  <SelectItem value='assam'>Assam</SelectItem>
                  <SelectItem value='nagaland'>Nagaland</SelectItem>
                  <SelectItem value='manipur'>Manipur</SelectItem>
                  <SelectItem value='meghalaya'>Meghalaya</SelectItem>
                  <SelectItem value='arunachal'>Arunachal Pradesh</SelectItem>
                  <SelectItem value='tripura'>Tripura</SelectItem>
                  <SelectItem value='mizoram'>Mizoram</SelectItem>
                  <SelectItem value='sikkim'>Sikkim</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant='outline'
                size='icon'
                onClick={() => {
                  setPage(1);
                  fetchArtisans();
                }}
              >
                <Filter className='h-4 w-4' />
              </Button> */}
            </div>
          </div>

          {isLoading ? (
            <p>Loading artisans...</p>
          ) : error ? (
            <p className='text-red-500'>{error}</p>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6'>
              {artisans.map((artisan) => (
                <ArtisanCard key={artisan.id} artisan={artisan} />
              ))}
            </div>
          )}

          <div className='flex justify-center py-8'>
            <Button
              variant='outline'
              className='gap-2'
              onClick={() => setPage(page + 1)}
            >
              Load More Artisans
              <ArrowRight className='h-4 w-4' />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
