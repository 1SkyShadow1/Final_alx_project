"use client"

import Link from 'next/link'
import { Button } from '../ui/button'
import {Card, CardContent} from '../ui/card';
import {Label} from '../ui/label';
import {Input} from '../ui/input';
import {Textarea} from '../ui/textarea';
import { Header } from "@/header";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '../ui/select';
import Badge from '../ui/badge';
import {DollarSignIcon} from '../icons/dollar-sign';
import {HammerIcon} from '../icons/hammer';
import {MapPinIcon} from '../icons/map-pin';
import {MenuIcon} from '../icons/menu';
import {PlugIcon} from '../icons/plug';
import {useState, useEffect, SetStateAction, useRef, RefObject} from 'react';
import axios from 'axios';
import { title } from 'process';
import { GigCard } from '../gig/gig-card';

interface Gig{
  title: string;
  _id: string;
  description: string;
  location: string;
  skills: string;
  pay: number;
  documents: File | null;
  category: string;
  createdAt: Date; 
}

const GigsPage = ()=>{
  const categoryRef = useRef<HTMLDivElement>(null);
  const sortByRef = useRef<HTMLDivElement | null>(null);

  const [gigs, setGigs] = useState<Gig[]>([]); 
  const [newGig, setNewGig] = useState({
    title: '',
    description: '',
    location: '',
    skills: '',
    pay: '',
    documents: null, 
    category: 'All Categories'
  });
  const [filterCategory, setFilterCategory] = useState('All Categories');
  const [filterSortBy, setFilterSortBy] = useState('Relevance');

  // Add states for dropdown visibility
  const [showCategoryOptions, setShowCategoryOptions] = useState(false);
  const [showSortByOptions, setShowSortByOptions] = useState(false);

  // Add refs for dropdowns
  // const categoryRef = useRef(null);
  // const sortByRef = useRef(null);

  const fetchGigs = async () =>{
    try {
      const response = await axios.get('/api/gigs/gigs');
      setGigs(response.data); 
    } catch (error){
      console.error('Error fetching gigs', error);
    }
  };

  const handleGigChange = (event: { target: { name: any; value: any; }; }) =>{
    const {name, value} = event.target;
    setNewGig((prevGig)=>({...prevGig, [name]: value})); 
  };

  const handleFileChange = (event: { target: { files: any[]; }; }) =>{
    setNewGig((prevGig)=>({...prevGig, documents: event.target.files[0]}));
  }

  const handleSubmit = async (event: { preventDefault: () => void; }) =>{
    event.preventDefault();
    try{
      const formData = new FormData();
      formData.append('title', newGig.title);
      formData.append('description', newGig.description);
      formData.append('location', newGig.location);
      formData.append('skills', newGig.skills);
      formData.append('pay', newGig.pay);
      formData.append('documents', newGig.documents || '');
      formData.append('category', newGig.category);
      const response = await axios.post('/api/gigs-list', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Gig posted successfully:', response.data);
      setNewGig({
        title: '',
        description: '',
        location: '',
        skills: '',
        pay: '',
        documents: null,
        category: 'All Categories'
      }); 
      fetchGigs();
    } catch (error){
      console.error('Error posting gig:', error);
    }
  };
  
  const handleCategoryChange = (event: { target: { value: SetStateAction<string>; }; }) =>{
    setFilterCategory(event.target.value);
    setShowCategoryOptions(false); 
  }

  const handleSortByChange = (event: { target: { value: SetStateAction<string>; }; }) =>{
    setFilterSortBy(event.target.value);
    setShowSortByOptions(false); 
  }

  useEffect(()=>{
    fetchGigs();
  }, []);

  // Handle clicks outside the dropdowns
  useEffect(() => {
    const handleClickOutsideCategory = (event: MouseEvent) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setShowCategoryOptions(false);
      }
    };

    const handleClickOutsideSortBy = (event: MouseEvent) => {
      if (sortByRef.current && !sortByRef.current.contains(event.target as Node)) {
        setShowSortByOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutsideCategory);
    document.addEventListener('mousedown', handleClickOutsideSortBy);

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideCategory);
      document.removeEventListener('mousedown', handleClickOutsideSortBy);
    };
  }, []);

  return(
    <div className='flex flex-col min-h-dvh'>
      <Header/>
      <main className='flex-1 grir grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-10'>
        <section>
          <h2 className='text-2xl font-bold mb-4'>
            Post a Gig
          </h2>
          <Card className=''>
            <CardContent className='space-y-4'>
              <form onSubmit ={handleSubmit}>
                <div className='space-y-2'>
                  <Label htmlFor="title">Job Title</Label>
                  <Input 
                    className=''
                    id ='title'
                    name='title'
                    placeholder='e.g Plumber Needed'
                    value={newGig.title}
                    onChange={handleGigChange}
                  />
                </div> 
                <div className='space-y-2'>
                  <Label htmlFor= 'description'>
                    Description
                  </Label>
                  <Textarea 
                    className=''
                    id='description'
                    name='description'
                    rows={3}
                    placeholder='provide details about the job'
                    value={newGig.description}
                    onChange={handleGigChange}/>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='location'>
                    Location
                  </Label>
                  <Input 
                    className=''
                    id='location'
                    name='location'
                    placeholder='e.g Lagos, Nigeria'
                    value={newGig.location}
                    onChange={handleGigChange}
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='skills'>
                    Skills
                  </Label>
                  <Input 
                    className=''
                    id='skills'
                    name='skills'
                    placeholder='e.g Plumbing, Electrical'
                    value={newGig.skills}
                    onChange={handleGigChange}
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='pay'>
                    Pay Rate
                  </Label>
                  <Input 
                    className=''
                    id='pay'
                    name='pay'
                    placeholder='e.g 5000'
                    value={newGig.pay}
                    onChange={handleGigChange}
                  /> 
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='documents'>
                    Upload Documents
                  </Label>
                  <Input 
                    className=''
                    id='documents'
                    name='documents'
                    type='file'
                    onChange={handleFileChange}
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='category'>
                    Category
                  </Label>
                  <Select 
                    className=''
                    id='category'
                    name='category'
                    value={newGig.category}
                    onChange={handleGigChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='All Categories'>
                        {newGig.category}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent className=''>
                      <SelectItem value='domestic'>
                        Domestic work
                      </SelectItem>
                      <SelectItem value='Plumbing'>
                        Plumbing
                      </SelectItem>
                      <SelectItem value='Electrical'>
                        Electrical
                      </SelectItem>
                      <SelectItem value='Landscaping'>
                        Landscaping
                      </SelectItem>
                      <SelectItem value='Cleaning'>
                        Cleaning
                      </SelectItem>
                      <SelectItem value='it'>
                        IT/Tech
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type='submit' className='w-full'>
                  Post Gig
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>
        <section>
          <h2 className='text-2xl font-bold mb-4'>Browse Gigs</h2>
          <Card className=''>
            <CardContent className='space-y-4'>
              <div className='flex items-center justify-between mb-4' ref={categoryRef}>
                <div className='flex items-center gap-2'>
                  <Label htmlFor='category'>
                    Category
                  </Label>
                  <Select
                    id='category'
                    value={filterCategory}
                    onChange={handleCategoryChange}
                  >
                    <SelectTrigger>
                      <SelectValue>
                        {filterCategory}
                      </SelectValue>
                      <SelectContent className=''>
                        <SelectItem value='All Categories' onClick={handleCategoryChange}>
                          All Categories
                        </SelectItem>
                        <SelectItem value='Domestic' onClick={handleCategoryChange}>
                          Domestic Work
                        </SelectItem>
                        <SelectItem value='Plumbing' onClick={handleCategoryChange}>
                          Plumbing
                        </SelectItem>
                        <SelectItem value='Electrical' onClick={handleCategoryChange}>
                          Electrical
                        </SelectItem>
                        <SelectItem value='Landscaping' onClick={handleCategoryChange}>
                          Landscaping
                        </SelectItem>
                        <SelectItem value='Cleaning' onClick={handleCategoryChange}>
                          Cleaning
                        </SelectItem>
                        <SelectItem value='IT' onClick={handleCategoryChange}>
                          IT/Tech
                        </SelectItem>
                      </SelectContent>
                    </SelectTrigger>
                  </Select>
                </div>
                <div className='flex items-center gap-2' ref={sortByRef}>
                  <Label htmlFor='sortBy'>Sort By</Label>
                  <Select
                    id='sort'
                    value={filterSortBy}
                    onChange={handleSortByChange}
                  > 
                    <SelectTrigger>
                      <SelectValue placeholder='Relevance'>
                        Relevance
                      </SelectValue>
                      <SelectContent className=''>
                        <SelectItem value='relevance' onClick={handleSortByChange}>
                          Relevance
                        </SelectItem>
                        <SelectItem value='newest' onClick={handleSortByChange}>
                          Newest
                        </SelectItem>
                        <SelectItem value='oldest' onClick={handleSortByChange}>
                          Oldest
                        </SelectItem>
                        <SelectItem value='highest Pay' onClick={handleSortByChange}>
                          Highest Pay
                        </SelectItem>
                        <SelectItem value='lowest Pay' onClick={handleSortByChange}>
                          Lowest Pay
                        </SelectItem>
                      </SelectContent>
                    </SelectTrigger>
                  </Select>
                </div> 
              </div>
              <div className='space-y-4'>
                { gigs.filter((gig)=>{filterCategory === 'All Categories' || gig.category === 'All Categories' || gig.category === filterCategory}).
                  sort((a, b)=>{
                    if(filterSortBy === 'newest'){
                      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                    } else if(filterSortBy === 'highest Pay'){
                      return b.pay - a.pay;
                    } else if(filterSortBy === 'lowest Pay'){
                      return a.pay - b.pay;
                    }
                    return 0;
                  })
                  .map((gig)=>(
                    <GigCard key={gig._id} gig={gig}/>
                  ))}
              </div>
              <div className='flex justify-center mt-6'>
                <Button className='' variant='outline'>
                  View All Gigs
                </Button>
              </div>
            </CardContent>
          </Card> 
        </section>
      </main> 
    </div> 
  );
}

export default GigsPage