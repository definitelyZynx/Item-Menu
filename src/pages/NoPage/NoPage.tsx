import { LuConstruction } from 'react-icons/lu'

const NoPage = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center pt-20 md:pt-40 gap-2 px-7">
      <LuConstruction className="text-gray-400" size={256} />
      <p className="text-2xl font-semibold text-center text-gray-400">This page will go live soon. Stay tuned!</p>
    </div>
  )
}

export default NoPage