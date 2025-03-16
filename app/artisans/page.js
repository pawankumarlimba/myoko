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
import { artisans } from '@/lib/data';
import Header from '@/components/custom/Header';

export default function ArtisansPage() {
  return (
    <>
      <Header />
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
              />
            </div>

            <div className='flex gap-2'>
              <Select defaultValue='all'>
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
              </Select>

              <Select defaultValue='all'>
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

              <Button variant='outline' size='icon'>
                <Filter className='h-4 w-4' />
              </Button>
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6'>
            {artisans.map((artisan) => (
              <ArtisanCard key={artisan.id} artisan={artisan} />
            ))}
          </div>

          <div className='flex justify-center py-8'>
            <Button variant='outline' className='gap-2'>
              Load More Artisans
              <ArrowRight className='h-4 w-4' />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
