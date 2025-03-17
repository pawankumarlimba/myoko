import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronLeft,
  MapPin,
  Award,
  Calendar,
  ShoppingBag,
  ExternalLink,
  Share2,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { artisans } from '@/lib/data';
import ProductCard from '@/components/product-card';
import Header from '@/components/custom/Header';
import Footer from '@/components/custom/Footer';

export default function ArtisanProfilePage({ params }) {
  // In a real app, you would fetch this data from an API
  const artisan = artisans.find((a) => a.id === params.id) || artisans[0];

  return (
    <>
      <Header />
      <div className='min-h-screen backback'>
        <div className='container mx-auto px-4 py-8'>
          {/* Back Link styled like the home page */}
          {/* <Link
            href='/artistian'
            className='inline-flex items-center text-gray-700 hover:text-[#16150A] mb-6'
          >
            <ChevronLeft className='h-4 w-4 mr-1' />
            Back to Artisans
          </Link> */}

          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {/* Left Column: Artisan Info Card */}
            <div className='lg:col-span-1 space-y-6'>
              {/* Artisan Image Card with subtle border and shadow */}
              <div className='relative rounded-lg overflow-hidden aspect-square border border-gray-200 shadow-sm'>
                <Image
                  src='/img/laxmi.jpg'
                  alt={artisan.name}
                  fill
                  className='object-cover'
                  priority
                />
              </div>

              {/* Info Card styled with primary/secondary accents */}
              <div className='rounded-lg p-5 space-y-4 bg-gray-50 border border-gray-200 shadow-sm'>
                <div className='flex items-center gap-2'>
                  <MapPin className='h-5 w-5 text-[#16150A]' />
                  <div>
                    <p className='font-medium text-[#16150A]'>
                      {artisan.location.village}
                    </p>
                    <p className='text-sm text-gray-600'>
                      {artisan.location.district}, {artisan.location.state}
                    </p>
                  </div>
                </div>

                <Separator className='border-gray-200' />

                <div className='flex items-center gap-2'>
                  <Award className='h-5 w-5 text-[#16150A]' />
                  <div>
                    <p className='font-medium text-[#16150A]'>
                      Master Craftsperson
                    </p>
                    <p className='text-sm text-gray-600'>
                      {artisan.yearsOfExperience}+ years experience
                    </p>
                  </div>
                </div>

                <Separator className='border-gray-200' />

                <div className='flex items-center gap-2'>
                  <Calendar className='h-5 w-5 text-[#16150A]' />
                  <div>
                    <p className='font-medium text-[#16150A]'>
                      Joined Platform
                    </p>
                    <p className='text-sm text-gray-600'>
                      {artisan.joinedDate}
                    </p>
                  </div>
                </div>

                <Separator className='border-gray-200' />

                <div className='flex items-center gap-2'>
                  <ShoppingBag className='h-5 w-5 text-[#16150A]' />
                  <div>
                    <p className='font-medium text-[#16150A]'>
                      {artisan.productsCount} Products
                    </p>
                    <p className='text-sm text-gray-600'>
                      {artisan.salesCount}+ sales completed
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className='flex flex-col gap-3'>
                {/* Primary button using primary/secondary colors */}
                <Button className='w-full bg-[#16150A] text-[#D4AF37] border border-[#16150A] hover:bg-[#D4AF37] hover:text-[#16150A]'>
                  Contact Artisan
                </Button>

                {/* Outline button with similar accents */}
                <Button
                  variant='outline'
                  className='w-full gap-2 border-[#16150A] text-[#16150A] hover:bg-[#16150A] hover:text-[#D4AF37]'
                >
                  <Share2 className='h-4 w-4' />
                  Share Profile
                </Button>
              </div>
            </div>

            {/* Right Column: Artisan Details and Tabs */}
            <div className='lg:col-span-2 space-y-8'>
              {/* Artisan Header */}
              <div>
                <div className='flex flex-wrap items-start justify-between gap-4'>
                  <div>
                    <h1 className='text-3xl font-bold text-[#16150A]'>
                      {artisan.name}
                    </h1>
                    <div className='flex items-center gap-2 mt-1'>
                      <span className='text-gray-600'>
                        {artisan.craftTypes.join(', ')} Specialist
                      </span>
                    </div>
                  </div>

                  {/* Award Badge */}
                  {artisan.awards && artisan.awards.length > 0 && (
                    <Badge className='bg-[#D4AF37]/20 border border-[#D4AF37]/30 text-[#16150A]'>
                      Award Winning Artisan
                    </Badge>
                  )}
                </div>

                {/* Craft Type Badges */}
                <div className='flex flex-wrap gap-2 my-4'>
                  {artisan.craftTypes.map((craft) => (
                    <Badge
                      key={craft}
                      className='bg-[#D4AF37]/20 border border-[#D4AF37]/30 text-[#16150A]'
                    >
                      {craft}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Tabs Section */}
              <Tabs defaultValue='story'>
                <TabsList className='grid w-full grid-cols-3 border-b border-gray-200'>
                  <TabsTrigger
                    value='story'
                    className='py-2 text-[#16150A] data-[state=active]:border-b-2 data-[state=active]:border-[#D4AF37] text-sm'
                  >
                    Artisan Story
                  </TabsTrigger>
                  <TabsTrigger
                    value='crafts'
                    className='py-2 text-[#16150A] data-[state=active]:border-b-2 data-[state=active]:border-[#D4AF37] text-sm'
                  >
                    Craft Heritage
                  </TabsTrigger>
                  <TabsTrigger
                    value='products'
                    className='py-2 text-[#16150A] data-[state=active]:border-b-2 data-[state=active]:border-[#D4AF37] text-sm'
                  >
                    Products
                  </TabsTrigger>
                </TabsList>

                {/* Artisan Story Tab */}
                <TabsContent value='story' className='mt-6 space-y-4'>
                  <div className='prose max-w-none'>
                    <p className='text-gray-700'>{artisan.fullBio}</p>

                    {artisan.familyTradition && (
                      <>
                        <h3 className='text-xl font-medium text-[#16150A] mt-6'>
                          Family Tradition
                        </h3>
                        <p className='text-gray-700'>
                          {artisan.familyTradition}
                        </p>
                      </>
                    )}

                    {artisan.awards && artisan.awards.length > 0 && (
                      <>
                        <h3 className='text-xl font-medium text-[#16150A] mt-6'>
                          Awards &amp; Recognition
                        </h3>
                        <ul className='text-gray-700'>
                          {artisan.awards.map((award, index) => (
                            <li key={index}>{award}</li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </TabsContent>

                {/* Craft Heritage Tab */}
                <TabsContent value='crafts' className='mt-6'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    {artisan.craftDetails.map((craft, index) => (
                      <div
                        key={index}
                        className='rounded-lg p-5 bg-gray-50 border border-gray-200 shadow-sm'
                      >
                        <h3 className='text-xl font-medium text-[#16150A] mb-2'>
                          {craft.name}
                        </h3>
                        <p className='text-sm text-gray-600 mb-2'>
                          {craft.description}
                        </p>

                        {craft.culturalSignificance && (
                          <div className='mb-3'>
                            <h4 className='text-xs font-semibold uppercase text-[#16150A] mb-1'>
                              Cultural Significance
                            </h4>
                            <p className='text-sm text-gray-700'>
                              {craft.culturalSignificance}
                            </p>
                          </div>
                        )}

                        {craft.materials && (
                          <div>
                            <h4 className='text-xs font-semibold uppercase text-[#16150A] mb-1'>
                              Materials Used
                            </h4>
                            <div className='flex flex-wrap gap-2'>
                              {craft.materials.map((material, idx) => (
                                <Badge
                                  key={idx}
                                  className='bg-[#D4AF37]/20 border border-[#D4AF37]/30 text-[#16150A]'
                                >
                                  {material}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className='mt-8 p-5 bg-gray-50 border border-gray-200 shadow-sm rounded-lg'>
                    <h3 className='text-lg font-medium text-[#16150A] mb-2'>
                      Learn More About Northeast Indian Crafts
                    </h3>
                    <p className='text-sm text-gray-600 mb-4'>
                      Explore our educational resources to understand the rich
                      cultural heritage behind these traditional crafts.
                    </p>
                    <Button
                      variant='outline'
                      className='gap-2 border-[#16150A] text-[#16150A] hover:bg-[#16150A] hover:text-[#D4AF37]'
                    >
                      Visit Craft Heritage Guide
                      <ExternalLink className='h-4 w-4' />
                    </Button>
                  </div>
                </TabsContent>

                {/* Products Tab */}
                <TabsContent value='products' className='mt-6'>
                  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {artisan.products.map((product, index) => (
                      <ProductCard
                        key={index}
                        product={product}
                        artisanName={artisan.name}
                      />
                    ))}
                  </div>

                  <div className='flex justify-center mt-8'>
                    <Button
                      variant='outline'
                      className='border-[#16150A] text-[#16150A] hover:bg-[#16150A] hover:text-[#D4AF37]'
                    >
                      View All Products
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
