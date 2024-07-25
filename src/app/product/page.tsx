import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

async function getProducts() {
    const response = await fetch("https://ecommerce-backend-fawn-eight.vercel.app/api/products")
    if(!response.ok) {
      throw new Error("Failed to fetch products")
    }
    return response.json()
  }
  
  interface IProducts {
    _id: string;
    title: string;
    subtitle: string;
    image: string;
    description: string;
    rate: number;
    price: number;
    size: string;
    color: string;
    __v: number;
  }

export default async function Product() {
  const product: IProducts[] = await getProducts()
  return (
    <div>
      <div className="grid grid-cols-4 m-3 gap-[35px] mt-7">
          {
            product.map((p) => (
              <Link key={p._id} href={`/product/${p._id}`}>
                <div className="relative text-left w-[300px] h-auto">
                    <button className="absolute w-[50px] h-[50px] ml-[210px] mt-[30px] bg-rose-400 text-white rounded-full">-30%</button>
                    <Image width={285} height={300} src={p.image} alt={p.subtitle} />
                    <div className="w-[285px] h-auto p-5 bg-gray-100">
                      <h2 className="text-3xl text-black font-semibold uppercase my-2">{p.title}</h2>
                      <h3 className="text-base font-medium text-gray-300">{p.subtitle}</h3>
                      <p className="text-2xl font-semibold my-2">Rp {p.price}</p>
                    </div>
                </div>
              </Link>
            ))
          }
        </div>
    </div>
  )
}
