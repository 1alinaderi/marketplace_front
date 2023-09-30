import Layout from '@components/layout/layout';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div
        style={{ width: '100vw', height: '100vh' }}
        className="w-full p-0 m-0 p-3 md:overflow-hidden"
      >
        <div className="w-full h-full p-0 m-0">
          <div className="w-full h-2/4 md:h-1/4 grid grid-cols-1 md:grid-cols-12 gap-4 py-2 opacity-10">
            <span className="bg-blue-200 p-2 col-span-12 md:col-span-4 relative">
              <span className="absolute right-1/2 bottom-1/2 translate-x-2/4 translate-y-2/4 text-3xl font-bold">
                Luxury retail
              </span>
            </span>
            <span className="bg-blue-400 p-2 col-span-12 md:col-span-3 relative">
              <span className="absolute text-white right-1/2 bottom-1/2 translate-x-2/4 translate-y-2/4 text-3xl font-bold whitespace-nowrap">
                Full service
              </span>
            </span>
            <span className="bg-blue-800 p-2 col-span-12 md:col-span-5 relative">
              <span className="absolute text-yellow-300 right-1/2 bottom-1/2 translate-x-2/4 translate-y-2/4 text-3xl font-bold whitespace-nowrap">
                Eco-friendly brands
              </span>
            </span>
          </div>
          <div className="w-full h-full md:h-2/4 grid grid-cols-1 gap-4 py-2 md:grid-cols-12">
            <span className="bg-red-800 col-span-12 md:col-span-3 p-2 relative opacity-10 ">
              <span className="absolute text-yellow-500 right-1/2 bottom-1/2 translate-x-2/4 translate-y-2/4 text-3xl font-bold whitespace-nowrap">
                Discounted retail
              </span>
            </span>
            <span className="col-span-12 md:col-span-5 ">
              <div className="text-6xl font-serif text-center font-bold tracking-wider py-4">
                PROJECT I
              </div>
              <div className=" grid h-52 mt-7 grid-cols-12 gap-3 opacity-10">
                <span className="bg-yellow-400 col-span-9 relative">
                  <span className="absolute text-black right-1/2 bottom-1/2 translate-x-2/4 translate-y-2/4 text-3xl font-bold whitespace-nowrap">
                    Commercial brands
                  </span>
                </span>
                <span className="col-span-3 flex justify-center items-center flex-col gap-4">
                  <div className="rounded-full bg-blue-400 p-10"></div>
                  <div className="rounded-full bg-orange-400 p-10"></div>
                </span>
              </div>
            </span>
            <Link href={"/marketplace"}>
              <span className="bg-teal-600 cursor-pointer col-span-12 md:col-span-4 p-2 relative shadow-2xl rounded-md">
                <span className="absolute text-center text-black right-1/2 bottom-1/2 translate-x-2/4 translate-y-2/4 text-2xl font-bold whitespace-nowrap">
                  Paydar Abad <br />
                  (architectural material and art)
                </span>
              </span>
            </Link>
          </div>
          <div className="w-full  h-3/4 md:h-1/4 grid grid-cols-1 md:grid-cols-12 gap-4 py-2 opacity-10">
            <span className="bg-black col-span-12 md:col-span-3 p-2 relative">
              <span className="absolute text-red-700 right-1/2 bottom-1/2 translate-x-2/4 translate-y-2/4 text-3xl font-bold whitespace-nowrap">
                Low value products
              </span>
            </span>
            <span className=" col-span-12 md:col-span-5">
              <div className=" grid grid-cols-12 gap-3">
                <span className="bg-cyan-800 col-span-9 relative">
                  <span className="absolute text-white right-1/2 bottom-1/2 translate-x-2/4 translate-y-2/4 text-3xl font-bold whitespace-nowrap">
                    Gaming
                  </span>
                </span>
                <span className="col-span-3 flex justify-center items-center flex-col gap-2">
                  <div className="rounded-full bg-gray-400 p-10"></div>
                  <div className="rounded-full bg-slate-700 p-10"></div>
                </span>
              </div>
            </span>
            <span className="bg-green-700 col-span-12 md:col-span-4 p-1 relative">
              <span className="absolute text-white right-1/2 bottom-1/2 translate-x-2/4 translate-y-2/4 text-3xl font-bold whitespace-nowrap">
                Organic Food
              </span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

Home.Layout = Layout;
