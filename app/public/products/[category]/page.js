import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import ProductCard from '@/components/product-card';
import { categories, products, artisans } from '@/lib/data';

export default function CategoryPage({ params }) {
  // In a real app, you would fetch this data based on the category
  const category =
    categories.find((c) => c.slug === params.category) || categories[0];

  // Filter products by category
  const categoryProducts = products.filter(
    (product) => product.category === category.name
  );

  return (
    <div className='container mx-auto px-4 py-8'>
      {/* Category Banner */}
      <div className='relative w-full h-64 md:h-80 rounded-lg overflow-hidden mb-8'>
        <Image
          src={category.bannerImage || '/placeholder.svg?height=400&width=1200'}
          alt={category.name}
          fill
          className='object-cover'
          priority
        />
        <div className='absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex flex-col justify-center p-8'>
          <h1 className='text-3xl md:text-4xl font-bold text-white mb-2'>
            {category.name}
          </h1>
          <p className='text-white/90 max-w-md'>{category.description}</p>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className='flex flex-col md:flex-row gap-4 mb-8'>
        <div className='relative flex-1'>
          <Search className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
          <Input placeholder='Search products...' className='pl-10' />
        </div>

        <div className='flex gap-2'>
          <Select defaultValue='featured'>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Sort by' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='featured'>Featured</SelectItem>
              <SelectItem value='newest'>Newest</SelectItem>
              <SelectItem value='price-low'>Price: Low to High</SelectItem>
              <SelectItem value='price-high'>Price: High to Low</SelectItem>
            </SelectContent>
          </Select>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant='outline' className='gap-2'>
                <Filter className='h-4 w-4' />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent className='w-[300px] sm:w-[400px] overflow-y-auto'>
              <SheetHeader>
                <SheetTitle>Filter Products</SheetTitle>
                <SheetDescription>
                  Refine your search to find the perfect handcrafted item.
                </SheetDescription>
              </SheetHeader>

              <div className='py-6 space-y-6'>
                <div className='space-y-4'>
                  <h3 className='text-sm font-medium'>Price Range</h3>
                  <div className='space-y-2'>
                    <Slider defaultValue={[0, 75]} max={100} step={1} />
                    <div className='flex items-center justify-between'>
                      <span className='text-sm'>₹500</span>
                      <span className='text-sm'>₹20,000+</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className='space-y-4'>
                  <h3 className='text-sm font-medium'>Artisan</h3>
                  <div className='space-y-2'>
                    {artisans.slice(0, 5).map((artisan) => (
                      <div
                        key={artisan.id}
                        className='flex items-center space-x-2'
                      >
                        <Checkbox id={`artisan-${artisan.id}`} />
                        <Label
                          htmlFor={`artisan-${artisan.id}`}
                          className='text-sm font-normal'
                        >
                          {artisan.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className='space-y-4'>
                  <h3 className='text-sm font-medium'>Material</h3>
                  <div className='space-y-2'>
                    {category.materials.map((material, index) => (
                      <div key={index} className='flex items-center space-x-2'>
                        <Checkbox id={`material-${index}`} />
                        <Label
                          htmlFor={`material-${index}`}
                          className='text-sm font-normal'
                        >
                          {material}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className='space-y-4'>
                  <h3 className='text-sm font-medium'>Special Features</h3>
                  <div className='space-y-2'>
                    <div className='flex items-center space-x-2'>
                      <Checkbox id='feature-1' />
                      <Label
                        htmlFor='feature-1'
                        className='text-sm font-normal'
                      >
                        Award Winning
                      </Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <Checkbox id='feature-2' />
                      <Label
                        htmlFor='feature-2'
                        className='text-sm font-normal'
                      >
                        Limited Edition
                      </Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <Checkbox id='feature-3' />
                      <Label
                        htmlFor='feature-3'
                        className='text-sm font-normal'
                      >
                        Eco-Friendly
                      </Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <Checkbox id='feature-4' />
                      <Label
                        htmlFor='feature-4'
                        className='text-sm font-normal'
                      >
                        Natural Dyes
                      </Label>
                    </div>
                  </div>
                </div>

                <div className='flex justify-between pt-4'>
                  <Button variant='outline'>Reset All</Button>
                  <Button>Apply Filters</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Product Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {categoryProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            artisanName={artisans.find((a) => a.id === product.artisanId)?.name}
            showQuickView
          />
        ))}
      </div>

      {/* Pagination */}
      <div className='flex justify-center mt-12'>
        <nav className='flex items-center gap-1'>
          <Button variant='outline' size='icon' disabled>
            <ChevronDown className='h-4 w-4 rotate-90' />
          </Button>
          <Button variant='outline' size='sm' className='w-10 h-10'>
            1
          </Button>
          <Button variant='outline' size='sm' className='w-10 h-10 bg-muted'>
            2
          </Button>
          <Button variant='outline' size='sm' className='w-10 h-10'>
            3
          </Button>
          <Button variant='outline' size='sm' className='w-10 h-10'>
            4
          </Button>
          <Button variant='outline' size='icon'>
            <ChevronDown className='h-4 w-4 -rotate-90' />
          </Button>
        </nav>
      </div>

      {/* Additional Information Section */}
      <div className='mt-16 bg-muted/30 rounded-lg p-8'>
        <div className='max-w-3xl mx-auto text-center'>
          <h2 className='text-2xl font-bold mb-4'>
            The Cultural Heritage of {category.name}
          </h2>
          <p className='text-muted-foreground mb-6'>
            {category.culturalContext}
          </p>

          <div className='flex justify-center'>
            <Link href='/heritage-stories'>
              <Button variant='outline'>Explore Heritage Stories</Button>
            </Link>
          </div>

          <div className='mt-8 italic text-muted-foreground'>
            <p>"{category.artisanQuote}"</p>
            <p className='mt-2 text-sm'>
              — {category.quoteAuthor}, {category.quoteLocation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
