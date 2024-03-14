"use client";
import React, { Component } from 'react';
import axios from 'axios';

class BookingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookings: [],
    };
  }

  componentDidMount() {
    this.fetchBookings();
  }

  fetchBookings = async () => {
    try {
      const response = await axios.get('/booking/getallbooking');
      this.setState({ bookings: response.data });
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  render() {
    const { bookings } = this.state;

    return (
      <div className="booking-list">
        <h1 className='text-center text-4xl text-gray-900 font-extralight dark:text-white'>Users Bookings List</h1>
       <br></br><br></br>

  <ul className="grid gap-4 max-w-md mx-auto">
   <li className="pb-3 sm:pb-4">
      <div className="flex items-center space-x-4 rtl:space-x-reverse">
         <div className="flex-shrink-0">
            <img className="w-8 h-8 rounded-full" src="./images/profile.png" alt="profile image"/>
         </div>
         <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
               Freddie
            </p>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
               email@flowbite.com
            </p>
         </div>
         <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
            $320
         </div>
      </div>
   </li>
   <li className="py-3 sm:py-4">
      <div className="flex items-center space-x-4 rtl:space-x-reverse">
         <div className="flex-shrink-0">
            <img className="w-8 h-8 rounded-full" src="/User/mybooking/images/profile.png" alt="profile image"/>
         </div>
         <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
               Bonnie Green
            </p>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
               email@flowbite.com
            </p>
         </div>
         <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
            $3467
         </div>
      </div>
   </li>
   <li className="py-3 sm:py-4">
      <div className="flex items-center space-x-4 rtl:space-x-reverse">
         <div className="flex-shrink-0">
            <img className="w-8 h-8 rounded-full" src="/User/mybooking/images/profile.png" alt="profile image"/>
         </div>
         <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
               Michael Gough
            </p>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
               email@flowbite.com
            </p>
         </div>
         <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
            $67
         </div>
      </div>
   </li>
   <li className="py-3 sm:py-4">
      <div className="flex items-center space-x-4 rtl:space-x-reverse">
         <div className="flex-shrink-0">
            <img className="w-8 h-8 rounded-full" src="/User/mybooking/images/profile.png" alt="profile image"/>
         </div>
         <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
               Thomas Lean
            </p>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
               email@flowbite.com
            </p>
         </div>
         <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
            $2367
         </div>
      </div>
   </li>
   <li className="pt-3 pb-0 sm:pt-4">
      <div className="flex items-center space-x-4 rtl:space-x-reverse">
         <div className="flex-shrink-0">
            <img className="w-8 h-8 rounded-full" src="./images/profile.png" alt="profile image"/>
         </div>
         <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
               Lana Byrd
            </p>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
               email@flowbite.com
            </p>
         </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
            $367
         </div>
      </div>
   </li>
</ul>


       
      </div>
    );
  }
}

export default BookingList;
