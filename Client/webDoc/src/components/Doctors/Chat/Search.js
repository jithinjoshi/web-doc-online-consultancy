import React from 'react'

const Search = () => {
  return (
    <div class="search-box h-10 text-slate-300">
    <div class="flex justify-between px-5 border-b border-slate-100 pb-4">
      <form class="flex justify-center items-center">
        <i class="fa fa-search pr-2"></i>
        <input type="text" name="search" id="search" placeholder="Search" class="font-light focus:outline-none" />
      </form>
      <div>
        <button class="relative">
          <i class="fa fa-message"></i>
          <i class="fa fa-plus absolute -top-2 text-sm"></i>
        </button>
      </div>
    </div>
  </div>
  )
}

export default Search