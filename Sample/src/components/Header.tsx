"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { twMerge } from 'tailwind-merge'
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx'
import { HiHome } from 'react-icons/hi'
import { BiSearch } from 'react-icons/bi'
import { FaUserAlt } from 'react-icons/fa'
import toast from 'react-hot-toast'

import Button from './Button'
import { useUser } from '@/hooks/useUser'
import usePlayer from '@/hooks/usePlayer'

interface HeaderProps {
  children: React.ReactNode
  className?: string
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);

  const player = usePlayer()
//   const authModal = useAuthModal()
  const router = useRouter()
//   const supabaseClient = useSupabaseClient()
//   const { user } = useUser()

  return (
    <div className={twMerge(`h-fit bg-gradient-to-b from-purple-800 p-6`, className)}>
      <div className="w-full mb-4 flex items-center justify-between">
        <div className="hidden md:flex gap-x-2 items-center">
          <button
            onClick={() => router.back()}
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
          >
            <RxCaretLeft className="text-white" size={35} />
          </button>
          <button
            onClick={() => router.forward()}
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
          >
            <RxCaretRight className="text-white" size={35} />
          </button>
        </div>
        <div className="flex md:hidden gap-x-2 items-center">
          <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
            <HiHome className="text-black" size={20} />
          </button>
          <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
            <BiSearch className="text-black" size={20} />
          </button>
        </div>
        <div className="flex justify-between items-center gap-x-4">
            <>
			
              {address && <p>Connected as: {address}</p>}
              {balance && <p>Balance: {balance} ETH</p>}
            </>
        </div>
      </div>
      {children}
    </div>
  )
}

export default Header
